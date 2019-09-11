window.onload = function() {
  setTimeout(function() {
    $("#loading").remove();
  }, 500);
};

function scrollToAnchor(hash) {
  var target = $(hash);
  var headerHeight = $("#navigation-bar").height() + 5; // Get fixed header height

  target = target.length ? target : $('[name=' + hash.slice(1) + ']');

  if (target.length) {
    $('html,body').animate({
      scrollTop: target.offset().top - headerHeight
    }, 100);
    return false;
  }
}

if (window.location.hash) {
  scrollToAnchor(window.location.hash);
}

function toggleNavbar(){
  $("#navigation-bar").toggleClass("open");
  $(".navbar-collapse").toggleClass("show");
  $("body").toggleClass("navbar-open");
}

function onNextAction(currentElement) {
  var closestParfumeContainer = $(currentElement).closest(".parfume-container");
  var closestClassCatalogSlider = $(currentElement).closest(".catalog-sliders");

  closestClassCatalogSlider.addClass("d-none");

  var nextCatalogSliderElement = closestClassCatalogSlider.next();

  if (nextCatalogSliderElement.length === 0) {
    nextCatalogSliderElement = closestParfumeContainer.find(".catalog-sliders").first();
  }
  nextCatalogSliderElement.removeClass("d-none");
}

function onPreviousAction(currentElement) {
  var closestParfumeContainer = $(currentElement).closest(".parfume-container");
  var closestClassCatalogSlider = $(currentElement).closest(".catalog-sliders");

  closestClassCatalogSlider.addClass("d-none");

  var previousCatalogSliderElement = closestClassCatalogSlider.prev();

  if (previousCatalogSliderElement.length === 0) {
    previousCatalogSliderElement = closestParfumeContainer.find(".catalog-sliders").last();
  }

  previousCatalogSliderElement.removeClass("d-none");
}

$('select').selectric();

$(".nav-link").click(function(){
  $("#navigation-bar").removeClass("open");
  $(".navbar-collapse").removeClass("show");
  $("body").removeClass("navbar-open");
});

$("button > svg").on("click", function(e) {
  e.stopPropagation();
  e.preventDefault();
});

$("a[href*=\\#]:not([href=\\#])").click(function() {
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

    scrollToAnchor(this.hash);
  }
});

$(".next-button").click(function() {
  var currentButton = $(this);
  onNextAction(currentButton);
});

$(".catalog-image").on("swipeleft", function(e, data) {
  var currentImage = $(this);
  onNextAction(currentImage);
});

$(".previous-button").click(function() {
  var currentButton = $(this);
  onPreviousAction(currentButton);
});

$(".catalog-image").on("swiperight", function(e, data) {
  var currentImage = $(this);
  onPreviousAction(currentImage);
});

$(".man").click(function() {
  var clickedButton = $(this);
  $(".woman").removeClass("active");
  $(".man").addClass("active");
  $(".women-parfums").addClass("d-none");
  $(".men-parfums").removeClass("d-none");
});

$(".woman").click(function() {
  var clickedButton = $(this);
  $(".man").removeClass("active");
  $(".woman").addClass("active");
  $(".women-parfums").removeClass("d-none");
  $(".men-parfums").addClass("d-none");
});

$(document).scroll(function() {
  var $nav = $("#navigation-bar");
  $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
});

$(".mode-footer-button").click(function() {
  var chosenButton = $(this);
  var currentModal = chosenButton.closest(".modal");

  if (currentModal.find(".mode-phone").val() === "") {
    currentModal.find(".if-statement").removeClass("d-none");
  } else {
    currentModal.modal('hide');
    $('#afterOrder').modal('show');
  }
});

$('.modal').on('hidden.bs.modal', function(e) {
  var currentModal = $(this);

  currentModal.find("input").val("");
  currentModal.find("select").val("");
  currentModal.find(".if-statement").addClass("d-none");
});

$(".catalog-slider-button").click(function() {
  var currentButton = $(this);
  var parfumName = currentButton.attr("name");

  var chosenModal = $("#orderParfumeModal");
  var parfumSelect = chosenModal.find(".select-parfums");

  parfumSelect.val(parfumName);
  chosenModal.modal('show');

});

$(".previous-certificate-button").click(function() {
  var activeImage = $(".certificate-images .active");

  activeImage.addClass("d-none");
  activeImage.removeClass("active");

  var previousImage = activeImage.prev();

  if (previousImage.length === 0) {
    previousImage = $(".certificate-images img").last();
  }

  previousImage.removeClass("d-none");
  previousImage.addClass("active");
});

$(".next-certificate-button").click(function() {
  var activeImage = $(".certificate-images .active");

  activeImage.addClass("d-none");
  activeImage.removeClass("active");

  var nextImage = activeImage.next();

  if (nextImage.length === 0) {
    nextImage = $(".certificate-images img").first();
  }

  nextImage.removeClass("d-none");
  nextImage.addClass("active");
});

$(".map-link").click(function() {
  var mapUrl = "https://www.google.com/maps/d/embed?mid=1zI_d27X44dhCKBrOfsfduxqKTWI6_JXD&ll";

  var geoCode = $(this).attr("geo-code");
  var link = mapUrl + geoCode;

  $("#mapIframe").attr("src", link);
});

$(".navbar-toggler").click(function() {
  toggleNavbar();
});

$(".show-description-btn, .hide-description-btn").click(function() {
  var currentButton = $(this);
  var currentCatalogText = currentButton.closest(".parfume-container");
  var showDescriptionBtn = currentCatalogText.find(".show-description-btn");
  var hideDescriptionBtn = currentCatalogText.find(".hide-description-btn");

  currentCatalogText.toggleClass("opened");
  showDescriptionBtn.toggleClass("d-none");
  hideDescriptionBtn.toggleClass("d-none");
});
