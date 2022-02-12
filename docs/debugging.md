# Debugging

Following describes debugging using `vscode`.

Specifying `DEBUG=express:*` is optional. This will enable express route traces in the debug output.

References: <https://github.com/Microsoft/vscode-recipes>

## Setup and run the service

1. Make sure Node.js is installed and running.
2. Make sure MongoDB is installed and running.
3. Make sure MongoDB is running on port 27017.
4. Make sure .env file is present in the root directory and contains the

following variables:
refer sample devenv file for more details.

### Environments Variables

 <!-- Please note following are for testing and debugging purpose do not use in production -->

1.  DATABASE_URL=mongodb://localhost:27017/testdb
2.  API_PORT=3000
3.  JWT_KEY=secret

Almost there 😉. Now run the following command to start the application in debug mode:

    ```bash
     npm run server or yarn server
    ```

## For VS code source code debugging , you need to follow the steps below

1. Create node debug launch configuration

   ```
   {
       "version": "0.2.0",
       "configurations": [
           {
               "type": "node",
               "request": "attach",
               "name": "Node: Nodemon",
               "processId": "${command:PickProcess}",
               "restart": true,
               "protocol": "inspector",
           },
       ]
   }
   ```

2. Configure nodemon to run in debug mode. [Key statement is the ``--inspect`` command]

   ```
   "dev:debug": "NODE_ENV=development nodemon index.js --inspect --exec babel-node"
   ```

## Debug

1. Start server in debug mode

   ```
   yarn dev:debug
   ```

2. Start vscode debug process by clicking the debugging icon.

3. Select node process to debug by selecting the process which was started using `--inspect` flag

4. Add breakpoints and debug

# Testing

## Testing with Postman

developed and tested API are added to Postman collection share under docs/postman.

Note that some of the endpoints require authentication.Make sure to Bear the following headers in the request:

    ```
    Authorization: Bearer <JWT_KEY>
    ```

To get the JWT Token , you can create a user and get the token from login response.
