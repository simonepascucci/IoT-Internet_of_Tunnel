function callAPI1() {
  var myHeaders = new Headers();
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  var latestData;

  fetch(
    "https://vbq5fe4nj1.execute-api.eu-west-3.amazonaws.com/dev/",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => storeData1(JSON.parse(result)));

  console.log("call Api called.");
}

function storeData1(data) {
  console.log(data);
  document.getElementById("AQ1").innerText = data["AQ1"];
  setColorAirQuality("square1", data["AQ1"]);
  document.getElementById("AQ2").innerText = data["AQ2"];
  setColorAirQuality("square2", data["AQ2"]);
  document.getElementById("Lux1").innerText = data["Lux1"];
  setColorLux("square3", data["Lux1"]);
  document.getElementById("Lux2").innerText = data["Lux2"];
  setColorLux("square4", data["Lux1"]);
  document.getElementById("AQ1s").innerText =
    "Air Quality 1 Status: " + data["Status AQ1"];
  document.getElementById("AQ2s").innerText =
    "Air Quality 2 Status: " + data["Status AQ2"];
  document.getElementById("L1s").innerText =
    "Light zone 1 Status: " + data["Status L1"];
  document.getElementById("L2s").innerText =
    "Light zone 2 Status: " + data["Status L2"];
  document.getElementById("ts").innerText =
    "Measurement taken at: " + data["timestamp"];
}

function setColorAirQuality(squareId, value) {
  var square = document.getElementById(squareId);

  if (value < 1100) {
    square.className = 'square green';
  } else if (value < 1300) {
    square.className = 'square orange';
  } else {
    square.className = 'square red';
  }
}
function setColorLux(squareId, value) {
  var square = document.getElementById(squareId);

  if (value < 30) {
    square.className = 'square red';
  } else if (value < 70) {
    square.className = 'square orange';
  } else {
    square.className = 'square green';
  }
}
function callAPI2() {
  var myHeaders = new Headers();
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  var latestData;

  fetch(
    "https://bg4x9od6n5.execute-api.eu-west-3.amazonaws.com/dev",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => storeData2(JSON.parse(result)));

  console.log("call Api 2 called.");
}

function storeData2(data){
  console.log(data);
  console.log(data);
}

function init() {
  callAPI1();
  callAPI2();
}


//"https://bg4x9od6n5.execute-api.eu-west-3.amazonaws.com/dev/"