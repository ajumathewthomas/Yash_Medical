const Libp2p = require('libp2p')
const IPFS = require('ipfs')
const WS = require('libp2p-websockets')
const MPLEX = require('libp2p-mplex')
const { NOISE } = require('libp2p-noise')
const Protector = require('libp2p/src/pnet')
const { generate } = require('libp2p/src/pnet')


const swarmKey = new Uint8Array(95)
generate(swarmKey)

const libp2pBundle = (opts) => {
  const peerId = opts.peerId

  const libp2p = new Libp2p({
    peerId,
    addresses: {
      listen: []
    },
    modules: {
      transport: [WS], // We're only using the TCP transport for this example
      streamMuxer: [MPLEX], // We're only using mplex muxing
      connEncryption: [NOISE],
      peerDiscovery: [],
      connProtector: new Protector(swarmKey)
    }
  })

  return libp2p
}

async function main () {
  // Now that we have our custom libp2p bundle, let's start up the ipfs node!
  const ipfs = await IPFS.create({
    libp2p: libp2pBundle
  });
  return ipfs;
}

module.exports = {
  main
}