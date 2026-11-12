import express from "express";
import cors from "cors";

const app=express()

/* middlewares */

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

const PORT=process.env.PORT || 5000

app.get("/health",(req,res)=>{
    res.send("Hello World")
})
app.listen(PORT,(err)=>{
    if(err){
        console.log(`failed to run on the server ${PORT}`,err.message)
    }
    console.log(`connected successfully on the port ${PORT}`)
})