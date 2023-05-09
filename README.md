# Track And Trace Supply API

## Project Title

Supply Chain Track and Trace System

## Description

This System allows users to track and trace supply chain
items.

## Features

-   Creating new supply chain items
-   Updating supply chain item reference data
-  Adding new events associated with an item
- Querying all events of an item.
- Querying the last event of an item

## Technologies

-   Node
-   Express
-   Prisma
- Zod

## Installation

1.  Clone the repository
2.  Install dependencies with `npm install`
3. Add a `.env` file and add the `DATABASE_URL` and `JWT_SECRET`

## Usage

1.  Start the server with `npm run dev`
2.  Open your browser and go to `http://localhost:3000`
3. You need to login to use the endpoints
4. The auth have `/auth` prefix
5. The other endpoints have `/api` prefix
6. To access the API documentation navigate to `http://localhost:3000/api-docs/#/`
7. Start a docker container with `sh run.sh`

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
