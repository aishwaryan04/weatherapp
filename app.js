
const express=require("express");
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
})