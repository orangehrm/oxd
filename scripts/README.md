## How to publish

> Note: All paths with respect to project root

### Update version

Update version in `components/package.json` and `package.json`

E.g.

```bash
$ yarn version --no-git-tag-version --new-version 1.0.5-alpha1
$ yarn workspace oxd-components version --no-git-tag-version --new-version 1.0.5-alpha1
```

### Generate build directory

```bash
$ node script/build.js
```

### Publish the package

Check `build/package.json`

```bash
$ cd build
$ yarn publish
```
