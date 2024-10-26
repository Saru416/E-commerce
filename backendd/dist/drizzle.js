"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
// src/drizzle.ts
const drizzle_orm_1 = require("drizzle-orm");
const supabase_1 = require("./supabase");
exports.db = (0, drizzle_orm_1.drizzle)(supabase_1.supabase);
