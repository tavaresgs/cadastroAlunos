const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./src/routes/routes');

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(3000, (req, res) => {
    console.log('server running on port 3000');
});