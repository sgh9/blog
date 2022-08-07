import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const auth = async(req, res, next) => {
    const token = req.header('x-auth-token');

    if(!token) return res.status(401).send("Access Denied,Not authorized");
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      let user = await User.findById(decoded._id).select('-password');
      req.user = user;
      next(); 
    } catch (err) {
        res.status(400).send("Not authorized, not valid token");
    }
}