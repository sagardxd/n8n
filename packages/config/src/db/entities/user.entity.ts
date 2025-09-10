import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, type Relation } from "typeorm"
import { WorkFlow } from "./workflow.entity"
import { Webhook } from "./webhook.entity"
import { Credential } from "./credentials.entity"

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    email: string

    @Column()
    password: string

    @OneToMany(() => WorkFlow, (workflow) => workflow.user)
    workflows: Relation<WorkFlow[]>

    @OneToMany(() => Webhook, (webhook) => webhook.user)
    webhooks: Relation<Webhook[]>

    @OneToMany(() => Credential, (credential) => credential.user)
    credentials: Relation<Credential[]>
}