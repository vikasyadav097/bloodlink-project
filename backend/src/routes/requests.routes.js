const router = require('express').Router();
const db = require('../db');
const MOCK = process.env.MOCK_MODE==='true';

// create request
router.post('/', async (req,res)=>{
  const {user_id, blood_group, units} = req.body;
  if(MOCK) return res.json({message:'mock: request created', id:1});
  const [r]=await db.execute(
    "INSERT INTO requests (user_id,blood_group,units,status) VALUES (?,?,?,'pending')",
    [user_id,blood_group,units]
  );
  res.json({message:'Request submitted', id:r.insertId});
});

// list my/all
router.get('/', async (req,res)=>{
  if(MOCK) return res.json([{id:1,user_id:2,blood_group:'A+',units:2,status:'pending'}]);
  const [rows]=await db.execute("SELECT * FROM requests ORDER BY created_at DESC");
  res.json(rows);
});

// approve/reject
router.post('/:id/status', async (req,res)=>{
  const {status} = req.body; // 'approved'|'rejected'|'pending'
  const {id} = req.params;
  if(MOCK) return res.json({message:'mock: status changed'});
  await db.execute("UPDATE requests SET status=? WHERE id=?", [status,id]);
  res.json({message:'Status updated'});
});

module.exports = router;
