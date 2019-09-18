const uuidv4 = require('uuid');
const cassandraPost = (json) =>{
  const dataToAdd = `${uuidv4()},` + Object.values(json).map(val =>{
    if (typeof val === 'number'){
      return `${val}`;
    }else if(typeof val === 'string'){
      return `'${val}'`;
    }
  }).join(',');
  return `INSERT INTO reviews.review(uid,${Object.keys(json).join(',')}) VALUES (${dataToAdd})`
}

const postgresPost = (json) =>{
  const dataToAdd = `'${uuidv4()}',` + Object.values(json).map(val =>{
    if (typeof val === 'number'){
      return `${val}`;
    }else if(typeof val === 'string'){
      return `'${val}'`;
    }
  }).join(',');
  return `INSERT INTO reviews_join VALUES(${dataToAdd})`
}

const jsonCassandra = {
  "roomid": 1234112,
  "accuracyrating": 2,
  "checkinrating": 4,
  "cleanrating": 5,
  "commrating": 6,
  "custdate": "2019-03-25T04:30:44.019Z",
  "custid": 184357,
  "custname": "Noah",
  "custreview": "Libero neab incidunt quo rerumad waee.",
  "custurl": "https://s3.amazonaws.com/uifaces/faces/twitter/kvasnic/128.jpg",
  "hostdate": "2019-09-17T02:55:07.129Z",
  "hostname": "Sylvan",
  "hostresponse": "sit eaque vero dawe opsa",
  "hosturl": "https://s3.amazonaws.com/uifaces/faces/twitter/xalionmalik/128.jpg",
  "locationrating": 2,
  "overallrating": 4,
  "valuerating": 5
}
const jsonPostgres = {
  "roomid": 1234112,
  "custid": 184357,
  "custname": "Noah",
  "custdate": "2019-03-25T19:30:44.019Z",
  "custurl": "https://s3.amazonaws.com/uifaces/faces/twitter/kvasnic/128.jpg",
  "custreview": "Libero neab incidunt quo rerumad waee.",
  "overallrating": 4,
  "accuracyrating": 2,
  "commrating": 6,
  "cleanrating": 5,
  "locationrating": 2,
  "checkinrating": 4,
  "valuerating": 5,
  "hostname": "Sylvan",
  "hostdate": "2019-09-17T17:55:07.129Z",
  "hosturl": "https://s3.amazonaws.com/uifaces/faces/twitter/xalionmalik/128.jpg",
  "hostresponse": "sit eaque vero dawe opsa"
}

console.log(cassandraPost(jsonCassandra));
console.log(postgresPost(jsonPostgres));