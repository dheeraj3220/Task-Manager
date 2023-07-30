Task Manager API Documentation
Introduction
Welcome to the Task Manager API! This API allows you to efficiently manage your tasks by providing several endpoints to handle various operations. Whether you want to view all tasks, fetch a specific task, add a new task, update an existing task, or delete a task, this API has got you covered!

Base URL
The base URL for all the endpoints is: http://localhost:8000

Endpoints
1. Fetch all tasks (GET)
Endpoint: /tasks/
Method: GET
Description: Retrieve a list of all tasks currently stored in the task manager.
2. Fetch specific task (GET)
Endpoint: /tasks/:id
Method: GET
Description: Retrieve a specific task by providing its unique id.
3. Add new task (POST)
Endpoint: /tasks/
Method: POST
Description: Add a new task to the task manager by sending the required details in the request body.
4. Update existing task by id (PUT)
Endpoint: /tasks/:id
Method: PUT
Description: Update an existing task identified by its id with the new information provided in the request body.
5. Delete a task by id (DELETE)
Endpoint: /tasks/:id
Method: DELETE
Description: Delete a task from the task manager by specifying its id.
Request and Response
All endpoints return JSON data.
Proper HTTP status codes and meaningful responses are provided for each request.