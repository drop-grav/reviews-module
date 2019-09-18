const express = require('express');
const app = express();
const _ = require('underscore');
const PORT = 3000;
const {Client} = require('pg');
const client = new Client({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "reviews"
})
const bodyParser = require('body-parser');
const uuidv4 = require('uuid');
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
client.connect()
.then(res => console.log('Connected to Postgres!'))
.catch(err => console.log(err));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));
app.get('/api/rooms/:roomId/reviews', (req, res) => {
  client.query(`SELECT * FROM reviews_join WHERE roomId = ${req.params.roomId}`, (err, resData) =>{
    if (err){
      console.log(err);
    }else{
      res.send(resData.rows);
    }
  })
});

app.post('/api/rooms/:roomId/reviews', (req, res) => {
  console.log(req.body)
  const dataToAdd = `'${uuidv4()}',` + Object.values(req.body).map(val =>{
    if (typeof val === 'number'){
      return `${val}`;
    }else if(typeof val === 'string'){
      return `'${val}'`;
    }
  }).join(',');
  console.log(dataToAdd)
  client.query(`INSERT INTO reviews_join VALUES(${dataToAdd})`, (err, result) =>{
    if (err){
      console.log(err);
      res.status(400).send(err);
    }else{
      res.sendStatus(200);
    }
  })
});


app.put('/api/rooms/:roomId/reviews/:reviewId', (req, res) => {
  console.log(req.params);
  const dataToUpdate = req.body;
  const queryText = _.pairs(dataToUpdate).map(arr =>{
    if(typeof arr[1] === 'number'){
      return `${arr[0]}=${arr[1]}`
    }else if(typeof arr[1] === 'string'){
      return `${arr[0]}='${arr[1]}'`
    }
  }).join(',');
  client.query(`UPDATE reviews_join SET ${queryText} 
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
  client.query(`DELETE FROM reviews_join WHERE uid = '${req.params.reviewId}'`, (err, result)=>{
    if (err){
      res.status(400).send(err);
    }else{
      res.sendStatus(200)
    }
  })
});