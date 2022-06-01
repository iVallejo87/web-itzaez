let btnPrevent = $("a.prevent");

btnPrevent.on('click', function(e) {
  e.preventDefault();
})

// SLIDERS

let topSlide = $("#hero-slider").owlCarousel({
  autoplay: true,
  loop: true,
  nav: false,
  dots: true,
  navText: [" ", " "],
  items:1
})

let historySlide = $("#history-slider").owlCarousel({
  autoplay: false,
  loop: false,
  nav: false,
  dots: false,
  navText: [" ", " "],
  items:1
})

let partnerSlide = $("#partner-slider").owlCarousel({
  autoplay: false,
  loop: false,
  nav: false,
  dots: true,
  navText: [" ", " "],
  items:1
})

let creditSlide = $("#credit-slider").owlCarousel({
  autoplay: true,
  loop: true,
  nav: false,
  dots: true,
  touchDrag: false,
  pullDrag: false,
  mouseDrag: false,
  smartSpeed: 800,
  navText: [" ", " "],
  items:1
})

let imageSlide = $("#credit-image-slider").owlCarousel({
  autoplay: true,
  loop: true,
  nav: false,
  dots: false,
  touchDrag: false,
  pullDrag: false,
  mouseDrag: false,
  smartSpeed: 800,
  navText: [" ", " "],
  items:1
})

// AUDIO PLAYER

document.addEventListener('DOMContentLoaded', function() {
  new GreenAudioPlayer('.audio-player');
});

// VIDEO PLAYER

var video = document.getElementById('video-player');
video.volume = 0.5;

// ACCORDEON SUCURSALES

let accordeonSuc = $(".ul-accordeon");

 accordeonSuc.on('click', 'li', function(e){
  e.preventDefault();
  let t = $(this);
  let btn = t.find('a').next();
  let icon = t.find('a').children();
  let iconOthers = t.siblings().find('a').children();
  let containerInfo = t.siblings().find('.accordeon__container');
  btn.slideToggle(300);
  containerInfo.slideUp(200);
  icon.toggleClass('fa-minus');
  iconOthers.attr('class', 'fa-solid fa-chevron-down');
  return false;
 })