window.onload = function() {
  setTimeout(function() {
    $("#loading").remove();
  }, 500);
};

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
  var maps = [
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2718.846378275485!2d28.8591984!3d47.0432452!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97cf8873b9ec3%3A0xba3f642a70ef7aee!2sMoldindconbank!5e0!3m2!1sen!2s!4v1567978796003!5m2!1sen!2s",
    "https://www.google.com/maps/d/u/0/embed?mid=1YnUPp6zfQ3zGapI5WEVGpZ-sIPBPfIYO&ll=47.01732867611592%2C28.841664818493655&z=16",
    "https://www.google.com/maps/d/u/0/embed?mid=1YnUPp6zfQ3zGapI5WEVGpZ-sIPBPfIYO&ll=47.04927150000004%2C28.863892299999975&z=12"
  ];

  var number = $(this).attr("number");
  var link = maps[number];

  $("#mapIframe").attr("src", link);
});

$(".navbar-toggler").click(function() {
  $("#navigation-bar").toggleClass("open");
  $(".navbar-collapse").toggleClass("show");
  $("body").toggleClass("navbar-open");
});

$(".show-description-btn").click(function() {
  var currentButton = $(this);
  var currentCatalogText = currentButton.closest(".catalog-text");
  var currentCatalogDescription = currentCatalogText.find(".catalog-description");
  var hideButton = currentCatalogText.find(".hide-description-btn");

  currentCatalogDescription.addClass("d-block");
  currentButton.addClass("d-none");
  hideButton.removeClass("d-none");
});

$(".hide-description-btn").click(function() {
  var currentButton = $(this);
  var currentCatalogText = currentButton.closest(".catalog-text");
  var currentCatalogDescription = currentCatalogText.find(".catalog-description");
  var showButton = currentCatalogText.find(".show-description-btn");

  currentCatalogDescription.removeClass("d-block");
  currentButton.addClass("d-none");
  showButton.removeClass("d-none");
});
