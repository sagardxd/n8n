import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, type Relation } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class WorkFlow {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string

    @Column({type: "boolean", default: true})
    active: boolean

    @Column({type: 'jsonb'})
    nodes: any

    @Column({type: 'jsonb'})
    edges: any

    @ManyToOne(() => User, (user) => user.workflows)
    user: Relation<User>
}