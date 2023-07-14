# Getting started with server side

1. Initially install node modules after cloning from git 'npm install'.
2. Then start the application 'npm start'.

# Task 1 , 2 and 3

1. All three tasks are combined and a web application is created which runs on local host.
2. Github link will be provided for both frontend and backend.

# Task 1

Created middleware by using passport and express for authentication and session expires once user is logged out.

# Task 2

Created google O-auth using react and node, used session storage to store data. Also sign up and sign in with mail is also given.

# Task 3

States are handled using redux-toolkit. Upon sign in home page is shown with user details.

# For task 4 and task 5 the program has to be run in the server environment.

> It can be found inside 'Tasks' folder.
> To run those just open the terminal and type 'npm start'.
> To run task 4, go to server.js and comment line 40.
> Output can be seen in the terminal for the task 4.
> To run task 5, go to server.js and comment line 39.
> Output can be seen in the terminal for the task 5.

# Task 4

1. Created child schema and used concept of aggregation and population
2. Created child schema 'city' under parent schema 'users' using mongoose, established relationship between using references.
3. Combined the user and city data, used the $lookup stage in the aggregation pipeline to join the User and City collections based on the city field.
4. Populated 'city' from database with only name attribute.

# Task 5

1. Created event loop concept with file system in node application.
2. Here, inside Tasks/test files/ three empty files are placed.
3. Upon running the server.js file Task4.js file is called.
4. Once it is called as per the concept of event loop, once the function is executed, it doesn't wait for it to finish. So setTimeout is used to delay. After processing the 1st file and sends to callback queue to wait for 5 seconds and same is with the other two files.
5. After 5 seconds, file 1 is executed then file2 later file3.
6. In the concept of event loop, once the call stack is empty it sends the function from call back queue to call stack top execute.
7. Thus satisfying the task condition.
