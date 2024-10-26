"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllusers = exports.getuser = exports.login = exports.signUp = void 0;
const supabase_services_1 = require("../services/supabase_services");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const { data, error } = yield supabase_services_1.supabase.auth.signUp({
            email,
            password,
        });
        if (error) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(201).json({ message: 'User signed up successfully!', data });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.signUp = signUp;
// Login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const { data, error } = yield supabase_services_1.supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(200).json({ message: 'User logged in successfully!', data });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.login = login;
const getuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, error } = yield supabase_services_1.supabase.auth.getUser();
        if (error) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(200).json({ message: 'User- ', data });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.getuser = getuser;
// Admin getAllusers
const getAllusers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, error } = yield supabase_services_1.supabase.auth.admin.listUsers();
        if (error) {
            console.error("Supabase error:", error.message);
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(201).json(data);
        }
    }
    catch (error) {
        res.status(500).json({ message: "Server Error!" });
    }
});
exports.getAllusers = getAllusers;
