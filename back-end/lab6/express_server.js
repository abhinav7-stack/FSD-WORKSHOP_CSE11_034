import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

const userdata = [
    {
        id: 1,
        name: "Abhinav",
        class: "CSE-11",
        reg: "newdata"
    },
    {
        id: 2,
        name: "Rahul",
        class: "CSE-11",
        reg: "olddata"
    },
    {
        id: 3,
        name: "Aman",
        class: "CSE-11",
        reg: "newdata"
    }
];

// Home route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to the server"
    });
});

// Get all users
app.get("/user", (req, res) => {
    res.status(200).json({
        message: "All users",
        users: userdata
    });
});

// Get user by ID
app.get("/user/:id", (req, res) => {
    const id = Number(req.params.id);

    const user = userdata.find((user) => user.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.status(200).json({
        message: "User found",
        user: user
    });
});

// Get registered users
app.get("/registered", (req, res) => {
    const registeredUsers = userdata.filter(
        (user) => user.reg === "newdata"
    );

    res.status(200).json({
        message: "Registered users",
        users: registeredUsers
    });
});

// Register route
app.get("/register", (req, res) => {
    res.status(200).json({
        message: "Register endpoint"
    });
});

// Create a new user
app.post("/create", (req, res) => {
    try {
        const { name, class: userClass, reg } = req.body;

        if (!name || !userClass || !reg) {
            return res.status(400).json({
                message: "name, class and reg are required"
            });
        }

        const newId =
            userdata.length > 0
                ? Math.max(...userdata.map((user) => user.id)) + 1
                : 1;

        const newUser = {
            id: newId,
            name: name,
            class: userClass,
            reg: reg
        };

        userdata.push(newUser);

        res.status(201).json({
            message: "User created successfully",
            user: newUser
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
});

// Edit user
app.put("/edit/:id", (req, res) => {
    const id = Number(req.params.id);

    const user = userdata.find((user) => user.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const { name, class: userClass, reg } = req.body;

    if (name !== undefined) {
        user.name = name;
    }

    if (userClass !== undefined) {
        user.class = userClass;
    }

    if (reg !== undefined) {
        user.reg = reg;
    }

    res.status(200).json({
        message: "User updated successfully",
        user: user
    });
});

// Delete user
app.delete("/delete/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = userdata.findIndex((user) => user.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const deletedUser = userdata.splice(index, 1)[0];

    res.status(200).json({
        message: "User deleted successfully",
        user: deletedUser
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});