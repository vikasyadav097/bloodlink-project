const router = require('express').Router();
const db = require('../db');
const MOCK = process.env.MOCK_MODE === 'true';

// list
router.get('/', async (_req,res)=>{
  if(MOCK) return res.json([
    {blood_group:'A+',units_available:12},
    {blood_group:'O+',units_available:20}
  ]);
  const [rows] = await db.execute("SELECT * FROM blood_stock ORDER BY blood_group");
  res.json(rows);
});

// search ?group=A+
router.get('/search', async (req,res)=>{
  const g = (req.query.group||'').toUpperCase();
  if(MOCK) return res.json({blood_group:g||'A+', units_available:11});
  const [rows] = await db.execute("SELECT * FROM blood_stock WHERE blood_group=?", [g]);
  res.json(rows[0] || {blood_group:g, units_available:0});
});

// admin: update/add
router.post('/upsert', async (req,res)=>{
  const {blood_group, units_available} = req.body;
  if(MOCK) return res.json({message:'mock: upsert ok'});
  await db.execute(
    "INSERT INTO blood_stock (blood_group,units_available) VALUES (?,?) ON DUPLICATE KEY UPDATE units_available=?",
    [blood_group, units_available, units_available]
  );
  res.json({message:'Stock updated'});
});

module.exports = router;
