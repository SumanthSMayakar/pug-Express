const Task = require('../model/taskModel')
const path = require('path')
const { findByIdAndDelete } = require('../model/taskModel')

const taskController = {
    index: async (req,res) => {
        try {
            // find() => used call all values of db
            let data = await Task.find({})
                // res.json({ tasks }) 
                res.render('index', {tasks: data})
        }catch(err) {
            console.log(err.message)
        }
    },
    new: (req,res) => {
        res.render('create')
    },
    edit: async (req,res) => {
        try {
            let id = req.params.id

            let single = await Task.findById({ _id: id })
            // res.json({single})
            res.render('update', {taskid: id, task: single})

        } catch (err) {
            console.log(err.message)
        }
       
    },
    notFound: (req,res) => {
        res.render('pnf')
    },
    createTask: async (req,res) => {
        try {
            let data = req.body;
                // allow to validate the existing data
                //findOne({})
                //findById({})
            let extData = await Task.findOne({ title: req.body.title })
                if(extData)
                    return res.sendFile(path.resolve('./util/error.html'))

                    // creating new task
            let newData = await Task.create(data)
            // res.json({ newData })
            res.sendFile(path.resolve('./util/success.html'))

        } catch (err) {
            console.log(err)
        }
    },
    updateTask: async (req,res) => {
        try {
            const id = req.params.id;
             const data = req.body;

             // method to validate weather data exist or not
             let extData = await Task.findById({ _id:id })
                if(!extData)
                    return res.sendFile(path.resolve('./util/error.html'))
                // update logic
            await Task.findByIdAndUpdate({_id : id}, data)
            res.sendFile(path.resolve('./util/success.html'))

            // res.json({update: data})
        } catch (err) {
            console.log(err.message)   
        }
    },
    deleteTask: async (req,res) => {
        try {
            let id = req.params.id;

            let extData = await Task.findById({ _id:id })
            if(!extData)
                return res.sendFile(path.resolve('./util/error.html'))

                await Task.findByIdAndDelete({_id:id})
                res.sendFile(path.resolve('./util/success.html'))
                
        } catch (err) {
            console.log(err.message)   
        }
    }
}

module.exports = taskController