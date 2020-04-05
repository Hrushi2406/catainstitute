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


  function getCurrentUser() {
    firebase.auth().onAuthStateChanged(function(user){
      
      if (user) {
        console.log(user.email);
        window.location.href= 'editsection.html';
  } else {
    // No user is signed in.
    window.location.href= 'registration.html';
  }
       });
  
  }
  
  window.onload = function(){
      getCurrentUser()
  }