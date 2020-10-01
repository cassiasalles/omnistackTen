const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const routes = require('./routes')

const app = express();

mongoose.connect(`mongodb+srv://cassiaAdm:adm123@cluster-flurr.mongodb.net/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// ".use" serve para validar para todos os metodos
app.use(cors());
app.use(express.json());
app.use(routes);

//método HTTP: GET, POST, PUT, DELETE
// Tipos de parâmetros:
// Query Params: req.query (Filtros, ordenação, ...)
// Route Params: request.params (identificar um recurso na alteração ou remoção)
// Body: request.body (Dados para criação ou alteração de um registro)
// MongoDB (Não-relacional)

app.listen(3333);
