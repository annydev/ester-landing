var IndexModule = (function() {
  var self = this;

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

  function sendDataToGoogle(request) {
    var scriptURL = 'https://script.google.com/macros/s/AKfycbzFSecFqi-z873hivF5_09Uri-FNjQSK5OSWVsuh8sAn-Z57tE/exec';
    var formData = new FormData();

    for (var key in request) {
      formData.append(key, request[key]);
    }

    fetch(scriptURL, {
        method: 'POST',
        body: formData
      })
      .then(function(response) {
        console.log('Google Success!', response);
      })
      .catch(function(error) {
        console.error('Google Error!', error.message);
      });
  }

  function sendDataToTelegram(request) {
    var apiKey = "924565132:AAFCoxRqMeqdnL4TKj5IEzpNbmwQ56KMgBI";
    var channelName = "@ester_autoparfume";
    var message = "";

    for (var key in request) {
      message += key + ": " + request[key] + "\n";
    }

    var url = "https://api.telegram.org/bot" + apiKey + "/sendMessage?chat_id=" + channelName + "&text=" + encodeURI(message);

    $.get(url, function(data) {
      console.log('Telegram Success!', data);
    });
  }

  function sendRequest(request){
    sendDataToGoogle(request);
    sendDataToTelegram(request);
    window.location.href = window.location.href + "multumesc";
  }

  function isFormValid(currentModal) {
    if (currentModal.find(".mode-phone").val() === "") {
      currentModal.find(".if-statement").removeClass("d-none");
      return false;
    }

    return true;
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
          "sheetName": "OrderPerfume"
        };

        sendRequest(request);
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
          "sheetName": "BeingSales"
        };

        sendRequest(request);
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
          "sheetName": "OrderPart"
        };

        sendRequest(request);
      }
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
      var parfumSelectedOption = chosenModal.find('.select-parfums option[value="' + parfumName + '"]');

      $('.select-parfums').prop('selectedIndex', parfumSelectedOption.index()).selectric('refresh');
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

      $(".certificate-images").attr("href", previousImage.attr("src"));
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

      $(".certificate-images").attr("href", nextImage.attr("src"));
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

    bindFormSending();
  };

  return self;
})();

(function() {
  IndexModule.Init();
})();
