import { validationResult } from 'express-validator'
import UserModel from '../models/userModel.js';
import bcrypt from 'bcryptjs'


class AuthControlller {
    
    //@description     Login user
    //@route           [POST] /api/auth/login
    //@body            {numbercode, password}
    //@access          No
    async login(req, res){
        // Check input data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errMessage= {}
            errors.array().forEach(err => {
                errMessage[err.param] = err.msg
            }) 
            return res.status(400).json(errMessage);
        }
        try {
            const user = await UserModel.findOne({numbercode: req.body.numbercode})
            if(!user){
               return res.status(400).json({message: "This user does not exist"}) 
            }
            const match = await bcrypt.compare(req.body.password, user.password);
            if(!match){
                return res.status(403).json({ message: 'Incorrect password' });
            }
            const { password, ...others } = user._doc;
            return res.status(200).json({
                  message: 'Login Success',
                  user: { ...others },
            });

        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }

    //@description     Register user
    //@route           [POST] /api/auth/register
    //@body            {numbercode, password,...}
    //@access          No
    async register(req, res){
        // Check input data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errMessage= {}
            errors.array().forEach(err => {
                errMessage[err.param] = err.msg
            }) 
            return res.status(400).json(errMessage);
        }
        try {
            const newUser = await UserModel.create(req.body)
             res.send(newUser)
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }
}


export default new AuthControlller()