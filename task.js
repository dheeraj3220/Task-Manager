const express =require('express');
const bodyParser=require('body-parser');

const task =express();
const routes= require('express').Router();
const taskDetails=require('./router/taskDetails');  // importing is important 

const PORT=8000;
task.use(routes);
task.use(bodyParser.json())

routes.use('/tasks',taskDetails)

task.listen(PORT, (error)=>{
if(!error){
    console.log("Server has started at port:",PORT);
}else {
    console.log("Error has occured");
}
});