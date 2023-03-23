const express = require('express');
const { chatbot } = require('../controller/testModel');
const fetchUser = require('../middleware/fetchUser');

const router = express.Router();
router.post("/chat",fetchUser,chatbot);