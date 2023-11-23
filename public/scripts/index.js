const loginElement = document.querySelector('#login-form');
const contentElement = document.querySelector("#content-sign-in");
const userDetailsElement = document.querySelector('#user-details');
const authBarElement = document.querySelector("#authentication-bar");

// Elements for sensor readings
const tempElement = document.getElementById("temp");
const humElement = document.getElementById("hum");
const presElement = document.getElementById("pres");
const pumpElement = document.getElementById("pump");
const rainElement = document.getElementById("rain");
const lightElement = document.getElementById("light");
const soilHumElement = document.getElementById("soilHum");
const ledYellow = document.getElementById('led-yellow');
const ledRed = document.getElementById('led-red');
const ledGreen = document.getElementById('led-green');


// MANAGE LOGIN/LOGOUT UI
const setupUI = (user) => {
  if (user) {
    //toggle UI elements
    loginElement.style.display = 'none';
    contentElement.style.display = 'block';
    authBarElement.style.display ='block';
    userDetailsElement.style.display ='block';
    userDetailsElement.innerHTML = user.email;

    // get user UID to get data from database
    var uid = user.uid;
    console.log(uid);

    // Database paths (with user UID)
    var dbPathTemp = 'UsersData/' + uid.toString() + '/temperature';
    var dbPathHum = 'UsersData/' + uid.toString() + '/humidity';
    var dbPathPres = 'UsersData/' + uid.toString() + '/pressure';
    var dbPathRain = 'UsersData/' + uid.toString() + '/rain';
    var dbPathLight = 'UsersData/' + uid.toString() + '/light';
    var dbPathSoilHum = 'UsersData/' + uid.toString() + '/soilHumidity';
    var dbPathPump = 'UsersData/' + uid.toString() + '/pump';
    var dbPathLedYellow = 'UsersData/' + uid.toString() + '/ledYellow';
    var dbPathLedRed = 'UsersData/' + uid.toString() + '/ledRed';
    var dbPathLedGreen = 'UsersData/' + uid.toString() + '/ledGreen';


    // Database references
    var dbRefTemp = firebase.database().ref().child(dbPathTemp);
    var dbRefHum = firebase.database().ref().child(dbPathHum);
    var dbRefPres = firebase.database().ref().child(dbPathPres);
    var dbRefRain = firebase.database().ref().child(dbPathRain);
    var dbRefLight = firebase.database().ref().child(dbPathLight);
    var dbRefSoilHum = firebase.database().ref().child(dbPathSoilHum);
    var dbRefPump = firebase.database().ref().child(dbPathPump);
    var dbRefLedYellow = firebase.database().ref().child(dbPathLedYellow);
    var dbRefLedRed = firebase.database().ref().child(dbPathLedRed);
    var dbRefLedGreen = firebase.database().ref().child(dbPathLedGreen);

    // Update page with new readings
    dbRefTemp.on('value', snap => {

      tempElement.innerText = snap.val().toFixed(2);
      var x = (new Date()).getTime(),
      y= parseFloat(snap.val().toFixed(2));

         // y = parseFloat(this.responseText);
      //console.log(this.responseText);
      if(chartT.series[0].data.length > 40) {
        chartT.series[0].addPoint([x, y], true, true, true);
      } else {
        chartT.series[0].addPoint([x, y], true, false, true);
      }
    
    });

    dbRefHum.on('value', snap => {
      humElement.innerText = snap.val().toFixed(2);
      var x = (new Date()).getTime(),
      y= parseFloat(snap.val().toFixed(2));

         // y = parseFloat(this.responseText);
      //console.log(this.responseText);
      if(chartH.series[0].data.length > 40) {
        chartH.series[0].addPoint([x, y], true, true, true);
      } else {
        chartH.series[0].addPoint([x, y], true, false, true);
      }
    });

    dbRefPres.on('value', snap => {
      presElement.innerText = snap.val().toFixed(2);
    });

    dbRefRain.on('value', snap => {
      rainElement.innerText = snap.val().toFixed(2);
    });

    dbRefLight.on('value', snap => {
      lightElement.innerText = snap.val().toFixed(2);
    });

    dbRefSoilHum.on('value', snap => {
      soilHumElement.innerText = snap.val().toFixed(2);
    });

    /* Actualizar el estado inicial del slider según los datos de la base de datos
    dbRefPump.once('value', snap => {
      const pumpStateElement = document.getElementById('pump-state');
      pumpStateElement.innerText = snap.val() === 'ON' ? 'Encendido' : 'Apagado';
    });

    // Actualizar el estado del slider cuando cambie en la base de datos
    dbRefPump.on('value', snap => {
      const pumpStateElement = document.getElementById('pump-state');
      pumpStateElement.innerText = snap.val() === 'ON' ? 'Encendido' : 'Apagado';
    });*/

    // Actualizar el estado del slider cuando cambie en la base de datos
    dbRefPump.on('value', snap => {
      pumpElement.checked = snap.val() === 'ON';
    });

    dbRefLedYellow.on('value', snap => {
      ledYellow.style.backgroundColor = snap.val() === 'ON' ? 'yellow' : 'gray';
    });

    dbRefLedRed.on('value', snap => {
      ledRed.style.backgroundColor = snap.val() === 'ON' ? 'red' : 'gray';
    });

    dbRefLedGreen.on('value', snap => {
      ledGreen.style.backgroundColor = snap.val() === 'ON' ? 'green' : 'gray';
    });

  // if user is logged out
  } else{
    // toggle UI elements
    loginElement.style.display = 'block';
    authBarElement.style.display ='none';
    userDetailsElement.style.display ='none';
    contentElement.style.display = 'none';
  }
}
function toggleLed() {
  console.log("Toggle");
  if (pumpElement.checked) 
  {
    console.log("pump ON");
    firebase.database().ref(dbPathPump).set("ON");
  }
  else{
    console.log("pump OFF");
    firebase.database().ref(dbPathPump).set("OFF");
  }
}

function togglePump() {
  console.log("Toggle");
  if (firebase.database().ref(dbPathPump).val() == "ON") 
  {
    console.log("pump ON");
    pumpElement.checked = true;
  }
  else{
    console.log("pump OFF");
    pumpElement.checked = false;
  }
}

/*setInterval(function ( ) {
 
      var x = (new Date()).getTime(),
      y=5;
         // y = parseFloat(this.responseText);
      //console.log(this.responseText);
      if(chartT.series[0].data.length > 40) {
        chartT.series[0].addPoint([x, y], true, true, true);
      } else {
        chartT.series[0].addPoint([x, y], true, false, true);
      }
    
 
 
}, 1000 ) ;*/