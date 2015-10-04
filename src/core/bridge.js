/*!
 * @file bridge.js
 *
 *
 *  Authors: Konstantinos Panayiotou
 *  Contact: klpanagi@gmail.com
 *
 */

function bridge(hostName, port, reconnect)
{
  var __ServiceController = require( __dirname + '/ServiceController.js' );
  var __SrvMsg = require( __dirname + '/SrvMsg.js' );
  var active__ = false;

  /* Add to configuration file */
  var reconnect__ = reconnect || false;
  var pollTimeout__ = 1000;
  /* ------------------------- */

  var hostname__ = hostName || 'localhost';
  var port__ = port || '9090';

  // Init service controller
  var controller__ = new __ServiceController({
    hostName: hostname__,
    port: port__,
    onopen: function(){active__ = true;},
    onclose: function(){active_ = false;},
    onerror: function(){active__ = false;}
  });

  this.getParam = function( paramName, callback ){
    var srvMsg = __SrvMsg.GetParam(paramName);
    controller__.registerService(srvMsg, function(data){
      if( ! data ) { return }
      if( data.result ) { callback(data.values.value) }
      else{ console.log('\033[1;31mERROR: [%s]\033[0m',
        data.values) }
    });
  };

  this.getServices = function( callback ){
    var srvMsg = __SrvMsg.GetServices();
    controller__.registerService(srvMsg, function(data){
      if( ! data ) { return }
      if( data.result ) { callback(data.values.services) }
      // Catch rosbridge_websocket_server error messages
      else{ console.log('\033[1;31mERROR: [%s]\033[0m',
        data.values) }
    });
  };

  this.getNodes = function( callback ){
    var srvMsg = __SrvMsg.GetNodes();
    controller__.registerService(srvMsg, function(data){
      if( ! data ) { return }
      if( data.result ) { callback(data.values.nodes) }
      // Catch rosbridge_websocket_server error messages
      else{ console.log('\033[1;31mERROR: [%s]\033[0m',
        data.values) }
    });
  };

  this.getTopics = function( callback ){
    var srvMsg = __SrvMsg.GetTopics();
    controller__.registerService(srvMsg, function(data){
      if( ! data ) { return }
      if( data.result ) { callback(data.values.names) }
      // Catch rosbridge_websocket_server error messages
      else{ console.log('\033[1;31mERROR: [%s]\033[0m',
        data.values) }
    });
  };

  this.callSrv = function( srvName, args, callback ){
    var srvMsg = __SrvMsg.CallSrv(srvName, args);
    controller__.registerService(srvMsg, function(data){
      if( ! data ) { return }
      if( data.result ) { callback(data.values) }
      // Catch rosbridge_websocket_server error messages
      else{ console.log('\033[1;31mERROR: [%s]\033[0m',
        data.values) }
    });
  }

  var __reconnectController = function(hostName, port){
    console.log('Connecting bridge, {host: %s, port: %s}', hostname__,
      port__);
    controller__.connect(hostName, port);
  }

  this.isActive = function()
    {return active__;}

  var __loop = function(){
    setTimeout( function(){
      if( ! active__ )
      {
        __reconnectController(hostname__, port__);
      }
      __loop();
    }, pollTimeout__)
  }

  if( reconnect__ ) {__loop()}
}

module.exports = bridge;
