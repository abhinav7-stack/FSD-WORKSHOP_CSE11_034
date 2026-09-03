import http from "http";
import os from "os";


const userdata = [
    {
        id: 1,
        name: "Abhinav yadav",
        class: "CSE-11",
        reg: "newdata"
    },
    {
        id: 2,
        name: "anahit",
        class: "CSE-11",
        reg: "olddata"
    },
    {
        id: 3,
        name: "aditi",
        class: "CSE-11",
        reg: "newdata"
    }
];


const server = http.createServer((req, res) => {

    console.log("REQUEST RECEIVED:", req.url, req.method);

    const url = req.url;
    const method = req.method;


  
    if (url === "/msg" && method === "GET") {

        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");

        res.end("Welcome to backend");
    }


    
    else if (url === "/cis" && method === "GET") {

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");

        res.end(JSON.stringify(userdata));
    }


    
    else if (url === "/sysdata" && method === "GET") {

        const sysdata = {

            cpu: os.cpus().length,

            ip: os.networkInterfaces(),

            totalMemory: os.totalmem(),

            freeMemory: os.freemem()
        };

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");

        res.end(JSON.stringify(sysdata));
    }


    else if (url === "/users" && method === "GET") {



        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");

        res.end(JSON.stringify(userdata));
    }


    else if (url.startsWith("/users/") && method === "GET") {

         console.log("USERS ID ROUTE ENTERED");
         
        const id = Number(url.split("/")[2]);

        console.log(id);

        const user = userdata.find((u) => u.id === id);

        if (!user) {

            res.statusCode = 404;

            return res.end("User not found");
        }

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");

        res.end(JSON.stringify(user));
    }


    
    else if (url === "/create" && method === "POST") {

        let body = "";

        req.on("data", (chunk) => {

            body += chunk;
        });


        req.on("end", () => {

            try {

                const newdata = JSON.parse(body);

                userdata.push(newdata);

                res.statusCode = 201;

                res.setHeader(
                    "Content-Type",
                    "application/json"
                );

                res.end(JSON.stringify(newdata));

            }
            catch (error) {

                res.statusCode = 400;

                res.end("Invalid JSON");
            }

        });
    }


    
    else {

        res.statusCode = 404;

        res.setHeader("Content-Type", "text/plain");

        res.end("Not Found");
    }

});


server.listen(3000, () => {

    console.log("Server is running on port 3000");

});