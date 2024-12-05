import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Product } from './MockData.js';


const app = express();
app.use(cors());
app.use(express.json());
dotenv.config()

app.get('/', (req, res) => {
        res.status(200).send({status: 'OK',message:"All Add To Card Product", data:Product});
    });

    app.post('/', (req, res) => {
        const newProduct = req.body;
        Product.push(newProduct);
        res.status(201).send({status: 'Created', message: 'New Product Added', data: Product});
    });

    app.delete('/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const index = Product.findIndex((product) => product.id === id);
        if (index === -1) {
            return res.status(404).send({status: 'Not Found', message: 'Product not found'});
        }
        Product.splice(index, 1);
        res.status(200).send({status: 'Deleted', message: 'Product deleted', data: Product});
    })

        

const port = process.env.PORT || 3000 
app.listen(port,(req, res) => {
    console.log(`Server is running on port ${port}`);
});
