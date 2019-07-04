const request = require('request')

const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic2hyZXlha2F1c2hpazExIiwiYSI6ImNqeGxqeTRzZjA2eGozb21mZnVvbDRpdzQifQ.9d-3mogDyfh-wYg9fDay1A&limit=1'
    request({url: url, json: true}, function(error, response){
        if(error){
            callback("Unable to connect to location services!", undefined)
        }
        else if(response.body.features.length===0){
            callback("Unable to find location, try another search", undefined)
        } 
        else {
        callback(undefined, {latitude: + response.body.features[0].center[1],
              longitude: response.body.features[0].center[0],
               location: response.body.features[0].place_name}
        )
        }
    })
}

module.exports = geocode