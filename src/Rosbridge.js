/*!
 * @file getServicesTest.js
 */

/**
 *  MIT License (MIT)
 *
 *  Copyright (c) <2014> <Rapp Project EU>
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 *
 *
 *  Authors: Konstantinos Panayiotou
 *  Contact: klpanagi@gmail.com
 *
 */

function Rosbridge(hostName, port)
{
  this.hostName_ = hostName;
  this.port_ = port
  var bridge_ = require( __dirname + '/core/bridge.js' );
  this.rosbridge_ = undefined;
  var reconnect__ = true;

  this.connect__ = function( hostName, port ){
    this.rosbridge_ = undefined;
    this.rosbridge_ = new bridge_(hostName, port, reconnect__ );
  }

  this.connect__(hostName, port);
}

Rosbridge.prototype.getParam = function( paramName, callback )
  {this.rosbridge_.getParam(paramName, callback)}

Rosbridge.prototype.getServices = function( callback )
  {this.rosbridge_.getServices(callback)}

Rosbridge.prototype.getNodes = function( callback )
  {this.rosbridge_.getNodes(callback)}

Rosbridge.prototype.getTopics = function( callback )
  {this.rosbridge_.getTopics(callback)}

Rosbridge.prototype.connect = function( hostName, port )
  {this.connect__(hostName, port)}

Rosbridge.prototype.connected = function()
  {return this.rosbridge_.isActive()}

Rosbridge.prototype.callService = function( srvName, args, callback )
  {this.rosbridge_.callSrv(srvName, args, callback)}

Rosbridge.prototype.closeConnection = function()
  {this.rosbridge_.disconnect()}


module.exports = Rosbridge;
