const request = require('request')

const forecast = (latitude, longitude, callback)=>{
const url = 'https://api.darksky.net/forecast/6aa4f7a3c03a51122ad8c7a6b70d62a8/' + latitude+','+longitude
request({url: url, json: true}, function(error, response){
        if(error){
            callback("Unable to connect to Weather services!", undefined)
        }
        else if(response.body.error){
            callback("Unable to find location", undefined)
        } 
        else {
        callback(undefined, response.body.daily.data[0].summary + " It is currently "+ response.body.currently.temperature + " degrees out. There is a "+ response.body.currently.precipProbability + " % chance of rain.");

        }
})
}

module.exports = forecast