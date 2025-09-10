import express from 'express'
import { config } from "@repo/config"
import { InitializeDB } from "./db"
import AuthRouter from './routes/auth.route'
import WorkflowRouter from './routes/workflow.route'
import CredentialRouter from './routes/credential.route'
import cookieParser from 'cookie-parser'
import { AuthMiddleware } from './middleware/auth.middleware'

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/api/v1', AuthRouter)
app.use('/api/v1/workflow', AuthMiddleware,  WorkflowRouter)
app.use('/api/v1/credential', AuthMiddleware,  CredentialRouter)

InitializeDB().then(() => {
    app.listen(config.PORT_BACKEND, () => {
        console.log('Server is running at port: ', config.PORT_BACKEND);
    })
});
