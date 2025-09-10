import { Router } from "express";
import { CreateWorkflowController, EditWorkflowController, GetWorkflowByIdController, GetWorkflowController } from "../controller/workflow.controller";

const router = Router();

router.post('/', CreateWorkflowController)
router.get('/', GetWorkflowController)
router.get('/:id', GetWorkflowByIdController)
router.put('/:id', EditWorkflowController)

export default router;