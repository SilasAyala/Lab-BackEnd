import {v4 as uuidv4} from 'uuid'

const DUMMY_USERS = [
    {
        idUsuario : 'u1',
        username : 'jdoe',
        password : '123456',
        email : 'jdoe@correo.com',
        creationDate : '10-03-2022'
    },
    {
        idUsuario : 'u2',
        username : 'sayala',
        password : '123456',
        email : 'ayala@correo.com',
        creationDate : '04-03-2020'
    }
];

export const getUserByName = (req, res, next) => {
    console.log("GET desde /api/usuarios/")
    
    const uName = req.params.uname;
    const usuario2Retrive = DUMMY_USERS.find( u => {return u.username === uName});

    res.json(usuario2Retrive)
}

export const createUser = (req, res, next) => {
    const {username, password, email} = req.body;
    const today = new Date();

    const user2Create = {
        idUsuario : uuidv4(),
        username,
        password,
        email,
        creationDate : today.toISOString().split('T')[0]
    }

    res.status(201).json(user2Create);
}

export const updateUser = (req, res, next) => {
    const {username, email} = req.body;
    const userId = req.params.uid;

    const user2Update = 
    {...DUMMY_USERS.find (u => (u.idUsuario === userId))}
    user2Update.username = username;
    user2Update.email = email;

    const userIndex = DUMMY_USERS.findIndex(u => (u.idUsuario === userId));
    DUMMY_USERS[userIndex] = user2Update;
    res.status(200).json(user2Update);
}