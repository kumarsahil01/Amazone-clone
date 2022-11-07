const functions = require("firebase-functions");
const express =require("express");
const cors=require("cors");
const stripe=require("stripe")('sk_test_51LSyBISE4mRRDhf210kgKydodvtSeuxacda7E957uOkVmCGc8P1OM158tNoAAcTUzXtrqiX0LHj1PqzKQbJH5Qqo00VRWCJ0RS')


//app config
const app=express();

//middleware
app.use(cors({origin:true}));
app.use(express.json());

//api routes
app.get('/',(request,respond)=>respond.status(200).send ('hello world'))

app.post('/payments/create',async(request,response)=>{
    const total=request.query.total;

    console.log('Payment request recieved BOOM!! for this amount >>>',total)

    const paymentIntent=await stripe.paymentIntents.create({
        amount:total,//subunits of the currency
        currency:"inr",
    });

    //ok- created
    response.status(201).send({
        clientsecret: paymentIntent.client_secret
    })
})

exports.api=functions.https.onRequest(app)

//example endpoint 
// http://localhost:5001/e-clone-dd561/us-central1/api
