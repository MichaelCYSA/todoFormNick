End points 

1.) Signup - http://localhost:9000/api/signup {
    method: 'POST',
    body: {
      username: '',
      email: '',
      password: ''
    }
  }
 
 2.) Signin - http://localhost:9000/api/signin {
    method: 'POST',
    body: {
      username: '',
      password: ''
    }
  }
 
  3.) GetAllTodos - http://localhost:9000/api/todo {
    method: 'GET',
  }
  
  3.) createTodo - http://localhost:9000/api/todo {
     method: 'POST',
     body: {
       name: ''
     }
  }
  
  4.) updateTodoStatus - http://localhost:9000/api/todo/:id {
   method: 'GET',
  }
  5.) deleteTodo - http://localhost:9000/api/todo/:id {
   method: 'DELETE',
  }
