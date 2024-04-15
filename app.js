const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const nurseRoutes = require('./routes/nurseRoutes');
const pharmacistRoutes = require('./routes/pharmacistRoutes');
const frontdeskRoutes = require('./routes/frontdeskRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const configRoutes = require('./routes/configRoutes');
const authRoutes = require('./auth/authRoutes');

const PORT = process.env.PORT || 8000;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/upload', configRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/nurses', nurseRoutes);
app.use('/api/pharmacists', pharmacistRoutes);
app.use('/api/frontdesks', frontdeskRoutes);
app.use('/api/patients', patientRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
