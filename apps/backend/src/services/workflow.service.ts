import { AppDataSource, logger, User, WorkFlow } from "@repo/config";
import type { Workflow as WorkFlowType } from "@repo/types";

export const createWorkflow = async (input: WorkFlowType, userId: string) => {
    try {
        const workflowRepository = AppDataSource.getRepository(WorkFlow);

        const workflow = new WorkFlow();

        workflow.title = input.title;
        workflow.nodes = input.nodes;
        workflow.active = input.active;
        workflow.edges = input.edges;
        workflow.user = { id: userId } as User;

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


export const getWorkflowById = async (workflowId: string, userId: string) => {
    try {
        const workflowRepository = AppDataSource.getRepository(WorkFlow);

        const workflows = await workflowRepository.find({
            where: {
                id: workflowId,
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

export const updateWorkflow = async (workflowId: string, userId: string, data: WorkFlowType) => {
    try {
        const workflowRepository = AppDataSource.getRepository(WorkFlow);

        const workflows = await workflowRepository.update({
            id: workflowId, user: {
                id: userId
            }
        }, data);

        return workflows;
    } catch (error) {
        logger.error('getWorkflows', 'fail getting workflows from db', error)
    }
}