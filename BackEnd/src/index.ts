import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import actividadRoutes from "./routes/actividad.routes";
import conferenciaRoutes from "./routes/conferencia.routes";
import asistenciasRoutes from "./routes/asistencia.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
}));
app.use(express.json());

app.use("/api/actividades", actividadRoutes);
app.use("/api/conferencias", conferenciaRoutes);
app.use("/api/alumnos", asistenciasRoutes)


app.get("/", (req, res) => {
    res.send("Bienvenido a Computer Science Congress API 🚀");
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: "Error interno del servidor" });
});
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

