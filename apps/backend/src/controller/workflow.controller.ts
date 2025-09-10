import { logger } from "@repo/config";
import { WorkflowSchema, type ApiResponse, type CreateWorkflowResponse } from "@repo/types";
import { json, type Request, type Response } from "express";
import { createWorkflow, getWorkflowById, getWorkflows, updateWorkflow } from "../services/workflow.service";

export const CreateWorkflowController = async (req: Request, res: Response<ApiResponse<CreateWorkflowResponse>>) => {
    const result = WorkflowSchema.safeParse(req.body)

    if (!result.success) {
        return res.status(411).json({
            success: false,
            message: 'Invalid inputs'
        })
    }

    const userId = req.user!.id
    try {
        const workflow = await createWorkflow(result.data, userId);

        if (!workflow) {
            return res.status(500).json({
                success: false,
                message: 'Error creating workflow'
            })
        }

        return res.status(201).json({
            success: true,
            data: {
                id: workflow.id
            }
        })
    } catch (error) {
        logger.error('CreateWorkflowController', 'Error creating workflow', error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const GetWorkflowController = async (req: Request, res: Response<ApiResponse<any>>) => {
    try {
        const userId = req.user!.id
        const workflows = await getWorkflows(userId);

        if (!workflows) {
            return res.status(500).json({
                success: false,
                message: 'Unable to get workflows'
            })
        }

        return res.status(200).json({
            success: true,
            data: workflows
        })


    } catch (error) {
        logger.error('GetWorkflowController', 'Error getting workflow', error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const GetWorkflowByIdController = async (req: Request, res: Response<ApiResponse<any>>) => {
    const { id } = req.params;
    const userId = req.user!.id

    if (!id) {
        return res.status(411).json({
            success: false,
            message: 'Invalid input!'
        })
    }

    try {
        const workflow = await getWorkflowById(id, userId);

        if (!workflow) {
            return res.status(500).json({
                success: false,
                message: 'Unable to get workflows'
            })
        }

        return res.status(200).json({
            success: true,
            data: workflow
        })
    } catch (error) {
        logger.error('GetWorkflowController', 'Error getting workflow', error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


export const EditWorkflowController = async (req: Request, res: Response<ApiResponse<any>>) => {
    const { id } = req.params;
    const result = WorkflowSchema.safeParse(req.body)

    if (!result.success || !id) {
        return res.status(411).json({
            success: false,
            message: 'Invalid inputs'
        })
    }

    const userId = req.user!.id
    try {
        const workflow = await updateWorkflow(id, userId, result.data);

        if (!workflow) {
            return res.status(500).json({
                success: false,
                message: 'Unable to get workflows'
            })
        }

        return res.status(200).json({
            success: true,
        })
    } catch (error) {
        logger.error('GetWorkflowController', 'Error getting workflow', error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

