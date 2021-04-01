const express = require('express');
const connectDB = require('./config/db')


const app = express();

connectDB();

app.use(express.json({extended: false}));


// Use Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/dealerships', require('./routes/api/dealerships'));
app.use('/api/vehicles', require('./routes/api/vehicles'));
app.use('/api/datasetid', require('./routes/api/datasetid'));



const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
