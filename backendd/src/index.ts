import express from "express";
import path from "path";
import cors from 'cors';
import userRouters from "./routes/userRoutes";
import productRouters from "./routes/productRoutes";
import categoryRouters from "./routes/categoryRoutes";
import cartRouters from './routes/cartRoutes';
import orderRouters from './routes/orderRoutes';

const app = express();

const PORT = 3000;
app.use(express.json())

app.use(cors())
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use('/user',userRouters);
app.use('/user',productRouters);
app.use('/admin',categoryRouters);
app.use('/user',cartRouters);
app.use('/user',orderRouters);

app.listen(PORT, () => {
    console.log(`Running of Port ${PORT}`);
})

