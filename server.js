const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({optionsSuccessStatus: 200}));

//Making the app to accept json format
app.use(express.json());

const headerRouter = require('./routes/api');
app.use('/api', headerRouter);


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is Running on PORT: ${PORT}`)
} )
