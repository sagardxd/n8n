import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, type Relation } from "typeorm"
import { User } from "./user.entity"

@Entity()
export class Credential {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    platform: string

    @Column({ type: "jsonb" })
    data: any

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @ManyToOne(() => User, (user) => user.credentials)
    user: Relation<User>
}