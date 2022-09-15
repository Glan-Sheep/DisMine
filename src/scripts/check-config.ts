import internal from "stream";

require("dotenv").config();

const { ownerList } = process.env;

export const run = async () => {

  if (+(process.version.slice(1).split('.')[0]) < 16) {
    console.log("Node 18 or higher is required to run Amane.");
    return true;
  }
};

function filterInt(value) {
  if (/^[-+]?(\d+|Infinity)$/.test(value)) {
    return Number(value)
  } else {
    return NaN
  }
};