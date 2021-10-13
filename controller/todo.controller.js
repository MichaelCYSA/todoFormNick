const Todo = require('../schemas/todo')

class TodoController {
      async createTodo(req, res) {
          try{
            if(!req.body){
                return res.status(400).json({message: "Invalid Data!"})
            }
            const { name } =  req.body
            const status = false
            const newTodo = new Todo({
                name: name,
                status: status,
            })
            const todo = await newTodo.save()
            if(todo){
               return res.status(201).json({message: 'Todo was Create!' , data: todo})
            }
            res.status(400).json({message: 'Invalid Data!'})
          }catch(e){
            console.log(e)
            res.status(500).json({message: 'Server Error,try again!'})
          }
      }
      async getTodo(req, res) {
        try{
          const todos = await Todo.find()
          if(todos){
             return res.status(200).json({message: 'Todos was goten!', data: todos})
          }
          return res.status(400).json({message: 'Bad request!'})
        }catch(e){
          console.log(e)
          res.status(500).json({message: 'Server Error,try again!'})
        }
    }
    async updateTodo(req, res) {
        try{
          const id = req.params.id
          if(!id){
              return res.status(400).json({
                  massage: 'Invalid id!'
              })
          }
          const todo = await Todo.findOne({_id: id})
          if(todo){
            todo.status = todo.status? false: true
            const updated = await todo.save()
            if(updated){
                return res.status(201).json({message: 'Todo status was updated!', data: updated})
             }
          }
          return res.status(400).json({message: 'Bad request!'})
        }catch(e){
          console.log(e)
          res.status(500).json({message: 'Server Error,try again!'})
        }
    }
    async deleteTodo(req, res) {
        try{
          const id = req.params.id
          if(!id){
              return res.status(400).json({
                  massage: 'Invalid id!'
              })
          }
          const todo = await Todo.findOneAndDelete({_id: id})
          if(todo){
                return res.status(201).json({message: 'Todo was deleted!', data: todo})
          }
          return res.status(400).json({message: 'Bad request!'})
        }catch(e){
          console.log(e)
          res.status(500).json({message: 'Server Error,try again!'})
        }
    }
}

module.exports = new TodoController()