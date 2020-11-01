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

## Learn More

### POST '/users' - create a user body:
  firstName: string
  
  lastName: string
  
  email: string
  
  password: string
  
  description: string
  
  picture: binary object
  
  jobTitle: string
  
  role: string
  
  createdAt: date
  
  deleted: boolean

### POST '/damages' - create a damage body:
  carId: string
  userId: string
  date: date
  details: string
  location: string
  images: binary object
  solveDate: date
  solved: boolean
  deleted: boolean
  
### POST '/cars' - create a damage body:
  id: string
  vin: string
  manufacturer: string
  model: string
  engine: string
  color: string
  image: binary object
  licencePlate: string
  fabricationDate: date
  insuranceValability: date
  itpValability: date
  nextService: date
  deleted: boolean
  
### POST '/rentals' - create a damage body:
  id: string
  carId: string
  userId: string
  startDate: date
  endDate: date
  details: string
  state: string
  deleted: boolean
