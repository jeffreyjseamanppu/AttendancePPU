firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;

    // Conditional statement
    if(user != null){

      var email_id = user.email;

      //Get Day of the week
      var d = new Date();
      var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

      //Get the date
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date+' '+time;

      //Debug Only...
      //var myday = '01/05/20';
      //var theday = 'Thursday';

      //console.log(today); //Day
      //console.log(time); //Time
      //console.log(dateTime); //date


      // Call the GPS Location Script. This is the prompt to use the location
      getLocation();

      //Set the Session Variables
      sessionStorage.setItem('dayoftheweek',today)
      sessionStorage.setItem('timeoftheweek',time)
      sessionStorage.setItem('dateoftheweek',dateTime)
      sessionStorage.setItem('email',email_id)


      document.getElementById("user_para").innerHTML = "Welcome: ";
      document.getElementById("user_para").innerHTML = "Please CheckIn to your class"
      //document.getElementById("user_para").innerHTML = "The day is " + days[d.getDay()];
      //document.getElementById("user_para").innerHTML = "<br>";
      //document.getElementById("user_para").innerHTML = "The date is " + dateTime + " " + days[d.getDay()];
    }

  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

  }
});

// Login feature that uses firebase authentication to pass parameters to validate
function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    toastr.error("Error : " + errorMessage);

    // ...
  });

}

// Function to use firebase sign out
function logout(){
  firebase.auth().signOut();
}

// Function to log the data in the NoSQL database environment in Firebase
function storeData(){
  console.log(sessionStorage.getItem('dayoftheweek'))

  var database = firebase.database();
  firebase.database().ref('attendance/').push({
    date: sessionStorage.getItem('dateoftheweek'),
    day: sessionStorage.getItem('dayoftheweek'),
    time: sessionStorage.getItem('timeoftheweek'),
    email: sessionStorage.getItem('email'),
    gps: sessionStorage.getItem('gpslocation')

  });



  //ref.push(data);
  //window.alert("You're CheckedIn ");
}

// Function for capturing the location of the user
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    user_para.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  //user_para.innerHTML = "Latitude: " + position.coords.latitude +
  //"<br>Longitude: " + position.coords.longitude;

  //Set the session for longitude/latitude
  sessionStorage.setItem('gpslocation',position.coords.latitude + "," + position.coords.longitude)
  //Get the session for NoSQL
  sessionStorage.getItem('gpslocation')
}
