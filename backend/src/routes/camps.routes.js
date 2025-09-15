const router = require('express').Router();
const db = require('../db');
const MOCK = process.env.MOCK_MODE==='true';

router.get('/', async (_req,res)=>{
  if(MOCK) return res.json([{id:1,name:'City Camp',location:'Delhi',camp_date:'2025-09-10'}]);
  const [rows]=await db.execute("SELECT * FROM camps ORDER BY camp_date DESC");
  res.json(rows);
});

router.post('/', async (req,res)=>{
  const {name, location, camp_date} = req.body;
  if(MOCK) return res.json({message:'mock: camp added'});
  await db.execute("INSERT INTO camps (name,location,camp_date) VALUES (?,?,?)",
    [name,location,camp_date]);
  res.json({message:'Camp added'});
});

module.exports = router;
