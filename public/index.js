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

var abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "fileId",
				"type": "uint256"
			}
		],
		"name": "burnMyToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "fileId",
				"type": "uint256"
			}
		],
		"name": "mintMyToken",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "_data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "file1",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "file2",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "file3",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "file4",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "file5",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "file6",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "file7",
				"type": "string"
			}
		],
		"name": "sendStudentDetails",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "baseURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getfileId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "fileId",
				"type": "uint256"
			}
		],
		"name": "getStudentDetails",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "namedecl",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symboldecl",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenOfOwnerByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupplycount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
var contractaddress = '0x266f584DCD4e239620d7C43E1d2B0054458c0851';

function set_details() {
  var myContract = new web3.eth.Contract(abi, contractaddress, { from: account, gasPrice: '5000000', gas: '5000000' });

  var file1 = fileMatrix['image'] ? fileMatrix['image'] : ""; 
  var file2 = fileMatrix['image1'] ? fileMatrix['image1'] : "";
  var file3 = fileMatrix['image2'] ? fileMatrix['image2'] : "";
  var file4 = fileMatrix['image3'] ? fileMatrix['image3'] : "";
  var file5 = fileMatrix['image4'] ? fileMatrix['image4'] : "";
  var file6 = fileMatrix['image5'] ? fileMatrix['image5'] : "";
  var file7 = fileMatrix['image6'] ? fileMatrix['image6'] : "";
  var ssnid =  document.getElementById("id1").value;

  var result = myContract.methods.sendStudentDetails(ssnid,file,file1,file2,file3,file4,file5,file5,file6,file7).send(function (err, result) {

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
  if (document.getElementById('image')) {
    document.getElementById("image").onchange("change", (e) => catchFile(e, 'image'));
    document.getElementById("image1").addEventListener("change", (e) => catchFile(e, 'image1'));
    document.getElementById("image2").addEventListener("change", (e) => catchFile(e, 'image2'));
    document.getElementById("image3").addEventListener("change", (e) => catchFile(e, 'image3'));
    document.getElementById("image4").addEventListener("change", (e) => catchFile(e, 'image4'));
    document.getElementById('submitBtnIndex').addEventListener("click", (e) => set_details());
  } 
  else {
    document.getElementById('getDetailsBtn').addEventListener("click", (e) => show_details());
  }
}
start();
