import {z} from 'zod'
import dotenv from 'dotenv'
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../../../.env") });

const envSchema = z.object({
    PORT_BACKEND: z.string().transform(Number),
    DATABASE_USER: z.string(),
    DATABASE_PASSWORD: z.string(),
    DATABASE_NAME: z.string(),
})

const env = envSchema.parse(process.env);

export const config = {
    PORT_BACKEND: env.PORT_BACKEND,
    DATABASE_USER: env.DATABASE_USER,
    DATABASE_PASSWORD: env.DATABASE_PASSWORD,
    DATABASE_NAME: env.DATABASE_NAME,
}

export default config