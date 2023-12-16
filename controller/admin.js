import Admin from "../model/admin.js"

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
    try {
        const isAdminAlready = await Admin.findOne({email: req.body.email})
        if(isAdminAlready){
            return res.status(409).json({
                message: "email already in use",
                status: "failed"
            })
        }
        const encryptedPassword = await bcrypt.hash(req.body.password, 10);

        const admin = new Admin({...req.body, password: encryptedPassword});
        await admin.save()
        
        const { password, ...responseUser } = admin._doc;

        const token = jwt.sign({
            email: responseUser.email,
            id: responseUser._id
        }, "apartment_management", {expiresIn: "365d"})

        return res.status(200).json({
            token: token,
            data: responseUser,
            message: "Admin Created Succesfully",
            status: "Success"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
    }
}

export const signIn = async (req, res) => {
    try {
        const admin  = await Admin.findOne({email: req.body.email, accountName: req.body.accountName})
        if(!admin){
            return res.status(401).json({
                message: "Incorrect Email",
                status: "failed"
            })
        }
        const isCorrectPassword = await bcrypt.compare(req.body.password, admin.password)

        if(!isCorrectPassword){
            return res.status(401).json({
                message: "incorrect password",
                status: "failed"
            })
        }

        const { password, ...responseUser } = admin._doc;

        const token = jwt.sign({
            email: responseUser.email,
            id: responseUser._id
        }, "apartment_management", {expiresIn: "365d"})

        return res.status(200).json({
            token: token,
            data: responseUser,
            message: "Admin Logged In Succesfully",
            status: "Success"
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
    }
}

export const createUser = async (req, res) => {
    try {
        const admin = new Admin(req.body);
        

        await admin.save();

        const {isDeleted, __v, ...userDetails} = admin._doc

        return res.status(200).json({
            message: userDetails,
            status: "user added succesfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
    }
} 

export const getAllUsers = async (req, res) => {
    try {
        const users = await Admin.find({type: {$ne: 1}})

        if(!users){
            return res.status(200).json({
                message: "no record found"
            })
        }

        return res.status(200).json({
            message: users,
            staus: "success"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
    }
}