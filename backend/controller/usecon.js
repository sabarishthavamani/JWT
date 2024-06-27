
const Signup=require('../model/Signup')
const bcrypt = require('bcryptjs')
const jwt=require('jsonwebtoken');



//http://localhost:4500/JWT_Authentication/SignUp

const UserSignup=async(req,res)=>{
   const {username,Password,Email,userRole} = req.body;
   let ExitingUser;
   try{
    ExitingUser = await Signup.findOne({ $or: [{ Email: Email }, { username: username },] })
   }
   catch(err){
    console.log(err)
   }
   if(ExitingUser === Email){
    return res.status(404).json({message:'Email Already Exisited'})
   } 
   else if(ExitingUser === username){
    return res.status(404).json({message:'Username Already Exisited'})
   } 
    const bcryptpassword = bcrypt.hashSync(Password)

    const user = new Signup({
        username,
        Email,
        Password : bcryptpassword,
        userRole: "Admin",
       })
       try{
        await user.save()
   }
    catch(err){
        return res.status(400).json({'status':false,'result' : user , message :'User Registered Unsuccessfully'  })   
    }
   return res.status(201).json({'status':true,'result' : user , message :'User Registered Successfully' })   
}

//http://localhost:4500/JWT_Authentication/Login

const UserLogin=async(req,res)=>{
    const {Email,Password}=req.body;
    let Exiting; 
    try{
        Exiting=await Signup.findOne({Email:Email})
    }
    catch(err){
        return new Error(err)
    }
    if(!Exiting){
        return res.status(400).json({'status' : false, message: 'Invalid username'})
    }
 
    const isPasscrct=bcrypt.compareSync(Password,Exiting.Password);

    if(!isPasscrct){
        return res.status(400).json({'status' : false, message: 'Invalid Password'})
    }
  
    const token = jwt.sign({ id: Exiting.id }, process.env.KEY_JWT, { expiresIn: '1m' });
        res.cookie(String(Exiting.id),token,{
        path:'/',
        httpOnly:'true',
        expires: new Date (Date.now()+1000*30),
        sameSite :'lax'
    })
    return res.status(200).json({'status' : true, message : 'Login Successfull', 'result' : Exiting ,token})
}

//http://localhost:4500/JWT_Authentication/adminDisplay

const adminDisplay = async(req,res)=>{
    const display = req.body.headers;
    try {
        let dis = await Signup.find();
        res.status(200).json({ status : true , message:"Display Successfully",  result:dis})
    } catch (error) {
        res.status(400).json({status: false, message:"Display Failed"})        
    }
}

//http://localhost:4500/JWT_Authentication/VerifyToken

const VerifyToken = async (req, res, next) => {
    const cookies = req.headers.cookie;
    if (!cookies || typeof cookies !== 'string') {
        return res.status(400).json({ message: "UnAuthorized Token" });
    }
    const cookiesArray = cookies.split("=");

    if (cookiesArray.length < 2) {
        return res.status(400).json({ message: "UnAuthorized Token" }); 
    }
    const token = cookiesArray[1];

    jwt.verify(String(token), process.env.KEY_JWT, (err, determine) => {
        if (err) {
            return res.status(400).json({ message: "Invalid token" });
        }
        req.id = determine.id;
        next();
    });
};

//(This code is use to get user details by theri Token)
//http://localhost:4500/JWT_Authentication/getid

const getid=async(req,res,next)=>{
    const userId=req.id;
    let users;
    try{
        users=await Signup.findById(userId,'-Password')
    }catch(err){
        return new Error(err)
    }
    if(!users){
        return res.status(404).json({message : 'Not Found'})
    }
    return res.status(200).json({users})

}

//http://localhost:4500/JWT_Authentication/getsingleuser/:id

const getsingleuser=async(req,res)=>{
    const userId=req.params.id;
    let users;
    try{
        users=await Signup.findById({_id : userId})
    }catch(err){
        return new Error(err)
    }
    if(!users){
        return res.status(404).json({ status : false, message : 'Details Are Not Found'})
    }
    return res.status(200).json({status : true,message : 'Details Are Shoqwing Below',result : users})
}

//http://localhost:4500/JWT_Authentication/Refresh

const Refresh = async (req, res, next) => {
    const cookies = req.headers.cookie;
    if (!cookies) {
        return res.status(400).json({ message: "No cookies found in the request headers" });
    }
    const tokenPair = cookies.split("=");

    if (tokenPair.length < 2) {
        return res.status(400).json({ message: "Invalid cookie format" });
    }
    const Prevtoken = tokenPair[1];

    jwt.verify(String(Prevtoken), process.env.KEY_JWT, async (err, user) => {
        if (err || !user) {
            return res.status(403).json({ message: "Authentication Failed" });
        }

        try {
            const token = jwt.sign({ id: user.id }, process.env.KEY_JWT, { expiresIn: '1hr' });
            console.log("Regenerate Token", token);
            res.cookie(String(user.id), token, {
                path: '/',
                expires: new Date(Date.now() + 1000 * 60 * 60),
                httpOnly: true,
                sameSite: 'lax'
            });
            const datas = user.data
            return res.status(200).json({ token, message: 'Token Refreshed Successfully',datas });
        } catch (error) {
            console.error('Error generating token:', error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
};


//http://localhost:4500/JWT_Authentication/Logout

const Logout = async (req, res, next) => {
    const cookies = req.headers.cookie;
    const tokenPair = cookies.split("=")[1];
    console.log('tokenPair...',tokenPair);
    if (!tokenPair) {
        return res.status(400).json({ message: "Could not Find Token" });
    }
    jwt.verify(String(tokenPair), process.env.KEY_JWT, async (err, user) => {
        if (err || !user) {
            return res.status(403).json({ message: "Authentication Failed" });
        }
        res.clearCookie(`${user.id}`);
        return res.status(200).json({ message: "Successfully Logged Out" })
    })

}

//http://localhost:4500/JWT_Authentication/Update/:id

const adminUpdate =async (req,res)=>{
    const id =  req.params.id;
    const {...rest}=req.body;
    try {
        let update = await Signup.findByIdAndUpdate(id,{...rest},{new:true})
        res.status(200).json({status : true , message : "Updated Successfully" , 'result' :update})
    } catch (error) {
        res.status(400).json({status : false , message : "Updated UnSuccessfully" , error})        
    }
}

//http://localhost:4500/JWT_Authentication/Update/:id


const adminDelete =async (req,res)=>{
    const id = req.params.id;
    try {
        let adminDeletes = await Signup.findByIdAndDelete({_id : id});
        res.status(200).json({status:true,message:"Values are deleted Successfully" ,result : adminDeletes})
    } catch (error) {
        res.status(400).json({status:false , message:"Values are deleted UnSuccessfully"})

    }
}

module.exports ={
    UserSignup,
    UserLogin,
    getid,
    VerifyToken,
    getsingleuser,
    Refresh,
    Logout,
    adminDisplay,
    adminUpdate,
    adminDelete,
}