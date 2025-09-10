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
    nodes: Record<string, unknown>;

    @Column({type: 'jsonb'})
    edges: Record<string, unknown>;

    @ManyToOne(() => User, (user) => user.workflows)
    user: Relation<User>
}