import express from 'express'
import { createApartment, deleteApartment, getAllApartment, getApartmentById, permenantlyDeleteApartment, updateApartment, updateApartmentImages } from '../controller/apartment.js';
import authentication from '../middleware/authentication.js';

const router = express.Router();

router.post("/add-apartment", authentication, createApartment)

router.post("/get-apartment-by-id", authentication, getApartmentById)

router.post("/get-all-apartments", authentication, getAllApartment)

router.post("/get-all-apartments-user", getAllApartment)

router.post("/update-apartment", authentication, updateApartment)

router.post("/update-apartment-images", authentication, updateApartmentImages)

router.post("/remove-apartment", authentication, deleteApartment)

router.post("/permenantly-delete-apartment", authentication, permenantlyDeleteApartment)

export default router;