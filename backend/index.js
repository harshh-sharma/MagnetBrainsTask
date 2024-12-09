import { config } from 'dotenv';
import express from 'express';
import connectToDb from './config/dbConfig.js';
import app from './app.js';

config();
const PORT = process.env.PORT || 3500;


app.listen(PORT,async () => {
    connectToDb();
    console.log(`server successfully running on ${PORT}`);
    
})