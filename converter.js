const csv = require("csvtojson");
const Broker = require("./models/database");

function csvToJsonConverter(absPath) {
    csv()
        .fromFile(absPath)
        .then((jsonObj) => {
            const collection = jsonObj
                .map((broker) => {
                    const licenseId = Object.values(broker)[0].trim();
                    const name = Object.values(broker)[1].trim();
                    const city = Object.values(broker)[2].trim();
                    return {
                        licenseId: licenseId,
                        name: name,
                        city: city,
                    };
                })
                .filter((broker) => {
                    return broker.city && broker.name && broker.licenseId;
                });
            Broker.insertMany(collection)
                .then(function () {
                    console.log("Data inserted"); // Success
                })
                .catch(function (error) {
                    console.log(error); // Failure
                });
        });
}

module.exports = csvToJsonConverter;
