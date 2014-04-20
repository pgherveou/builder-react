# builder-react

Facebook React plugin for [component-builder2](https://github.com/component/builder2.js).

## Example

```js
var fs = require('fs');
var build = require('component-builder');
var react = require('builder-react');

build.scripts(nodes)
  .use('scripts', build.plugins.js())
  .use('scripts', react())
  .build(function (err, string) {
    if (err) throw err;
    fs.writeFileSync('build.js', string);
  })
```

You could put your jsx files in `.scripts` or create your own field like `.jsx`.

## License

The MIT License (MIT)

