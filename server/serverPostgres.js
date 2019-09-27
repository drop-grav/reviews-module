// const newRelic = require('newrelic');
const cors = require('cors');
const express = require('express');
const app = express();
const _ = require('underscore');
const PORT = 3000;
const {Pool} = require('pg');
const pool1 = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "reviews"
})
const pool2 = new Pool({
  user: "postgres",
  password: "postgres",
  host: '54.215.248.247',
  port: 5432,
  database: "reviews"
})
const bodyParser = require('body-parser');
app.use(cors());
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
pool1.connect()
.then(res => console.log('Connected to slave!'))
.catch(err => console.log(err));
pool2.connect()
.then(res => console.log('Connected to master!'))
.catch(err => console.log(err));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));
app.use('/listing/', express.static(__dirname + '/../client/dist'));
app.use('/listing/:id', express.static(__dirname + '/../client/dist'));
app.get('/api/rooms/:roomId/reviews', (req, res) => {
  pool1.query(`SELECT * FROM reviews_join WHERE roomId = ${req.params.roomId}`, (err, resData) =>{
    if (err){
      console.log(err);
    }else{
      res.send(resData.rows);
    }
  })
});

app.post('/api/rooms/:roomId/reviews', (req, res) => {
  const dataToAdd = Object.values(req.body).map(val =>{
    if (typeof val === 'number'){
      return `${val}`;
    }else if(typeof val === 'string'){
      return `'${val}'`;
    }
  }).join(',');
  pool2.query(`INSERT INTO reviews_join VALUES(${dataToAdd})`, (err, result) =>{
    if (err){
      console.log(err);
      res.status(400).send(err);
    }else{
      res.sendStatus(200);
    }
  })
});


app.put('/api/rooms/:roomId/reviews/:reviewId', (req, res) => {
  const dataToUpdate = req.body;
  const queryText = _.pairs(dataToUpdate).map(arr =>{
    if(typeof arr[1] === 'number'){
      return `${arr[0]}=${arr[1]}`
    }else if(typeof arr[1] === 'string'){
      return `${arr[0]}='${arr[1]}'`
    }
  }).join(',');
  pool2.query(`UPDATE reviews_join SET ${queryText} 
  WHERE uid = '${req.params.reviewId}';
  `, (err, result)=>{
    if (err){
      res.status(400).send(err);
    }else{
      res.sendStatus(200)
    }
  })
});

app.delete('/api/rooms/:roomId/reviews/:reviewId', (req, res) => {
  pool2.query(`DELETE FROM reviews_join WHERE uid = '${req.params.reviewId}'`, (err, result)=>{
    if (err){
      res.status(400).send(err);
    }else{
      res.sendStatus(200)
    }
  })
});