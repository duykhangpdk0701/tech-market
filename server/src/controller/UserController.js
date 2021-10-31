const User = require('../model/User');
const argon2 = require('argon2')

class UserController {

    async login(req, res) {
        const {username, password} = req.body;
        if(!username || !password) return res.status(400).json({success: false, messages: 'Missing username or password'});
        try {
            const user = await User.findOne({username});
            if(!user){
                return res.status(400).json({success: false, messages:'Incorrect username or password'})
            }
            const passowrdvalid = await argon2.verify(user.password,password)
            if(!passowrdvalid){ 
                return res.status(500).json({success: false, messages: 'Invalid password'}) 
            }
            res.json({ success: true, messages: 'Login successfully', user})
        }
        catch(error){
            console.log(error);
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async register(req, res) {
        const {username, password} = req.body;
        if(!username || !password) return res.status(400).json({success: false, messages: 'Missing username or password'});
        try {
            const user = await User.findOne({ username });
            if(user){
                return res.status(400).json({success: false,messages:'Username already taken'});
            }
            const hashpassword = await argon2.hash(password);
            const newUser = new User({...req.body, password:hashpassword})
            await newUser.save()
            res.json({ success:true, messages:'Register successfully', user:newUser })
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

module.exports = new UserController()