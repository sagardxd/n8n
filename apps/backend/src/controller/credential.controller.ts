import { logger } from "@repo/config";
import { CredentialSchema, type ApiResponse, type CreateCredentialResponse } from "@repo/types";
import type { Request, Response } from "express";
import { createCredential, deleteCredential } from "../services/credential.service";

export const CreateCredentialController = async (req: Request, res: Response<ApiResponse<CreateCredentialResponse>>) => {
    const userId = req.user!.id
    const result = CredentialSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(411).json({
            success: false,
            message: 'Invalid inputs!'
        })
    }

    try {
        const credential = await createCredential(result.data, userId);

        if (!credential) {
            return res.status(500).json({
                success: false,
                message: "Error creating credential"
            })
        }

        return res.status(201).json({
            success: true,
            data: {
                id: credential.id
            }
        })
    } catch (error) {
        logger.error('CreateCredentialController', 'Error creating credential', error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const DeleteCredentialController = async (req: Request, res: Response<ApiResponse<any>>) => {
    const { id } = req.params;
    if (!id) {
        return res.status(411).json({
            success: false,
            message: "Invalid inputs!"
        })
    }

    const userId = req.user!.id
    try {
        const result = await deleteCredential(id, userId)

        if (!result) {
            return res.status(500).json({
                success: false,
                message: "Error deleting credential"
            })
        }

        if (!result.affected) {
            return res.status(404).json({
                success: true,
                message: "Credential does not exist!"
            })
        }

        return res.status(200).json({
            success: true,
            data: {
                id: id
            }
        })

    } catch (error) {
        logger.error('DeleteCredentialController', 'Error deleting credential', error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}