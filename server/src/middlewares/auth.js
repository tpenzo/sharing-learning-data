import jwt from 'jsonwebtoken'
import UserModel from '../models/userModel.js'

export const generateAccessToken = (user, time) => {
    return jwt.sign({_id: user._id}, process.env.JWT_KEY, {expiresIn: time})
}

export const generateRefreshToken = (user, time) => {
    return jwt.sign({_id: user._id}, process.env.JWT_REFRESH_KEY, {expiresIn: time})
}

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.headers.authorization
        if(!token){
            return res.status(401).json({ message: "You're not authenticated" });
        }
        token = token.split(' ')[1]
        jwt.verify(token, process.env.JWT_KEY, async(err, user) => {
            if(err){
                return res.status(403).json({message: err.message})
            }
            const userLogin = await UserModel.findOne({_id: user._id})
            req.userLogin = userLogin
            next()
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const verifyRefreshToken = async (req, res, next) => {
    try {
        let refreshToken = req.cookies.refreshToken
        if(!refreshToken){
            return res.status(401).json({ message: "You're not authenticated" });
        }
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, async(err, user) => {
            if(err){
                return res.status(403).json({message: err.message})
            }
            const userLogin = await UserModel.findOne({_id: user._id})
            req.userLogin = userLogin
            next()
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const restrictTo = (roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.userLogin.role)){
            return res.status(401).json({ message: "You do not have permission to perform this action" });
        }
        next()
    }
}