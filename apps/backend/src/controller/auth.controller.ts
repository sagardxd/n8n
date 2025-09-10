import type { Request, Response } from "express";
import { SignupSchema, type ApiResponse, type SignupResponse } from '@repo/types';
import { logger } from "@repo/config";
import { checkUser, checkUserEmailExist, createUser } from "../services/user.service";
import { jwtSign } from "../utils/jwt";

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
        const alreadyUser = await checkUserEmailExist(email);

        if (alreadyUser) {
            return res.status(409).json({
                success: false,
                message: "User with this mail already exists try signin!"
            })
        }

        const user = await createUser(email, password);

        if (!user) {
            return res.status(500).json({
                success: false,
                message: "Failed to create user"
            });
        }

        const userPayload = {
            id: user.id,
            email: user.email
        }

        const token = jwtSign(userPayload);
        res.cookie('token', token);

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

export const SignInController = async (
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
        const user = await checkUser(email, password);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Wrong credentials!"
            });
        }

        const userPayload = {
            id: user.id,
            email: user.email
        }

        const token = jwtSign(userPayload);
        res.cookie('token', token);

        return res.status(200).json({
            success: true
        });

    } catch (error) {
        logger.error('SignInController', 'Error during signin', error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};