## Follow these steps to get the project running on your local machine:

1. Clone the repository
2. `cd frontend && yarn && yarn dev`  this will download the dependencies and start the development server
3. `cd server && yarn && yarn dev`  this will download the dependencies and start the development server
4. Open your browser and navigate to `http://localhost:5173` to see the app in action

## Setup `.env`

1. create a `.env` file in the `server` directory and add the following variables:

```
PORT=3000
NODE_ENV=development
API_VERSION=v1

DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
DB_SCHEMA=
DB_SCHEMA_ADMIN=

JWT_SECRET=

RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```
2. create a `.env` file in the `frontend` directory and add the following variables:

```
VITE_AWS_ACCESS_KEY_ID=
VITE_AWS_SECRET_ACCESS_KEY=
VITE_AWS_REGION=

VITE_BUCKET_NAME=

VITE_RAZORPAY_KEY_ID=
```
