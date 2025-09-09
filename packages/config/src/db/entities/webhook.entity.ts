import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, type Relation } from "typeorm"
import type { Method } from "../types/webhook.types"
import { User } from "./user.entity"

@Entity()
export class Webhook {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string

    @Column()
    method: Method

    @Column()
    path: string

    @Column()
    header: string

    @Column()
    secret: string

    @ManyToOne(() => User, (user) => user.workflows)
    user: Relation<User>
}