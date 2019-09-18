# Project Name
Reviews module

## Related Projects
- https://github.com/drop-grav/reservation-module
- https://github.com/drop-grav/gallery-service
- https://github.com/drop-grav/reviews-module
- https://github.com/drop-grav/recommendations-module
## Table of Contents
1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage
> First use postgres shell to load postgres.sql
> npm run seed:postgres
> npm run postgres
> npm run seed:cassandra
> use cqlsh to load cassandra.cql
## Requirements

- Node 6.11.2

## Development
- npm install
- npm run build:dev
- npm run postgres
- npm run cassandra
## RESTful CRUD API Routes
- Create / POST - create a new review to database: /api/rooms/:roomId/reviews/

- Read / GET - read the reviews from the given restaurant: /api/rooms/:roomId/reviews

- Update / PUT - update an review in database: /api/rooms/:roomId/reviews/:reviewId

- Delete / DELETE - delete an review in database: /api/rooms/:roomId/reviews/:reviewId