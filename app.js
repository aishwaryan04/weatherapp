/*const express=require("express");
const https=require("https");
const bodyparser=require("body-parser");

const app=express();

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    const city=req.body.cityname;
    const unit="metric";
    const appkey="eb2ff0ae5096af82542df01ec7e3077d";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&units="+unit+"&appid="+appkey;
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherdata=JSON.parse(data);
            const temp=weatherdata.main.temp;
            const weatherdescription=weatherdata.weather[0].description;
            console.log(temp);
            console.log(weatherdescription);
            const icon=weatherdata.weather[0].icon;
            console.log(icon);
            const url="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            
        res.write("<p>The weather is currently "+weatherdescription+"<p>");
        res.write("<h1>The temperature in "+city+" "+temp+" degrees celsius.</h1>");
        res.write("<img src="+ url +">");
        res.send()
        })
    })
})



app.listen(3000,function(){
    console.log("server is running on port 3000");
});*/
/*
const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");


const app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

if (weatherdata.cod !== 200) {  // Check if API returned a valid response
    console.error("Error:", weatherdata.message); // Log the error message
    res.send("Error: " + weatherdata.message);  // Send an error message to frontend
    return;
}

const temp = weatherdata.main.temp;

app.post("/", function (req, res) {
    const city = req.body.cityname;
    const unit = "metric";
    const appkey = "eb2ff0ae5096af82542df01ec7e3077d";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + unit + "&appid=" + appkey;

    https.get(url, function (response) {
        let data = "";
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherdata = JSON.parse(data);
            const temp = weatherdata.main.temp;
            const weatherdescription = weatherdata.weather[0].description;
            console.log(temp);
            console.log(weatherdescription);
            const icon = weatherdata.weather[0].icon;
            console.log(icon);
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<p>The weather is currently " + weatherdescription + "<p>");
            res.write("<h1>The temperature in " + city + " is " + temp + " degrees Celsius.</h1>");
            res.write("<img src=" + imageUrl + ">");
            res.send();
        });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
*/

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    const city = req.body.cityname;
    const unit = "metric";
    const appKey = "eb2ff0ae5096af82542df01ec7e3077d";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${appKey}`;

    https.get(url, function (response) {
        let data = ""; // Initialize data variable

        response.on("data", function (chunk) {
            data += chunk; // Append received data
        });

        response.on("end", function () {
            try {
                const weatherData = JSON.parse(data);

                if (weatherData.cod !== 200) {
                    console.error("Error:", weatherData.message);
                    res.send("Error: " + weatherData.message);
                    return;
                }

                const temp = weatherData.main.temp;
                const weatherDescription = weatherData.weather[0].description;
                const icon = weatherData.weather[0].icon;
                const imageUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

                res.write(`<p>The weather is currently ${weatherDescription}.</p>`);
                res.write(`<h1>The temperature in ${city} is ${temp}°C.</h1>`);
                res.write(`<img src="${imageUrl}">`);
                res.send();
            } catch (error) {
                console.error("Error parsing JSON:", error);
                res.send("Error processing weather data.");
            }
        });
    }).on("error", function (err) {
        console.error("Request failed:", err);
        res.send("Error fetching weather data.");
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


