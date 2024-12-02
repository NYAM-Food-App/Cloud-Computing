require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const analyzeRoutes = require('./routes/analyzeRoutes');
const foodRoutes = require('./routes/foodRoutes');
const foodHistoryRoutes = require('./routes/foodHistoryRoutes'); // Import route baru untuk foodHistory


const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/analyze', analyzeRoutes);
app.use('/choose/food', foodRoutes);
app.use('/history/food', foodHistoryRoutes);



app.listen(PORT, () => {
  console.log(`Server running on PORT:${PORT}`);
});
