const router = require('express').Router();
const db = require('../db');
const MOCK = process.env.MOCK_MODE==='true';

// add donation + increment stock
router.post('/', async (req,res)=>{
  const {user_id, blood_group, donation_date} = req.body;
  if(MOCK) return res.json({message:'mock: collected'});
  await db.execute("INSERT INTO donors (user_id,blood_group,donation_date) VALUES (?,?,?)",
    [user_id,blood_group,donation_date]);
  await db.execute(
    "INSERT INTO blood_stock (blood_group,units_available) VALUES (?,1) ON DUPLICATE KEY UPDATE units_available=units_available+1",
    [blood_group]
  );
  res.json({message:'Blood collected & stock updated'});
});

module.exports = router;
