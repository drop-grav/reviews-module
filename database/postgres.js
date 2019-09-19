const { Client } = require('pg');
const client = new Client({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "reviews"
})

client.connect()
  .then(() => console.log("Connected to postgres!"))
  .catch((err) => console.log(err))

client
  .query(`COPY rooms 
    FROM '~/reviews-module/database/rooms.csv' DELIMITER ',' CSV;`)
  .then(res => console.log("table rooms created!"))
  .catch((err) => console.log(err))

client
  .query(`COPY users 
    FROM '~/reviews-module/database/users.csv' DELIMITER ',' CSV;`)
  .then(res => console.log("table users created!"))
  .catch((err) => console.log(err))

client
  .query(`COPY reviewRecords
    FROM '~/reviews-module/database/reviewRecords.csv' DELIMITER ',' CSV;`)
  .then(res => console.log("table reviewRecords created!"))
  .catch((err) => console.log(err))
  .then(
    client
    .query(`CREATE TABLE reviews_join 
      AS SELECT 
      reviewRecords.uid,
      reviewRecords.roomId,
      reviewRecords.custId,
      users.custName,
      reviewRecords.custDate,
      users.custUrl,
      reviewRecords.custReview,
      reviewRecords.overallRating,
      reviewRecords.accuracyRating,
      reviewRecords.commRating,
      reviewRecords.cleanRating,
      reviewRecords.locationRating,
      reviewRecords.checkinRating,
      reviewRecords.valueRating,
      rooms.hostName,
      reviewRecords.hostDate,
      rooms.hostUrl,
      reviewRecords.hostResponse 
      FROM reviewRecords INNER JOIN users on reviewRecords.custId = users.id 
      INNER JOIN rooms on reviewRecords.roomId =rooms.id;`)
    .then(res => console.log("joined table created!"))
    .catch((err) => console.log(err))
    .then(
      client.query(`CREATE INDEX room_index ON reviews_join (roomId)`)
      .then(res => console.log("index for room id in reviews_join table created"))
      .catch((err) => console.log(err))
      .then(
        client.query(`CREATE INDEX uid_index ON reviews_join (uid)`)
        .then(res => console.log("index for uid in reviews_join table created"))
        .catch((err) => console.log(err))
      )
    )
  )

