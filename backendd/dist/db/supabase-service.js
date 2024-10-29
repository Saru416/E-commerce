"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: '.env' });
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Use service role key for admin access
exports.supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
