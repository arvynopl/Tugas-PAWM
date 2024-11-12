const router = require('express').Router();
const pool = require('../config/db');
const authMiddleware = require('../middleware/auth');

// Save progress
router.post('/save', authMiddleware, async (req, res) => {
    try {
        const { labId, coefficients, graph_state } = req.body;
        const nim = req.user.nim;
        
        const result = await pool.query(`
            INSERT INTO lab_progress (nim, lab_id, coefficients, graph_state)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (nim, lab_id) 
            DO UPDATE SET 
                coefficients = $3,
                graph_state = $4,
                last_modified = CURRENT_TIMESTAMP
            RETURNING *
        `, [nim, labId, coefficients, graph_state]);
        
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get progress
router.get('/:labId', authMiddleware, async (req, res) => {
    try {
        const nim = req.user.nim;
        const labId = req.params.labId;
        
        const result = await pool.query(
            'SELECT * FROM lab_progress WHERE nim = $1 AND lab_id = $2',
            [nim, labId]
        );
        
        res.json(result.rows[0] || {
            coefficients: {"a": 1, "b": 0, "c": 0},
            graph_state: {"offsetX": 0, "offsetY": 0, "scale": 1}
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;