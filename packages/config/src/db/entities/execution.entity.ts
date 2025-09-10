import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, type Relation } from "typeorm";
import { WorkFlow } from "./workflow.entity";
import { ExecutionStatus } from '@repo/types'

@Entity()
export class Execution {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "enum", enum: ExecutionStatus, default: ExecutionStatus.PENDING })
    status: ExecutionStatus

    @Column({ type: "int", default: 0 })
    tasksCompleted: number;

    @Column({ type: "int", default: 0 })
    tasksTotal: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @ManyToOne(() => WorkFlow, (workflow) => workflow.executions)
    workflow: Relation<WorkFlow>
}