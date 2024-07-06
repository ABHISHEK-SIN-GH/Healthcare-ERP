const express = require("express");
const cors = require('cors');
const path = require("path");
const fs = require('fs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const medicineRoutes = require('./routes/medicineRoutes');
const patientRoutes = require('./routes/patientRoutes');
const patientDetailRoutes = require('./routes/patientDetailRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const nurseRoutes = require('./routes/nurseRoutes');
const pharmacistRoutes = require('./routes/pharmacistRoutes');
const frontdeskRoutes = require('./routes/frontdeskRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const configRoutes = require('./routes/configRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const authRoutes = require('./auth/authRoutes');

const PORT = process.env.PORT || 8000;

const app = express();

mongoose.connect(process.env.MONGO_DB_URL)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
  process.exit(1);
});

app.use(express.static(path.join(__dirname, 'frontend/dist')))
app.use('/static', express.static(path.join(__dirname, 'uploads')))

app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/config', configRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/nurses', nurseRoutes);
app.use('/api/pharmacists', pharmacistRoutes);
app.use('/api/frontdesks', frontdeskRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/patientDetails', patientDetailRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/uploads', uploadRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/frontend/dist/index.html'));
})

app.get('/health', (req, res) => {
  res.send(`Health ERP Server Running PORT::${PORT}`);
})

app.get('/read-all-patients-files', (req, res) => {
  const directoryPath = path.join(__dirname, 'uploads/patients');
  let jsonData = [];
  try {
    fs.readdir(directoryPath, function (err, files) {
      if (err) {
        return console.log('Unable to scan directory: ' + err);
      } 
      files.forEach(function (file,index) {
          jsonData[index] = file.toString();
      });
      res.send(jsonData);
    });
  } catch (error) {
    res.send(error);
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
