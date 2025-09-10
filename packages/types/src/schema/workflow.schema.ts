import z from "zod";

export const WorkflowSchema = z.object({
    title: z.string().min(3, "Title should be more than 3 letters"),
    active: z.boolean(),
    nodes: z.json(),
    edges: z.json()
})