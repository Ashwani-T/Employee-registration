require('dotenv').config();
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// db.connect((err) => {
//     if (err) {
//         console.error("Database connection failed:", err);
//         process.exit(1);
//     } else {
//         console.log("Connected to MySQL!");
//     }
// });

// Routes
app.post('/newemp', (req, res) => {
    const { emp_id, name, email, phone, dept, d_join, role } = req.body;
    const qrCheck = "SELECT * FROM employee WHERE LOWER(emp_id) = LOWER(?) OR LOWER(email) = LOWER(?)";

    db.query(qrCheck, [emp_id, email], (err, result) => {
        if (err) {
            console.error("Error while checking for duplicates:", err);
            return res.status(500).json({ error: "Error while checking for duplicates" });
        }

        if (result.length > 0) {
            const duplicate = [];
            result.forEach((element) => {
                if (element.emp_id.toLowerCase() === emp_id.toLowerCase()) {
                    duplicate.push("Employee ID");
                }
                if (element.email.toLowerCase() === email.toLowerCase()) {
                    duplicate.push("Email");
                }
            });

            return res.status(409).json({
                error: `${duplicate.join(" and ")} already exist!`,
                duplicateFields: duplicate,
            });
        }

        const qr = "INSERT INTO employee (emp_id, name, email, phone, dept, d_join, role) VALUES (?, ?, ?, ?, ?, ?, ?)";
        const values = [emp_id, name, email, phone, dept, d_join, role];

        db.query(qr, values, (err) => {
            if (err) {
                console.error("Error while inserting into DB:", err);
                return res.status(500).json({ error: "Insert failed!" });
            }
            res.status(201).json({ success: true, message: "Registered successfully!" });
        });
    });
});

app.put('/update-employee', (req, res) => {
    const { emp_id, name, email, phone, dept, d_join, role } = req.body;
    const query = `
        UPDATE employee 
        SET name = ?, email = ?, phone = ?, dept = ?, d_join = ?, role = ?
        WHERE emp_id = ?
    `;

    db.query(query, [name, email, phone, dept, d_join, role, emp_id], (err, result) => {
        if (err) {
            console.error('Error updating employee:', err);
            return res.status(500).json({ error: 'Error updating employee details.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Employee not found.' });
        }

        res.json({ success: true, message: 'Employee updated successfully!' });
    });
});

app.get('/get-employee/:emp_id', (req, res) => {
    const emp_id = req.params.emp_id;
    const query = 'SELECT * FROM employee WHERE emp_id = ?';

    db.query(query, [emp_id], (err, result) => {
        if (err) {
            console.error('Error fetching employee:', err);
            return res.status(500).json({ error: 'Error fetching employee details' });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        res.json(result[0]);
    });
});

app.delete('/delete-employee/:id', (req, res) => {
    const emp_id = req.params.id;
    const qr = "DELETE FROM employee WHERE emp_id = ?";

    db.query(qr, [emp_id], (err, result) => {
        if (err) {
            console.error("Error deleting record:", err);
            return res.status(500).json({ error: "Can't delete record!" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        res.status(200).json({ message: "Deleted successfully" });
    });
});

app.post('/verify-password', (req, res) => {
    const { password } = req.body;

    if (password === process.env.ADMIN_PASSWORD) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server connected on port ${process.env.PORT}!`);
});
