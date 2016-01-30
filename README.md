# template2env
A micro dependency that interpolates environment variables

## Description
template2env is a single function that accepts a string (and an optional object of options) as a parameter and returns an interpolated string with varaibles replaced by matching environment variables (located in `process.env`).

It will throw if a matching variable is not found in `process.env` and will return the string that was passed if nothing was found to interpolate.

## Use case
Imagine a projects configuration is stored in JSON or YAML and you want one configuration file for all your environments.

```yaml
# config.yaml
site: my site
host: ${HOST}
port: ${PORT}
```

If `process.env` contains `HOST` and `PORT` template2env will intrpolate the yaml and return the matching values, so your local development environment could look like
```yaml
# local dev environment
# export HOST="localhost"
# export PORT=8888
site: my site
host: localhost
port: 8888
```

But your production environment could look like

```yaml
# production environment
# export HOST="foo.biz"
# export PORT=3001
site: my site
host: foo.biz
port: 3001
```

## How to use
```javascript
var template2env = require('template2env'),
  fs = require('fs');

fs.readFile('config.yaml', function (err, data) {
  if (err) throw err;
  console.log(template2env(data));
});
```

## Options
template2env accepts an object of options as an optional second paramter
`start {string} ('${')` - start token for interpolation
`end {string} ('}')` - end token

### Example
```javascript
/* if config.yaml uses `{{VARIABLE}}` for interpolation */

var template2env = require('template2env'),
  fs = require('fs');

fs.readFile('config.yaml', function (err, data) {
  if (err) throw err;
  console.log(template2env(data, { start: '{{', end: '}}' }));
});
