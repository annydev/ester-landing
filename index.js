$(".next-button").click(function() {
  var selectedButton = $(this);
  var closestClassCatalogSlider = selectedButton.closest(".catalog-sliders");

  closestClassCatalogSlider.addClass("d-none");
  closestClassCatalogSlider.removeClass("d-flex");

  var nextCatalogSliderElement = closestClassCatalogSlider.next();


  if (nextCatalogSliderElement.length === 0) {
    nextCatalogSliderElement = $(".catalog-slider").first();
  }

  nextCatalogSliderElement.addClass("d-flex");
  nextCatalogSliderElement.removeClass("d-none");
});

$(document).scroll(function() {
  var $nav = $("#navigation-bar");
  $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
});

$('#modal-1').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget); // Button that triggered the modal
  var recipient = button.data('whatever');
  var modal = $(this);
  modal.find('.modal-title').text("Какой аромат хотите заказать?");
  modal.find('.modal-body input').val(recipient);
});
