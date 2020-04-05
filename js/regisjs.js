
let showRegister = true
$("#actionBtnOut").click(
  function (){
      if(showRegister){
        $("#actionBtnOut").val('Register')
        showRegister = false
        $('#register-panel').removeClass('active')
        $('#login-panel').addClass('active')

      }else{
          $("#actionBtnOut").val('Login')
          showRegister = true
          $('#register-panel').addClass('active')
          $('#login-panel').removeClass('active')
      }

  })



