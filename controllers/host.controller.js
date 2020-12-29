import express from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// Import mongoose schema
import Host from "../models/host.model.js";

// Config bcrypt
const saltRounds = 12;
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";

// Config dotenv
dotenv.config();

// Config jwt
const JWT_SECRET = process.env.JWT_SECRET;

// Create controllers

export const hostRegisterController = async (req, res) => {
    // const { username, password, phoneNumber } = req.body

    // if (!username || !password || !phoneNumber) {
    //     return res.status(422).json({ error: "Please add all the fields" })
    // }

    try {
        // Check rentel exist ?
        await Host.findOne({ ...req.body.phoneNumber }).then((saveHost) => {
            if (saveHost) {
                return res.status(422).json({ error: "Host already exists" });
            }

            // Hash password and create nick and save
            bcrypt
                .hash(req.body.password, saltRounds)
                .then(async (hashedPassword) => {
                    const host = new Host({
                        ...req.body,
                        password: hashedPassword,
                    });

                    try {
                        await host.save();
                        res.status(201).json({ message: "Saved successfully" });
                    } catch (error) {
                        res.status(409).json({ message: error.message });
                    }
                });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const hostLoginController = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res
            .status(422)
            .json({ error: "Please add username or password" });
    }

    try {
        await Host.findOne({ username }).then(async (saveHost) => {
            if (!saveHost) {
                return res
                    .status(422)
                    .json({ error: "Invalid username or password" });
            }

            // Check nick exists
            const match = await bcrypt.compare(password, saveHost.password);

            if (match) {
                // Create token
                const token = jwt.sign({ _id: saveHost._id }, JWT_SECRET);
                const { _id, username, phoneNumber } = saveRenter;

                res.json({
                    token,
                    user: {
                        _id,
                        username,
                        phoneNumber,
                    },
                });
            } else {
                return res
                    .status(422)
                    .json({ error: "Invalid usename or password" });
            }
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getHostsController = async (req, res) => {
    try {
        let { status } = req.query
        const hosts = await Host.find({ status })
            .select("image fullName personId username phoneNumber status")
            // .select("price.amount")
            .sort("createdAt");
        res.status(200).json({ hosts });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};