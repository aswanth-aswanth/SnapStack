import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
dotenv.config();
import app from './app';

console.log("__dirname : ", __dirname);

// Function to list all directories in the root folder
const listDirectories = (source:any) =>
  fs.readdirSync(source).filter((name) =>
    fs.statSync(path.join(source, name)).isDirectory()
  );

// Function to list all files in the uploads directory
const listFilesInUploads = () => {
  const uploadsDir = path.join(__dirname, 'uploads');
  if (fs.existsSync(uploadsDir)) {
    return fs.readdirSync(uploadsDir).filter((file) =>
      fs.statSync(path.join(uploadsDir, file)).isFile()
    );
  } else {
    return 'Uploads directory does not exist.';
  }
};

// Log directories in the root folder
console.log("Directories in root:", listDirectories(__dirname));

// Log files in the uploads directory
console.log("Files in uploads folder:", listFilesInUploads());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
