

// import foodModel from '../model/foodModel.js';
// import fs from 'fs';
// import path from 'path';

// const addFood = async (req, res) => {
//     if (!req.file) {
//         return res.json({
//             success: false,
//             message: "No image uploaded"
//         });
//     }

//     let image_filename = `${req.file.filename}`;

//     const food = new foodModel({
//         name: req.body.name,
//         description: req.body.description,
//         price: req.body.price,
//         category: req.body.category,
//         image: image_filename
//     });

//     try {
//         await food.save();
//         res.json({
//             success: true,
//             message: "Food Added"
//         });
//     } catch (error) {
//         console.error(error);
//         res.json({
//             success: false,
//             message: error.message || "Something went wrong"
//         });
//     }
// };

// const listFood = async (req, res) => {
//     try {
//         const foods = await foodModel.find({});
//         res.json({
//             success: true,
//             data: foods
//         });
//     } catch (error) {
//         console.error(error);
//         res.json({
//             success: false,
//             message: error.message || "Error occurred while fetching food list"
//         });
//     }
// };

// const removeFood = async (req, res) => {
//     try {
//         const food = await foodModel.findById(req.params.id);  // Use URL param
//         if (!food) {
//             return res.json({
//                 success: false,
//                 message: "Food item not found"
//             });
//         }

//         fs.unlink(path.resolve('uploads', food.image), (err) => {
//             if (err) {
//                 console.error("Error deleting image:", err);
//             }
//         });

//         await foodModel.findByIdAndDelete(req.params.id);  // Use URL param
//         res.json({
//             success: true,
//             message: "Food Removed"
//         });
//     } catch (error) {
//         console.error(error);
//         res.json({
//             success: false,
//             message: error.message || "Error occurred while removing food"
//         });
//     }
// };

// export { addFood, listFood, removeFood };


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

