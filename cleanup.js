const fs = require('fs');
const path = require('path');

// Files to delete
const filesToDelete = [
    'fixnav.js',
    'update-navigation.js',
    'standorte.html' // Keeping this as it's our redirect
];

// Directories to delete
const dirsToDelete = [
    'location-pages' // We can regenerate these if needed
];

// Delete files
filesToDelete.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`Deleted: ${file}`);
    }
});

// Delete directories
const deleteFolderRecursive = function(directoryPath) {
    if (fs.existsSync(directoryPath)) {
        fs.readdirSync(directoryPath).forEach((file, index) => {
            const curPath = path.join(directoryPath, file);
            if (fs.lstatSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(directoryPath);
        console.log(`Deleted directory: ${directoryPath}`);
    }
};

dirsToDelete.forEach(dir => {
    const dirPath = path.join(__dirname, dir);
    deleteFolderRecursive(dirPath);
});

console.log('Cleanup complete!');
