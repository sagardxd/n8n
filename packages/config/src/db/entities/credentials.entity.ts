import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, type Relation } from "typeorm"
import { User } from "./user.entity"

@Entity()
export class Credential {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    platform: string

    @Column({type: "jsonb"})   
    data: any

    @ManyToOne(() => User, (user) => user.credentials)
    user: Relation<User>
}