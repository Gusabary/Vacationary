# HTTP verbs

Here is my comprehension after learning about [CRUD](https://www.codecademy.com/articles/what-is-crud) and [REST](https://www.codecademy.com/articles/what-is-rest).

## Intro

CRUD means four basic types of functionality when building APIs: **Create, Read, Update** and **Delete**.

And there are four HTTP verbs corresponding with them respectively: **Post, Get, Put** and **Delete**.

Also, both request and response have header and, in some cases, body.

## Post

### request: 

**header:** `POST` + `URL`

**body:** the information of newly created resource.

### response:

**header:** Code 201 (CREATED) + Content-type

**body:** the information of newly created resource with ID.

## Get

### request:

**header:** `GET` + `URL` (+`ID`) + Accept

**body:** none.

### response:

**header:** Code 200 (OK) + Content-type

**body:** the information of required resources.

## Put

### request:

**header:** `PUT` + `URL` + `ID`

**body:** the new information.

### response:

**header:** Code 200 (OK)

**body:** not necessary.

## Delete

### request:

**header:** `DELETE` + `URL` + `ID`

**body:** none.

### response:

**header:** Code 204 (NO CONTENT)

**body:** none.

## supplement: REST

>REST, or REpresentational State Transfer, is an architectural style for providing standards between computer systems on the web, making it easier for systems to communicate with each other.

It has two major advantages:

+ Separation of client and server.
+ Statelessness of systems.

##### Last-modified date: 2019.1.21, 5 p.m.