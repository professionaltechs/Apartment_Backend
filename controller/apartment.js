import Apartment from "../model/apartment.js";
import fs from 'fs'

export const createApartment = async (req, res) => {
    try {
        const apartment = new Apartment(req.body);
        

        await apartment.save();

        const {isDeleted, __v, ...apartmentDetails} = apartment._doc

        return res.status(200).json({
            message: apartmentDetails,
            status: "apartment added succesfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
    }
} 

export const getApartmentById = async (req, res) => {
    try {
        const apartment = await Apartment.findOne({_id: req.body.apartmentId, isDeleted: {$ne: 1}}).select({isDeleted: 0, __v: 0})

        if(!apartment){
            return res.status(200).json({
                message: "no record found"
            })
        }

        return res.status(200).json({
            message: apartment,
            status: "success"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
    }
}

export const getAllApartment = async (req, res) => {
    try {
        const apartment = await Apartment.find({isDeleted: {$ne: 1}}).select({__v: 0})

        if(!apartment){
            return res.status(200).json({
                message: "no record found"
            })
        }

        return res.status(200).json({
            message: apartment,
            staus: "success"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
    }
}

export const updateApartment = async (req, res) => {
    try {
        const apartment = await Apartment.findOne({_id: req.body.apartmentId, isDeleted: {$ne: 1}}).select({isDeleted: 0, __v: 0})
        if(!apartment){
            return res.status(200).json({
                message: [],
                status: "not found"
            })
        }

        apartment.name = req.body.name || apartment.name
        apartment.price = req.body.price || apartment.price
        apartment.houseUrl = req.body.houseUrl || apartment.houseUrl
        apartment.description = req.body.description || apartment.description
        apartment.numberOfBedrooms = req.body.numberOfBedrooms || apartment.numberOfBedrooms
        apartment.stairs = req.body.stairs || apartment.stairs
        
        // apartment.images = req.body.images || apartment.images

        await apartment.save()

        return res.status(200).json({
            message: apartment,
            status: "success"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
    }
}

export const updateApartmentImages = async (req, res) => {
    try {
        console.log("hersssssss")
        const apartment = await Apartment.findOne({_id: req.body.apartmentId, isDeleted: {$ne: 1}}).select({isDeleted: 0, __v: 0})
        if(!apartment){
            return res.status(200).json({
                message: [],
                status: "not found"
            })
        }

        apartment.images = req.body.images || apartment.images

        await apartment.save()

        return res.status(200).json({
            message: apartment.images,
            status: "success"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
    }
}


export const deleteApartment = async (req, res) => {
    try {
        const apartment = await Apartment.findOne({_id: req.body.apartmentId}).select({price: 0, description: 0, images: 0, __v: 0})
        if(!apartment){
            return res.status(200).json({
                message: "no record found"
            })
        }

        apartment.isDeleted = 1

        await apartment.save()

        return res.status(200).json({
            // staus: apartment,
            status: "deleted succesfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
    }
}

export const permenantlyDeleteApartment = async (req, res) => {
    try {
        const apartments = await Apartment.find({isDeleted:  1}).select({images: 1,  _id: 0})

        apartments.forEach((item, index) => {
            item.images.forEach((element, i) => {
                try {
                    fs.unlinkSync(`Images/${element.slice(22, element.length)}`);  // 22 for local
                } catch (error) {
                    console.log(error.message)
                }
            })
        })

        const result = await Apartment.deleteMany({ isDeleted: 1 })

        return res.status(200).json({
            staus: result,
            message: "deleted succesfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
    }
}