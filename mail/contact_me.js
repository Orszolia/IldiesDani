$(function () {
    $(
      "#contactForm input,#contactForm textarea,#contactForm button"
    ).jqBootstrapValidation({
      preventSubmit: true,
      submitError: function ($form, event, errors) {
        // additional error messages or events
      },
      submitSuccess: function ($form, event) {
        event.preventDefault(); // prevent default submit behaviour
        // get values from FORM
        var name = $("input#name").val();
        var email = $("input#email").val();
        var phone = $("input#phone").val();
        var message = $("textarea#message").val();
        var radios = document.getElementsByName("coming");
        var radios2 = document.getElementsByName("room");
        var room_for = $("select#people_in_room").val();
  
        var coming;
  
        for (var i = 0; i < radios.length; i++) {
          if (radios[i].checked) {
            coming = radios[i].value;
  
            break;
          }
        }

        var room;

        for (var i = 0; i < radios2.length; i++) {
            if (radios2[i].checked) {
              room = radios2[i].value;
    
              break;
            }
          }
  
        var plus_names = [];
  
        for (i = 0; i < counter; i++) {
          k = i + 1;
          item = $("input#plus_name_" + k).val();
          plus_names.push(item);
        }
  
        var firstName = name; // For Success/Failure Message

        $this = $("#sendMessageButton");
        $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
        $.ajax({
          url: "/mail/contact_me.php",
          type: "POST",
          data: {
            name: name,
            plus_names: plus_names,
            phone: phone,
            email: email,
            message: message,
            coming: coming,
            room: room,
            room_for: room_for,
  
          },
          cache: false,
          success: function () {
            // Success message
            $("#success").html("<div class='alert alert-success'>");
            $("#success > .alert-success")
              .html(
                "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
              )
              .append("</button>");
            $("#success > .alert-success").append(
              "<strong>Your message has been sent. </strong>"
            );
            $("#success > .alert-success").append("</div>");
            //clear all fields
            $("#contactForm").trigger("reset");
          },
          error: function () {
            // Fail message
            $("#success").html("<div class='alert alert-danger'>");
            $("#success > .alert-danger")
              .html(
                "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
              )
              .append("</button>");
            $("#success > .alert-danger").append(
              $("<strong>").text(
                "Sorry " +
                  firstName +
                  ", it seems that my mail server is not responding. Please try again later!"
              )
            );
            $("#success > .alert-danger").append("</div>");
            //clear all fields
            $("#contactForm").trigger("reset");
          },
          complete: function () {
            setTimeout(function () {
              $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
            }, 1000);
          },
        });
      },
      filter: function () {
        return $(this).is(":visible");
      },
    });
  
    $('a[data-toggle="tab"]').click(function (e) {
      e.preventDefault();
      $(this).tab("show");
    });
  });
  
  /*When clicking on Full hide fail/success boxes */
  $("#name").focus(function () {
    $("#success").html("");
  });