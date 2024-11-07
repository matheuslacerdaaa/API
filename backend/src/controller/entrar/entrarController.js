
import { gerarToken } from '../../utils/jwt.js';

import { inserirUsuario } from '../../repository/entrar/entrarRepository.js';
import { validarUsuario } from '../../repository/entrar/entrarRepository.js';

import { Router } from "express";
const endpoints = Router();


endpoints.post('/entrar/', async (req, resp) => {
    try {
        let pessoa = req.body;

        let usuario = await validarUsuario(pessoa);

        if (usuario == null) {
            resp.send({ erro: "Usuário ou senha incorreto(s)" })
        } else {
            let token = gerarToken(usuario);
            resp.send({
                "token": token
            })
        }
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


endpoints.post('/usuario/', async (req, resp) => {
    try {
        let pessoa = req.body;

        let id = await inserirUsuario(pessoa);

        resp.send({
            novoId: id
        })
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})



export default endpoints;