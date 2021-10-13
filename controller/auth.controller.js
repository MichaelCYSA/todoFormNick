const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../schemas/user')

class AuthController {
      async createUser(req, res) {
          console.log(req.body)
          try{
            if(!req.body){
                return res.status(400).json({message: "Invalid Data!"})
            }
            const {username , password , email } =  req.body

            const uniqueCheck =  await User.findOne({username})
            if(uniqueCheck){
                return res.status(400).json({message: 'User already exists!'})
            }
            const hashPassword = bcrypt.hashSync(password, 10)
            const newUser = new User({
                username: username,
                email: email,
                password: hashPassword
            })
            const user = await newUser.save()
            console.log(newUser)
            if(user){
               return res.status(201).json({message: 'User was Create!' , data: user})
            }
            res.status(400).json({message: 'Invalid Data!'})
          }catch(e){
            console.log(e)
            res.status(500).json({message: 'Server Error,try again!'})
          }
      }
      async login(req, res){
           try{
              if(!req.body){
                  res.status(400).json({message:"Invalid Data!"})
              }
              const {username , password} = req.body
              const user =  await User.findOne({username})
              if(user){
                console.log(user.password)
                const CheackPassword = bcrypt.compareSync( password, user.password)
                if(!CheackPassword){
                    return res.status(400).json({message:"Invalid Data!"})
                }
                const token = jwt.sign(
                  {userId: user.id},
                  config.get('SECRET_KEY'),
                  {expiresIn: '24h'}
                );
                res.status(200).json({message: 'Successful authorization!', token: token})
              }
              return res.status(400).json({message:"Invalid Data!"})    
           }catch(e){
                console.log(e)
                res.status(500).json({message: 'Server Error, try again!'})
           }
      }
}

module.exports = new AuthController()