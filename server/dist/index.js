"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db"); // Drizzle ORM instance
const supabase_1 = require("./supabase"); // Supabase client
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware to parse JSON
app.use(express_1.default.json());
// Test route to fetch data from Supabase
app.get('/users', async (req, res) => {
    const { data, error } = await supabase_1.supabase.from('users').select('*');
    if (error)
        return res.status(500).json({ error: error.message });
    res.json(data);
});
// Drizzle ORM route example
app.get('/drizzle-test', async (req, res) => {
    const result = await db_1.db.query('SELECT NOW()'); // Example query
    res.json(result.rows);
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
