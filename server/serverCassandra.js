const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3001;
const cassandra = require('cassandra-driver');
const _ = require('underscore');
const uuidv4 = require('uuid');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

const client = new cassandra.Client({ 
  contactPoints: ['127.0.0.1'], 
  localDataCenter: 'datacenter1', 
  keyspace: 'reviews' 
});

app.get('/api/rooms/:roomId/reviews', (req, res) => {
  client.execute(`SELECT * FROM reviews.review WHERE roomId = ${req.params.roomId}`)
  .then(resData => res.send(resData.rows))
  .catch(err => {
    console.log(err);
    res.send(err);
  });
});

app.post('/api/rooms/:roomId/reviews', (req, res) => {
  const dataToAdd = `${uuidv4()},` + Object.values(req.body).map(val =>{
    if (typeof val === 'number'){
      return `${val}`;
    }else if(typeof val === 'string'){
      return `'${val}'`;
    }
  }).join(',');
  client.execute(`INSERT INTO reviews.review(uid,${Object.keys(req.body).join(',')}) VALUES (${dataToAdd})`)
  .then(() => res.sendStatus(200))
  .catch(err => {
    console.log(err);
    res.status(400).send(err);
  });
});

app.put('/api/rooms/:roomId/reviews/:reviewId', (req, res) => {
  console.log(req.body)
  const dataToUpdate = req.body;
  const queryText = _.pairs(dataToUpdate).map(arr =>{
    if(typeof arr[1] === 'number'){
      return `${arr[0]}=${arr[1]}`
    }else if(typeof arr[1] === 'string'){
      return `${arr[0]}='${arr[1]}'`
    }
  }).join(',');
  client.execute(`UPDATE reviews.review SET ${queryText}
  WHERE roomId = ${req.params.roomId} AND uid = ${req.params.reviewId};
  `)
  .then(() => res.sendStatus(200))
  .catch(err => {
    console.log(err);
    res.status(400).send(err);
  });
});

app.delete('/api/rooms/:roomId/reviews/:reviewId', (req, res) => {
  client.execute(`DELETE FROM reviews.review WHERE roomId = ${req.params.roomId} AND uid = ${req.params.reviewId}`)
  .then(() => res.sendStatus(200))
  .catch(err => {
    console.log(err);
    res.status(400).send(err);
  });
});