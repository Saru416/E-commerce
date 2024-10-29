"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const node_postgres_1 = require("drizzle-orm/node-postgres");
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Create a connection pool
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
// Initialize Drizzle ORM
exports.db = (0, node_postgres_1.drizzle)(pool);
