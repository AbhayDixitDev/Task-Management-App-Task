const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require('./routes/authUser');
const taskRoute = require('./routes/taskRoute');
const adminLoginRoute = require('./routes/adminLoginRoute');
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

const port = process.env.PORT || 4000;

mongoose.connect(process.env.DBLINK).then(() => console.log('Database Connected')).catch(err => console.log(err));



app.use("/api/users",userRoute)
app.use("/api/tasks",taskRoute)
app.use("/api/admin",adminLoginRoute)

app.listen(port, () => {
    console.log(`Task Management App listening on port ${port}`);
});
