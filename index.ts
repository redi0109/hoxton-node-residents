import express from "express";
import cors from "cors";
import { housesData, residentsData } from "./data";

let houses = housesData;
let residents = residentsData;

const app = express();
app.use(cors());
app.use(express.json());

const port = 5000;

app.get('/', (req, res) => {
    res.send('REDIIII')
})


app.listen(port, () => {
    console.log(`Go to: http://localhost:${port}`)
})