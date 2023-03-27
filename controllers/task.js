const { errorHandler } = require("../middlewares/error");
const { Task } = require("../models/task");


const newTask = async(req,res,next)=>{

try {
    const {title,description} = req.body;

const task = await Task.create({
    title,
    description,
    user : req.user,
});
    res.status(201).json({
        success : true,
        message : "Task Added Successfully",
    })
    
} catch (error) {
    next(error)
}




}

const getMyTask = async(req,res,next)=>{

try {
    const userId = req.user._id;
    
    const task = await Task.find({user : userId});
        res.status(200).json({
            success : true,
            task,
        })



} catch (error) {
    next(error)
}


   
}




 const updateTask = async(req,res,next)=>{

    try {

        const task = await Task.findById(req.params.id);
        if(!task) return next(new errorHandler("Inavlid Id" , 404))
    
        task.isCompleted = !task.isCompleted;
        await task.save()
    
                res.status(200).json({
                    success : true,
                   message : "Task Updated"
                })
        
    } catch (error) {
        next(error)
    }
      
  
 }



 const deleteTask = async(req,res,next)=>{

    try {
        const task = await Task.findById(req.params.id);

        if(!task) return next(new errorHandler("Inavlid Id" , 404))
        await task.deleteOne()
                res.status(200).json({
                    success : true,
                    message : "Task Deleted",
                })


    } catch (error) {
        next(error)
    }
   
        
        }







module.exports = {newTask,getMyTask,updateTask,deleteTask}