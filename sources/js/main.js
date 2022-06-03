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
  items:1,
  smartSpeed:750
})

let historySlide = $("#history-slider").owlCarousel({
  autoplay: false,
  loop: true,
  nav: true,
  dots: false,
  navText: [" ", " "],
  items:1
})

let partnerSlide = $("#partner-slider").owlCarousel({
  autoplay: true,
  loop: true,
  nav: false,
  dots: true,
  navText: [" ", " "],
  items:1,
  smartSpeed:750
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
  items:1,
  smartSpeed:750
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
  items:1,
  smartSpeed:750
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

//  HEADER FIXED

let webWindow = $(window);
let header = $(".main-header");
let logoHeader = $(".logo-header");
let btnMenu = $(".btn-menu");
let menu = $(".menu");

if(webWindow.width() >= 1024){
  webWindow.on('scroll', function(){
    if(webWindow.scrollTop() > 200) {
      header.addClass('fixed');
      logoHeader.css("width", "200px")
    }else {
      header.removeClass('fixed');
      logoHeader.css("width", "300px")
    }
  });
}else {
  webWindow.on('scroll', function(){
    if(webWindow.scrollTop() > 200) {
      header.addClass('fixed');
    }else {
      header.removeClass('fixed');
    }
  });
}

//  MENU RESPONSIVE

btnMenu.on('click', function(){
  if(!menu.hasClass('open')){
    $(this).addClass('btn-open')
    menu.addClass('open').fadeIn(200);
    header.addClass('open')
  }else {
    $(this).removeClass('btn-open')
    menu.fadeOut(200).removeClass('open')
    header.removeClass('open')
  }
})

// LINKS SCROLL

let listMenu = $(".list-menu")
let linkBTn = $(".link-btn");
// let linkBTnLogo = $(".link-btn-logo");

listMenu.on('click', '.link-btn', function(e){
  if (this.hash !== "") {
    e.preventDefault();
    let hash = this.hash;
    $('html, body').animate({
      scrollTop: $(hash).offset().top - 70
    }, 700);
  }
})

// linkBTnLogo.on('click', function(e){
//   e.preventDefault();
//   let hashLogo = this.hash;
//   $('html, body').animate({
//     scrollTop: $(hashLogo).offset().top
//   }, 700);
// })

