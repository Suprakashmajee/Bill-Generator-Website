const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');

const zip = new AdmZip();
const distPath = path.join(__dirname, 'dist');
const zipFilePath = path.join(__dirname, 'hostinger_upload.zip');

if (!fs.existsSync(distPath)) {
  console.error("Error: 'dist' folder not found. Please run the build command first.");
  process.exit(1);
}

console.log("Adding contents of 'dist' to zip...");
zip.addLocalFolder(distPath);

console.log(`Writing zip file to ${zipFilePath}...`);
zip.writeZip(zipFilePath);

// Also save to /public/hostinger_upload.zip so development server can serve it directly for download
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}
const publicZipFilePath = path.join(publicDir, 'hostinger_upload.zip');
console.log(`Saving static copy to public folder at ${publicZipFilePath}...`);
fs.copyFileSync(zipFilePath, publicZipFilePath);

console.log("Success! Created 'hostinger_upload.zip' containing the production static build inside root and public/ folder.");
