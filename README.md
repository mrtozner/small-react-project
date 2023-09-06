
## Prerequisites:

- Docker
- Docker Compose
- Node.js
- npm or Yarn 


## Setup:

1. **Etc/Hosts Configuration**:
    - Add these to your `/etc/hosts` file:
      ```
      127.0.0.1 backend.soho.conf
      127.0.0.1 client.soho.conf
      ```

2. **Using Docker**:
    - If this is your first time use this command and after the build it will start:
      ```
      docker-compose up -d --build
      ```
    - In root directory run dev:
      ```
      docker-compose up -d
      ```

3. **Without Docker**:
    - Backend:
      ```
      cd backend
      npm install
      npm start
      ```
    - Client:
      ```
      cd client
      npm install
      npm start
      ```

## Access:

- **Client**: Open your browser and navigate to `http://client.soho.conf`
- **Backend**: APIs and services are available at `http://backend.soho.conf`

## Notes:

- For the backend, ensure that the environment variables in `variables.env` are correctly set according to your requirements.
- The client's frontend is built with React.js, and you might need to refer to the existing `client/README.md` for more specific details.
