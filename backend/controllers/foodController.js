

import foodModel from '../model/foodModel.js';
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';

// Add Food
const addFood = async (req, res) => {
    if (!req.file) {
        return res.json({
            success: false,
            message: "No image uploaded"
        });
    }

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });

    try {
        await food.save();
        res.json({
            success: true,
            message: "Food Added"
        });
    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            message: error.message || "Something went wrong"
        });
    }
};

// List Food
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({
            success: true,
            data: foods
        });
    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            message: error.message || "Error occurred while fetching food list"
        });
    }
};

// Remove Food
const removeFood = async (req,res)=>{
    try{
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{});

        await foodModel.findByIdAndDelete(req.body.id);

        res.json({
            success:"true",
            message:"Food Removed"
        })
    }
    catch(error){

        console.log(error);
        res.json({
           success:false, 
           message:"Error"
        })

    }
}

export { addFood, listFood, removeFood };

