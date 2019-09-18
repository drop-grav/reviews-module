const request = require('request');
request.post({
  url: 'http://localhost:3000/api/rooms/1/reviews',
  body: {
    "roomid": 24441,
    "custid": 5094037,
    "custdate": "2018-09-18T23:58:19.896Z",
    "custreview": "Quisquam voluptate odit sed illum placeat deserunt. Aliquam veniam autem quia in. Possimus tem dolor dolore. Nemo sunt modi tempore facilis deserunt. Ea aliquam delectus ut quis.",
    "overallrating": 4,
    "accuracyrating": 3,
    "commrating": 3,
    "cleanrating": 2,
    "locationrating": 4,
    "checkinrating": 3,
    "valuerating": 3,
    "hostdate": "2019-09-14T03:24:41.543Z",
    "hostresponse": "Ratione nobis tempore qui accusantium et porro deserunt rerum nulla et. Doloremque neque illum nostrum placeat quidem velit est. Quod quaerat vitae facilis quia et non qui quo."
  },
  json: true
}, (err, res, body) => {
  if (err) {
    console.log(err)
  } else {
    console.log(body)
  }
})
