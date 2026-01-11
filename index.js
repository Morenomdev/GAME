const express = require("express")

//instance
const app = express()

app.get("/", (req, res) => {
    res.send("Hello")
})

//listen petitions
app.listen(8080, () => {
    console.log("server working");
    
})
