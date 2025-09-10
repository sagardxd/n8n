import { logger } from "@repo/config";
import { WorkflowSchema, type ApiResponse, type CreateWorkflowResponse } from "@repo/types";
import { json, type Request, type Response } from "express";
import { createWorkflow, getWorkflows } from "../services/workflow.service";

export const CreateWorkflowController = async (req: Request, res: Response<ApiResponse<CreateWorkflowResponse>>) => {
    const result = WorkflowSchema.safeParse(req.body)

    if (!result.success) {
        return res.status(411).json({
            success: false,
            message: 'Invalid inputs'
        })
    }

    const userId = req.user?.id
    if (!userId) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized!'
        })
    }
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
        const userId = req.user?.id
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized!'
            })
        }

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
    try {

    } catch (error) {
        logger.error('GetWorkflowController', 'Error getting workflow', error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


export const EditWorkflowController = async (req: Request, res: Response<ApiResponse<any>>) => {
    try {

    } catch (error) {
        logger.error('GetWorkflowController', 'Error getting workflow', error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

