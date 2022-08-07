const dgram = require("dgram");
const Buffer = require("buffer").Buffer;
const urlParse = require("url").parse;
const crypto = require("crypto");

module.exports.peersList = (torrent, callback) => {
  const url = torrent.announce.toString("utf-8");
  const socket = dgram.createSocket("udp4");

  // Sending connection request
  udpSend(socket, buildConnectionRequest(), url);

  socket.on("message", (response) => {
    if (responseType(response) === "connect") {
      // Get the connect response and extract the connection id
      const connectionResponse = parseConnectionResponse(response);
      const connectionID = connectionResponse.connectionID;
      // Use the connection id to send an announce request
      const announceRequest = buildAnnounceRequest(connectionID);
      udpSend(socket, announceRequest, url);
    } else if (responseType(response) === "announce") {
      // Get the announce response and extract the peers list
      const announceResponse = parseAnnounceResponse(response);
      callback(announceResponse.peers);
    }
  });
};

/**
 * Sends udp request to tracker
 * @param {object} socket - socket for udp communication
 * @param {buffer} message - message to tracker
 * @param {sting} url - url object corresponding to the torrent file
 * @param {*} callback - do nothing after sending the message
 */
function udpSend(socket, message, url, callback = () => {}) {
  const parsedUrl = url.urlParse;
  socket.send(
    message,
    0,
    message.length,
    parsedUrl.port,
    parsedUrl.host,
    callback
  );
}
/**
 * Builds connection request.
 * Connection requests are buffers of the form -
 * Offset  Size            Name            Value
 * 0       64-bit integer  connection_id   0x41727101980
 * 8       32-bit integer  action          0 // connect
 * 12      32-bit integer  transaction_id  ? // random
 * 16
 * For more details https://www.bittorrent.org/beps/bep_0015.html
 * @return {Buffer} connection request
 */
function buildConnectionRequest() {
  const buffer = Buffer.alloc(16);
  buffer.fill(0);

  // connection id
  buffer.writeUInt32BE(0x417, 0);
  buffer.writeUInt32BE(0x27101980, 4);

  // action
  buffer.writeUInt32BE(0, 8);

  // transaction_id
  crypto.randomBytes(4).copy(buffer, 12);

  return buffer;
}
/**
 * Parses connection response from tracker
 * Responses are formatted in - 
 * Offset  Size            Name            Value
 * 0       32-bit integer  action          0 // connect
 * 4       32-bit integer  transaction_id
 * 8       64-bit integer  connection_id
 * 16
 * @param {Buffer} response
 * @return {Object}
 */
function parseConnectionResponse(response) {
  return {
    action: response.readUInt32BE(0),
    transactionId: response.readUInt32BE(4);
    connectionID: response.slice(8);
  };
}
