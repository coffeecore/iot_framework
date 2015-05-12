# Framework IoT
This framework allow you to control GPIOs of a connceted object. The objective is to create a easy to use system for non developer people who want to try the Internet of Things.

## Requirement
- [Nodejs](https://nodejs.org/)
- [NPM](https://www.npmjs.com/)

## Getting started
1.	Clone this repository
	`````
	git clone 
	`````

2.	Install dependencies
	`````
	cd project
	npm install
	`````

3.	Start node server
	`````
	nodejs app.js
	`````

4.	Done ! Go to [http://localhost:3000](http://localhost:3000)

## API

Routes are located in core/routes.js

### GET methods
| URL								| Action						|
| :-------------------------------- | :---------------------------- |
| /thing							| Describe all the thing 		|
| /thing/gpios 						| List all the thing's GPIOs 	|
| /thing/gpio/:name 				| Describe the GPIO 			|
| /thing/gpio/:name/events 			| List all the GPIO's events 	|
| /thing/gpio/:name/event/:id 		| Describe the event 			|
| /thing/gpio/:name/jobs 			| List all the GPIO's jobs 		|
| /thing/gpio/:name/job/:id 		| Describe the job 				|

### POST methods
| URL								| Action						|
| :-------------------------------- | :---------------------------- |
| /thing/gpio/add					| Add a new GPIO to the Thing 	|
| /thing/gpio/:name/event/add 		| Add a new event to a GPIO 	|
| /thing/gpio/:name/job/add 		| Add a new job to a GPIO 		|

### PUT methods
| URL								| Action						|
| :-------------------------------- | :---------------------------- |
| /thing/gpio/:name 				| Edit a GPIO 					|
| /thing/gpio/:name/event/:id 		| Edit an event to a GPIO 		|
| /thing/gpio/:name/job/:id 		| Edit a job to a GPIO 			|

### DELETE methods
| URL									| Action						|
| :------------------------------------ | :---------------------------- |
| /thing/gpio/:name/delete				| Remove a GPIO to the Thing 	|
| /thing/gpio/:name/event/:id/delete 	| Remove an event to a GPIO 	|
| /thing/gpio/:name/job/:id/delete 		| Remove a job to a GPIO 		|