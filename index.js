const express = require('express');
const urlRoute = require('./routes/url');
const { connectToMongoDB } = require('./connect');
const app = express();
const URL = require('./models/url');

connectToMongoDB('mongodb://localhost:27017/short-url')
    .then(() => console.log('MongoDb connected')
    );

app.use(express.json());

app.use('/url', urlRoute);

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId, 
    },
        {
            $push: {
                visitedHistory: {
                    timestamp: Date.now(),
                }
            }
        }
    )
    res.redirect(entry.redirectUrl);
})

const PORT = 8001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})