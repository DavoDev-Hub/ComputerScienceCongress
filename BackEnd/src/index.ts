import express from "express";
import actividadRoutes from "./routes/actividad.routes";
import conferenciaRoutes from "./routes/conferencia.routes";

import dotenv from "dotenv";

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/actividades", actividadRoutes);
app.use("/api/conferencias", conferenciaRoutes);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
