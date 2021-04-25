require('./db/db')
const express = require ('express')
const cors = require('cors')
const userRoutes = require('./routes/user.routes.js')
const trainRoutes = require('./routes/train.routes.js')
const stopRoutes = require('./routes/stop.routes.js')
const PrivilegesRoutes = require('./routes/privileges.routes.js')

const app = express()
app.use(cors())
app.use(express.json())
app.use(userRoutes)
app.use(trainRoutes)
app.use(stopRoutes)
app.use(PrivilegesRoutes)


module.exports = app