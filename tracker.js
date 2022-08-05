const dgram = require('dgram');
const Buffer = require('buffer').Buffer;
const urlParse = require('url').parse;

module.exports.peersList = (torrent, callback) => {
  const url = torrent.announce.toString('utf-8');
  const socket = dgram.createSocket('udp4');

  udpSend(socket, 'Hey there!', url);
};

/**
 * Sends udp request to tracker
 * @param {object} socket - socket for udp communication
 * @param {string} message - message to tracker
 * @param {*} url - url object corresponding to the torrent file
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
      callback,
  );
}
