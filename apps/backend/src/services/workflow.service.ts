import { AppDataSource, logger, User, WorkFlow } from "@repo/config";
import type { Workflow } from "@repo/types";

export const createWorkflow = async (input: Workflow, userId: string) => {
    try {
        const workflowRepository = AppDataSource.getRepository(WorkFlow);

        const workflow = new WorkFlow();

        workflow.title = input.title;
        workflow.nodes = input.nodes;
        workflow.active = input.active;
        workflow.edges = input.edges;
        workflow.user = {id : userId} as User;

        const data = await workflowRepository.save(workflow);
        return data;

    } catch (error) {
        logger.error('createWorkflow', 'fail creating workflow in db', error)
    }
}

export const getWorkflows = async (userId: string) => {
    try {
        const workflowRepository = AppDataSource.getRepository(WorkFlow);

        const workflows = await workflowRepository.find({
            where: {
                user: {
                    id: userId
                }
            }
        });

        return workflows;
    } catch (error) {
        logger.error('getWorkflows', 'fail getting workflows from db', error)
    }
}