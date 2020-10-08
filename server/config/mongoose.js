const mongoose = require("mongoose");

module.exports = db_name => {
    mongoose.connect(`mongodb://localhost/${db_name}`, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
        .then (() => console.log(`Successfully connected to ${db_name}`))
        .catch(errors => console.log("Something went wrong", errors));
}