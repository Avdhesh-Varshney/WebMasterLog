# jwt-authentication-with-roles-api

This api helps user to get a modern starting project for production use. This is a standard setup for any production level project. The different files are used to handle different functions. You can clone it to get started on your project quickly.

Here are the basic endpoints, middlewares and authentication tokens features it provides with their endpoints

## Features

- **User Authentication**

  - Register
  - Login
  - Logout
  - Refresh Token

- **User Roles**
  - Admin
  - User

## Endpoints

- **Register User**

  - POST api/v1/user/register

    ![alt text](images/image.png)

- **Register Admmin**

  - POST api/v1/user/register-admin

    ![alt text](images/register_admin.png)

- **Login User**

  - POST api/v1/user/login

  ![alt text](images/image-1.png)

- **Logout User**

  - POST api/v1/user/logout

  ![alt text](images/logout.png)

- **Refresh Token**

  - POST api/v1/user/refresh-token

  ![alt text](images/refresh.png)

- **Protected User Route**

  - GET api/v1/user/i-am-user

  ![alt text](images/protectedUser.png)

- **Protected Admin Route**
  - GET api/v1/user/i-am-admin
  ![alt text](images/protected_admin.png)
