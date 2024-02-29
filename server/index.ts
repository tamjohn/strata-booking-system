import express from 'express';
import cors from 'cors';
import pool from './db';

const app = express();

//middleware
app.use(cors());
app.use(express.json());

type Booking = {
    eid: number;
    title: string;
    start_time: string; 
    end_time: string; 
    allDay?: boolean; 
    resource?: boolean; 
};

type UpdateBooking = {
    eid: number;
    title?: string;  
    start?: string;  
    end_time?: string;
    allDay?: boolean;
    resource?: boolean;
};

//ROUTES//

// API POST endpoint to create a booking
app.post("/bookings", async (req, res) => {
    try {
        const { eid, title, start_time, end_time, allDay, resource }: Booking = req.body;
        const insertValues: Array<string | number | boolean> = [eid, title, start_time, end_time];
        const valuePlaceholders = ["$1", "$2", "$3", "$4"];
        const insertColumns = ["eid", "title", "start", "end_time"];

        if (allDay !== undefined) {
            insertColumns.push("allDay");
            insertValues.push(allDay);
            valuePlaceholders.push(`$${insertValues.length}`);
        }
        if (resource !== undefined) {
            insertColumns.push("resource");
            insertValues.push(resource);
            valuePlaceholders.push(`$${insertValues.length}`);
        }

        const query = `INSERT INTO bookings (${insertColumns.join(", ")}) VALUES (${valuePlaceholders.join(", ")}) RETURNING *`;

        const newBooking = await pool.query(query, insertValues);

        res.json(newBooking.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// API GET endpoint to get all bookings
app.get('/bookings', async (req, res) => {
    try {
        const allBookings = await pool.query("SELECT * FROM bookings");
        res.json(allBookings.rows);
    } catch (err) {
        console.log(err.message);
    }
});

// API GET endpoint to get a single booking
app.get('/bookings/:eid', async (req, res) => {
    try {
        const { eid } = req.params;
        const booking = await pool.query('SELECT * FROM bookings WHERE eid = $1', [
            eid
        ]);

        res.json(booking.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});

// API PUT endpoing to update a booking
app.put("/bookings/:eid", async (req, res) => {
    try {
        const { eid } = req.params; 
        const { title, start, end_time, allDay, resource }: UpdateBooking = req.body;

        // Check if required fields are missing
        if (!eid || !start || !end_time) {
            return res.status(400).json("Missing required fields");
        }

        const updateFields: string[] = [];
        const updateValues: (string | number | boolean)[] = [eid];

        // Build the SET clause for the UPDATE statement
        updateFields.push("eid = $1");
        updateValues.push(eid);

        if (title !== undefined) {
            updateFields.push("title = $2");
            updateValues.push(title);
        }

        updateFields.push("start = $3", "end_time = $4");
        updateValues.push(start, end_time);

        // Handle optional fields
        if (allDay != null) {
            updateFields.push("allDay = $5");
            updateValues.push(allDay);
        }
        if (resource != null) {
            updateFields.push("resource = $6");
            updateValues.push(resource);
        }

        // Combine the SET clause and the WHERE condition for the UPDATE statement
        console.log('update fields', updateFields);
        console.log('update values', updateValues);
        const updateQuery = `UPDATE bookings SET ${updateFields.join(", ")} WHERE eid = $1`;
        console.log(updateQuery);

        // Execute the query
        await pool.query(updateQuery, updateValues);

        // // Retrieve the updated result
        // const updatedBooking = await pool.query("SELECT * FROM bookings WHERE eid = $1", [id]);

        // res.json(updatedBooking.rows[0]);
        // console.log(updatedBooking.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// API DELETE endpoint to remove a booking
app.delete("/bookings/:eid", async (req, res) => {
    try {
        const { eid } = req.params;
        const deleteBooking = await pool.query("DELETE FROM bookings WHERE eid = $1", [
            eid
        ]);
        res.json("booking was deleted!");
    } catch (err) {
        console.log(err.message);
    }
});

app.listen(5000, () => {
    console.log("server has started on port 5000");
    console.log("test server updates");
});