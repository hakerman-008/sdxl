const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/kshitiz', async (req, res) => {
  try {
    const { prompt } = req.query;
    const selectedModel = 'anything-v5';

    const options = {
      method: 'POST',
      url: 'https://animimagine-ai.p.rapidapi.com/generateImage',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '3fa82b3121msh60993f970f09819p15c22cjsncc0b065b5f1c',
        'X-RapidAPI-Host': 'animimagine-ai.p.rapidapi.com',
      },
      data: {
        selected_model_id: selectedModel,
        selected_model_bsize: '512',
        prompt,
      },
    };

    const response = await axios.request(options);
    const imageUrl = response.data.imageUrl;
    res.json({ imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
