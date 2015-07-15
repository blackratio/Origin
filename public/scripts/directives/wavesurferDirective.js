directives.directive('waveSurfer', function() {

   function link( scope, element, attributes, controller ) {

      var datas = scope.list.data;

      var wavesurfer = Object.create(WaveSurfer);
      wavesurfer.init({
         container: '#wave',
         waveColor: '#ccc',
         progressColor: '#333'
      });

      // Play/pause
      document.querySelector('[data-action="play"]').addEventListener(
         'click', wavesurfer.playPause.bind(wavesurfer)
      );

      wavesurfer.load(datas[2].content.file);

   }

   return {
      restrict: 'E',
      templateUrl: 'partials/directives/wavesurfer.html',
      link: link
   };

});
