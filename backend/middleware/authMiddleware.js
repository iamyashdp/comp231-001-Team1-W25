import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// Middleware to verify token
export const authenticate = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    console.log("Auth Header Received:", authHeader);
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1]; // From cookies or Authorization header

    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided.' });
    }

    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your secret key

        // Attach the user to the request object
        req.user = decoded;

        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        return res.status(400).json({ message: 'Invalid token.' });
    }
};

// Middleware to allow only Admin users
export const authorizeAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'Access denied, Admins only.' });
    }
    next();
};

