const express=require("express");
const https=require('https');
const bodyParser=require("body-parser");

const app= express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res){
    // const url="https://api.openweathermap.org/data/2.5/weather?q=kottayam&units=metric&appid=c3ff4da464631d9628192e38ef5e3827#";
    // https.get(url, function(response){
    //     response.on("data", function(data){
    //         const weatherData=JSON.parse(data); //converts the Json to string(hexadecimal or binary or dsimply text) and then to Javascript Object.
    //         console.log(weatherData);
    //         const city=weatherData.name;
    //         const temp=weatherData.main.temp;
    //         const desc=weatherData.weather[0].description;
    //         const icon=weatherData.weather[0].icon;
    //         const imgurl="https://openweathermap.org/img/wn/"+icon+"@2x.png";
    //         res.write("<h1>The temperature of the city: "+city+" is "+temp+" Degrees celsius.</h1>");
    //         res.write("<p>The weather conditions are <b>"+ desc+"</b></p>");
    //         res.write("<img src="+ imgurl +">");
    //         res.send();
    //     })
        
        
    // })
    res.sendFile(__dirname+"/weather.html");
    
})

app.post("/", function(req, res){
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ req.body.city +"&units=metric&appid=c3ff4da464631d9628192e38ef5e3827#";
    https.get(url, function(response){
        response.on("data", function(data){
            const weatherData=JSON.parse(data); //converts the Json to string(hexadecimal or binary or dsimply text) and then to Javascript Object.
            // console.log(weatherData);
            const city=weatherData.name;
            const temp=weatherData.main.temp;
            const desc=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            const imgurl="https://openweathermap.org/img/wn/"+icon+"@2x.png";
            
            res.write('<head><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin> <link href="https://fonts.googleapis.com/css2?family=Alegreya+Sans:ital,wght@1,700&family=Leckerli+One&family=Lilita+One&family=Montserrat:wght@400;500;700&family=Nanum+Pen+Script&family=Neucha&family=Oleo+Script&family=Pacifico&family=Poppins:wght@200;400&family=Righteous&family=Russo+One&family=Sigmar&family=Signika+Negative:wght@600&family=Ubuntu:wght@700&family=Wix+Madefor+Display&display=swap" rel="stylesheet"><link rel="stylesheet" type="text/css" href="./styles.css" /></head>');
            res.write("<div class='Full'><h1 class='weatherDesc'>The temperature of the city: <b>"+city+"</b> is <b>"+temp+"</b> Degrees celsius.</h1>");
            res.write("<p class='weatherCond'>The weather conditions are <b>"+ desc+"</b>.</p>");
            res.write("<img class='weatherImg' src="+ imgurl +"></div>");
            res.end();
        })
        
        
    })
    
    
})
app.listen(3000, function(){
    console.log("Server started on port 3000.");
})
