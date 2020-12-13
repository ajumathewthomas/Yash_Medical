const IPFS = require('ipfs');
const uint8ArrayConcat = require('uint8arrays/concat')
const all = require('it-all')



var node;
var fileMatrix = {};
var account;
const token = require('./abis/file.json');

window.addEventListener('load', async () => {


  if (typeof window.ethereum !== 'undefined') {
    console.log("MetaMask is Available :) !");
  }

  // Modern DApp browsers
  if (window.ethereum) {
    window.web3 = new Web3(ethereum);

    // To prevent the page reloading when the MetaMask network changes
    ethereum.autoRefreshOnNetworkChange = false;

    // To Capture the account details from MetaMask
    const accounts = await ethereum.enable();
    account = accounts[0];

  }
  // Legacy DApp browsers
  else if (window.web3) {
    //window.web3 = new Web3(web3.currentProvider);
    window.web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/cbd9dc11b30147e9a2cc974be655ef7c"));
  }
  // Non-DApp browsers
  else {
    console.log('Non-Ethereum browser detected. Please install MetaMask');
  }

});


var contractaddress = '0x266f584DCD4e239620d7C43E1d2B0054458c0851';

function set_details() {
  var myContract = new web3.eth.Contract(token, contractaddress, { from: account, gasPrice: '5000000', gas: '5000000' });

  var file1 = fileMatrix['file1'] ? fileMatrix['file1'] : "";
  var file2 = fileMatrix['file2'] ? fileMatrix['file2'] : "";
  var file3 = fileMatrix['file3'] ? fileMatrix['file3'] : "";
  var file4 = fileMatrix['file4'] ? fileMatrix['file4'] : "";
  var file5 = fileMatrix['file5'] ? fileMatrix['file5'] : "";
  var file6 = fileMatrix['file6'] ? fileMatrix['file6'] : "";
  var file7 = fileMatrix['file7'] ? fileMatrix['file7'] : "";
  var ssnid = document.getElementById("id1").value;

  var result = myContract.methods.sendStudentDetails(ssnid, file1, file2, file3, file4, file5, file6, file7).send(function (err, result) {

    if (err) { console.log(err); }
    if (result) {
      document.getElementById("result").innerHTML = result;
      document.getElementById("result4").innerHTML = ssnid;
    }
  });
}
function show_details() {
  var myContract = new web3.eth.Contract(abi, contractaddress, { from: account, gasPrice: '5000000', gas: '500000' });
  var s_id = document.getElementById("ssn_id").value;
  var fileDetails = myContract.methods.getStudentDetails(s_id).call(function (err, fileDetails) {

    if (err) { console.log(err); }
    if (fileDetails) {
      document.getElementById("get_ECG").innerHTML = fileDetails[0];
      document.getElementById("get_MRI").innerHTML = fileDetails[1];
      document.getElementById("get_XRAY").innerHTML = fileDetails[2];
      document.getElementById("get_CARDIO").innerHTML = fileDetails[3];
      document.getElementById("get_BLOOD").innerHTML = fileDetails[4];
      document.getElementById("get_COVID").innerHTML = fileDetails[5];
      document.getElementById("get_ENDOSCOPE").innerHTML = fileDetails[6];
    }
  });


}




async function uploadFile(file) {

  const fileAdded = await node.add({
    path: file.name,
    content: file
  }, {
    wrapWithDirectory: true
  })

  // As we are wrapping the content we use that hash to keep
  // the original file name when adding it to the table
  return (fileAdded.cid.toString());
}

async function getFile(cid, id) {

  for await (const file of node.get(cid)) {
    if (file.content) {
      const content = uint8ArrayConcat(await all(file.content))

      await appendFile(content, id)
    }
  }
}

function appendFile(data, id) {
  const file = new window.Blob([data], { type: 'application/octet-binary' })
  const url = window.URL.createObjectURL(file)
  document.getElementById(id).setAttribute('src', url);
}

async function catchFile(e, id) {
  fileMatrix[id] = await uploadFile(e.target.files[0]);
  console.log(fileMatrix);
}


async function start() {
  node = await IPFS.create();
  if (document.getElementById('image1')) {
    document.getElementById("image1").addEventListener("change", (e) => catchFile(e, 'file1'));
    document.getElementById("image2").addEventListener("change", (e) => catchFile(e, 'file2'));
    document.getElementById("image3").addEventListener("change", (e) => catchFile(e, 'file3'));
    document.getElementById("image4").addEventListener("change", (e) => catchFile(e, 'file4'));
    document.getElementById("image5").addEventListener("change", (e) => catchFile(e, 'file5'));
    document.getElementById("image6").addEventListener("change", (e) => catchFile(e, 'file6'));
    document.getElementById("image7").addEventListener("change", (e) => catchFile(e, 'file7'));

    document.getElementById('submitBtnIndex').addEventListener("click", (e) => set_details());
  }
  else {
    document.getElementById('getDetailsBtn').addEventListener("click", (e) => show_details());
  }
}
start();
