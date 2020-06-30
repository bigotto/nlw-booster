import express from 'express';

const app = express();
const port = 3333;

app.get('/users', (req, res) => {
    res.json([
        "Bruno",
        "Gustavo",
        "Bigotto",
    ]);
})


app.listen(port, () => {
    console.log('Server running on port ' + port)
})