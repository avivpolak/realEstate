const csvtojson = require("./converter");
const path = require("path");
const Broker = require("./models/database");

let convertedArray;
async function convert() {
    convertedArray = await csvtojson(
        path.join(__dirname, "./assets/realEstate.csv")
    );
    // convertedArray.filter((broker) => {
    //     return (
    //         broker["מס רשיון"] && broker["שם המתווך"] && broker["עיר מגורים"]
    //     );
    // });
    // console.log(convertedArray);
    // for (let item in convertedArray) {
    //     const broker = new Broker({
    //         name: item[""],
    //         number: number,
    //     });
    // }
}
convert();
