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
exports.addCategory = exports.getCategoryByID = exports.getallCategory = void 0;
const db_1 = require("../db/db");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const getallCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield db_1.db.select({ category: schema_1.product.category }).from(schema_1.product);
        res.status(201).json(categories);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error!" });
    }
});
exports.getallCategory = getallCategory;
const getCategoryByID = (id, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = typeof id === 'string' ? parseInt(id, 10) : id;
        const reqcategory = yield db_1.db.select({ category: schema_1.product.category }).from(schema_1.product).where((0, drizzle_orm_1.eq)(schema_1.product.id, categoryId));
        if (reqcategory.length > 0) {
            return reqcategory[0];
        }
        else {
            return null;
        }
    }
    catch (error) {
        res.status(500).json({ message: "Server Error!" });
    }
});
exports.getCategoryByID = getCategoryByID;
const addCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, subCategory } = req.body;
    if (!name || !subCategory) {
        return res.status(400).json({ message: "Name and subcategory are required!" });
    }
});
exports.addCategory = addCategory;
