const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

console.log(__dirname)
console.log(__filename)
// console.log(path.join(__dirname, '../public/'))

const port = process.env.PORT || 3000

const route = path.join(__dirname, '../public/')
const viewsPath =  path.join(__dirname, '../src/templates/views')
const partialsPath = path.join(__dirname, '../src/templates/partials')

app.use(express.static(route))

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res)=>{    
    //we have put nothing inside quotes for the home page
    res.render('index', {
        title : 'Weather App',
        name : 'Shreya'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help Page',
        name: 'Shreya'
    })
})

app.get('/about', (req, res)=>{
    res.send('<h1>About page</h1>')
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res)=>{
    res.send("Help page not found")
})

app.get('*', (req, res)=>{
    res.send("Page not found")
})

app.listen(port, ()=>{       //3000 is the port number
    console.log("Server is running")
})