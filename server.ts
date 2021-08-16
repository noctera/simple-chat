const path = require('path');
const express = require('express');

const routes = require('./routes');

const rootRouter = express.Router()

const app = express();

app.use('/', routes);

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));