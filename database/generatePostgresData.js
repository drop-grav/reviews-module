const faker = require('faker');
const fs = require('fs');
const uuidv4 = require('uuid/v4')
const numOfReviews = 500;
const numOfRooms = 100;
const numOfUsers = 300;
function generateReviews() {
  let reviews;
  let custId = Math.ceil(Math.random() * numOfUsers);
  let custDate = faker.date.past().toISOString();
  let custReview = faker.lorem.sentence();
  let overallRating = Math.floor(Math.random() * 6);
  let accuracyRating = Math.floor(Math.random() * 6);
  let commRating = Math.floor(Math.random() * 6);
  let cleanRating = Math.floor(Math.random() * 6);
  let locationRating = Math.floor(Math.random() * 6)  ;
  let checkinRating = Math.floor(Math.random() * 6);
  let valueRating = Math.floor(Math.random() * 6);
  let hostDate = faker.date.recent().toISOString();
  let hostResponse = faker.lorem.words();
  let roomId = Math.ceil(Math.random() * numOfRooms);
  reviews = [
    roomId,
    custId,
    custDate,
    custReview,
    overallRating,
    accuracyRating,
    commRating,
    cleanRating,
    locationRating,
    checkinRating,
    valueRating,
    hostDate,
    hostResponse
  ];
  return reviews;
}

const write = (writer, data) => {
  return new Promise((resolve) => {
    if (!writer.write(data)) {
      writer.once('drain', resolve)
    }
    else {
      resolve()
    }
  })
}

const fileGenerator = async (filePath, num, iterator) => {
  const write_stream = fs.createWriteStream(filePath)
  const max = num
  let current = 1
  while (current <= max) {
    await write(write_stream, iterator(current));
    current++;
  }
  await console.log(filePath.slice(11) + ' created!')
}

const reviewRecord = (num) => {
  return `${uuidv4()},${generateReviews().join(',')}\n`;
}

const roomRecord = (num) => {
  return `${num},${faker.name.firstName()},${faker.image.avatar()}\n`;
}

const userRecord = (num) => {
  return `${num},${faker.name.firstName()},${faker.image.avatar()}\n`;
}

fileGenerator('./database/reviewRecords.csv', numOfReviews, reviewRecord);
fileGenerator('./database/rooms.csv', numOfRooms, roomRecord);
fileGenerator('./database/users.csv', numOfUsers, userRecord);