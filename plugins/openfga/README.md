# openfga

WELCOME TO OPENFGA BACKSTAGE PLUGIN .

_This plugin was created through the Backstage CLI_

## Getting started

Your plugin has been added to the example app in this repository, meaning you'll be able to access it by running `yarn start` in the root directory, and then navigating to [/openfga](http://localhost:3000/openfga).

You can also serve the plugin in isolation by running `yarn start` in the plugin directory.
This method of serving the plugin provides quicker iteration speed and a faster startup and hot reloads.
It is only meant for local development, and the setup for it can be found inside the [/dev](./dev) directory.


## Example Catalog Permission policy using openFGA

Lets take a scenario a role based access for backstage catalog delete/ungersitering an entity

Rules:

- A user who have OWNER access can read and delete the entity 
- A user who have VIEWER access can only read the entity not delete the entity

## CREATE A MODEL IN OPENFGA PLAYGROUND

![image](https://github.com/AmbrishRamachandiran/openfga-backstage-plugin/assets/133481507/701b0faa-8d77-4a58-9915-58a9b13cff8b)

## RUNNING OPENFGA SERVER AND SETUP 

TO run a openfga in your local please follow below steps 

OpenFGA is available on Dockerhub, so you can quickly start it using the in-memory datastore by running the following commands:

```
docker pull openfga/openfga
docker run -p 8080:8080 -p 3000:3000 openfga/openfga run
```


## ACCESSING OPENFGA FEATURES 

OPENFGA Model and Features can be accessable with many ways please [visit](https://openfga.dev/docs/getting-started/create-store)

In this following example OPENFGA API is used 

STEP 1: CREATE A STORE 

```
REQUEST TYPE : POST 

URL :  http://localhost:8080/stores

REQUEST BODY:

{
  "name": "backstage"
}

``` 


STEP 2 : GET A STORE 

```
REQUEST TYPE : GET

URL : http://localhost:8080/stores

EXAMPLE RESPONSE BODY:

{"stores":[{"id":"01J289TDYQ1WH9RTMQD46K7ANC", "name":"backstage", "created_at":"2024-07-08T04:32:20.951446991Z", "updated_at":"2024-07-08T04:32:20.951446991Z", "deleted_at":null}], "continuation_token":""}
```
