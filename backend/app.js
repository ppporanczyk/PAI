const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const booksRouter = require('./routes/books')
const usersRouter = require('./routes/users')
const bookRatingsRouter = require('./routes/bookRatings')

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: "*",
  methods: "*",
  credentials: true
}))
app.use(bodyParser.json());

app.get('/', (req, res) => {res.json({message: 'alive'});});
  
app.use('/book', booksRouter);
app.use('/user', usersRouter);
app.use('/rating', bookRatingsRouter);


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });