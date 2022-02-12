/*
 * This file is part of OrangeHRM Inc
 *
 * Copyright (C) 2020 onwards OrangeHRM Inc
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see  http://www.gnu.org/licenses
 */

const fs = require('fs');
const path = require('path');

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
rootDirFiles.forEach(function(file) {
  fs.copyFileSync(
    path.join(projectRootDir, file),
    path.join(pathToBuildDir, file),
  );
});

const pathToComponentsDir = path.join(projectRootDir, 'components');
const componentsDirFiles = ['babel.config.js', '.browserslistrc'];
componentsDirFiles.forEach(function(file) {
  fs.copyFileSync(
    path.join(pathToComponentsDir, file),
    path.join(pathToBuildDir, file),
  );
});

const packageJson = require(path.join(pathToComponentsDir, 'package.json'));
// packageJson.name = '@ohrm/oxd';
packageJson.name = 'oxd-components';
fs.writeFileSync(
  path.join(pathToBuildDir, 'package.json'),
  JSON.stringify(packageJson, null, 2) + '\n',
);

const copyRecursiveSync = function(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, {recursive: true});
    }
    fs.readdirSync(src).forEach(function(childItemName) {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName),
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
};

copyRecursiveSync(path.join(pathToComponentsDir, 'src'), pathToBuildDir);
