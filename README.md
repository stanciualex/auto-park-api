Step 1. Install RethinkDB on OSX:
 ```
 brew update && brew install rethinkdb
 ```
For Windows you can follow this steps: [https://rethinkdb.com/docs/install/windows/](https://rethinkdb.com/docs/install/windows/)
 
Step 2. Start RethinkDB server (default port 8080):
 ```
 rethinkdb
 ```
 
Step 3. Open another terminal tab. Install dependencies:
 ```
 yarn install
 ```
 
Step 4. Install nodemon globally 
```
yarn global add nodemon --prefix /usr/local
``` 
Step 4. Start node server (default port is 8000 
```
nodemon server.js
```

Step 5. Populate the database 
```
npm run populate-db
```

## Learn More 


### User
Property | Type
--- | ---
firstName | string
lastName | string
email | string*
password | string*
description | string
picture | binary object
jobTitle | string
role | string*
createdAt | date
deleted | boolean

#### POST `/users` - create a user
Body example:
```
{
    firstName: "Nicolae",
    lastName: "Guta",
    email: "nicolae.guta@nek-music.ro",
    password: "locul1numai1suntmereupelocul1",
    description: "Magnificul Guta, regele lautarilor",
    picture: File,
    jobTitle: "Lautr",
    role: "admin" // 'admin' / 'user'
}
```
#### GET `/users` - get all users
#### GET `/users/:id` - get a user
#### PUT `/users/:id` - update a user
#### DELETE `/users/:id` - delete a user
#### POST `/users/login` - login user
Body example:
```
{
    email: "nicolae.guta@nek-music.ro",
    password: "locul1numai1suntmereupelocul1"
}
```
#### POST `/users/invite` - invite a user
Body example:
```
{
    email: "nicolae.guta@nek-music.ro",
    role: "admin" // 'admin' or 'user'
}
```
<br/><br/><br/>


### Demage
Property | Type
--- | ---
carId | string*
userId | string*
date | date*
details | string*
location | string
images | binary object
solveDate | date
solved | boolean
deleted | boolean

#### POST `/damages` - create a damage
#### GET `/damages` - get all damages
#### GET `/damages/:id` - get a damage
#### PUT `/damages/:id` - update a damage
#### DELETE `/damages/:id` - delete a damage
<br/><br/><br/>



### Car
Property | Type
--- | ---
id | string
vin | string
manufacturer | string
model | string
engine | string
color | string
image | binary object
licencePlate | string
fabricationDate | date
insuranceValability | date
itpValability | date
nextService | date
deleted | boolean
#### POST `/cars` - create a car
#### GET `/cars` - get all cars
#### GET `/cars/:id` - get a car
#### PUT `/cars/:id` - update a car
#### DELETE `/cars/:id` - delete a car
<br/><br/><br/>



### Rental
Property | Type
--- | ---
id | string
carId | string
userId | string
startDate | date
endDate | date
details | string
state | string
deleted | boolean
#### POST `/rentals` - create a rental
#### GET `/rentals` - get all rentals
#### GET `/rentals/:id` - get a rental
#### PUT `/rentals/:id` - update a rental
#### DELETE `/rentals/:id` - delete a rental