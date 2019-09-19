CREATE TABLE rooms (
  id INT NOT NULL PRIMARY KEY,
  hostName VARCHAR(25),
  hostUrl VARCHAR(288)
);

CREATE TABLE users (
  id INT NOT NULL PRIMARY KEY,
  custName VARCHAR(25),
  custUrl VARCHAR(288)
);

CREATE TABLE reviewRecords (
  uid VARCHAR(50) PRIMARY KEY,
  roomId INT NOT NULL,
  custId INT NOT NULL,
  custDate TIMESTAMP,
  custReview VARCHAR(500),
  overallRating smallint,
  accuracyRating smallint,
  commRating smallint,
  cleanRating smallint,
  locationRating smallint,
  checkinRating smallint,
  valueRating smallint,
  hostDate TIMESTAMP,
  hostResponse VARCHAR(500),
  FOREIGN KEY (roomId)
    REFERENCES rooms(id),
  FOREIGN KEY (custId)
    REFERENCES users(id)
);