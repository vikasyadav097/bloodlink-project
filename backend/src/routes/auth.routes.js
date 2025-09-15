const router = require('express').Router();
const db = require('../db');
const MOCK = process.env.MOCK_MODE === 'true';

// Register
router.post('/register', async (req,res)=>{
  try{
    const {name, age, role, email, password, contact, address} = req.body;
    if(MOCK) return res.json({message:'mock: user registered'});
    const [r] = await db.execute(
      "INSERT INTO users (name,age,role,email,password,contact,address) VALUES (?,?,?,?,?,?,?)",
      [name,age,role,email,password,contact,address]
    );
    res.json({message:'User Registered', id:r.insertId});
  }catch(e){ res.status(500).json({error:e.message}); }
});

// Login (simple)
router.post('/login', async (req,res)=>{
  try{
    const {email,password} = req.body;
    if(MOCK) return res.json({message:'mock: login ok', user:{id:1, role:'donor'}});
    const [rows] = await db.execute("SELECT * FROM users WHERE email=? AND password=?", [email,password]);
    if(rows.length===0) return res.status(401).json({message:'Invalid'});
    res.json({message:'Login ok', user:rows[0]});
  }catch(e){ res.status(500).json({error:e.message}); }
});

module.exports = router;
