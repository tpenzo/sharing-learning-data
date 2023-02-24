import { validationResult } from 'express-validator'
import UserModel from '../models/userModel.js';
import bcrypt from 'bcryptjs'
import { generateAccessToken, generateRefreshToken } from '../middlewares/auth.js';


class AuthControlller {
    
    //@description     Login user and create accessToken, refreshToken
    //@route           [POST] /api/auth/login
    //@body            {email, password}
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
        console.log(req.body)
        try {
            const user = await UserModel.findOne({email: req.body.email})
            if(!user){
               return res.status(400).json({message: "This user does not exist"}) 
            }
            const match = await bcrypt.compare(req.body.password, user.password);
            if(!match){
                return res.status(403).json({ message: 'Incorrect password' });
            }
            const { password, ...others } = user._doc;
            // Generate token
            const accessToken = generateAccessToken(user._id,'10s')
            const refreshToken = generateRefreshToken(user._id,'60s')
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            })
            return res.status(200).json({
                  message: 'Login Success',
                  user: { ...others },
                  accessToken: accessToken,
            });

        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }

    //@description     Register user
    //@route           [POST] /api/auth/register
    //@body            {email, password,...}
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

    //@description     Perform accessToken and refreshToken when the current token expire
    //@route           [GET] /api/auth/refresh
    //@body            No
    //@access          verifyRefreshToken
    async requestRefreshToken(req, res){
        try {
            // Generate token
            const newAccessToken = generateAccessToken(req.userLogin._id,'120s')
            const newRefreshToken = generateRefreshToken(req.userLogin._id,'420s')
            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            })
            return res.status(200).json({accessToken: newAccessToken})
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }
    
    //@description     Logout user
    //@route           [GET] /api/auth/logout
    //@body            No
    //@access          verifyToken
    logout(req, res){
        res.clearCookie("refreshToken");
        res.status(200).json("Logged out successfully!");
    }
}


export default new AuthControlller()