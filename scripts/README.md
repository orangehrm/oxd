## How to publish

> Note: All paths with respect to project root

### Update version

Update version in `components/package.json` and `package.json`

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
