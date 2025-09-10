import type { Request, Response } from "express";
import { SignupSchema, type ApiResponse, type SignupResponse } from '@repo/types';
import { logger } from "@repo/config";
import { createUser } from "../services/user.service";

export const SignUpController = async (
    req: Request,
    res: Response<ApiResponse<SignupResponse>>
) => {
    const result = SignupSchema.safeParse(req.body);

    if (!result.success || !result.data.email || !result.data.password) {
        return res.status(411).json({
            success: false,
            message: "Incorrect inputs!"
        });
    }

    const { email, password } = result.data;

    try {
        const user = await createUser(email, password);

        if (!user) {
            return res.status(500).json({
                success: false,
                message: "Failed to create user"
            });
        }

        return res.status(201).json({
            success: true,
            data: {
                id: user.id
            }
        });

    } catch (error) {
        logger.error('SignUpController', 'Error during signup', error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
