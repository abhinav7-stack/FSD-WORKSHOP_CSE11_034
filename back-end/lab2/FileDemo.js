import fs from "node:fs/promises" ;
const filePath = "userdata.txt" ;
async function createFile(content){
    try{
     await fs.writeFile(filePath , content , "utf-8") ;
      console.log("file created successfully ") ; 
     //clg
    }
    catch(error){
        console.log("error :" , error);
    }
    
}
const content = fs.readFile(filePath, "utf-8") ;
async function readFile(){
    
    fs.readFile(filePath , content , "utf-8") ;
    
    console.log("file read successfilly")
}

//func calling 

// createFile("hello world") ;

async function deleteFile(){
    try{
        fs.unlink(filePath);
        console.log("file delted succesully") ;
    }
    catch(error){
        console.log("error" , error) ;
    }

}
async function main() {
  await createFile("Hello World");
  await readFile();
  await deleteFile() ;
}

main();