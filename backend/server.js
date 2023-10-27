const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
const port = 3001;

app.use(express.json());
app.use(cors());
app.get('/api/country', async (req, res) => {
  const { name } = req.query;

  try {
    const response = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
    const countryData = response.data;
    res.json(countryData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch country information' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
