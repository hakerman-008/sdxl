const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());


app.get('/kshitiz', async (req, res) => {
  const { prompt, style } = req.query;


  const styleMap = [
    "cinematic", "photographic", "anime", "manga", "digital-art", "pixel-art", "fantasy-art", "neonpunk",
    "3d-model", "analog", "comic-book", "craft-clay", "enhance", "isometric", "line-art", "lowpoly",
    "origami", "pixel-art", "texture", "watercolor", "artstyle-hyperrealism", "paper-quilling", "photo-hdr",
    "horror", "dreamscape", "game-bubble-bobble", "game-cyberpunk-game", "game-fighting-game", "game-gta",
    "game-mario", "game-minecraft", "game-pokemon", "game-retro-arcade", "game-retro-game", "game-rpg-fantasy-game",
    "game-strategy-game", "game-streetfighter", "game-zelda", "furry"
  ];

 
  const styleNumber = parseInt(style);
  if (isNaN(styleNumber) || styleNumber < 1 || styleNumber > styleMap.length) {
    return res.status(400).json({ error: 'Invalid style number' });
  }

  const options = {
    method: 'POST',
    url: 'https://stable-diffusion9.p.rapidapi.com/generate',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': 'b38444b5b7mshc6ce6bcd5c9e446p154fa1jsn7bbcfb025b3b',
      'X-RapidAPI-Host': 'stable-diffusion9.p.rapidapi.com'
    },
    data: {
      prompt,
      style: styleMap[styleNumber - 1],
      seed: 0
    }
  };

  try {
    const response = await axios.request(options);

   
    const imageURL = response.data.url;

    
    const apiResponse = {
      imageLink: imageURL
    };

    
    res.json(apiResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
