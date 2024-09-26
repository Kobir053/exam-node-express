import express from 'express';
import router from './routes/router.js';
import { ensureDatabaseExist } from './DAL/jsonBeepers.js';
const PORT = 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/beepers', router);
app.listen(PORT, () => {
    console.log("server on");
    ensureDatabaseExist();
});
