const fs = require('fs');
const bencode = require('bencode');
const tracker = require('./tracker');

const torrent = bencode.decode(fs.readFileSync('puppy.torrent'));

tracker.peersList(torrent, (peers) => {
  console.log('list of peers: ', peers);
});
