# /users/register Endpoint Documentation

## Description
The `/users/register` endpoint registers a new user. It validates the incoming data and creates a new user in the system. On success, it returns the user details and an authentication token.

## HTTP Method
POST

## Request URL
`/users/register`

## Required Data Format (JSON)
```json
{
  "fullname": {
    "firstname": "string (min 3 characters)",
    "lastname": "string (optional, min 3 characters if provided)"
  },
  "email": "string (valid email format)",
  "password": "string (min 6 characters)"
}