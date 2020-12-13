pragma solidity >=0.4.22 <0.7.0;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";

contract Patient is ERC721 {
    address owner; // varaible declaration for storing address of the owner
    uint256 PatientId; // varaible declaration for storing  file id

    struct patient_details {
        //structure declaration for patieent
        string ECG; // varaible declaration for reports in structure
        string MRI; // varaible declaration for reports
        string XRAY; // varaible declaration for reports
        string CARDIO; // varaible declaration for reports
        string BLOOD; // varaible declaration for reports
        string COVID; // varaible declaration for reports
        string ENDOSCOPE; // varaible declaration for reports
    }
    patient_details sm;
    mapping(uint256 => patient_details) reports; //mapping patient_details

    // constructor for the contract with token name and symbol
    constructor() public ERC721("PATIENT-REPORT-MANAGMENT", "PRM") {
        owner = msg.sender;
    }

    //modifier declaration
    modifier isOwner() {
        require(msg.sender == owner, "Access is not allowed");
        _;
    }

    //function Calling for namedecl
    function namedecl() public view returns (string memory) {
        return name();
    }

    //function Calling for symboldecl
    function symboldecl() public view returns (string memory) {
        return symbol();
    }

    //function Calling for totalSupplycount
    function totalSupplycount() public view returns (uint256) {
        return totalSupply();
    }

    //function Calling for minting
    function mintMyToken(uint256 fileId) public returns (uint256) {
        //Fl.fileowner=msg.sender;
        //Calling the Built-in function in ERC721
        _mint(msg.sender, fileId);
        return (fileId);
    }

    //function Calling for burning
    function burnMyToken(uint256 fileId) public {
        if ((ownerOf(fileId) == msg.sender || msg.sender == owner)) {
            //Calling the Built-in function in ERC721
            _burn(fileId);
        }
    }

    //function Calling for getting fileid
    function getfileId() public view returns (uint256) {
        return PatientId;
    }

    //function Calling for sending student details
    function sendStudentDetails(
        uint256 id,
        string memory file1,
        string memory file2,
        string memory file3,
        string memory file4,
        string memory file5,
        string memory file6,
        string memory file7
    ) public {
        sm.ECG = file1; // varaible declaration for reports in structure
        sm.MRI = file2; // varaible declaration for reports
        sm.XRAY = file3; // varaible declaration for reports
        sm.CARDIO = file4; // varaible declaration for reports
        sm.BLOOD = file5; // varaible declaration for reports
        sm.COVID = file6; // varaible declaration for reports
        sm.ENDOSCOPE = file7;
        PatientId = mintMyToken(id);
        reports[PatientId] = sm;
    }

    //function Calling for geting patient details
    function getStudentDetails(uint256 fileId)
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        if (
            _exists(fileId) &&
            (ownerOf(fileId) == msg.sender || msg.sender == owner)
        ) {
            patient_details storage sm = reports[PatientId];
            return (
                sm.ECG,
                sm.MRI,
                sm.XRAY,
                sm.CARDIO,
                sm.BLOOD,
                sm.COVID,
                sm.ENDOSCOPE
            );
        } else {
            string memory ECG = "No-Data";
            string memory MRI = "No-Data";
            string memory XRAY = "No-Data";
            string memory CARDIO = "No-Data";
            string memory BLOOD = "No-Data";
            string memory COVID = "No-Data";
            string memory ENDOSCOPE = "No-Data";
            return (ECG, MRI, XRAY, CARDIO, BLOOD, COVID, ENDOSCOPE);
        }
    }
}
