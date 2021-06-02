const express = require('express');
const router = express.Router();

const usersApi = require('./users.api')

router.use("/users", usersApi);

module.exports = router;
