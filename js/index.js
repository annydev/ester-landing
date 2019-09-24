var IndexModule = (function() {
  var self = this;

  function scrollToAnchor(hash) {
    var target = $(hash);
    var headerHeight = $("#navigation-bar").height() + 5; // Get fixed header height

    target = target.length ? target : $('[name=' + hash.slice(1) + ']');

    if (target.length) {
      $('html,body').animate({
        scrollTop: target.offset().top - headerHeight
      }, 500);
      return false;
    }
  }

  function toggleNavbar() {
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

  function sendRequest(request, language) {
    switch (language) {
      case "ro":
        window.location.href = "https://annydev.github.io/ester-landing/multumesc-ro.html";
        break;
      default:
        window.location.href = "https://annydev.github.io/ester-landing/multumesc.html";
        break;
    }
  }

  function isFormValid(currentModal) {
    if (currentModal.find(".mode-phone").val() === "") {
      currentModal.find(".if-statement").removeClass("d-none");
      return false;
    }

    return true;
  }

  function onPreviousCertificateClick() {
    var activeImage = $(".certificate-images .active");

    activeImage.addClass("d-none");
    activeImage.removeClass("active");

    var previousImage = activeImage.prev();

    if (previousImage.length === 0) {
      previousImage = $(".certificate-images img").last();
    }

    previousImage.removeClass("d-none");
    previousImage.addClass("active");

    $(".certificate-images").attr("href", previousImage.attr("src"));
  }

  function onNextCertificateClick() {
    var activeImage = $(".certificate-images .active");

    activeImage.addClass("d-none");
    activeImage.removeClass("active");

    var nextImage = activeImage.next();

    if (nextImage.length === 0) {
      nextImage = $(".certificate-images img").first();
    }

    nextImage.removeClass("d-none");
    nextImage.addClass("active");

    $(".certificate-images").attr("href", nextImage.attr("src"));
  }

  function bindFormSending() {
    $("#orderParfumeButton").click(function() {
      var chosenButton = $(this);
      var currentModal = chosenButton.closest(".modal");

      if (isFormValid(currentModal)) {
        var body = chosenButton.closest(".modal-body");
        var parfumes = {
          "m1": "Paco Rabanne – One Million",
          "m2": "Bulgari – Aqua Amara",
          "m3": "Giorgio Armani – Acqua di Gio",
          "m4": "Christian Dior – Sauvage",
          "m5": "Versace – Eros",
          "m6": "Tom Ford – Neroli Portofino",
          "m7": "Chanel – Allure Homme Sport",
          "m8": "YSL – La Nuit de l’Homme",
          "m9": "Paco Rabanne – Invictus",
          "m10": "Carolina Herrera – 212MEN",
          "w1": "Coco Chanel – Mademoiselle",
          "w2": "Paco Rabanne - Lady Million",
          "w3": "Armani – Because It’s You: Because It’s You",
          "w4": "YSL – Black Opium",
          "w5": "Hugo Boss – The Scent",
          "w6": "Armani - Si Passione",
          "w7": "Tom Ford – Tobacco Vanilla",
          "w8": "Dolce Gabbana – Light Blue",
          "w9": "Christian Dior – Ambre Nuit",
          "w10": "Kilian - Good girl gone bad"
        };

        var request = {
          "name": body.find('input[name="name"]').val(),
          "phone": body.find('input[name="phone"]').val(),
          "address": body.find('input[name="address"]').val(),
          "perfume": parfumes[body.find('.select-parfums').val()],
          "sheetName": "Zakaz.parfum"
        };

        chosenButton.attr("disabled", true);

        var language = chosenButton.attr("language");

        sendRequest(request, language);
      }
    });

    $("#orderBeingSalesButton").click(function() {
      var chosenButton = $(this);
      var currentModal = chosenButton.closest(".modal");

      if (isFormValid(currentModal)) {
        var body = chosenButton.closest(".modal-body");

        var request = {
          "name": body.find('input[name="name"]').val(),
          "phone": body.find('input[name="phone"]').val(),
          "address": body.find('input[name="address"]').val(),
          "sheetName": "Diler"
        };

        chosenButton.attr("disabled", true);

        var language = chosenButton.attr("language");

        sendRequest(request, language);
      }
    });

    $("#orderPartButton").click(function() {
      var chosenButton = $(this);
      var currentModal = chosenButton.closest(".modal");

      if (isFormValid(currentModal)) {
        var body = chosenButton.closest(".modal-body");

        var request = {
          "name": body.find('input[name="name"]').val(),
          "phone": body.find('input[name="phone"]').val(),
          "address": body.find('input[name="address"]').val(),
          "sheetName": "Zakaz.partia"
        };

        chosenButton.attr("disabled", true);

        var language = chosenButton.attr("language");

        sendRequest(request, language);
      }
    });
  }

  function bindCatalogButtons() {
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
  }

  function bindCertificateButtons() {
    $(".previous-certificate-button").click(function() {
      onPreviousCertificateClick();
    });

    $(".next-certificate-button").click(function() {
      onNextCertificateClick();
    });

    $(".certificate-images").on("swipeleft", function(e, data) {
      onNextCertificateClick();
    });

    $(".certificate-images").on("swiperight", function(e, data) {
      onPreviousCertificateClick();
    });
  }

  function bindMobileKeyboard() {
    $(document).ready(function() {
      var _originalSize = $(window).width() + $(window).height();
      $(window).resize(function() {
        if ($(window).width() + $(window).height() != _originalSize) {
          $("body").addClass("keyboard-open");
        } else {
          $("body").removeClass("keyboard-open");
        }
      });
    });
  }

  self.Init = function() {
    window.onload = function() {
      setTimeout(function() {
        $("#loading").remove();
      }, 500);
    };

    if (window.location.hash) {
      scrollToAnchor(window.location.hash);
    }

    $(document).scroll(function() {
      var $nav = $("#navigation-bar");
      $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });

    $("#beingSalesButton").click(function() {
      $("#beingSalesModal").modal("show");
    });

    $('select').selectric();

    $(".nav-link").click(function() {
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

    $('.modal').on('hidden.bs.modal', function(e) {
      var currentModal = $(this);

      currentModal.find("input").val("");
      currentModal.find("select").val("");
      currentModal.find('.select-parfums').prop("selectedIndex", 0).selectric('refresh');
      currentModal.find(".if-statement").addClass("d-none");
    });

    $(".catalog-slider-button").click(function() {
      var currentButton = $(this);
      var parfumName = currentButton.attr("name");

      var chosenModal = $("#orderParfumeModal");
      var parfumSelectedOption = chosenModal.find('.select-parfums option[value="' + parfumName + '"]');

      $('.select-parfums').prop('selectedIndex', parfumSelectedOption.index()).selectric('refresh');
      chosenModal.modal('show');
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

    $(".sending-form .form-control").on("keydown", function(e) {
      if (e.keyCode == 13) {
        var modalBody = $(e.currentTarget).closest(".modal-body");
        var button = modalBody.find(".mode-footer-button");

        button.trigger("click");
      }
    });

    bindFormSending();
    bindCatalogButtons();
    bindCertificateButtons();
    bindMobileKeyboard();
  };

  return self;
})();

(function() {
  IndexModule.Init();
})();
