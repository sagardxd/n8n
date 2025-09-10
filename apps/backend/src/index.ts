import express from 'express'
import { config } from "@repo/config"
import { InitializeDB } from "./db"
import AuthRouter from './routes/auth.route'

const app = express()
app.use(express.json())

app.use('api/v1/auth', AuthRouter)

InitializeDB().then(() => {
    app.listen(config.PORT_BACKEND, () => {
        console.log('Server is running at port: ', config.PORT_BACKEND);
    })
});
