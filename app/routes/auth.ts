import { checkLogin, login, logout, setUser, signUp } from '../controller/auth';

const express = require('express');
const authRouter = express.Router();

/* GET home page. */


/* Session */
/* create */
authRouter.post('/login', login);
/* get */
authRouter.get('/check-login', checkLogin);
/* destroy */
authRouter.get('/logout', logout);

/* create user and session */
authRouter.post('/sign-up', signUp);

authRouter.use('*', setUser);

export { authRouter };
