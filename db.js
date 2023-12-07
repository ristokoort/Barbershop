const { Sequelize } = require("sequelize")
const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    define: {
        timestamps: true
    },
    logging: console.log // console.log
})
try {
    sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    });
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
const db = {}
db.Sequelize = Sequelize
db.connection = sequelize
db.barbers = require("./models/Barber")(sequelize, Sequelize)
db.services = require("./models/Service")(sequelize, Sequelize)
db.barberServices = require("./models/BarberService")(sequelize, Sequelize, db.barbers, db.services)
db.customers = require("./models/Customer")(sequelize, Sequelize)
db.appointments = require("./models/Appointment")(sequelize, Sequelize, db.customers, db.services, db.barbers)

db.barbers.hasMany(db.barberServices, { foreignKey: "barberId" })
db.barberServices.belongsTo(db.barbers, { foreignKey: "barberId" })
db.services.hasMany(db.barberServices, { foreignKey: "serviceId" })
db.barberServices.belongsTo(db.services, { foreignKey: "serviceId" })
db.customers.hasMany(db.appointments, { foreignKey: "customerId" })
db.appointments.belongsTo(db.customers, { foreignKey: "customerId" })
db.barbers.hasMany(db.appointments, { foreignKey: "barberId" })
db.appointments.belongsTo(db.barbers, { foreignKey: "barberId" })
db.services.hasMany(db.appointments, { foreignKey: "serviceId" })
db.appointments.belongsTo(db.services, { foreignKey: "serviceId" })

sync = async () => {
    if (process.env.DROP_DB === "true") {
        console.log("Begin DROP")
        await db.connection.query('SET FOREIGN_KEY_CHECKS = 0')
        console.log("Checks disabled")
        await db.connection.sync({ force: true })
        console.log('Database synchronised.');
        await db.connection.query('SET FOREIGN_KEY_CHECKS = 1')
        console.log("Checks enabled")

        const [barber, createdB] = await db.barbers.findOrCreate({
            where: {
                name: "Maire"
            },
            defaults: {
                name: "Maire",
                contact_details: "Maire@gmail.com",
            }
        })
        console.log("barber created: ", createdB)
        const [service, createdS] = await db.services.findOrCreate({
            where: {
                service_name: "Meesteloikus",
                
            },
            defaults: {
                service_name: "Meesteloikus",
                description: "masina lõikus"
            }
        })
        console.log("service created: ", createdS)
        const [barberService, createdBS] = await db.barberServices.findOrCreate({
            where: {
                id: 1
            },
            defaults: {
                barberId: barber.id,
                serviceId: service.id,
                price: 10
            }
        })
        console.log("barberService created: ", createdBS)
        
        const [customer, createdC] = await db.customers.findOrCreate({
            where: {
                name: "Maire",
            },
            defaults: {
                name: "Maire",
                contact_details: "maire@gmail.com"
            }
        })
        console.log("customer created: ", createdC)
    }
    else {
        console.log("Begin ALTER")
        await db.connection.sync({ alter: true }) // Alter existing to match the model
        console.log('Database synchronised.')
    }
}

module.exports = { db, sync }