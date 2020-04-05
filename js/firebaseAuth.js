  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDqHF3xGXuEdBXN5hp9TmDTH07rX5V4dw0",
    authDomain: "catainstitute.firebaseapp.com",
    databaseURL: "https://catainstitute.firebaseio.com",
    projectId: "catainstitute",
    storageBucket: "catainstitute.appspot.com",
    messagingSenderId: "819798820450",
    appId: "1:819798820450:web:10403abb1a71d76d"
  };
  // Initialize Firebase
 firebase.initializeApp(firebaseConfig);


  var auth = firebase.auth();
  var database = firebase.firestore();

  var dbref = database.collection('institutes');



  function logIn() {
      document.getElementById('loader-div').innerHTML = " <div class='progress'><div class = 'indeterminate'></div></div>";
      var email = document.getElementById('login-email').value;
      var password = document.getElementById('login-password').value;
      auth.signInWithEmailAndPassword(email, password)
      .then((resp) =>{
          console.log(resp.user);
          document.location.href = './editsection.html';
      })
      .catch((e) => {
        document.getElementById('alertLogin').innerHTML = e.message;
        document.getElementById('loader-div').innerHTML = "";
          console.log(e);
      })
  }

  

  function signUp() {
    document.getElementById('loader-div').innerHTML = " <div class='progress'><div class = 'indeterminate'></div></div>";
    var coachingName = document.getElementById('coaching-name').value;
    var email = document.getElementById('register-email').value;
    var branchManager = document.getElementById('name-of-branch-manager').value;
    var contactNo = document.getElementById('contact-no').value;
    var password = document.getElementById('register-password').value;
    var confirmPassword = document.getElementById('confirm-password').value;
    if(password == confirmPassword) {
      auth.createUserWithEmailAndPassword(email, password)
      .then((resp) => {
        console.log(resp.user.uid)
        var instituteData = {
          id: resp.user.uid,
          coachingName: coachingName,
          email: email,
          branchManager: branchManager,
          contactNo: contactNo
        };
        dbref.doc(resp.user.uid).set({
          basicDetails: instituteData
        })
        .then((resp) => {
          document.location.href = './editsection.html';
          document.getElementById('loader-div').innerHTML = "";
        })
        .catch((e) => {
          console.log(e);
          document.getElementById('loader-div').innerHTML = "";
        })
      })
      .catch((e) => {
        document.getElementById('alert').innerHTML = e.message;
        document.getElementById('loader-div').innerHTML = "";
        console.log(e)
      })
    } else {
      document.getElementById('alert').innerHTML = "*password doesn't match";
      document.getElementById('loader-div').innerHTML = "";
      console.log('Not password');
    }
   
  }

