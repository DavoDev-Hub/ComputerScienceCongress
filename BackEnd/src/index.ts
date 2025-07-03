import express from 'express';
import actividadesRouter from './routes/actividades';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/actividades', actividadesRouter);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

