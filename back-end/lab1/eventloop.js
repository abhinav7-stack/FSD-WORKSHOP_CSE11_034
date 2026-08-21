console.log("this is stariting point of my code") ;
// ascychronus
process.nextTick(() => {
    console.log("this is process.nextTick operstion") ;
})
setTimeout(() => {
    console.log("this is first timeout operation") ;
},4000);

setTimeout(() => {
    console.log("this is second timeout operation") ;
},6000);

new Promise((resolve,reject) =>{
    //let success = true ;
    let success = false ;
    if(success) resolve("data loaded successfully") ;
    else reject("data loading failed") ;
}
)
.then((message) =>{
    console.log(message) ;
}
)

.catch((message) => {
    console.log(message) ;
}
)

// event dom function 

// import EventEmittor from "node:events" ;
//  function createdomevent(){
//     const emitter = new EventEmittor() ; 

//     return {
//         addEventListener(eventType, listner){
//             emitter.on(eventType,listner) ;
//         } ,
//      removeEventListener(eventType , listner){
//         emitter.off(eventType,listner) ;
//      } ,
//      dispatchEvent(event){
//         event.target = this ;
//         event.currentTarget = this ;
//         emitter.emit(event.eventType,event);
//      } 
//     }
// }

// const button = createdomevent() ;
// button.addEventListener('save',()=>{
//      console.log("saving....") ;
// })
// button.dispatchEvent({
//     eventType:"click " ,
//     detail:"this is click dispactcher" 
// });
// console.log("this is the end point of my code ") ;

import EventEmitter from "node:events";

function createDOMEvent() {
    const emitter = new EventEmitter();

    return {
        addEventListener(eventType, listener) {
            emitter.on(eventType, listener);
        },

        removeEventListener(eventType, listener) {
            emitter.off(eventType, listener);
        },

        dispatchEvent(event) {
            event.target = this;
            event.currentTarget = this;
            emitter.emit(event.eventType, event);
        }
    };
}

const button = createDOMEvent();

button.addEventListener("save", (event) => {
    console.log("saving....");
    console.log(event.detail);
});

button.addEventListener("submit", (event) => {
    console.log("data submiyyed successfully");
    console.log(event.detail);
});

function handleClick(event){
    console.log("mouse clicked");
    console.log(event.eventType);
    console.log(`message:${event.detail}`);

}

button.addEventListener("click" , (event) =>{

    console.log("mouse clocked") ;
    console.log(event.eventType) ;
    console.log(`message:${event.detail}`) ;
})
button.dispatchEvent({
    eventType: "save",
    detail: "this is save dispatcher"
});
button.dispatchEvent({
    eventType: "submit",
    detail: "this is submit dispatcher"
});

console.log("this is the end point of my code");