import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

const port = 3000

const app = express()
app.use(express.json())
const array = [
    {
        id: 1,
        name: "Abhinav",
        age: 20
    },
    {
        id: 2,
        name: "Ankit",
        age: 21
    },
    {
        id: 3,
        name: "Ansh",
        age: 17
    }
]

app.get("/", (req, res) => {
    res.status(200).send(`listening on port ${port}`)
})


app.get("/user", (req, res) => {
    try {
        res.status(200).json({
            message: "data recieved",
            userData: array
        })
    } catch (err) {
        console.error(err.message)
        res.status(500).json({
            message: "Internal server error"
        })
    }
})

app.post("/create" , (req,res)=>{
    try{
        const {name , age} = req.body ;
        const newUser = {
            id: array.length+1,
            name,
            age,
        };
        array.push(newUser);
        console.log("User added successfully")
        console.log(array)
        res.status(201).json({
            message: "User created successfully",
            userData: newUser
        })
    }
    catch(err){
        console.error(err.message)
        res.status(500).json({
            message: "Internal server error"
        })
    }
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})