import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, type Relation } from "typeorm";
import { User } from "./user.entity";
import { Execution } from "./execution.entity";

@Entity()
export class WorkFlow {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string

    @Column({ type: "boolean", default: true })
    active: boolean

    @Column({ type: 'jsonb' })
    nodes: Record<string, unknown>;

    @Column({ type: 'jsonb' })
    edges: Record<string, unknown>;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @Column({ type: 'timestamp' })
    updatedAt: Date

    @ManyToOne(() => User, (user) => user.workflows)
    user: Relation<User>

    @OneToMany(() => Execution, (execution) => execution.workflow)
    executions: Relation<Execution[]>
}