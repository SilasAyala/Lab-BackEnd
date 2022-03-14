import express from "express";
import bodyParser from "body-parser";

import usuariosRoutes from './routes/usuarios-routes.js';
import comprasRoutes from './routes/compras-routes.js';

const port = 5000;
const app = express();

//bodyParser
app.use(bodyParser.json());

//middleware rutas de usuarios
app.use('/api/usuarios', usuariosRoutes);

//middleware rutas de compras
app.use('/api/compras', comprasRoutes);

app.use((error, req, res, next) => {
    if(res.headerSent) {
        return next(error);
    } else {
        res.status(error.code || 500);
        res.json({mensaje: error.message || 'Ocurrio un error desconocido.'})
    }
});

app.listen(port);
