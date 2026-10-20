# TrackWise

Prototype fleet-tracking web app: drivers share their live location from the browser, and truck owners see a dashboard and a map of their fleet.

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?logo=leaflet&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?logo=chartdotjs&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white)
![OpenCV](https://img.shields.io/badge/OpenCV-5C3EE8?logo=opencv&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## About

TrackWise has two kinds of accounts. **Users** (drivers) open a location page that reads their position from the browser's Geolocation API, shows it on a map and sends it to the server. **Owners** (admins) get a dashboard of per-truck charts and a monitor page that plots users on a map. The repo also has Python/Jupyter prototypes for driver-safety features: drowsiness detection, lane detection and a QR-code accident alert.

## Features

### Web app (Node.js)

- **Separate auth for users and owners**: register and log in with email and password. Passwords are hashed with bcrypt and sessions are handled by `express-session`. Owner and user pages are protected by session checks.
- **Location sharing (users)**: *Start Sharing location* reads the browser's position every 3 seconds, shows it on a Leaflet / OpenStreetMap map and POSTs `latitude`, `longitude` and `accuracy` to `/user/:username/location`. *Stop Sharing location* stops it.
- **Owner dashboard**: Chart.js charts for trucks 1 to 5: distance travelled per hour and per day, speed, a fuel/battery indicator and an expenses breakdown (pie chart).
- **Live monitor (owners)**: a Leaflet map with a named marker for each user, refreshed every 15 seconds while monitoring is on.

### ML prototypes (`ml_models/`)

- **Drowsiness detection** (`sleep_detection/`): OpenCV and dlib's 68-point face-landmark model compute an eye-blink ratio from the webcam feed and label the driver *Active*, *Drowsy* or *Sleeping*.
- **Lane detection** (`lane_detection/`): Colab notebooks that use camera calibration, colour/gradient thresholding and perspective transforms to find lane lines in images and video.
- **QR-code accident alert** (`qrcode/`): decodes emergency phone numbers from an uploaded QR code and sends them an SMS with a Google Maps location link through Twilio.

## Tech Stack

| Area | Technology |
| --- | --- |
| Server | Node.js, Express 4, express-session, body-parser, dotenv |
| Auth | bcrypt |
| Frontend | HTML, CSS, JavaScript, Bootstrap 5 |
| Maps and charts | Leaflet 1.9 with OpenStreetMap tiles, Chart.js |
| ML prototypes | Python, Jupyter / Google Colab, OpenCV, dlib, imutils, NumPy, qrcode, geopy, Twilio |

## Project Structure

```
TrackWise/
├── server.js            # Entry point: middleware, sessions, route mounting, 404
├── routes/
│   ├── users.js         # /user/* routes
│   └── owners.js        # /owner/* routes
├── controllers/         # users.js, owners.js: auth, page rendering, location intake
├── userList.js          # In-memory user store
├── ownerList.js         # In-memory owner store
├── views/               # Static HTML pages (homepage, 404, users/, owners/)
├── public/
│   ├── javascripts/     # Chart.js chart scripts for the owner dashboard
│   ├── stylesheets/
│   └── assests/         # Images
└── ml_models/           # Python / Jupyter prototypes (drowsiness, lane detection, QR alert)
```

## Getting Started

### Prerequisites

- Node.js and npm
- For the ML prototypes: Python 3 with Jupyter (or Google Colab) and the libraries imported in each notebook

### Installation

```bash
git clone https://github.com/AryanDeswal/TrackWise.git
cd TrackWise
npm install
```

### Environment Variables

Optional. You can set these in a `.env` file, which is loaded when `NODE_ENV` is not `production`:

| Variable | Purpose |
| --- | --- |
| `SECRET` | Secret used to sign session cookies (falls back to a hard-coded default, so set it outside local development) |
| `PORT` | Port for the server (defaults to `3000`) |
| `NODE_ENV` | Set to `production` to skip loading `.env` |

### Run

```bash
npm start        # node server.js
npm run serve    # nodemon server.js (auto-restart during development)
```

Then open `http://localhost:3000`.

## API Reference

| Method | Route | Auth | Description |
| --- | --- | --- | --- |
| GET | `/` | No | Landing page with login and register links for users and owners |
| GET / POST | `/user/register` | No | User registration page and handler (`name`, `email`, `password`) |
| GET / POST | `/user/login` | No | User login page and handler (`email`, `password`) |
| GET | `/user/logout` | No | End the session |
| GET | `/user/:username` | User | User home page |
| GET | `/user/:username/location` | User | Location-sharing page with a map |
| POST | `/user/:username/location` | User | Accept JSON `{ latitude, longitude, accuracy }` and return a confirmation |
| GET / POST | `/owner/register` | No | Owner registration page and handler (`name`, `email`, `password`) |
| GET / POST | `/owner/login` | No | Owner login page and handler (`email`, `password`) |
| GET | `/owner/logout` | No | End the session |
| GET | `/owner/:ownername` | Owner | Owner dashboard with fleet charts |
| GET | `/owner/:ownername/monitor` | Owner | Map of user locations |

## Project Status

TrackWise is a prototype, and several pieces are not connected yet:

- Accounts are kept in memory (`userList.js`, `ownerList.js`) and are lost when the server restarts. There is no database.
- The server logs posted coordinates but does not store or forward them, so the owner monitor map shows sample locations instead of live user data.
- Dashboard charts use sample data from the scripts in `public/javascripts/`.
- After login, users and owners are redirected to fixed demo profiles (`/user/pawan`, `/owner/ram`).
- The ML prototypes are standalone notebooks and scripts that are not integrated with the web app.

## Contributors

<a href="https://github.com/AryanDeswal/TrackWise/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=AryanDeswal/TrackWise" />
</a>

## License

Released under the [MIT License](LICENSE).
