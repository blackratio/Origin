$(window).scroll(function() {
   var scroll = $(window).scrollTop();

   if (scroll >= 73) {
      $("#mainMenu").addClass("active");
   }
   else{

      $("#mainMenu").removeClass("active");
   }
});
