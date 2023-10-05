let data= [
    {id:1,name:"Kaire",Contact_details:"Kaire@gmail.com"},
    {id:2,name:"Maire",Contact_details:"Maire@gmail.com"},
    {id:3,name:"Toomas",Contact_details:"Toomas@gmail.com"},
    {id:4,name:"Lauri",Contact_details:"Lauri@gmail.com"}
]



exports.getAll = () => {
    return data.map(g => { return { "id": g.id, "name": g.name, "Contact_details":g.Contact_details}})
}

exports.getById = (id) => {
    return data.find((thing)=> thing.id == parseInt(id))
}

exports.create = (newBarber) =>{
    const newId = Math.max ( data.map((thing)=>thing.id)) +1
    newBarber.id=newId
    data.push(newBarber)
        return newBarber
}

app.get("/barbers", (req, res) => {
    res.send(barbers.getAll())
})

app.get("/barbers/:id", (req, res) => {
    res.send(barbers.getById(req.params.id))
})