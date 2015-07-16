directives.directive('waveSurfer', function($timeout) {

   function link( scope, element, attributes, controller ) {

      var datas = scope.list.data;

      var wavesurfer = WaveSurfer.create({
         container: '#wave',
         splitChannels: true,
         waveColor: '#ccc',
         progressColor: '#333',
         height: '50',
         hideScrollbar: true,
         minimap: true
      });

      // When Wavesurfer is Ready
      wavesurfer.on('ready', function () {

         // Initialze Timeline
         var timeline = Object.create(WaveSurfer.Timeline);

         // Initialze Equalizer
         var EQ = [
            {
               f: 32,
               type: 'lowshelf'
            },
            {
               f: 64,
               type: 'peaking'
            },
            {
               f: 125,
               type: 'peaking'
            },
            {
               f: 250,
               type: 'peaking'
            },
            {
               f: 500,
               type: 'peaking'
            },
            {
               f: 1000,
               type: 'peaking'
            },
            {
               f: 2000,
               type: 'peaking'
            },
            {
               f: 4000,
               type: 'peaking'
            },
            {
               f: 8000,
               type: 'peaking'
            },
            {
               f: 16000,
               type: 'highshelf'
            }
         ];

         // Create filters
         var filters = EQ.map(function (band) {
            var filter = wavesurfer.backend.ac.createBiquadFilter();
            filter.type = band.type;
            filter.gain.value = 0;
            filter.Q.value = 1;
            filter.frequency.value = band.f;
            return filter;
         });

         // Connect filters to wavesurfer
         wavesurfer.backend.setFilters(filters);

         // Bind filters to vertical range sliders
         var container = document.querySelector('#equalizer');

         filters.forEach(function (filter) {
            var input = document.createElement('input');
            wavesurfer.util.extend(input, {
               type: 'range',
               min: -40,
               max: 40,
               value: 0,
               title: filter.frequency.value
            });
            input.style.display = 'inline-block';
            input.setAttribute('orient', 'vertical');
            wavesurfer.drawer.style(input, {
               'webkitAppearance': 'slider-vertical',
               width: '50px',
               height: '150px'
            });
            container.appendChild(input);

            var onChange = function (e) {
               filter.gain.value = ~~e.target.value;
            };

            input.addEventListener('input', onChange);
            input.addEventListener('change', onChange);
         });

        // For debugging
        wavesurfer.filters = filters;

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

   }

   return {
      restrict: 'E',
      templateUrl: 'partials/directives/wavesurfer.html',
      link: link
   };

});
