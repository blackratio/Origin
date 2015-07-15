directives.directive('waveSurfer', function() {
   return {
      restrict: 'E',
      templateUrl: 'partials/directives/wavesurfer.html',
      link: link
   };

   function link( scope, element, attributes, controller ) {

      var datas = scope.list.data;

      datas.forEach(function(data){
         if(data.content) {
            console.log(data);
         }
      });

      var wavesurfer = Object.create(WaveSurfer);
      wavesurfer.init({
         container: '#wave',
         waveColor: 'violet',
         progressColor: 'purple',
         splitChannels: true
      });
      /*wavesurfer.on('ready', function () {
      wavesurfer.play();
      });*/
      // Play/pause on button press
      document.querySelector('[data-action="play"]').addEventListener(
         'click', wavesurfer.playPause.bind(wavesurfer)
      );
      wavesurfer.load(datas[2].content.file);

   }

});
