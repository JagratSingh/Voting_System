import web3 from "./web3";
import Voting from "./Build/Voting.json";

const instance = new web3.eth.Contract(
    JSON.parse(Voting.interface),
    "0x562956d78F8757f715F91b2E07b6f541F5E6a05E"
);

export default instance;