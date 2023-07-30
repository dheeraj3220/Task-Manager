class validator{
    static validateTaskDetails(taskDetails, taskdata ){
        if(this.validateTaskDetailBody(taskDetails,taskdata).status && 
        this.validateUniqueTaskId(taskDetails,taskdata)){
            return {
                "status":true,
                "message":"task has been added"
            };
        }
        if(!this.validateUniqueTaskId(taskDetails,taskdata)){
            return {
                "status":false,
                "message":"Please provide unique task id"
            };
        }
        return {
            "status":false,
            "message":"provided detail of task doesn't have all the properties"
        }
    }

    static validateTaskDetailBody(taskDetails, taskdata){
        if(taskDetails.hasOwnProperty("id") && 
        taskDetails.hasOwnProperty("title") && 
        taskDetails.hasOwnProperty("description") && 
        taskDetails.hasOwnProperty("flag") && 
        taskDetails.hasOwnProperty("priority")){
            return {
                "status":true,
                "message":"task has been updated"
            }
        }
        return {
            "status":false,
            "message":"please provide the appropriate structure"
        };
    }
    static validateUniqueTaskId(taskDetails,taskdata){
        let valueFound=taskdata.taskList.some(el=>el.id===taskDetails.id)
        if (valueFound) return false;
        return true;
    }
}

module.exports=validator;