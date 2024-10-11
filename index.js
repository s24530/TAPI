const port = 4000
import express from "express";
const app = new express();

//Faker dla danych
// 3 poziomy zgdnieżdżenia 
// co najmniej 5 statusów i 5 podstawowych metod

app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hello world!");
});

app.post();

app.put();

app.patch();

app.delete();



app.listen(port, () => {
    console.log("Server started on" , port)
});