
function callAPI(){
    var myHeaders = new Headers();
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };
    
    var latestData;

    fetch("https://vbq5fe4nj1.execute-api.eu-west-3.amazonaws.com/dev/", requestOptions)
    .then(response => response.text())
    .then(result => storeData(JSON.parse(result)))
}

function storeData(data){
    console.log(data)
    document.getElementById("AQ1").innerText = "Air Quality sensor 1: " + data['AQ1']
    document.getElementById("AQ2").innerText = "Air Quality sensor 2: " + data['AQ2']
    document.getElementById("Lux1").innerText = "Light level 1: " + data['Lux1']
    document.getElementById("Lux2").innerText = "Light level 2: " + data['Lux2']
    document.getElementById("ts").innerText = "Measurement taken at: " + data['timestamp']
}

function init(){
    callAPI();
}