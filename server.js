const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Increase the payload size limit (adjust as needed)
app.use(express.json({ limit: '1gb' }));
app.use(express.urlencoded({ extended: true, limit: '1gb' }));

// Configure multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Make sure this directory exists
  },
  filename: function (req, file, cb) {
    // Keep the original file name, but add a timestamp to ensure uniqueness
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.originalname.split('.').slice(0, -1).join('.') + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 1024 } // 1GB file size limit
});

// Handle file upload
app.post('/upload', (req, res) => {
  upload.single('file')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File size limit exceeded (max: 1GB)' });
      }
      return res.status(500).json({ error: err.message });
    } else if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    res.json({ message: 'File uploaded successfully', filename: req.file.filename });
  });
});

// Handle file list request
app.get('/files', async (req, res) => {
  const directoryPath = path.join(__dirname, 'uploads');
  try {
    const files = await fs.readdir(directoryPath);
    res.json(files);
  } catch (err) {
    console.error('Error reading directory:', err);
    res.status(500).json({ error: 'Unable to scan files!' });
  }
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Increase the server's timeout for large file uploads
server.timeout = 10 * 60 * 1000; // 10 minutes