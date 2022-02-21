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

const {execSync} = require('child_process');

if (process.argv.length < 3) {
  console.error('Required version as first argument');
  process.exit(1);
}
const version = process.argv[2];
execSync('yarn version --no-git-tag-version --new-version ' + version);
execSync(
  'yarn workspace oxd-components version --no-git-tag-version --new-version ' +
    version,
);
