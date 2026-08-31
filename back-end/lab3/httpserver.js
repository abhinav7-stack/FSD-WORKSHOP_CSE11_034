// // // const request 
// // import http from "http"
// // const server = http.createServer((req, res) => {
// //     res.write("hello world ")
// //     res.end();
// // });

// // server.listen(3001, ()=>{
// //     console.log("server is running on port 3001");
// // });

// // //localhost:3001/


// // const url = req.url 
// // const method = req.method 

// // if(url== "/msg" && method==("get") $ {port} )


// import http from "http";

// const server = http.createServer((req, res) => {

//     res.write("Hello World");

//     const url = req.url;
//     const method = req.method;

//     if (url === "/msg" && method === "GET") {

//         res.write("   This is the msg server page");
//         res.statusCode = 200 ;
//         res.setHeader("Content-Type" , "text/plain") ;
//         res.end("welcm to backend") ;

//     }

//     // res.end();
    
// });

// server.listen(3000, () => {

//     console.log("Server is running on port 3000");

// });

import http from "http";
//const users = ["Abhinav", "Rahul", "Aman", "Rohit"];
const userdata = {
    id: 2503201000036,
    name: "abhinav",
    class: "cse-11",
    reg:"newdata" 
};

const newdata = {
    id:userdata.id ,
    name:userdata.name ,
    class:userdata.class ,
    reg : userdata.reg  
};
// export default users;
const server = http.createServer((req, res) => {

    const url = req.url;
    const method = req.method;

    if (url == "/msg" && method == "GET") {

        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");

        res.end(" wlcm to backend");

    }
    else if(url == "/cis" && method == "GET"){
        res.statusCode = 200 ;
        res.setHeader("Content-Type" , "application/json") ;
        //res.end(JSON.stringify(users)) ;
        res.end(JSON.stringify(userdata)) ;
    }
    // else if(url == "/create" && method == "POST"){
    //     let body = " " ;
    //     req.on("data" , content=>{
    //         body = body + content ; 
    //     })
    //     const method = req.method ;

    // }

    else if (url === "/create" && method === "POST") {

    let body = "";

    req.on("data", chunk => {
        body += chunk;
    });

    req.on("end", () => {

        const newdata = JSON.parse(body);

        res.statusCode = 201;
        res.setHeader("Content-Type", "application/json");

        res.end(JSON.stringify(newdata));
    });
    }
    else {

        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain");

        res.end("not found");
    }

});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});