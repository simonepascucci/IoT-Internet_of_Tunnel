const redRangeAir=2000;
const orangeRangeAir=1500;
const yellowRangeAir=1000;
const greenRangeAir=700;
const redRangeLux=30;
const greenRangeLux=1000;

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
  
  var date = "", time = "";
  
  for(var i = 0; i<10; i++)
  	date += data["timestamp"][i];
  
  for(i = 11; i < data["timestamp"].length; i++)
  	time += data["timestamp"][i];
  
  
  document.getElementById("AQ1").innerText = data["AQ1"];
  setColorAirQuality("square1", data["AQ1"]);
  document.getElementById("AQ2").innerText = data["AQ2"];
  setColorAirQuality("square2", data["AQ2"]);
  document.getElementById("Lux1").innerText = data["Lux1"];
  setColorLux("square3", data["Lux1"]);
  document.getElementById("Lux2").innerText = data["Lux2"];
  setColorLux("square4", data["Lux2"]);
  if(data["Status AQ1"] == "SAFE")
    document.getElementById("AQ1s").innerText =
        "Fan zone 1: Deactivated";
  if(data["Status AQ1"] == "MIN_RISK")
    document.getElementById("AQ1s").innerText =
        "Fan zone 1: Minimum speed";
  if(data["Status AQ1"] == "MID_RISK")
    document.getElementById("AQ1s").innerText =
        "Fan zone 1: Medium speed";
  if(data["Status AQ1"] == "MAX_RISK")
    document.getElementById("AQ1s").innerText =
        "Fan zone 1: Maximum speed";
  if(data["Status AQ2"] == "SAFE")
    document.getElementById("AQ2s").innerText =
        "Fan zone 2: Deactivated";
  if(data["Status AQ2"] == "MIN_RISK")
    document.getElementById("AQ2s").innerText =
        "Fan zone 2: Minimum speed";
  if(data["Status AQ2"] == "MID_RISK")
    document.getElementById("AQ2s").innerText =
        "Fan zone 2: Medium speed";
  if(data["Status AQ2"] == "MAX_RISK")
    document.getElementById("AQ2s").innerText =
        "Fan zone 2: Maximum speed";
  if(data["Status L1"] == 0) document.getElementById("L1s").innerText = "Light zone 1 Status: Not Working";
  else document.getElementById("L1s").innerText = "Light zone 1 Status: Working correctly";
  if(data["Status L2"] == 0) document.getElementById("L2s").innerText = "Light zone 2 Status: Not Working";
  else document.getElementById("L2s").innerText = "Light zone 2 Status: Working correctly";
  document.getElementById("ts").innerText="Measurement taken at: " + date + " " + time;}

function setColorAirQuality(squareId, value) {
  var square = document.getElementById(squareId);

  if (value < greenRangeAir) {
    square.className = 'square green';
  } else if (value < yellowRangeAir) {
    square.className = 'square yellow';}
  else if (value < orangeRangeAir) {
    square.className = 'square orange';
  } else {
    square.className = 'square red';
  }
}
function setColorLux(squareId, value) {
  var square = document.getElementById(squareId);

  if (value < redRangeLux) {
    square.className = 'square red';
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
  provaTabella(data);
  creaGrafico(data);
}


function provaTabella(data) {
  // Dati JSON di esempio
  var datiJSON = data;

  data.sort(function(a, b) {
    var nomeA = a["timestamp"];
    var nomeB = b["timestamp"];
    if (nomeA > nomeB) {
      return -1;
    }
    if (nomeA < nomeB) {
      return 1;
    }
    return 0;
  });

  
  var tableBody = document.querySelector("#myTable tbody");
  tableBody.innerHTML = "";

  for (var i = 0; i < 10; i++) {
    var row = document.createElement("tr");
    var cell1 = document.createElement("td");
    var cell2 = document.createElement("td");
    var cell3 = document.createElement("td");
    var cell4 = document.createElement("td");
    var cell5 = document.createElement("td");

    cell1.textContent = datiJSON[i]["timestamp"];
    cell2.textContent = datiJSON[i]["AQ1"];
    cell3.textContent = datiJSON[i]["AQ2"];
    cell4.textContent = datiJSON[i]["Lux1"];
    cell5.textContent = datiJSON[i]["Lux2"];
    
    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);
    row.appendChild(cell5);

    tableBody.appendChild(row);
  }
}
function creaGrafico(data) {
  // Dati JSON di esempio
  var datiJSON = data;

  data.sort(function(a, b) {
    var nomeA = a["timestamp"];
    var nomeB = b["timestamp"];
    if (nomeA < nomeB) {
      return -1;
    }
    if (nomeA > nomeB) {
      return 1;
    }
    return 0;
  });

  var labels = [];
  var data1 = [];
  var data2 = [];

  // Estrai le etichette e i dati dal JSON
  for (var i = 0; i < datiJSON.length; i++) {
    labels.push(datiJSON[i]["timestamp"]);
    data1.push(datiJSON[i]["AQ1"]);
    data2.push(datiJSON[i]["AQ2"]);
  }

  document.getElementById("grafici").innerHTML = "<l> Air Quality Graph </l> <canvas id='AirQualityGraph' height='500px' width='500px'></canvas>"
  var ctx = document.getElementById("AirQualityGraph").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Air Quality Sensor 1",
          data: data1,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1
        },
        {
          label: "Air Quality Sensor 2",
          data: data2,
          backgroundColor: "rgba(192, 75, 192, 0.2)",
          borderColor: "rgba(192, 75, 192, 1)",
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        annotation: {
          annotations: [{
            type: "box",
            drawTime: "beforeDatasetsDraw",
            yScaleID: "y",
            yMin: 0,
            yMax: greenRangeAir,
            backgroundColor: "rgba(0, 128, 0, 0.2)" // Verde
            
          }, {
            type: "box",
            drawTime: "beforeDatasetsDraw",
            yScaleID: "y",
            yMin: greenRangeAir,
            yMax: yellowRangeAir,
            backgroundColor: "rgba(253, 233, 16, 0.2)" // Giallo
          }, {
            type: "box",
            drawTime: "beforeDatasetsDraw",
            yScaleID: "y",
            yMin: yellowRangeAir,
            yMax: orangeRangeAir,
            backgroundColor: "rgba(255, 165, 0, 0.2)" // Arancione
          },{
            type: "box",
            drawTime: "beforeDatasetsDraw",
            yScaleID: "y",
            yMin: orangeRangeAir,
            yMax: redRangeAir,
            backgroundColor: "rgba(255, 0, 0, 0.2)" // Rosso
          }]
        }
      }
    }
  });
}

function init() {
    setInterval(callAPI1, 2000);
    setInterval(callAPI2, 10000);
}

