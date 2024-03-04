/// <reference path="./types/custom.d.ts" />
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import pool from './db';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';

const app = express();

app.use(cors());
app.use(express.json());

const JWT_SECRET = '123aBcDe4FDS';

type Booking = {
    eid: number;
    title: string;
    start: string;
    end_time: string;
    allDay?: boolean;
    resource?: boolean;
};

interface UpdateBooking extends Partial<Booking> { }

interface ExtendedJwtPayload extends JwtPayload {
    userId: number;
    email: string;
}

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            console.log("JWT Verification Error:", err);
            return res.sendStatus(403);
        }
        req.user = user as ExtendedJwtPayload;
        next();
    });
};

//ROUTES//

// API POST endpoint to create a booking
app.post("/bookings", authenticateToken, async (req, res) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(403).json({ message: "User ID missing from request" });
        }

        const bookingStartDate = new Date(req.body.start);
        const firstDayOfBookingMonth = new Date(bookingStartDate.getFullYear(), bookingStartDate.getMonth(), 1);
        const lastDayOfBookingMonth = new Date(bookingStartDate.getFullYear(), bookingStartDate.getMonth() + 1, 0);

        const countQuery = `
            SELECT COUNT(*) 
            FROM bookings 
            WHERE resident_id = $1 AND start >= $2 AND end_time <= $3
        `;
        const countResult = await pool.query(countQuery, [userId, firstDayOfBookingMonth.toISOString(), lastDayOfBookingMonth.toISOString()]);
        const bookingsCount = parseInt(countResult.rows[0].count);

        if (bookingsCount >= 3) {
            return res.status(400).json({ message: "ERROR: You have already made 3 bookings for the booking month." });
        }

        const maxEidResult = await pool.query('SELECT MAX(eid) FROM bookings');
        const maxEid = maxEidResult.rows[0].max || 0;
        const newEid = maxEid + 1;

        const { title, start, end_time, allDay, resource } = req.body;
        const insertValues = [newEid, title, start, end_time, userId];
        const valuePlaceholders = ["$1", "$2", "$3", "$4", "$5"];
        const insertColumns = ["eid", "title", "start", "end_time", "resident_id"];

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
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// API GET endpoint to get all bookings
app.get('/bookings', async (req, res) => {
    try {
        const allBookings = await pool.query("SELECT * FROM bookings");
        res.json(allBookings.rows);
    } catch (err) {
        console.log(err);
    }
});

// API GET endpoint to get a single booking using booking id (eid)
app.get('/bookings/:eid', async (req, res) => {
    try {
        const { eid } = req.params;
        const booking = await pool.query('SELECT * FROM bookings WHERE eid = $1', [
            eid
        ]);

        res.json(booking.rows[0]);
    } catch (err) {
        console.log(err);
    }
});

// API PUT endpoint to update a single booking
app.put("/bookings/:eid", authenticateToken, async (req: Request, res: Response) => {
    const { eid } = req.params;
    const { title, start, end_time, allDay, resource }: UpdateBooking = req.body;
    const userId = req.user?.userId;

    if (!userId) {
        return res.status(403).json({ message: "User ID missing from request" });
    }
    if (!eid || !start || !end_time) {
        return res.status(400).json("Missing required fields");
    }

    const bookingResult = await pool.query('SELECT * FROM bookings WHERE eid = $1', [eid]);
    if (bookingResult.rows.length === 0) {
        return res.status(404).json({ message: "Booking not found" });
    }
    const booking = bookingResult.rows[0];
    if (booking.resident_id !== userId) {
        return res.status(403).json({ message: "Unauthorized to update this booking" });
    }

    const newStartDate = new Date(start);
    const firstDayOfMonth = new Date(newStartDate.getFullYear(), newStartDate.getMonth(), 1);
    const lastDayOfMonth = new Date(newStartDate.getFullYear(), newStartDate.getMonth() + 1, 0);

    const countQuery = `
        SELECT COUNT(*) 
        FROM bookings 
        WHERE resident_id = $1 AND start >= $2 AND end_time <= $3 AND eid != $4
    `;
    const countResult = await pool.query(countQuery, [userId, firstDayOfMonth, lastDayOfMonth, eid]);
    const bookingsCount = parseInt(countResult.rows[0].count);

    if (bookingsCount >= 3) {
        return res.status(400).json({ message: "Updating this booking will exceed your limit of 3 bookings for the month." });
    }

    try {
        const updateValues: any[] = [];
        const updateFields: string[] = [];

        if (title !== undefined) {
            updateFields.push("title = $1");
            updateValues.push(title);
        }
        if (start !== undefined) {
            updateFields.push("start = $" + (updateValues.length + 1));
            updateValues.push(start);
        }
        if (end_time !== undefined) {
            updateFields.push("end_time = $" + (updateValues.length + 1));
            updateValues.push(end_time);
        }
        if (allDay !== undefined) {
            updateFields.push("allday = $" + (updateValues.length + 1));
            updateValues.push(allDay);
        }
        if (resource !== undefined) {
            updateFields.push("resource = $" + (updateValues.length + 1));
            updateValues.push(resource);
        }

        console.log("Update values:", updateValues);
        updateValues.push(eid, userId);

        const updateQuery = `
            UPDATE bookings 
            SET ${updateFields.join(", ")} 
            WHERE eid = $${updateValues.length - 1} AND resident_id = $${updateValues.length}
        `;

        await pool.query(updateQuery, updateValues);

        const updatedBooking = await pool.query("SELECT * FROM bookings WHERE eid = $1", [eid]);
        res.json(updatedBooking.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// API DELETE endpoint to remove a booking
app.delete("/bookings/:eid", authenticateToken, async (req: Request, res: Response) => {
    const { eid } = req.params;
    const userId = parseInt(req.user?.userId);

    const bookingResult = await pool.query('SELECT * FROM bookings WHERE eid = $1', [parseInt(eid)]);

    if (bookingResult.rows.length === 0) {
        return res.status(404).json({ message: "Booking not found" });
    }
    const booking = bookingResult.rows[0];

    if (booking.resident_id !== userId) {
        return res.status(403).json({ message: "Unauthorized to delete this booking" });
    }

    try {
        await pool.query("DELETE FROM bookings WHERE eid = $1 AND resident_id = $2", [parseInt(eid), userId]);
        res.json({ message: "Booking deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// API POST endpoint for residents to login
app.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const userResult = await pool.query('SELECT * FROM residents WHERE email = $1', [email]);
        if (userResult.rows.length === 0) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const user = userResult.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const token = jwt.sign({ userId: user.resident_id, email: user.email }, JWT_SECRET, { expiresIn: '3h' });
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// API GET endpoint to get resident information using resident_id
app.get('/residents', authenticateToken, async (req, res) => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(403).json({ message: "User ID missing from request" });
        }

        const userInfo = await pool.query('SELECT * FROM residents WHERE resident_id = $1', [userId]);
        res.json(userInfo.rows);
    } catch (err) {
        console.log(err);
    }
});

// API GET endpoint to get all bookings for a single resident using resident_id
app.get('/userbookings', authenticateToken, async (req, res) => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(403).json({ message: "User ID missing from request" });
        }

        const bookings = await pool.query('SELECT * FROM bookings WHERE resident_id = $1', [userId]);
        res.json(bookings.rows);
    } catch (err) {
        console.log(err);
    }
});

// API POST endpoint for residents to logout
app.post('/logout', authenticateToken, (req: Request, res: Response) => {
    res.status(200).json({ message: 'Logout successful' });
});

app.listen(5000, () => {
    console.log("server has started on port 5000");
    console.log("test server updates");
});