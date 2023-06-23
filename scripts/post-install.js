const fs = require('fs');
const path = require('path');

if (process.env.INIT_CWD === process.cwd()) process.exit();

const projectRootDir = path.join(__dirname, '..');
const pathToBuildDir = path.join(projectRootDir, 'build');
if (fs.existsSync(pathToBuildDir)) {
  fs.rmdirSync(pathToBuildDir, {recursive: true});
}

fs.mkdirSync(pathToBuildDir);

const rootDirFiles = [
  'LICENSE',
  'README.md',
  'tsconfig.json',
  'postcss.config.js',
];
rootDirFiles.forEach(function (file) {
  fs.copyFileSync(
    path.join(projectRootDir, file),
    path.join(pathToBuildDir, file),
  );
});

const pathToComponentsDir = path.join(projectRootDir, 'components');
const componentsDirFiles = [
  'package.json',
  'babel.config.js',
  '.browserslistrc',
];
componentsDirFiles.forEach(function (file) {
  fs.copyFileSync(
    path.join(pathToComponentsDir, file),
    path.join(pathToBuildDir, file),
  );
});

const copyRecursiveSync = function (src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, {recursive: true});
    }
    fs.readdirSync(src).forEach(function (childItemName) {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName),
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
};

const deleteFilesRecursively = function (dir) {
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach((file) => {
      const filePath = path.join(dir, file);
      if (fs.lstatSync(filePath).isDirectory()) {
        deleteFilesRecursively(filePath); // Recursive call for directories
      } else {
        fs.unlinkSync(filePath); // Delete files
      }
    });
    fs.rmdirSync(dir); // Delete empty directory
  }
};

const moveContentsToParentDirectory = function (
  subdirectoryPath,
  parentDirectory,
) {
  const contents = fs.readdirSync(subdirectoryPath);
  contents.forEach((content) => {
    const contentPath = path.join(subdirectoryPath, content);
    const destinationPath = path.join(parentDirectory, content);
    fs.renameSync(contentPath, destinationPath);
  });
  fs.rmdirSync(subdirectoryPath);
};

copyRecursiveSync(path.join(pathToComponentsDir, 'src'), pathToBuildDir);

// Delete all files except the "build" folder
fs.readdir(projectRootDir, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    const filePath = path.join(projectRootDir, file);
    if (fs.lstatSync(filePath).isDirectory() && file !== 'build') {
      deleteFilesRecursively(filePath);
    } else if (!fs.lstatSync(filePath).isDirectory() && file !== 'build') {
      fs.unlinkSync(filePath);
    }
  });

  moveContentsToParentDirectory(pathToBuildDir, projectRootDir);
});
