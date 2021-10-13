const {Router} = require('express')
const authController = require('../controller/auth.controller')
const TodoController = require('../controller/todo.controller')
const authMiddleware = require('../middlewares/auth.middleware')

const router  =  Router()

router.post('/signup', authController.createUser)
router.post('/signin', authController.login)
router.post('/todo', authMiddleware , TodoController.createTodo)
router.get('/todo', authMiddleware , TodoController.getTodo)
router.get('/todo/:id', authMiddleware , TodoController.updateTodo)
router.delete('/todo/:id', authMiddleware , TodoController.deleteTodo)

module.exports =  router
