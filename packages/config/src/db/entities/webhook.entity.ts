import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, type Relation } from "typeorm"
import { User } from "./user.entity"

@Entity()
export class Webhook {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string

    @Column()
    method: string

    @Column()
    path: string

    @Column()
    header: string

    @Column()
    secret: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @ManyToOne(() => User, (user) => user.workflows)
    user: Relation<User>
}