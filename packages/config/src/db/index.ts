import "reflect-metadata"
import { DataSource } from 'typeorm'
import { User } from './entities/user.entity'
import config from "../env"
import { WorkFlow } from "./entities/workflow.entity"
import { Webhook } from "./entities/webhook.entity"
import { Credential } from "./entities/credentials.entity"

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: config.DATABASE_USER,
    password: config.DATABASE_PASSWORD,
    database: config.DATABASE_NAME,
    entities: [User, WorkFlow, Credential, Webhook],
    synchronize: true,
    logging: false
})
