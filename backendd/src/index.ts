import express from "express";
import cors from 'cors';
import userRouters from "./routes/userRoutes";
import productRouters from "./routes/productRoutes";
import categoryRouters from "./routes/categoryRoutes";

const app = express();

const PORT = 3000;
app.use(express.json())

app.use(cors())

app.use('/user',userRouters);
app.use('/user',productRouters);
app.use('/admin',categoryRouters);

app.listen(PORT, () => {
    console.log(`Running of Port ${PORT}`);
})

