// ==== VALIDATE FORM ==== //

$('#input-phone').on('input', function () { 
  this.value = this.value.replace(/[^0-9]/g,'');
});


let btnForm = $("#button-form");
let form = $("#form-contact-itzaez");

btnForm.on('click', function(e){
  e.preventDefault();

  let error = false;
  // let errorMessage = $(".error-message")
  let val_name = $('#input-name').val();
  let val_email = $('#input-email').val();
  let val_phone = $('#input-phone').val();
  let val_subject = $("#input-subject").val();
  let val_timetable = $("#input-timetable").val();
  let val_message = $("#textarea-message").val();

  let inputForm = $(".input-form");

  let name_input = $('#input-name');
  let email_input = $('#input-email');
  let phone_input = $('#input-phone');
  // let subject_input = $('#input-subject')
  // let timetable_input =$('#input-timetable')

  let messageSendOk = $(".send-message-ok");
  let messageSendError = $(".send-message-error");

  if(val_name.length == 0){
    error = true;
    name_input.siblings('.error-message').fadeIn();
    name_input.addClass('error-input');
  }else {
    name_input.siblings('.error-message').fadeOut();
    name_input.removeClass('error-input');
  }

  if(val_email.length == 0){
    error = true;
    email_input.siblings('.error-message').fadeIn();
    email_input.addClass('error-input');
  }else{
    email_input.siblings('.error-message').fadeOut();
    email_input.removeClass('error-input');
  }

  if(val_phone.length == 0){
    error = true;
    phone_input.siblings('.error-message').fadeIn();
    phone_input.addClass('error-input');
  }else {
    phone_input.siblings('.error-message').fadeOut();
    phone_input.removeClass('error-input');
  }

  inputForm.on('focusout', function(){
    let t = $(this);
    let errorMes = t.siblings('.error-message');
    t.removeClass('error-input');
    errorMes.fadeOut();
  });

  if(error == false){

    btnForm.attr('disabled', 'true').text('Enviando información...');
    
    // $.post("mail/enviar-mail.php", $("#form-contact-cade").serialize(),function(result){
    //   if(result !== 'sent'){
    //     messageSendOk.fadeIn();
    //     btnForm.attr('disabled', 'true').text('Enviado');
    //     setTimeout (function(){window.location.href='index.html'}, 4000);
    //   }else{                    
    //     messageSendError.fadeIn();
    //   }
    // });
  }

})