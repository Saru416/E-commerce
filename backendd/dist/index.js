"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const cartRoutes_1 = __importDefault(require("./routes/cartRoutes"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
app.use('/user', userRoutes_1.default);
app.use('/user', productRoutes_1.default);
app.use('/admin', categoryRoutes_1.default);
app.use('/user', cartRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Running of Port ${PORT}`);
});
