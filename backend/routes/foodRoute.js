import express from "express"
import { addFood,listFood,removeFood } from "../controllers/foodController.js"
import multer from "multer"


const foodRouter = express.Router();



import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve('uploads'));  // Absolute path to uploads directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`);  // Ensure unique filename
    }
});

const upload = multer({storage:storage})

foodRouter.post('/add',upload.single("image"),addFood);
foodRouter.get("/list",listFood);
foodRouter.post("/remove",removeFood);





export default foodRouter