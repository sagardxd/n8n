import { Router } from "express";
import { CreateCredentialController, DeleteCredentialController } from "../controller/credential.controller";

const router = Router();

router.post('/', CreateCredentialController)
router.delete('/:id', DeleteCredentialController)

export default router;