"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const supabaseUrl = 'https://vvdzecqhtquarwtjmrts.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2ZHplY3FodHF1YXJ3dGptcnRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg3Mjg3NDMsImV4cCI6MjA0NDMwNDc0M30.sq4sof79xI73n9wtNixTvJT5ohlh5A2cxET6tdCzskM';
exports.supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseAnonKey);
