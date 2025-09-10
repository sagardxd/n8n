import z from "zod";
import { SupportedPlatform } from "../model/credential.types";

export const CredentialSchema = z.object({
    platform: z.enum(SupportedPlatform),
    data: z.json(),  
})

export type Credential = z.infer<typeof CredentialSchema>;