  $(()=>{
  	$('#ConnectMqtt').html("Loading..")
    $('#status').html("Loading..")
  })
  
  $(document).ready(function(e) {
  // Create a client 
  client = new Paho.MQTT.Client("m14.cloudmqtt.com", 30695,"myweb");
  //Example client = new Paho.MQTT.Client("m11.cloudmqtt.com", 32903, "web_" + parseInt(Math.random() * 100, 10));
  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  var options = {
    useSSL: true,
    userName: "audlhitk",
    password: "yaxEMOien5EU",
    onSuccess:onConnect,
    onFailure:doFail
  }

  // connect the client
  client.connect(options);
  // called when the client connects
  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect");
    client.subscribe("/server");
    message = new Paho.MQTT.Message("off");
    message.destinationName = "/server";
    client.send(message);
    var element = document.getElementById("ConnectMqtt");
      		element.innerHTML = 'Connected !';
      		element.style.color = '#3CC92E';
  }

  function doFail(e){
    console.log(e);
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }

  // called when a message arrives
  function onMessageArrived(message) {
    console.log("onMessageArrived:"+message.payloadString);
    if(message.payloadString == 'off'){
    	var element = document.getElementById("status");
      		element.innerHTML = 'OFF';
      		element.style.color = 'red';
    }else{
    	var element = document.getElementById("status");
      		element.innerHTML = 'ON';
      		element.style.color = '#00ff00';
    }
  }
      $('#btn-on').click(()=>{
        mqttSend("/server", "on");
      })
      $('#btn-off').click(()=>{
        mqttSend("/server", "off");
      })
})

var mqttSend = function(topic, msg) {
  var message = new Paho.MQTT.Message(msg);
  message.destinationName = topic;
  client.send(message); 
}
