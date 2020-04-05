
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

 var dbRef = firebase.firestore().collection('institutes')
 var currentUser;
 var storageDb = firebase.storage().ref().child('institutes');
 var faculties = [];


function signOut() {
  firebase.auth().signOut();
}

 function getCurrentUser() {
  document.getElementById('loader-div').innerHTML = " <div class='progress'><div class = 'indeterminate'></div></div>";
    firebase.auth().onAuthStateChanged(function(user){
      if (user) {
        currentUser = user;
        getData();
      } else {
        window.location.href= 'registration.html';
      }
       });
  }

  window.onload = function(){
      getCurrentUser()
  }

  function getData() {
    dbRef.doc(currentUser.uid).get()
        .then((doc) => {
          if(doc.exists) {
            var basicData = doc.data().basicDetails;
            var facultyData = doc.data().facultyDetails;
            document.getElementById('coaching-name').value = basicData.coachingName == null ? '' : basicData.coachingName;
            document.getElementById('email').value = basicData.email == null ? '' : basicData.email;
            document.getElementById('name-of-branch-manager').value = basicData.branchManager;
            document.getElementById('contact-no').value = basicData.contactNo;
            document.getElementById('website-link').value = basicData.websiteLink == null ? '': basicData.websiteLink;
            document.getElementById('description').value  = basicData.description == null ? '': basicData.description;
            document.getElementById('address-line-1').value = basicData.addressDetails.addressLine1 == null ? '': basicData.addressDetails.addressLine1;
            document.getElementById('address-line-2').value = basicData.addressDetails.addressLine2 == null ? '': basicData.addressDetails.addressLine2;
            document.getElementById('city').value = basicData.addressDetails.city == null ? '': basicData.addressDetails.city;
            document.getElementById('states').value = basicData.addressDetails.state == null ? '': basicData.addressDetails.state;
            document.getElementById('pincode').value = basicData.addressDetails.pincode == null ? '': basicData.addressDetails.pincode;
            document.getElementById('specifications').value = basicData.specifications == null ? '': basicData.specifications;
             console.log(facultyData);

            for(var i = 0; i < facultyData.length ; i++ ) {
              addNewFacultyCard()
              document.getElementById('faculty-name-' + (i + 1)).value = facultyData[i].facName;
              document.getElementById('faculty-experience-' + (i + 1)).value = facultyData[i].facExperience;
              document.getElementById('faculty-specifications-' + (i + 1)).value = facultyData[i].facSpecifications;
            }
            faculties = facultyData

          } else {
            console.log("No such document!");
        }

        })
        .catch((e) => {
          console.log(e)
        })
    document.getElementById('loader-div').innerHTML = " ";

  }



function uploadBasicDetails() {
  document.getElementById('loader-div').innerHTML = " <div class='progress'><div class = 'indeterminate'></div></div>";

    var coachingName = document.getElementById('coaching-name').value ;
    var email = document.getElementById('email').value ;
    var branchManager = document.getElementById('name-of-branch-manager').value ;
    var contactNo = document.getElementById('contact-no').value ;
    var websiteLink = document.getElementById('website-link').value;
    var description = document.getElementById('description').value ;
    var addressLine1 = document.getElementById('address-line-1').value ;
    var addressLine2 = document.getElementById('address-line-2').value ;
    var city = document.getElementById('city').value ;
    var state = document.getElementById('states').value ;
    var pincode = document.getElementById('pincode').value ;
    var specifications = document.getElementById('specifications').value ;
    console.log(addressLine1 + addressLine2);
    dbRef.doc(currentUser.uid).update({
          basicDetails: {
            coachingName: coachingName,
            email: email,
            branchManager: branchManager,
            contactNo: contactNo,
            websiteLink: websiteLink,
            description: description,
            addressDetails: {
              addressLine1 : addressLine1 ,
              addressLine2: addressLine2,
              city: city,
              state: state,
              pincode: pincode,
            },
            specifications: specifications
           }
        })
        .then((doc) => {
          document.getElementById('loader-div').innerHTML = " ";

          $('.option-tab').removeClass('mark-tab tab-active')
          $('.fac').addClass('mark-tab tab-active')
          $('.info-input').hide()
          $('#faculty').show()
          console.log('success')
        })
        .catch((e) => {
          console.log(e);
        })
}



function uploadFacultyDetails() {
  var facultyName = document.getElementsByClassName('faculty-name') ;
  var experience = document.getElementsByClassName('faculty-experience') ;
  var specifications = document.getElementsByClassName('faculty-specifications') ;
  faculties = [];
  for(var i=0; i < facultyName.length ; i++) {
    var fac = {
      "facName" : facultyName[i].value,
      "facExperience": experience[i].value,
      "facSpecifications": specifications[i].value,
    }
    faculties.push(fac);
  }

  dbRef.doc(currentUser.uid).update({
    facultyDetails: faculties,
  })
  .then((doc) => {
    console.log('success');
  })
  .catch((e) => {
    console.log(e);
  })
  console.log(faculties);
}


function deleteFacultyCard(cardNo) {
  console.log(noOfCards);
  for (var i = 0; i < noOfCards; i++) {
    document.getElementsByClassName('faculty-card')[0].remove();
  }
  faculties.splice(cardNo - 1, 1);
  console.log(faculties);
  dbRef.doc(currentUser.uid).update({
    facultyDetails: faculties,
  })
  .then((doc) => {

    noOfCards = 0;
    // faculties = [];
    getData();
    console.log('success');
  })
  .catch((e) => {
    console.log(e);
  })
}
