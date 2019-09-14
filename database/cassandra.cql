DROP KEYSPACE reviews;
CREATE KEYSPACE reviews
WITH replication = {'class': 'SimpleStrategy', 'replication_factor' : 1}
AND durable_writes = 'true';

DROP TABLE IF EXISTS reviews.review;
CREATE TABLE reviews.review (
  reviewId int,
  roomId int,
  custId int,
  custName varchar,
  custDate timestamp,
  custUrl varchar,
  custReview varchar,
  overallRating int,
  accuracyRating int,
  commRating int,
  cleanRating int,
  locationRating int,
  checkinRating int,
  valueRating int,
  hostName varchar,
  hostDate timestamp,
  hostUrl varchar,
  hostResponse varchar,
  PRIMARY KEY(reviewId, custDate)
);

COPY reviews.review(
  reviewId,
  roomId,
  custId,
  custName,
  custDate,
  custUrl,
  custReview,
  overallRating,
  accuracyRating,
  commRating,
  cleanRating,
  locationRating,
  checkinRating,
  valueRating,
  hostName,
  hostDate,
  hostUrl,
  hostResponse) FROM '/mnt/c/Users/chenw/Desktop/reviews-module/database/reviews_join.csv';