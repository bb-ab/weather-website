const express=require('express')
const hbs=require('hbs')
const path=require('path')      //core module
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()

//setup the express view engine
app.set('view engine','hbs')

//DEFINE PATHS FOR EXPRESS CONFIG
//generating path to public folder
const publicDirectoryPath=path.join(__dirname,'../public')
//generating path to views folder
const viewsPath=path.join(__dirname,'../templates/views')
//generating path to partials folder
const partialsPath=path.join(__dirname,'../templates/partials')

//SETUP THE LOCATION
//writing the path to static which in turn configures the app and home page is obtained in response
app.use(express.static(publicDirectoryPath))
//setup views path
app.set('views',viewsPath)
//registering path to partials folder
hbs.registerPartials(partialsPath)


//SETUP ROUTE HANDLERS FOR HANDLEBARS
//sending back response to particular path, here, rendering a dynamic page (index.hbs)
app.get('',(req,res)=>{
    res.render('index',{
    title:'Weather app',
    name:'ABC'
})
})

app.get('/about',(req,res)=>{
    res.render('about',{
    title:'About page',
    about_msg:'Welcome to the about page!',
    name:'ABC'
})
 })

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        msg:'You can get help here!',
        name:'ABC'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
       return res.send({
            error:'you must provide an address'
        })
    }
    
        geocode(req.query.address, (error,{latitude,longitude,location}={}) => {
            if(error){
              //stop the geocoding if error occurs
              return res.send({ error})
            }
            
            forecast(latitude, longitude, (error,forecastData) => {
              if(error){
                return res.send({ error })
              }
              res.send({
                  forecast:forecastData,
                  location,
                  address: req.query.address

            })
          })
        
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
         return res.send({
             error:'You must provide a search term'
         })   
    }
    res.send({
        
        products:[]
    })
})

//setup route handler for help/*
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404 Help',
        msg:'Help article not found',
        name:'ABC'
    })
})
//setup route handler for unknown handlebars
app.get('*',(req,res)=>{
    res.render('404',{
        title:404,
        msg:'My 404 page',
        name:'ABC'
    })
})
//starting up the server
app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})