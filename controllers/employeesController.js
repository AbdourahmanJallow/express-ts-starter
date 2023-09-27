const Employee = require('../models/Employee');
const isValidEmail = require('./isValidEmail');

const createNewEmployee = async (req, res) => {
    const { firstName, lastName, email } = req.body;

    if (!firstName || !lastName || !email)
        return res
            .status(400)
            .json({ message: 'Enter employee details to proceed' });

    if (!isValidEmail(email))
        return res.status(400).json({ message: 'Invalid email' });
    try {
        const result = await Employee.create({
            firstName,
            lastName,
            email
        });

        console.log(result);
        res.status(201).json({ result });
    } catch (err) {
        console.log(err.message);
    }
};

const getAllEmployees = async (req, res) => {
    const employees = await Employee.find().exec();

    if (!employees.length)
        return res.status(204).json({ message: 'No employees found' });

    res.json(employees);
};

const updateEmployee = async (req, res) => {
    const employeeId = req.body.id;
    if (!employeeId)
        return res.sendStatus(400).json({ message: 'Employe ID required' });

    try {
        const employee = await Employee.findOne({ _id: employeeId });
        if (!employee)
            return res
                .status(204)
                .json({ message: `No employee matches Id ${employeeId}` });

        if (req.body.firstName) employee.firstName = req.body.firstName;
        if (req.body.lastName) employee.lastName = req.body.lastName;
        if (req.body.email) employee.email = req.body.email;

        const result = await employee.save();

        console.log(result);
        res.json(result);
    } catch (err) {
        console.log(err.message);
    }
};

const deleteEmployee = async (req, res) => {
    const employeeId = req.body.id;
    if (!employeeId)
        return res.sendStatus(400).json({ message: 'Employe ID required' });

    try {
        const employee = await Employee.findOne({ _id: employeeId });
        if (!employee)
            return res
                .status(204)
                .json({ message: `No employee matches Id ${employeeId}` });

        const result = await employee.deleteOne({ _id: employeeId });

        console.log(result);
        res.json(result);
    } catch (err) {
        console.log(err.message);
    }
};

const getEmployee = async (req, res) => {
    const employeeId = req?.params?.id;
    if (!employeeId)
        return res.status(400).json({ message: 'Employee ID required' });

    try {
        const employee = await Employee.findOne({ _id: employeeId });
        if (!employee)
            return res.status(403).json({ message: 'Employee does not exist' });

        console.log(employee);
        res.json(employee);
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    getEmployee,
    getAllEmployees,
    updateEmployee,
    deleteEmployee,
    createNewEmployee
};
