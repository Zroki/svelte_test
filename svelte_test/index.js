const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const { readFileSync } = require('fs')
const cors = require('cors');

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.resolve(`${__dirname}/frontend`, 'public')))

app.use(bodyParser.json())

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST'],
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/frontend`, 'public', 'index.html'))
})

app.get('/users', (req, res) => {
  const { page } = req.query;

  try {
    const file = readFileSync(path.resolve(__dirname, 'data', `page${ page }.json`), "utf8");

    res.send({
      success: true,
      page,
      data: JSON.parse(file)
    })
  } catch (error) {
    res.status(404).send({
      success: false,
      page,
      data: []
    })
  }

})

app.listen(3000)