# Railway Deployment

This project is easiest to deploy to Railway as two services from the same repo:

1. `frontend`
2. `backend`

## 1. Push this repo

Use the Git repo at `PROJECT/assessment-monitor`.

## 2. Create the backend service

- In Railway, create a new service from this repo.
- Set the service root directory to `backend`.
- Railway should detect Maven automatically.
- Add a MySQL database service, then copy its connection values into the backend variables below.

Backend variables:

```env
PORT=8080
SPRING_DATASOURCE_URL=jdbc:mysql://<host>:<port>/<database>?useSSL=false&serverTimezone=UTC
SPRING_DATASOURCE_USERNAME=<username>
SPRING_DATASOURCE_PASSWORD=<password>
APP_CORS_ALLOWED_ORIGINS=https://your-frontend-service.up.railway.app
```

## 3. Create the frontend service

- Create another Railway service from the same repo.
- Set the service root directory to `/`.
- Build command:

```bash
npm install && npm run build
```

- Start command:

```bash
npx serve -s dist -l $PORT
```

Frontend variables:

```env
VITE_API_BASE_URL=https://your-backend-service.up.railway.app
```

## 4. Final wiring

- Deploy the backend first and copy its public Railway URL.
- Put that URL into the frontend variable `VITE_API_BASE_URL`.
- Put the frontend Railway URL into `APP_CORS_ALLOWED_ORIGINS` on the backend.
- Redeploy both services after saving variables.
