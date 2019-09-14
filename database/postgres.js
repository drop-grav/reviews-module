const {Client} = require('pg');
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
FROM '/mnt/c/Users/chenw/Desktop/reviews-module/database/rooms.csv' DELIMITER ',';`)
.then(res => console.log("table rooms created!"))
.catch((err) => console.log(err))

client
.query(`COPY users 
FROM '/mnt/c/Users/chenw/Desktop/reviews-module/database/users.csv' DELIMITER ',' CSV;`)
.then(res => console.log("table users created!"))
.catch((err) => console.log(err))

client
.query(`COPY reviewRecords
FROM '/mnt/c/Users/chenw/Desktop/reviews-module/database/reviewRecords.csv' DELIMITER ',' CSV;`)
.then(res => console.log("table reviewRecords created!"))
.catch((err) => console.log(err))

client
.query(`CREATE TABLE reviews_join 
AS SELECT 
reviewRecords.id,
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
INNER JOIN rooms on reviewRecords.roomId =rooms.id ORDER BY reviewRecords.id;`)
.then(res => console.log("joined table created!"))
.catch((err) => console.log(err))
