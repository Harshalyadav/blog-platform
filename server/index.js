const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config()


const Post= require('./src/models/Post');
const adminUser = require('./src/models/adminuser');




adminUser.sync();
 Post.sync({alter:true});





app.use(express.json());
app.use(cors());
// app.use(fileUpload());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Expose-Headers");
  next()
});


const postsRoutes =require("./src/routes/posts");
const adminRoutes =require("./src/routes/adminRoutes");



app.use("/api/posts", postsRoutes);
app.use("/api/admin", adminRoutes);


app.get('/',(req,res)=>{
 res.send("Helllo People:::");
})

const port= process.env.PORT 

  app.listen(port , () => {
    console.log(`Server is running on port ${port}`);
  });


