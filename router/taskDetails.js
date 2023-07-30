const taskRoutes=require('express').Router()
const taskData=require('../tasks.json');
const fs= require('fs');
const bodyParser = require('body-parser');
const path=require('path');
const validator=require('../apiHelpers/validator');
const { validateHeaderName } = require('http');

taskRoutes.use(bodyParser.json());
taskRoutes.get('/',(req,res)=>{
    return res.status(200).json(taskData);
});

taskRoutes.get('/:id',(req,res)=>{
    let taskList=taskData.taskList
    let taskIdFromUser=req.params.id
    let result = taskList.filter(val=> val.id == taskIdFromUser)
    if(result==null || result==undefined || result.length==0){
        return res.status(404).json({"message": "Task that you reuqested does not exist"})
    }
    return res.status(200).json(result);
});

taskRoutes.post('/',(req,res)=>{
    const taskDetail=req.body;
    let writePath=path.join(__dirname, '..' ,'tasks.json');
    if(validator.validateTaskDetails(taskDetail,taskData).status){
        let modifiedTaskList=JSON.parse(JSON.stringify(taskData))
        modifiedTaskList.taskList.push(taskDetail);
        try{
            fs.writeFileSync(writePath,JSON.stringify(modifiedTaskList),{encoding:'utf-8',flag:'w'});
            return res.status(200).json({"message":"Task SuccessFully added to the task List"})
        } catch (err){
            return res.status(500).json({"message":"Sorry! unable to process request try again later"})
        }
    } else{
        return res.status(400).json(validator.validateTaskDetails(taskDetail,taskData));
    }
});

taskRoutes.put('/:id',(req,res)=>{
    let idFound=false;
    let taskIdFromUser=req.params.id;
    const taskDetail=req.body;
    let writePath=path.join(__dirname, '..' ,'tasks.json');
    if(validator.validateTaskDetailBody(taskDetail,taskData).status){
        console.log("the size is :",taskData.taskList.length)
        for(let i=0;i<taskData.taskList.length;i++){
            console.log(taskData.taskList[i].id)
            if(taskIdFromUser==taskData.taskList[i].id){
                idFound=true;
                taskData.taskList[i]=taskDetail;
                console.log(taskData.taskList[i]);
            }
        }
        if(!idFound) {
            return res.status(404).json({"message":"Task id that you reuqested to update does not exist"})
        }
        try{
            fs.writeFileSync(writePath,JSON.stringify(taskData),{encoding:'utf-8',flag:'w'});
            return res.status(200).json({"message":"Task SuccessFully updated "});
        } catch (err){
            return res.status(500).json({"message":"Sorry! unable to process request try again later"});
        }
    } else{
        return res.status(400).json(validator.validateTaskDetailBody(taskDetail,taskData));
    }
});

taskRoutes.delete('/:id',(req,res)=>{
    let taskIdFromUser=req.params.id
    let writePath=path.join(__dirname, '..' ,'tasks.json');
    let taskListAfterdeletion=[];
    for(let i=0;i<taskData.taskList.length;i++){
        if(taskIdFromUser!=taskData.taskList[i].id){
            taskListAfterdeletion.push(taskData.taskList[i])
        }
    }
    if(taskListAfterdeletion.length==taskData.taskList.length){
        return res.status(404).json({"message":"Task id that you reuqested to delete does not exist"})
    }
    taskData.taskList=taskListAfterdeletion
    try{
        fs.writeFileSync(writePath,JSON.stringify(taskData),{encoding:'utf-8',flag:'w'});
        return res.status(200).json({"message":"Task SuccessFully deleted",taskData});
    } catch (err){
        return res.status(500).json({"message":"Sorry! unable to process request try again later"});
    }
});


module.exports=taskRoutes;