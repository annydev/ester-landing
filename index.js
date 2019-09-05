$(".next-button").click(function() {
  var selectedButton = $(this);
  var closestClassCatalogSlider = selectedButton.closest(".catalog-slider");

  closestClassCatalogSlider.addClass("d-none");
  closestClassCatalogSlider.removeClass("d-flex");

  var nextCatalogSliderElement = closestClassCatalogSlider.next();


  if (nextCatalogSliderElement.length === 0) {
     nextCatalogSliderElement = $(".catalog-slider").first();
  }

  nextCatalogSliderElement.addClass("d-flex");
  nextCatalogSliderElement.removeClass("d-none");
});

$(document).scroll(function () {
    var $nav = $("#navigation-bar");
    $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
  });
