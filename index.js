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
  $(".women-parfums").hide();
  $(".men-parfums").show();
});

$(".woman").click(function() {
  var clickedButton = $(this);
  $(".man").removeClass("active");
  $(".woman").addClass("active");
  $(".women-parfums").show();
  $(".men-parfums").hide();
});


$(document).scroll(function() {
  var $nav = $("#navigation-bar");
  $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
});

$(".mode-footer-button").click(function() {
  if ($(".mode-phone").val() === "") {
    $(".if-statement").removeClass("d-none");
  } else {
    $('#orderParfumeModal').modal('hide');
    $('#afterOrder').modal('show');
  }
});
