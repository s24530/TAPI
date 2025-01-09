---
title: Galaxy Router
---

## Galaxies

This file describes all endpoints and data regarding the Galaxy entity included in this project.
You can find sample of requests and examples of data format the should return

### All routes regarding Galaxies

-   `GET` `http://localhost:4000/galaxies` -> Returns all Galaxies
-   `GET` `http://localhost:4000/galaxies/{id}` -> Returns a Galaxy based on provided ID
-   `POST` `http://localhost:4000/galaxies/{id}` -> Adds a new Galaxy
-   `PUT` `http://localhost:4000/galaxies/{id}` -> Updates the whole entity of a Galaxy
-   `PATCH` `http://localhost:4000/galaxies/{id}` -> Updates only the provided filed of a Galaxy entity
-   `DELETE` `http://localhost:4000/galaxies{id}` -> Deletes a Galaxy

## `GET /galaxies`

This is the route that will provide you with the data for all Galaxies

### Route for the request

```
http://localhost:4000/galaxies
```

### Sample data

This is an example of what this endpoint should return

```
[
  {
    "id": 1,
    "name": "Milky Way",
    "distance": 27000,
    "size": 100000,
    "mainStar": "Sun"
  }
]
```

## `GET /galaxies/{id}`

This is the route that will provide you with the data for a chosen Galaxy

### Route for the request

```
http://localhost:4000/galaxies/{id}
```

### Sample data

This is an example of what this endpoint should return

```
  {
    "id": 1,
    "name": "Milky Way",
    "distance": 27000,
    "size": 100000,
    "mainStar": "Sun"
  }
```

## `POST /galaxies`

This is the route that you can use to add a Galaxy

### Route for the request

```
http://localhost:4000/galaxies
```

### Sample data

This is an example of the data you should provide to for this endpoint

```
  {
    "name": "Milky Way",
    "distance": 27000,
    "size": 100000,
    "mainStar": "Sun"
  }
```

## `PUT /galaxies/{id}`

This is the route that you can use to update a chosen Galaxy

### Route for the request

```
http://localhost:4000/galaxies/{id}
```

### Sample data

This is an example of the data you should provide to for this endpoint

```
  {
    "name": "Milky Way",
    "distance": 27000,
    "size": 100000,
    "mainStar": "Sun"
  }
```

## `PATCH /galaxies/{id}`

This is the route that you can use to update a chosen Galaxy

### Route for the request

```
http://localhost:4000/galaxies/{id}
```

### Sample data

This is an example of the data you should provide to for this endpoint

```
  {
    "name": "Milky Way"
  }
```

## `DELETE /galaxies/{id}`

This is the route that you can use to delete a Galaxy

### Route for the request

```
http://localhost:4000/galaxies/{id}
```

### Sample data

This endpoint returns a 204 code when the delete is successful so you won't see any data
