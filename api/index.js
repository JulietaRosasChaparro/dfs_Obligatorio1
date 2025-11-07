import app from "../server.js";
import { createServer } from "@vercel/node";

// Vercel usa este handler para ejecutar tu app Express correctamente
export default createServer(app);
