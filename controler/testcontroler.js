const testusercontroller=(req,res)=>{
try {
  res.status(200).send({
success:true   ,
message: "this worked"    
})

} catch (error) {console.log("Got error",error)
}
}

module.exports={testusercontroller}