const express = require ('express')()
const app = express()
const port =8080
const swaggerui = require("swagger-ui-express")
const swaggerDocument = require("./docs/swagger.json");
const yamljs = require("yamljs")
const swaggerDocument=yamljs.load("./docs/swagger.yaml");
const services = require("./services/data")
app.use(express.json())
app.use("/docs", swaggerui.serve, swaggerui.setup(swaggerDocument))

 GetAllServices
const services = [
    {id:1,Service_name:"Kaire",Price:10,Description:"Masinlõikus"},
    {id:2,Service_name:"Maire",Price:20,Description:"Värvimine"},
    {id:1,Service_name:"Juss",Price:25,Description:"Masinlõikus"},
    {id:1,Service_name:"Maiko",Price:50,Description:"Keemilised lokid"}
   
]


 GetServiceDetails
 main
app.get("/services", (req, res) => {
    res.send (services)
})

app.get("/services/:id" , (req, res) => {
    res.send(services[req.params.id])
})

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
const barbers = [
    {id:1,name:"Kaire",Contact_details:"Kaire@gmail.com"},
    {id:2,name:"Maire",Contact_details:"Maire@gmail.com"},
    {id:3,name:"Toomas",Contact_details:"Toomas@gmail.com"},
    {id:4,name:"Lauri",Contact_details:"Lauri@gmail.com"}
   
]

app.get("/barbers", (req, res) => {
    res.send (barbers)
})

app.get("/barbers/:id" , (req, res) => {
    res.send(barbers[req.params.id])
})

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`);
})

app.post("/barbers", (req, res) => {
    if (!req.body.name || !req.body.Contact_details) {
        return res.status(400).send({ error: "One or all required parameters are missing." })
    }
    const createdBarber = barbers.create({
        name: req.body.name,
        Contact_details: req.body.Contact_details
    })
    res.status(201)
        .location(`${getBaseurl(req)}/barbers/${createdBarber.id}`)
        .send(createdBarber)
})
function getBaseurl (request){
    return (request.connection && request.connection.encrypted ? "https" : "http") 
            + "://" + request.headers.host
}
main

app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`);
})