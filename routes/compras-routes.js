import express from "express";


import {getCompraById,
        createCompra, 
        searchRangoCompra,
        getProductos,
        updateDetalle,
        getTotalCompra} from "../controllers/compras-controller.js";

const router = express.Router();

router.get('/:uid' , getCompraById);

router.post('/', createCompra);

router.post('/find', searchRangoCompra);

router.post('/products', getProductos);

router.patch('/:oid' , updateDetalle);

router.get('/total/:oid', getTotalCompra);



export default router;