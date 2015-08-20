directives.directive('waveSurfer', function($timeout, $localStorage) {

   function link( scope, element, attributes, controller ) {

      var datas = scope.list.data;
      var localRegions = scope.localRegions;

      var wavesurfer = WaveSurfer.create({
         container: '#wave',
         splitChannels: true,
         waveColor: '#ccc',
         progressColor: '#333',
         height: '70',
         hideScrollbar: true,
         minimap: true
      });


      /* Regions */
      var colors = 'rgba(0,0,0,0.3)';
      wavesurfer.enableDragSelection({
         color: colors
      });


      // When Wavesurfer is Ready
      wavesurfer.on('ready', function () {

         // Initialze Timeline
         var timeline = Object.create(WaveSurfer.Timeline);

         timeline.init({
            wavesurfer: wavesurfer,
            container: '#wave-timeline'
         });

         // REGIONS
         // Load region from localStorage
         // If no region -> load from other source

         if (localRegions.regions) {
            loadRegions(localRegions.regions);
         }

      });


      wavesurfer.on('region-click', function (region, e) {
         e.stopPropagation();
         // Play on click, loop on shift click
         //e.shiftKey ? region.playLoop() : region.play();
      });
      wavesurfer.on('region-click', editAnnotation);
      wavesurfer.on('region-updated', saveRegions);
      wavesurfer.on('region-removed', saveRegions);
      wavesurfer.on('region-in', showNote);

      wavesurfer.on('region-play', function (region) {
         region.once('out', function () {
            wavesurfer.play(region.start);
            wavesurfer.pause();
         });
      });

      // Play/pause
      document.querySelector('[data-action="play"]').addEventListener(
         'click', wavesurfer.playPause.bind(wavesurfer)
      );

      wavesurfer.load(datas[2].content.file);


      (function () {
         var progressDiv = document.querySelector('#progress-bar');
         var progressBar = progressDiv.querySelector('.progress-bar');

         var showProgress = function (percent) {
            progressDiv.style.display = 'block';
            progressBar.style.width = percent + '%';
         };

         var hideProgress = function () {
            progressDiv.style.display = 'none';
         };

         wavesurfer.on('loading', showProgress);
         wavesurfer.on('ready', hideProgress);
         wavesurfer.on('destroy', hideProgress);
         wavesurfer.on('error', hideProgress);
      }());


      /**
      * Save annotations
      */
      function saveRegions() {
         localRegions.regions =

         Object.keys(wavesurfer.regions.list).map(function (id) {
            var region = wavesurfer.regions.list[id];
            return {
               start: region.start,
               end: region.end,
               data: region.data
            };
         });
      }


      /**
      * Load regions from localStorage or server.
      */
      function loadRegions(regions) {
         regions.forEach(function (region) {
            region.color = colors;
            wavesurfer.addRegion(region);
         });
      }


      /**
      * Extract regions separated by silence.
      */
      function extractRegions(peaks, duration) {
         // Silence params
         var minValue = 0.0015;
         var minSeconds = 0.25;

         var length = peaks.length;
         var coef = duration / length;
         var minLen = minSeconds / coef;

         // Gather silence indeces
         var silences = [];
         Array.prototype.forEach.call(peaks, function (val, index) {
            if (val < minValue) {
               silences.push(index);
            }
         });

         // Cluster silence values
         var clusters = [];
         silences.forEach(function (val, index) {
            if (clusters.length && val == silences[index - 1] + 1) {
               clusters[clusters.length - 1].push(val);
            } else {
               clusters.push([ val ]);
            }
         });

         // Filter silence clusters by minimum length
         var fClusters = clusters.filter(function (cluster) {
            return cluster.length >= minLen;
         });

         // Create regions on the edges of silences
         var regions = fClusters.map(function (cluster, index) {
            var next = fClusters[index + 1];
            return {
               start: cluster[cluster.length - 1],
               end: (next ? next[0] : length - 1)
            };
         });

         // Add an initial region if the audio doesn't start with silence
         var firstCluster = fClusters[0];
         if (firstCluster && firstCluster[0] !== 0) {
            regions.unshift({
               start: 0,
               end: firstCluster[firstCluster.length - 1]
            });
         }

         // Filter regions by minimum length
         var fRegions = regions.filter(function (reg) {
            return reg.end - reg.start >= minLen;
         });

         // Return time-based regions
         return fRegions.map(function (reg) {
            return {
               start: Math.round(reg.start * coef * 10) / 10,
               end: Math.round(reg.end * coef * 10) / 10
            };
         });
      }

      /**
       * Edit annotation for a region.
       */
      function editAnnotation (region) {
         var form = document.forms.edit;
         form.style.opacity = 1;
         form.elements.start.value = Math.round(region.start * 10) / 10,
         form.elements.end.value = Math.round(region.end * 10) / 10;
         form.elements.note.value = region.data.note || '';
         form.onsubmit = function (e) {
            e.preventDefault();
            region.update({
               start: form.elements.start.value,
               end: form.elements.end.value,
               data: {
                  note: form.elements.note.value
               }
            });
            form.style.opacity = 0;
         };
         form.onreset = function () {
            form.style.opacity = 0;
            form.dataset.region = null;
         };
         form.dataset.region = region.id;
      }


      /**
      * Display annotation.
      */
      function showNote (region) {
         if (!showNote.el) {
            showNote.el = document.querySelector('#subtitle');
         }
         showNote.el.textContent = region.data.note || '–';
      }


      /**
      * Delete annotation.
      */
      var deleteAnnotation = document.querySelector('[data-action="delete-region"]');
      deleteAnnotation.addEventListener('click', function () {
         var form = document.forms.edit;
         var regionId = form.dataset.region;
         if (regionId) {
            wavesurfer.regions.list[regionId].remove();
            form.reset();
         }
      });

   }

   return {
      restrict: 'E',
      templateUrl: 'partials/directives/wavesurfer.html',
      link: link
   };

});
