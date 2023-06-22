const route = require('express').Router()
const taskController = require('../controller/taskController')

route.get(`/`, taskController.index)
route.get(`/task/new`, taskController.new)
route.get(`/task/edit/:id`, taskController.edit)

// post route
route.post(`/newtask`, taskController.createTask)
// update task
route.post(`/task/update/:id`, taskController.updateTask)
// delete route
route.get(`/task/delete/:id`, taskController.deleteTask)

route.all(`/*`, taskController.notFound)

module.exports = route