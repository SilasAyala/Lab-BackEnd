import express from "express";

//import de controller

import {getUserByName, 
        createUser,
        updateUser} from "../controllers/usuarios-controller.js";

const router = express.Router();



router.get('/:uname', getUserByName);

router.post('/', createUser);

router.patch('/:uid', updateUser);

export default router