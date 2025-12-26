const express = require('express');
const app = express();

// Load environment variables from a .env file when available
try {
    require('dotenv').config();
} catch (e) {
    // dotenv not installed — environment variables can still be supplied by the runtime
}

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET,OPTIONS")
    res.header("Access-Control-Allow-Headers", "Content-Type")
    next()
})

const port = 3000;

app.get('/hello', (req, res) => {
    const n = req.query.n

    if (!n) {
        return  res.send('Please provide a number n, like /hello?n=5')
    }

    const result = 1 + Number(n)

    res.send('1 + ' + n + ' = ' + result)
});


app.get('/facts', async (req, res) => {
    const name = req.query.name
    const country = req.query.country

    const API_KEY = process.env.GROQ_API_KEY || process.env.API_KEY
    const url = 'https://api.groq.com/openai/v1/chat/completions'

    if (!API_KEY) {
        console.error('Missing GROQ_API_KEY (or API_KEY) environment variable')
        return res.status(500).send('Server misconfigured: missing API key')
    }

    if (!name || !country) {
        return  res.send('Please provide name and country, like /facts?name=John&country=Canada')
    }

    const data = {
        model: 'openai/gpt-oss-20b',
        messages:[{ 
        role: 'user', 
        content: `Give me 2 fun facts about ${country} in 2 sentences.` 
        }]
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify(data)          
    });
    
    const json = await response.json();
    const facts = json.choices[0].message.content;




    res.send('Hello ' + name + ' you are from ' + country + '!' + ' and...' + facts)

    //CODE AI

});

app.listen(port, () => console.log('Listening on port ' + port))

