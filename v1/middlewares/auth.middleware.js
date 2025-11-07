import jwt from "jsonwebtoken";

export const authenticateMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "No autorizado" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: "Token no válido" });
        }
        req.user = {
            id: decoded.id,
            username: decoded.username
        };
        next();
    });
};
