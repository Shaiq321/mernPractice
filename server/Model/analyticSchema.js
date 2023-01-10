const mongoose = require('mongoose')
const analyticSchema= mongoose.Schema({  
    keywords: [{
        type: String
    }]

})

const Analytics= mongoose.model('Analytics',analyticSchema);
module.exports = Analytics;
