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
exports.deleteCategory = exports.updateCategory = exports.addCategory = exports.getCategoryByID = exports.getallCategory = void 0;
const db_1 = require("../db/db");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const getallCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield db_1.db.select().from(schema_1.category);
        res.status(201).json(categories);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error!" });
    }
});
exports.getallCategory = getallCategory;
const getCategoryByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const categoryId = typeof id === "string" ? parseInt(id, 10) : id;
        const reqcategory = yield db_1.db
            .select()
            .from(schema_1.category)
            .where((0, drizzle_orm_1.eq)(schema_1.category.id, categoryId));
        if (reqcategory.length > 0) {
            res.status(201).json(reqcategory[0]);
        }
    }
    catch (error) {
        res.status(500).json({ message: "Server Error!" });
    }
});
exports.getCategoryByID = getCategoryByID;
const addCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, sub_category } = req.body;
    try {
        if (!name || !sub_category) {
            res.status(400).json({ message: "Name and sub_categoory are required!" });
        }
        yield db_1.db.insert(schema_1.category).values({ name, sub_category });
        res.status(201).json({ message: "Category Added!" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error!" });
    }
});
exports.addCategory = addCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, sub_category } = req.body;
    const { id } = req.params;
    try {
        const categoryId = typeof id === 'string' ? parseInt(id, 10) : id;
        const updatedCategory = yield db_1.db.update(schema_1.category).set({ name, sub_category }).where((0, drizzle_orm_1.eq)(schema_1.category.id, categoryId)).returning();
        if (updatedCategory.length === 0) {
            res.status(404).json({ message: "Category not found!" });
        }
        res.status(201).json({ message: "Category updated" });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error!" });
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const categoryId = typeof id === 'string' ? parseInt(id, 10) : id;
        yield db_1.db.delete(schema_1.category).where((0, drizzle_orm_1.eq)(schema_1.category.id, categoryId));
        res.status(200).json({ message: "Category Deleted!" });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});
exports.deleteCategory = deleteCategory;
