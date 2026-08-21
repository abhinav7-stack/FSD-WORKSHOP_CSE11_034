import { EventEmitter } from "events";

// create object
const myEmitter = new EventEmitter();

// event listener
myEmitter.on("exit", (teacher) => {
    console.log(`Goodbye ${teacher}`);
});

// emit event
myEmitter.emit("exit", "Abhinav");