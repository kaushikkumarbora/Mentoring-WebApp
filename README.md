# GetMentoring

## Setup Env
1. Install Node
2. Install deps in `server/` and `client/` folders (`npm i`)
3. Create a `.env` file in `server/database/` using `server/database/example.env` with password and user.
4. Create a `.env` file in `server/methods/auth` using `server/methods/auth/example.env` with secret key.

>In Both files replace '...' with what ever you want.

## Start
1. Change working directory to `server/` (`cd server`)
2. Start containers (`docker-compose up`)

## Build
> Only if you changed the frontend
1. Change working directory to `client/` (`cd client`)
2. Install dependencies (`npm i`)
3. Build (`npm run build`)
4. Copy build folder (`client/build/`) to `server` folder

Looks like I chose a very bad ORM. No Error handling for ConnectionErrors :(