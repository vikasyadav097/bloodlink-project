const router = require('express').Router();
const db = require('../db');
const MOCK = process.env.MOCK_MODE==='true';

router.post('/feedback', async (req,res)=>{
  const {user_id, feedback_text} = req.body;
  if(MOCK) return res.json({message:'mock: feedback'});
  await db.execute("INSERT INTO feedback (user_id,feedback_text) VALUES (?,?)",
    [user_id,feedback_text]);
  res.json({message:'Feedback received'});
});

router.post('/complaint', async (req,res)=>{
  const {user_id, complaint_text} = req.body;
  if(MOCK) return res.json({message:'mock: complaint'});
  await db.execute("INSERT INTO complaints (user_id,complaint_text) VALUES (?,?)",
    [user_id,complaint_text]);
  res.json({message:'Complaint received'});
});

module.exports = router;
