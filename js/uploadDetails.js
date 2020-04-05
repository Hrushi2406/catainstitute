
  var database = firebase.firestore();
  var dbref = database.collection('institutes');
  

function uploadBasicDetails() {
    var coachingName = document.getElementById('coaching-name').value ;
    var branchManager = document.getElementById('name-of-branch-manager').value ;
    var contactNo = document.getElementById('contact-no').value ;

    dbref.doc(resp.user.uid).set(instituteData)
        .then((resp) => {
          document.location.href = './editsection.html';
          document.getElementById('loader-div').innerHTML = "";
        })
        .catch((e) => {
          console.log(e);
          document.getElementById('loader-div').innerHTML = "";
        })
    // document.getElementById('coaching-name').value = data.coachingName;;
    // document.getElementById('name-of-branch-manager').value = data.branchManager;
    // document.getElementById('contact-no').value = data.contactNo;
    // document.getElementById('coaching-name').value = data.coachingName;;
    // document.getElementById('name-of-branch-manager').value = data.branchManager;
    // document.getElementById('contact-no').value = data.contactNo;   
}