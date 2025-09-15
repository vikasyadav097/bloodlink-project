require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const stockRoutes = require('./routes/stock.routes');
const campRoutes = require('./routes/camps.routes');
const reqRoutes = require('./routes/requests.routes');
const collectionRoutes = require('./routes/collection.routes');
const miscRoutes = require('./routes/misc.routes');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

// health
app.get('/', (_req,res)=>res.json({ok:true, app:'BloodLink API'}));

app.use('/api/auth', authRoutes);
app.use('/api/stock', stockRoutes);
app.use('/api/camps', campRoutes);
app.use('/api/requests', reqRoutes);
app.use('/api/collection', collectionRoutes);
app.use('/api', miscRoutes); // feedback, complaint, search

const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=> console.log(`✅ API running http://localhost:${PORT}`));
