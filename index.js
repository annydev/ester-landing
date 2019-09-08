$(".next-button").click(function() {
  var selectedButton = $(this);
  var closestClassCatalogSlider = selectedButton.closest(".catalog-sliders");

  closestClassCatalogSlider.addClass("d-none");

  var nextCatalogSliderElement = closestClassCatalogSlider.next();


  if (nextCatalogSliderElement.length === 0) {
    nextCatalogSliderElement = $(".catalog-sliders").first();
  }

  nextCatalogSliderElement.removeClass("d-none");
});

$(".previous-button").click(function() {
  var chosenButton = $(this);
  var closestClassCatalogSlider = chosenButton.closest(".catalog-sliders");

  closestClassCatalogSlider.addClass("d-none");

  var previousCatalogSliderElement = closestClassCatalogSlider.prev();

  if (previousCatalogSliderElement.length === 0) {
    previousCatalogSliderElement = $(".catalog-sliders").last();
  }

  previousCatalogSliderElement.removeClass("d-none");
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
