import express from 'express';

import './database'
import { routes } from './routes'

const app = express();

app.use(express.json());
app.use(routes)

app.post('/users/', (request, response) => {
    return response.json({ 
        message:'Usuario gravado com sucesso...'
    });
})

app.listen(3333, () => {
    console.log('Servidor is running on port 3333')
})