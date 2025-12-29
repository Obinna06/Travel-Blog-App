const pool = require('../config/db');

const travelLogController = {
    getAllLogs: async (req, res) => {
        try {
            const [logs] = await pool.query(
                `SELECT id, title, description, 
                DATE_FORMAT(start_date, '%Y-%m-%d') as start_date,
                DATE_FORMAT(end_date, '%Y-%m-%d') as end_date,
                tags 
                FROM travel_logs WHERE user_id = ?`, 
                [req.userId]
            );
            
            const parsedLogs = logs.map(log => ({
                ...log,
                tags: log.tags ? JSON.parse(log.tags) : []
            }));

            res.json(parsedLogs);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    createLog: async (req, res) => {
        try {
            const { title, description, start_date, end_date, tags } = req.body;
            
            const [result] = await pool.query(
                `INSERT INTO travel_logs 
                (user_id, title, description, start_date, end_date, tags) 
                VALUES (?, ?, ?, ?, ?, ?)`,
                [req.userId, title, description, start_date, end_date, JSON.stringify(tags)]
            );

            res.status(201).json({ id: result.insertId });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    getLogById: async (req, res) => {
        try {
            const { id } = req.params;
            const [rows] = await pool.query(
                'SELECT * FROM travel_logs WHERE id = ? AND user_id = ?',
                [id, req.userId]
            );

            if (rows.length === 0) {
                return res.status(404).json({ error: 'Log not found' });
            }

            const log = {
                ...rows[0],
                tags: rows[0].tags ? JSON.parse(rows[0].tags) : []
            };

            res.json(log);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateLog: async (req, res) => {
        try {
            const { id } = req.params;
            const { title, description, start_date, end_date, tags } = req.body;
            
            const [result] = await pool.query(
                `UPDATE travel_logs SET 
                title = ?, 
                description = ?, 
                start_date = ?, 
                end_date = ?, 
                tags = ? 
                WHERE id = ? AND user_id = ?`,
                [title, description, start_date, end_date, JSON.stringify(tags), id, req.userId]
            );
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Log not found' });
            }
            
            res.json({ message: 'Log updated successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteLog: async (req, res) => {
        try {
            const { id } = req.params;
            const [result] = await pool.query(
                'DELETE FROM travel_logs WHERE id = ? AND user_id = ?',
                [id, req.userId]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Log not found' });
            }

            res.json({ message: 'Log deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = travelLogController;