import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import MySQLStoreImport from "express-mysql-session";
import planRoutes from "./routes/planRoutes.js";
import registerRoutes from "./routes/registerRoutes.js";
import loginRoutes from './routes/loginRoutes.js';
import miCarreraRoutes from './routes/miCarreraRoutes.js';
import aprobadasRoutes from './routes/aprobadasRoutes.js';
import alumnoRoutes from './routes/alumnoRoutes.js'
import equivalenciasRoutes from './routes/equivalenciasRoutes.js'
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs'; // Importar el módulo fs

dotenv.config();

// Definir __dirname utilizando import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
const MySQLStore = MySQLStoreImport(session);

const options = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const sessionStore = new MySQLStore(options);

app.use(session({
  key: process.env.SESSION_KEY,
  secret: process.env.SESSION_SECRET,
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, 
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 
  }
}));

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", planRoutes);
app.use("/api", registerRoutes);
app.use('/api', loginRoutes);
app.use('/api', miCarreraRoutes);
app.use('/api', aprobadasRoutes);
app.use('/api', alumnoRoutes);
app.use('/api', equivalenciasRoutes);


if (process.env.NODE_ENV === 'production') {
  const clientDistPath = path.join(__dirname, '../client/dist');
  if (fs.existsSync(clientDistPath)) {
    app.use(express.static(clientDistPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(clientDistPath, 'index.html'));
    });
  } else {
    console.warn("Carpeta 'client/dist' no encontrada. Servidor sólo de backend activo.");
  }
}

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
