---
title: Moon Router
---

## Moons

This file describes all endpoints and data regarding the Moon entity included in this project.
You can find sample of requests and examples of data format the should return

### All routes regarding Moons

-   `GET` `http://localhost:4000/moons` -> Returns all Moons
-   `GET` `http://localhost:4000/moons/{id}` -> Returns a Moon based on provided ID
-   `POST` `http://localhost:4000/moons/{id}` -> Adds a new Moon
-   `PUT` `http://localhost:4000/moons/{id}` -> Updates the whole entity of a Moon
-   `PATCH` `http://localhost:4000/moons/{id}` -> Updates only the provided filed of a Moon entity
-   `DELETE` `http://localhost:4000/moons{id}` -> Deletes a Moon

## `GET /moons`

This is the route that will provide you with the data for all Moons

### Route for the request

```
http://localhost:4000/moons
```

### Sample data

This is an example of what this endpoint should return

```
[
  {
    "id": 1,
    "name": "Europa",
    "distanceFromPlanet": 670900,
    "diameter": 3121.6,
    "orbitalPeriod": 3.551,
    "planet": 5
  }
]
```

## `GET /moons/{id}`

This is the route that will provide you with the data for a chosen Moon

### Route for the request

```
http://localhost:4000/moons/id
```

### Sample data

This is an example of what this endpoint should return

```
  {
    "id": 1,
    "name": "Europa",
    "distanceFromPlanet": 670900,
    "diameter": 3121.6,
    "orbitalPeriod": 3.551,
    "planet": 5
  }
```

## `POST /moons`

This is the route that you can use to add a Moon

### Route for the request

```
http://localhost:4000/moons
```

### Sample data

This is an example of the data you should provide to for this endpoint

```
  {
    "name": "Europa",
    "distanceFromPlanet": 670900,
    "diameter": 3121.6,
    "orbitalPeriod": 3.551,
    "planet": 5
  }
```

## `PUT /moons/{id}`

This is the route that you can use to update a chosen Moon

### Route for the request

```
http://localhost:4000/moons/id
```

### Sample data

This is an example of the data you should provide to for this endpoint

```
  {
    "name": "Europa",
    "distanceFromPlanet": 670900,
    "diameter": 3121.6,
    "orbitalPeriod": 3.551,
    "planet": 5
  }
```

## `PATCH /moons/{id}`

This is the route that you can use to update a chosen Moon

### Route for the request

```
http://localhost:4000/moons/{id}
```

### Sample data

This is an example of the data you should provide to for this endpoint

```
  {
    "name": "Europa",
  }
```

## `DELETE /moons/{id}`

This is the route that you can use to delete a Moon

### Route for the request

```
http://localhost:4000/moons/id
```

### Sample data

This endpoint returns a 204 code when the delete is successful so you won't see any data
