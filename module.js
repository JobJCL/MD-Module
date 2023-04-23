$(document).ready(function () {
  /*
   *
   *
   *   Na dit blok staat de scripting voor de melding module!!!
   *
   *
   */

  /*
        !   Disables enter on fields
    */

  $(document).on("keypress", ".gform_wrapper", function (e) {
    var code = e.keyCode || e.which;
    if (
      code == 13 &&
      !jQuery(e.target).is('textarea,input[type="submit"],input[type="button"]')
    ) {
      e.preventDefault();
      return false;
    }
  });

  // Provincies
  // Maybe better to create an ajax call so it can be edited
  var provincies = Array("Noord-Holland", "Flevoland");

  var timeout = setTimeout(function () {}, 0);

  $(".ginput_postcode input").on("input", function () {
    checkPostcodeOnInput();
  });

  $(".manual-check").click(function () {
    checkPostcode();
  });

  function checkPostcode() {
    $(".column").removeClass("clickable");
    $(".validate_field").removeClass("succes", "error");
    if (
      $(".input_postcode").val() &&
      $(".input_huisnummer").val() &&
      $(".input_plaats").val() &&
      $(".input_straat").val() &&
      $(".input_gemeente").val() &&
      $(".input_provincie").val()
    ) {
      var huisnummer = $(".input_huisnummer").val();
      var plaats = $(".input_plaats").val();
      var straat = $(".input_straat").val();
      var valProvincie = $(".input_provincie").val();

      var locInfo = straat + " " + huisnummer + ", " + plaats;
      console.log(locInfo, "Received");
      if ($.inArray(valProvincie, provincies) === 0) {
        console.log(locInfo, "In Array");

        $(".validate_field").removeClass("error");
        $(".loader").addClass("show");
        setTimeout(function () {
          $(".loader").removeClass("show");
          $(".column").addClass("clickable");
        }, 250);
        $(".validate_field").addClass("succes");
        $(".validate_field").text(locInfo);
      } else {
        var errorOutsideWorkingArea =
          "Helaas valt jou locatie buiten ons werkgebied. Excuses voor het ongemak";

        console.log(locInfo, "Not in Array");

        $(".validate_field").text(errorOutsideWorkingArea);
        $(".validate_field").removeClass("succes");
        $(".validate_field").addClass("error");
      }
    } else if (
      $(".input_postcode").val() &&
      $(".input_huisnummer").val() &&
      $(".input_plaats").val() === "" &&
      $(".input_straat").val() === "" &&
      $(".input_gemeente").val() &&
      $(".input_provincie").val()
    ) {
      console.log("No adres found");
      $(".validate_field").addClass("error");
      $(".validate_field").text("Geen adres gevonden bij deze postcode");
    } else {
      console.log("Else");
      $(".validate_field").addClass("error");
      $(".validate_field").text("Geen adres gevonden bij deze postcode");
    }
  }

  function checkPostcodeOnInput() {
    clearTimeout(timeout);
    $(".column").removeClass("clickable");
    $(".validate_field").removeClass("succes", "error");
    $(".validation_message").empty();

    console.log("typing");
    timeout = setTimeout(() => {
      if (
        $(".input_postcode").val() !== "" &&
        $(".input_huisnummer").val() !== "" &&
        $(".input_plaats").val() !== "" &&
        $(".input_straat").val() !== "" &&
        $(".input_gemeente").val() !== "" &&
        $(".input_provincie").val() !== "" && 
        $(".validation_message").text() !== "Postcode en huisnummer niet kunnen vinden"
      ) {
        var huisnummer = $(".input_huisnummer").val();
        var plaats = $(".input_plaats").val();
        var straat = $(".input_straat").val();
        var valProvincie = $(".input_provincie").val();

        var locInfo = straat + " " + huisnummer + ", " + plaats;
        console.log(locInfo, "Received");
        if ($.inArray(valProvincie, provincies) === 0) {
          console.log(locInfo, "In Array");

          $(".validate_field").removeClass("error");
          $(".loader").addClass("show");
          setTimeout(function () {
            $(".loader").removeClass("show");
            $(".validate_field").removeClass("show");
            $(".column").addClass("clickable");
          }, 500);
          $(".validate_field").addClass("succes");
          $(".validate_field").text(locInfo);
        } else {
          var errorOutsideWorkingArea =
            "Helaas valt jou locatie buiten ons werkgebied. Excuses voor het ongemak";

          console.log(locInfo, "Not in Array");

          $(".validate_field").text(errorOutsideWorkingArea);
          $(".validate_field").removeClass("succes");
          $(".validate_field").addClass("error");
          setTimeout(function () {
            $(".validate_field").empty();
            $(".validate_field").removeClass("error");
          }, 2000);
        }
      } else if (
        $(".input_postcode").val() &&
        $(".input_huisnummer").val() &&
        $(".input_plaats").val() === "" &&
        $(".input_straat").val() === "" &&
        $(".input_gemeente").val() &&
        $(".input_provincie").val()
      ) {
        console.log("No adres found");
        $(".validate_field").addClass("error");
        $(".validate_field").text("Geen adres gevonden bij deze postcode");
      } else {
        console.log("Else");
        $(".validate_field").addClass("error");
        $(".validate_field").text("Geen adres gevonden bij deze postcode");
      }
    }, 1500);
  }
  /*
   *
   *   Gravity forms gform_page_loaded works from page 2 and afterwards
   *
   */

  $(document).on("gform_post_render", function (event, form_id, current_page) {
    $(".gfield--type-phone div input").attr("inputmode", "tel");
    $(".gfield--type-email div input").attr("inputmode", "email");
    $(".input_huisnummer").attr("inputmode", "numeric");
    $(".gf-housenumber div input").attr("inputmode", "numeric");
    $(".gf_readonly input[type='text']").attr("readonly", "readonly");
    $(".gf_readonly input[type='text']").attr("onclick", "return false;");
    $(".gf-postcode input[type='text']").attr("tabindex", "-1");
    $(".gf-housenumber input[type='text']").attr("tabindex", "-1");
    $(".gf-toev input[type='text']").attr("tabindex", "-1");
    // $(".gf-firstname div input").focus();
    $("#input_2_1").focus();
    $(".sex input[type='radio']").filter("[value='Mr.']").prop("checked", true);

    /* 
              !   Wacht 2 seconden nadat de gebruiker is gestopt met typen en displayt daarna het gevonden adres
          */
    console.log(current_page, "current page");
    // Define timeout so it can be cleared later
  });

  $(document).on("gform_page_loaded", function (event, form_id, current_page) {
    $(".gfield--type-phone div input").attr("inputmode", "tel");
    $(".gfield--type-email div input").attr("inputmode", "email");
    $(".input_huisnummer").attr("inputmode", "numeric");
    $(".gf-housenumber div input").attr("inputmode", "numeric");

    $(".ginput_postcode input").on("input", function () {
      checkPostcodeOnInput();
    });

    /* 
            ! Trigger om de form te submitten
            */

    // Ew nested if statements
    // Maybe there is a better way to implement

    $(".submit-wrapper .submit-button").click((e) => {
      e.preventDefault();
      if (
        $(".sex div div div input").is(":checked") === false ||
        $.trim($(".gf-firstname div input").val()) === "" ||
        $.trim($(".gf-lastname div input").val()) === "" ||
        $.trim($(".gf-phonenumber div input").val()) === "" ||
        $.trim($(".gf-email div input").val()) === "" ||
        $.trim($(".gf-postcode div input").val()) === "" ||
        $.trim($(".gf-housenumber div input").val()) === "" ||
        $.trim($(".gf-street div input").val()) === "" ||
        $.trim($(".gf-area div input").val()) === "" ||
        $(".gf_consent div input").is(":checked") === false
      ) {
        $(".sex div div div input").removeClass("error");
        if ($(".sex div div div input").is(":checked") === false) {
          $(".sex div div div input").addClass("error");
        }
        $(".gf-firstname div input").removeClass("error");
        if ($.trim($(".gf-firstname div input").val()) === "") {
          $(".gf-firstname div input").addClass("error");
        }
        $(".gf-lastname div input").removeClass("error");
        if ($.trim($(".gf-lastname div input").val()) === "") {
          $(".gf-lastname div input").addClass("error");
        }
        $(".gf-phonenumber div input").removeClass("error");
        if ($.trim($(".gf-phonenumber div input").val()) === "") {
          $(".gf-phonenumber div input").addClass("error");
        }
        $(".gf-email div input").removeClass("error");
        if ($.trim($(".gf-email div input").val()) === "") {
          $(".gf-email div input").addClass("error");
        }
        $(".gf-postcode div input").removeClass("error");
        if ($.trim($(".gf-postcode div input").val()) === "") {
          $(".gf-postcode div input").addClass("error");
        }
        $(".gf-housenumber div input").removeClass("error");
        if ($.trim($(".gf-housenumber div input").val()) === "") {
          $(".gf-housenumber div input").addClass("error");
        }
        $(".gf_consent div input").removeClass("error");
        if ($(".gf_consent div input").is(":checked") === false) {
          $(".gf_consent div input").addClass("error");
        }
        var contactErrorNotFilled = "Vul alstublieft de verplichte velden in";
        return false;
      } else {
        if (isPhoneNumber($(".gf-phonenumber div input").val()) === true) {
          if (isHousenumber($(".gf-housenumber div input").val()) === true) {
            if (isEmail($(".gf-email div input").val()) === true) {
              if (isPostcode($(".gf-postcode div input").val()) === true) {
                if (checkNumbers($(".gf-firstname div input").val()) === true) {
                  if (
                    checkNumbers($(".gf-lastname div input").val()) === true
                  ) {
                    // Continue as usual
                    $("h6.module-title").text("Melding ontvangen!");
                    $("#gform_submit_button_2").trigger("click");
                    $(".module-step2").addClass("test-animation");
                    $(".loader").addClass("show");
                    $(".module-back-form-page-3").addClass("hide");
                    $(".submit-wrapper").addClass("hide");

                    setTimeout(function () {
                      $(".module-step2").removeClass("test-animation");
                      $(".loader").removeClass("show");
                    }, 1600);
                  } else {
                    $(".gf-lastname div input").addClass("error");
                    var contactErrorLastnameIncorrect =
                      "Geen nummers toegestaan";
                    return false;
                  }
                } else {
                  $(".gf-firstname div input").addClass("error");
                  var contactErrorFirstnameIncorrect =
                    "Geen nummers toegestaan";
                  return false;
                }
              } else {
                $(".gf-postcode div input").addClass("error");
                var contactErrorPostcodeIncorrect =
                  "Postcode veld is niet correct ingevuld";
                return false;
              }
            } else {
              $(".gf-email div input").addClass("error");
              var contactErrorEmailIncorrect =
                "Email veld is niet correct ingevuld";
              return false;
            }
          } else {
            $(".gf-housenumber div input").addClass("error");
            var contactErrorHousenumberIncorrect =
              "Huisnummer veld is niet correct ingevuld";
            return false;
          }
        } else {
          $(".gf-phonenumber div input").addClass("error");
          var contactErrorPhoneIncorrect =
            "Telefoonnummer veld is niet correct ingevuld";
          return false;
        }
      }
    });

    $("#gform_2 input[type='text']").focus(function (e) {
      e.preventDefault();
      if ($(this).is(":focus")) {
        $(this).closest(".gfield").children(".gfield_label").addClass("active");
        $(this).addClass("input-active");
      }
    });

    $("#gform_2 textarea").focus(function (e) {
      e.preventDefault();
      if ($(this).is(":focus")) {
        $(this).closest(".gfield").children(".gfield_label").addClass("active");
        $(this).addClass("input-active");
      }
    });

    $("#gform_2 input").each(function (e) {
      if ($(this).val()) {
        $(this).closest(".gfield").children(".gfield_label").addClass("active");
        $(this).addClass("input-active");
      } else {
        $(this)
          .closest(".gfield")
          .children(".gfield_label")
          .removeClass("active");
        $(this).removeClass("input-active");
      }
    });

    $("#gform_2 textarea").blur(function (e) {
      e.preventDefault();
      if ($(this).val()) {
        // do nothing
      } else {
        $(this)
          .closest(".gfield")
          .children(".gfield_label")
          .removeClass("active");
        $(this).removeClass("input-active");
      }
    });

    $("#gform_2 input[type='text']").blur(function (e) {
      e.preventDefault();
      if ($(this).val()) {
        // do nothing
      } else {
        $(this)
          .closest(".gfield")
          .children(".gfield_label")
          .removeClass("active");
        $(this).removeClass("input-active");
      }
    });

    // These check inputs for things that shouldn't be there //

    $(".gf-email div input").keyup(function () {
      if ($(this).val()) {
        var email = $(this).val();

        if (isEmail(email) === true) {
          $(this).removeClass("error");
          $(".gf-email label").removeClass("error-text");
        } else {
          $(this).addClass("error");
          $(".gf-email label").addClass("error-text");
        }
      }
    });

    $(".gf-phonenumber div input").keyup(function () {
      if ($(this).val()) {
        var phonenumber = $(this).val();
        var trimmedPhonenumber = phonenumber.replace(/\s/g, "");

        if (isPhoneNumber(trimmedPhonenumber) === true) {
          $(this).removeClass("error");
          $(".gf-phonenumber label").removeClass("error-text");
        } else {
          $(this).addClass("error");
          $(".gf-phonenumber label").addClass("error-text");
        }
      }
    });

    $(".gf-postcode div input").keyup(function () {
      if ($(this).val()) {
        var postcode = $(this).val();
        var timmedPostcode = postcode.replace(/\s/g, "");

        if (isPostcode(timmedPostcode) === true) {
          $(this).removeClass("error");
          $(".gf-postcode label").removeClass("error-text");
        } else {
          $(this).addClass("error");
          $(".gf-postcode label").addClass("error-text");
        }
      }
    });

    $(".gf-housenumber div input").keyup(function () {
      if ($(this).val()) {
        var housenumber = $(this).val();
        var trimmedHousenumber = housenumber.replace(/\s/g, "");

        if (isHousenumber(trimmedHousenumber) === true) {
          $(this).removeClass("error");
          $(".gf-housenumber label").removeClass("error-text");
        } else {
          $(this).addClass("error");
          $(".gf-housenumber label").addClass("error-text");
        }
      }
    });

    $(".gf-firstname div input").keyup(function () {
      if ($(this).val()) {
        var firstname = $(this).val();
        var trimmedFirstname = firstname.replace(/\s/g, "");

        if (checkNumbers(trimmedFirstname) === true) {
          $(this).removeClass("error");
          $(".gf-firstname label").removeClass("error-text");
        } else {
          $(this).addClass("error");
          $(".gf-firstname label").addClass("error-text");
        }
      }
    });

    $(".gf-lastname div input").keyup(function () {
      if ($(this).val()) {
        var lastname = $(this).val();
        var trimmedLastname = lastname.replace(/\s/g, "");

        if (checkNumbers(trimmedLastname) === true) {
          $(this).removeClass("error");
          $(".gf-lastname label").removeClass("error-text");
        } else {
          $(this).addClass("error");
          $(".gf-lastname label").addClass("error-text");
        }
      }
    });

    $(".gf-streetname div input").keyup(function () {
      if ($(this).val()) {
        var streetname = $(this).val();
        var trimmedStreetname = streetname.replace(/\s/g, "");

        if (checkNumbers(trimmedStreetname) === true) {
          $(this).removeClass("error");
          $(".gf-streetname label").removeClass("error-text");
        } else {
          $(this).addClass("error");
          $(".gf-streetname label").addClass("error-text");
        }
      }
    });

    $(".gf-area div input").keyup(function () {
      if ($(this).val()) {
        var area = $(this).val();
        var trimmedArea = area.replace(/\s/g, "");

        if (checkNumbers(trimmedArea) === true) {
          $(this).removeClass("error");
          $(".gf-area label").removeClass("error-text");
        } else {
          $(this).addClass("error");
          $(".gf-area label").addClass("error-text");
        }
      }
    });
  });

  $(".input_huisnummer div input").keyup(function () {
    if ($(this).val()) {
      var housenumberChecker = $(this).val();
      var trimmedHousenumberChecker = housenumberChecker.replace(/\s/g, "");

      if (isHousenumber(trimmedHousenumberChecker) === true) {
        $(this).removeClass("error");
      } else {
        $(this).addClass("error");
      }
    }
  });

  $(".input_postcode div input").keyup(function () {
    if ($(this).val()) {
      var postcodeChecker = $(this).val();
      var timmedPostcodeChecker = postcodeChecker.replace(/\s/g, "");

      if (isPostcode(timmedPostcodeChecker) === true) {
        $(this).removeClass("error");
      } else {
        $(this).addClass("error");
      }
    }
  });

  // regex functions //
  function checkNumbers(name) {
    var regex = /^([^0-9]*)$/;
    return regex.test(name);
  }

  function isHousenumber(housenumber) {
    var regex = /^[^a-zA-Z]+$/;
    return regex.test(housenumber);
  }

  function isPostcode(postcode) {
    var regex = /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i;
    return regex.test(postcode);
  }

  function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  function isPhoneNumber(phonenumber) {
    var regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return regex.test(phonenumber);
  }

  /* 
              ! Kijkt of postcode en huisnummer velden zijn ingevuld, als deze zijn ingevuld kijkt ie of ze in de lijst met toegestane provincies zitten.
              ! Als deze toegestaan zijn dan kan je naar stap 2 van het veld.
          */

  $(".module-no-speed-trigger").click(function (e) {
    e.preventDefault();
    if (
      $.trim($(".input_postcode").val()) === "" ||
      $.trim($(".input_huisnummer").val()) === ""
    ) {
      var error = "Vul alstublieft de verplichte velden in";
      $(".validate_field").text(error);
      $(".validate_field").addClass("error");

      setTimeout(function () {
        $(".validate_field").empty();
        $(".validate_field").removeClass("error");
      }, 2000);
      return false;
    }
    if ($(".input_provincie").val()) {
      var valProvincie = $(".input_provincie").val();

      if ($.inArray(valProvincie, provincies) === 0) {
        var provincie = $(".input_provincie").val();
        $(".gf-province div input").val(provincie);
        var plaats = $(".input_plaats").val();
        $(".gf-area div input").val(plaats);
        var huisnummer = $(".input_huisnummer").val();
        $(".gf-housenumber div input").val(huisnummer);
        var straat = $(".input_straat").val();
        $(".gf-street div input").val(straat);
        var postcode = $(".input_postcode").val();
        $(".gf-postcode div input").val(postcode);
        var toevoeging = $(".input_toevoeging").val();
        $(".gf-toev div input").val(toevoeging);

        $("#gform_next_button_2_19").trigger("click");
        $(".module-step2").addClass("test-animation");
        setTimeout(function () {
          $(".loader").addClass("show");
        }, 50);

        setTimeout(function () {
          $(".module-step2").removeClass("test-animation");
          $(".loader").removeClass("show");
        }, 1600);
      } else {
        var errorOutsideWorkingArea =
          "Helaas valt jou locatie buiten ons werkgebied. Excuses voor het ongemak";
        $(".validate_field").text(errorOutsideWorkingArea);
        $(".validate_field").addClass("error");
        setTimeout(function () {
          $(".validate_field").empty();
          $(".validate_field").removeClass("error");
        }, 5000);
        return false;
      }
    }
  });

  /*
            ! Verandert content aan de hand van form pagina. !!!! NIET OPTIMAAL !!!!
          */

  $(document).on("gform_page_loaded", function (event, form_id, current_page) {
    if (current_page == 1) {
      $(".module-back").removeClass("hide");
      $(".module-back-form-page-2").addClass("hide");
      $(".module-back-form-page-3").addClass("hide");

      $("div.validate_field").removeClass("hide");

      $("h6#form-page-1").removeClass("hide");
      $("h6#form-page-2").addClass("hide");
      $("h6#form-page-3").addClass("hide");

      $(" .next-wrapper").addClass("hide");
      $(".column").removeClass("hide");
      $(".submit-wrapper").addClass("hide");

      $(".form-footer").removeClass("hide");
    } else if (current_page == 2) {
      $(".module-back").addClass("hide");
      $(".module-back-form-page-2").removeClass("hide");
      $(".module-back-form-page-3").addClass("hide");

      $("div.validate_field").addClass("hide");

      $("h6#form-page-1").addClass("hide");
      $("h6#form-page-2").removeClass("hide");
      $("h6#form-page-3").addClass("hide");

      $(".problem-type").removeClass("hide");
      $(" .next-wrapper").removeClass("hide");
      $(".column").addClass("hide");
      $(".submit-wrapper").addClass("hide");

      $(".form-footer").addClass("hide");
    } else {
      $(".module-back").addClass("hide");
      $(".module-back-form-page-2").addClass("hide");
      $(".module-back-form-page-3").removeClass("hide");

      $("div.validate_field").addClass("hide");
      $(".gf-toev").after(
        '<div class="adres-info"><a style="float: right;" class="wijzig"> Wijzig</a></div>'
      );
      $(".adres-info").prepend($(".validate_field").text());
      $(".wijzig").click(function (e) {
        e.preventDefault();
        $(".module-step2").addClass("back-test-animation");
        setTimeout(function () {
          $(".loader").addClass("show");
        }, 50);
        setTimeout(function () {
          $(".footer").removeClass("hide");
        }, 1250);
        setTimeout(function () {
          $(".module-step2").removeClass("back-test-animation");
          $(".loader").removeClass("show");
        }, 1600);
        $("#gform_previous_button_2_20").trigger("click");
      });

      $("h6#form-page-1").addClass("hide");
      $("h6#form-page-2").addClass("hide");
      $("h6#form-page-3").removeClass("hide");

      $(".problem-type").addClass("hide");
      $(" .next-wrapper").addClass("hide");
      $(".column").addClass("hide");
      $(".submit-wrapper").removeClass("hide");

      $(".form-footer").addClass("hide");
    }

    /* 
                ! Triggers voor terug gaan naar eerder form pagina's.
              */

    $(".module-back-form-page-3").click(function (e) {
      $(".module-step2").addClass("back-test-animation");
      setTimeout(function () {
        $(".loader").addClass("show");
      }, 50);
      setTimeout(function () {
        $(".column").addClass("hide");
        $(".footer").removeClass("hide");
      }, 1250);
      setTimeout(function () {
        $(".module-step2").removeClass("back-test-animation");
        $(".loader").removeClass("show");
        $(".column").addClass("hide");
      }, 1600);
      $("#gform_previous_button_2").trigger("click");
    });

    $(".module-back-form-page-2").click(function (e) {
      $(".module-step2").addClass("back-test-animation");
      setTimeout(function () {
        $(".loader").addClass("show");
      }, 50);
      setTimeout(function () {
        $(".column").removeClass("hide");
        $(".problem").addClass("hide");
        $(".footer").removeClass("hide");
      }, 1250);
      setTimeout(function () {
        $(".module-step2").removeClass("back-test-animation");
        $(".loader").removeClass("show");
      }, 1600);

      $("#gform_previous_button_2").trigger("click");
    });

    $(".gf-postcode div input").change(function (e) {
      e.preventDefault();
      $(".input_postcode").val($(this).val());
    });

    $(".gf-housenumber div input").change(function (e) {
      e.preventDefault();
      $(".input_huisnummer").val($(this).val());
    });

    $(".gf-toev div input").change(function (e) {
      e.preventDefault();
      $(".input_toevoeging").val($(this).val());
    });

    /* 
                ! Trigger om vooruit te gaan in de form
              */

    $("a.next-button").click(function (e) {
      e.preventDefault();
      $("#gform_next_button_2_20").trigger("click");
      $(".module-step2").addClass("test-animation");
      $(".loader").addClass("show");
      var straat = $(".gf-street div input").val();
      var huisnummer = $(".gf-housenumber div input").val();
      var plaats = $(".gf-area div input").val();

      setTimeout(function () {
        $(".module-step2").removeClass("test-animation");
        $(".loader").removeClass("show");
      }, 1600);
    });
  });

  $("#gform_2 input[type='text']").focus(function (e) {
    e.preventDefault();
    if ($(this).is(":focus")) {
      $(this).closest(".gfield").children(".gfield_label").addClass("active");
      $(this).addClass("input-active");
    }
  });

  $("#gform_2 input").each(function (e) {
    if ($(this).val()) {
      $(this).closest(".gfield").children(".gfield_label").addClass("active");
      $(this).addClass("input-active");
    } else {
      $(this)
        .closest(".gfield")
        .children(".gfield_label")
        .removeClass("active");
      $(this).removeClass("input-active");
    }
  });

  $("#gform_2 input[type='text']").blur(function (e) {
    e.preventDefault();
    if ($(this).val()) {
      // do nothing
    } else {
      $(this)
        .closest(".gfield")
        .children(".gfield_label")
        .removeClass("active");
      $(this).removeClass("input-active");
    }
  });

  /*
   *
   *
   *     Module Paging
   *
   *
   */
  var lastStep = 1;
  var currentStep = lastStep;

  // Closes the module and resets the current step to 0
  $(".module-close").click(function (e) {
    e.preventDefault();

    $(".module .container").addClass("animation-close");

    setTimeout(function () {
      $(".module").removeClass("open");
      $("html, body").removeClass("noscroll");

      $(".module .container").removeClass("open");
      $(".module .container .module-step" + currentStep).removeClass("open");
      lastStep = currentStep;

      // currentStep = 0;
      $(".module-step-speed").removeClass("open");
      $(".module .container").removeClass("animation-close");
      // $(".problem").empty();
    }, 500);
  });

  // Opens first module
  $(".module-trigger").click(function (e) {
    e.preventDefault();
    // currentStep = 1;
    $(this).toggleClass("open");
    $(".module .container").addClass("animate");
    $(".module").toggleClass("open");
    $("html").addClass("noscroll");

    $(".module-step" + lastStep).addClass("open");

    setTimeout(function () {
      $(".module .container").addClass("open");
      $(".module .container").removeClass("animate");
    }, 500);
  });

  $("a.grid-item").click(function (e) {
    var problem = $(this).attr("id").toLowerCase();
    $(".problem").empty();
    // Insert chosen problem above problem field on page 2
    $(".problem").append("<p id='problem'>Verstopping in " + problem + "</p>");
    $(".hover-icon", this).clone().insertBefore($("#problem"));

    // Insert chosen problem into input of hidden field
    $(".clog_hidden div input").attr("value", problem);
    // Comment out on local
    // $(".input_postcode").attr("style", "padding: 15px !important");
    // $(".input_huisnummer").attr("style", "padding: 15px !important");
    // $(".input_toevoeging").attr("style", "padding: 15px !important");
    // $(".field_huisnummer").attr("style", "padding-right: 0 !important");
  });

  // Opens the next module based on the next step and closses the current module.
  $(".module-next-trigger").click(function (e) {
    e.preventDefault();
    var nextStep = currentStep + 1;
    $(".module-step" + currentStep).addClass("fade-slide-left");
    $(".loader").addClass("show");
    setTimeout(function () {
      $(".module-step" + currentStep).removeClass("open");
      $(".module-step" + currentStep).removeClass("fade-slide-left");
      currentStep++;
    }, 150);
    setTimeout(function () {
      $(".loader").removeClass("show");
      $(".module-step" + nextStep).toggleClass("open");
      $(".module-step" + nextStep).toggleClass("fade-slide-right");
      $(".input_postcode").focus();
    }, 300);
    setTimeout(() => {
      $(".module-step" + nextStep).removeClass("fade-slide-right");
    }, 450);
  });

  // Closes the current step and opens the previous one.
  $(".module-back").click(function (e) {
    // go back previous page based on current step
    e.preventDefault();

    var previousStep = currentStep - 1;
    $(".module-step" + currentStep).addClass("fade-slide-left-to-right");
    setTimeout(function () {
      $(".module-step" + currentStep).removeClass("open");
    }, 150);
    setTimeout(function () {
      $(".module-step" + previousStep).toggleClass("fade-slide-right-to-left");
      $(".module-step" + previousStep).toggleClass("open");
    }, 300);
    setTimeout(() => {
      $(".module-step" + currentStep).removeClass("fade-slide-left-to-right");
      currentStep--;
    }, 450);
  });

  $(".module-speed-back").click(function (e) {
    e.preventDefault();
    var previousStep = currentStep - 1;

    $(".module-step-speed").addClass("fade-slide-left-to-right");
    setTimeout(function () {
      $(".module-step-speed").removeClass("open");
    }, 150);
    setTimeout(function () {
      $(".module-step" + previousStep).toggleClass("fade-slide-right-to-left");
      $(".module-step" + previousStep).toggleClass("open");
    }, 300);
    setTimeout(() => {
      $(".module-step-speed").removeClass("fade-slide-left-to-right");
      $(".module-step2").removeClass("fade-slide-right-to-left");
      currentStep--;
    }, 450);
  });

  $(".module-speed-trigger").click(function (e) {
    e.preventDefault();
    var nextStep = currentStep + 1;

    $(".module-step" + currentStep).addClass("fade-slide-left");
    setTimeout(function () {
      $(".module-step" + currentStep).removeClass("open");
      $(".module-step" + currentStep).removeClass("fade-slide-left");
      currentStep++;
    }, 150);
    setTimeout(function () {
      $(".module-step-speed").toggleClass("open");
      $(".module-step-speed").toggleClass("fade-slide-right");
    }, 300);
    setTimeout(() => {
      $(".module-step-speed").removeClass("fade-slide-right");
    }, 450);
  });
});
