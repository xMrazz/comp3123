const express = require('express');
const routes = express.Router();
const employeeModel = require('../models/employee');
const mongoose = require('mongoose');

// Get All Employees
routes.get("/employees", async (req, res) => {
    try {
        const employeeList = await employeeModel.find();
        res.status(200).json(employeeList);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Add NEW Employee
routes.post("/employees", async (req, res) => {
    try {
        const newEmployee = new employeeModel({
            _id: new mongoose.Types.ObjectId(),
            ...req.body
        });
        const savedEmployee = await newEmployee.save();
        res.status(201).json(savedEmployee);
    } catch (error) {
        console.error("Error adding employee:", error);
        res.status(500).json({ status: false, message: "Error adding employee", error: error.message });
    }
});

// Update existing Employee By Id
routes.put("/employees/:eid", async (req, res) => {
    try {
        const updatedEmployee = await employeeModel.findByIdAndUpdate(req.params.eid, req.body, { new: true });
        res.status(200).json(updatedEmployee);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Get Employee By Id
routes.get("/employees/:eid", async (req, res) => {
    try {
        const employeeId = req.params.eid;
        const employee = await employeeModel.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ status: false, message: 'Employee not found' });
        }
        res.status(200).json({ status: true, data: employee });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
});

// Delete Employee By Id
routes.delete("/employees/:eid", async (req, res) => {
    try {
        const employeeId = req.params.eid; // Use req.params.eid to get the parameter from the URL
        const deletedEmployee = await employeeModel.findByIdAndRemove(employeeId);
        if (!deletedEmployee) {
            return res.status(404).json({ status: false, message: 'Employee not found' });
        }
        res.status(204).json({ status: true, message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
});

module.exports = routes;