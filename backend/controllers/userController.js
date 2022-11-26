import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonWebToken';
import dotenv from 'dotenv';
dotenv.config();

export const getUsers = async(req, res)=> {
    let users = await User.find();
    res.status(200).send(users);  
}

export const getUser = async(req, res)=> {
    const user = await User.findById(req.params.id);
    res.status(200).send(user);
}

export const registerUser = async(req, res) => {
    const { name, email, phoneNumber, password, country } = req.body;
    const userExists = await User.findOne({ email});

    if(userExists) {
        return res.status(400).send("not valid user, email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = new User ({
        name,
        email,
        phoneNumber,
        password: hash,
        country
    });

    try {
        const { name, email, phoneNumber, country} = await user.save();
        res.status(200).json({
            name,
            email,
            phoneNumber,
            country
        });

    } catch (e) {
        console.log("error", e.message);
        res.status(400).send(e.message);
    }
}

export const userLogin = async (req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email});
        if(!user) {
            return res.status(400).send("invalid email");
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
    
        if(!validPassword) {
            return res.status(400).send("invalid password");
        }
        const token = jwt.sign({ _id: user._id, name: user.name, email: user.email, userType: user.userType}, process.env.JWT_SECRET);
        res.send({token: token});
    } catch (error) {
        console.log("error", error.message);
        res.status(400).send(error.message);
    }
}
