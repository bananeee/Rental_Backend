import express from "express";
import mongoose from "mongoose";

// Import mongoose schema
import Renter from "../models/renter.model.js";

// Create controllers
export const updateUserInfoController = async (req, res) => {
    if (req.user.role !== "renter") {
        return res.status(403).json({ message: "You are not renter" });
    }

    const { id } = req.params;

    const {
        phoneNumber,
        image,
        fullName,
        no,
        street,
        ward,
        district,
        city,
        email,
        facebook,
        instagram,
        twitter,
    } = req.body;

    const newRenter = {};

    for (const key in req.body) {
        console.log(key)
        if (req.body[key] !== "") {
            newRenter[key] = req.body[key]
        }
    }

    try {
        console.log(newRenter)
        const updateRenter = await Renter.findByIdAndUpdate(
            id,
            newRenter,
            { new: true }
        );
        res.json(updateRenter);
    } catch (error) {
        console.log(error);
    }
};

export const getRenterController = async (req, res) => {
    if (req.user.role !== "renter") {
        return res.status(403).json({ message: "You are not renter" });
    }

    const { id } = req.params;

    try {
        const renter = await Renter.findById(id);
        res.status(200).json(renter);
    } catch (error) {
        console.log(error);
    }
};
