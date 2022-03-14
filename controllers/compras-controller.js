import {v4 as uuidv4} from 'uuid';
import HttpError from '../models/http-error.js';


const DUMMY_COMPRA = [
    {
        idCompra: 'o1',
        totalCompra : 0 ,
        userId : 'u1',
        fechaHoraCompra : '2022-03-12 01:05',
        detalleCompra : [
            {
                producto : 'Agua',
                cantidadComprada : 2,
                precioUni: 5.00,
                subTotal : 0,
                idDetalle : 'd01'
            },
            {
                producto : 'Pan',
                cantidadComprada : 2,
                precioUni: 15.00,
                subTotal : 0,
                idDetalle : 'd02'
            }
        ]

    }
];

for (let i = 0; i < DUMMY_COMPRA.length; i++) {
    for(let j = 0; j < DUMMY_COMPRA[i].detalleCompra.length; j++){
        DUMMY_COMPRA[i].detalleCompra[j].subTotal = DUMMY_COMPRA[i].detalleCompra[j].cantidadComprada * DUMMY_COMPRA[i].detalleCompra[j].precioUni;
    }
}

for (let i = 0; i < DUMMY_COMPRA.length; i++) {
    let aux = 0;
    for(let j = 0; j < DUMMY_COMPRA[i].detalleCompra.length; j++){
        aux = DUMMY_COMPRA[i].detalleCompra[j].subTotal + aux;
    }
    DUMMY_COMPRA[i].totalCompra = aux;
}


export const getCompraById = (req, res, next) => {
    console.log("GET desde /api/compras/uname/");

    const uName = req.params.uid;
    const compras2Retrive = DUMMY_COMPRA.filter( u => {return u.userId === uName});

    res.json(compras2Retrive)
}

export const createCompra = (req, res, next) => {
    const {userId, detalleCompra} = req.body;
    let d = new Date();
    //Formateo de Fecha (YYYY-MM-DD HH:MM:SS)
    d = new Date(d.getTime() - 3000000);
    let date_format_str = d.getFullYear().toString()+"-"+((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString())+"-"+(d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString())+" "+(d.getHours().toString().length==2?d.getHours().toString():"0"+d.getHours().toString())+":"+((parseInt(d.getMinutes()/5)*5).toString().length==2?(parseInt(d.getMinutes()/5)*5).toString():"0"+(parseInt(d.getMinutes()/5)*5).toString())+":00";
    
    //Calculo Total Compra
    let aux = 0
    for (let i = 0; i < detalleCompra.length; i++) {
        aux = (detalleCompra[i].cantidadComprada * detalleCompra[i].precioUni) + aux   
    }

    //Lectura DetalleCompra
    const detalle2Create = [];
    for (let i = 0; i < detalleCompra.length; i++) {
        detalle2Create.push(detalleCompra[i]);
    }

    //Calculo de SubTotal DetalleCompra
    for (let i = 0; i < detalle2Create.length; i++) {
        detalle2Create[i].subTotal = detalle2Create[i].precioUni * detalle2Create[i].cantidadComprada
        detalle2Create[i].idDetalle = 'd' + (i + 1);
    }

    const compra2Create = {
        idCompra : uuidv4(),
        totalCompra: aux,
        userId,
        fechaHoraCompra: date_format_str,
        detalleCompra : detalle2Create
    }

    DUMMY_COMPRA.push(compra2Create);
    res.status(201).json(compra2Create);
}

export const searchRangoCompra = (req, res, next) => {
    //console.log("GET desde SEARCH")
    const {totalCompra1, totalCompra2} = req.body;
    const compras2Retrive = [];

    for (let i = 0; i < DUMMY_COMPRA.length; i++) {
        if (DUMMY_COMPRA[i].totalCompra >= totalCompra1 && DUMMY_COMPRA[i].totalCompra <= totalCompra2) {
            compras2Retrive.push(DUMMY_COMPRA[i]);
        }
    }

    if (compras2Retrive.length == 0) {
        return next (
            new HttpError('No se encontraron Compras', 404)
        );
    } else {
        res.json(compras2Retrive);
    }
}

export const getProductos = (req, res, next) => {
    //console.log("GET desde productos");
    const productos2Retrive = []

    for (let i = 0; i < DUMMY_COMPRA.length; i++) {
        for (let j = 0; j < DUMMY_COMPRA[i].detalleCompra.length; j++) {
            productos2Retrive.push(DUMMY_COMPRA[i].detalleCompra[j].producto + " " + "Q" + DUMMY_COMPRA[i].detalleCompra[j].precioUni);
        }
    }

    res.json(productos2Retrive);
}

export const updateDetalle = (req, res, next) => {
    const detalleId = req.params.oid;
    const {idDetalle,cantidadComprada, precioUni} = req.body;

    const detalle2Uptade = 
    {...DUMMY_COMPRA.find(p => (p.idCompra === detalleId))};

    for (let i = 0; i < detalle2Uptade.detalleCompra.length; i++) {
        console.log(cantidadComprada);
        if (detalle2Uptade.detalleCompra[i].idDetalle === idDetalle) {
            detalle2Uptade.detalleCompra[i].cantidadComprada = cantidadComprada;
            detalle2Uptade.detalleCompra[i].precioUni = precioUni;
        } else {
            return next (
                new HttpError ('No se pudo Actualizar', 422)
            );
        }
    }

    const placeIndex = DUMMY_COMPRA.findIndex(p => (p.idCompra === detalleId));
    DUMMY_COMPRA[placeIndex] = detalle2Uptade;
    res.status(200).json(detalle2Uptade);
    //console.log(detalle2Uptade);

    
}

export const getTotalCompra = (req, res, next) => {
    const idCompra = req.params.oid;
    const total2Retrive = DUMMY_COMPRA.find(u => {return u.idCompra === idCompra});

    res.status(201).json({Total: total2Retrive.totalCompra});
}