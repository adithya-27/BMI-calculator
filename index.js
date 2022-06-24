//Importing Required modules
const express = require('express')
const bodyParser = require('body-parser');
const ejs = require('ejs');

//Port that our website will run in our local server
const port = 3000;

//bmi
let bmi;

//BMI intrepretation
let interpretation;

const app =  express();

//setting the view engine to ejs to use ejs templates
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//getting  request on local host 
app.get("/", (req, res) => {
    res.render("index",{bmi:bmi, interpretation:interpretation});
});

app.post("/", (req, res) => {
    //weight in kg
    const Weight = req.body.weight;

    //height in cm
    const height = req.body.height / 100;

    //body mass index
    massIndex = Weight/(height * height);

    //bmi
    bmi = massIndex.toFixed(1);

    //bmi interpretation calculator
    if(bmi < 18.5){
        interpretation = "Below normal weight";
    }else if(bmi >= 18.5 && bmi < 25){
        interpretation = "Normal weight";
    }else if(bmi >= 25.5 && bmi < 30){
        interpretation = "Overweight";
    }else if(bmi >= 30){
        interpretation = "Obesity";
    }
    res.redirect("/");
})



//server to listen on assigned port
app.listen(port, () => {
    console.log(`Server running on port ${port} succesfuly`);
})