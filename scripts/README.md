## How to publish

> Note: All paths with respect to project root

### Update version

Update version in `components/package.json` and `package.json`

E.g.

```bash
$ yarn version --no-git-tag-version --new-version 1.0.5-alpha.1
$ yarn workspace oxd-components version --no-git-tag-version --new-version 1.0.5-alpha.1
```

### Generate build directory

```bash
$ node script/build.js
# OR
$ cd script
$ node ./build.js
```

### Publish the package

Check `build/package.json`

```bash
$ cd build
# Publish pre-release
$ npm publish --tag dev

# Publish prod release
$ npm publish
```

### Tag a package version

```bash
$ npm dist-tag add @ohrm/oxd@1.0.4 latest

$ npm dist-tag add @ohrm/oxd@1.0.5-alpha.1 dev
```
