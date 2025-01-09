---
title: Planet Router
---

## Planets

This file describes all endpoints and data regarding the Planet entity included in this project.
You can find sample of requests and examples of data format the should return

### All routes regarding Planets

-   `GET` `http://localhost:4000/planets` -> Returns all Planets
-   `GET` `http://localhost:4000/planets/{id}` -> Returns a Planet based on provided ID
-   `POST` `http://localhost:4000/planets/{id}` -> Adds a new Planet
-   `PUT` `http://localhost:4000/planets/{id}` -> Updates the whole entity of a Planet
-   `PATCH` `http://localhost:4000/planets/{id}` -> Updates only the provided filed of a Planet entity
-   `DELETE` `http://localhost:4000/planets{id}` -> Deletes a Planet

## `GET /planets`

This is the route that will provide you with the data for all Planets

### Route for the request

```
http://localhost:4000/planets
```

### Sample data

This is an example of what this endpoint should return

```
[
  {
    "id": 1,
    "name": "Earth",
    "climate": "Temperate",
    "diameter": 12742,
    "orbitalPeriod": 365,
    "dayLength": 24,
    "galaxy": 1
  }
]
```

## `GET /planets/{id}`

This is the route that will provide you with the data for a chosen Planet

### Route for the request

```
http://localhost:4000/planets/id
```

### Sample data

This is an example of what this endpoint should return

```
  {
    "id": 1,
    "name": "Earth",
    "climate": "Temperate",
    "diameter": 12742,
    "orbitalPeriod": 365,
    "dayLength": 24,
    "galaxy": 1
  }
```

## `POST /planets`

This is the route that you can use to add a Planet

### Route for the request

```
http://localhost:4000/planets
```

### Sample data

This is an example of the data you should provide to for this endpoint

```
  {
    "name": "Earth",
    "climate": "Temperate",
    "diameter": 12742,
    "orbitalPeriod": 365,
    "dayLength": 24,
    "galaxy": 1
  }
```

## `PUT /planets/{id}`

This is the route that you can use to update a chosen Planet

### Route for the request

```
http://localhost:4000/planets/id
```

### Sample data

This is an example of the data you should provide to for this endpoint

```
  {
    "name": "Earth",
    "climate": "Temperate",
    "diameter": 12742,
    "orbitalPeriod": 365,
    "dayLength": 24,
    "galaxy": 1
  }
```

## `PATCH /planets/{id}`

This is the route that you can use to update a chosen Planet

### Route for the request

```
http://localhost:4000/planets/{id}
```

### Sample data

This is an example of the data you should provide to for this endpoint

```
  {
    "name": "Earth",
  }
```

## `DELETE /planets/{id}`

This is the route that you can use to delete a Planet

### Route for the request

```
http://localhost:4000/planets/id
```

### Sample data

This endpoint returns a 204 code when the delete is successful so you won't see any data
