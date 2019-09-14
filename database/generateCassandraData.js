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
.query(`COPY reviews_join
TO '/mnt/c/Users/chenw/Desktop/reviews-module/database/reviews_join.csv' DELIMITER ',' CSV;`)
.then(res => console.log("review_join.csv created!"))
.catch((err) => console.log(err))