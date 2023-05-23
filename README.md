# Medium Feed Parser

[![Node.js CI](https://github.com/ceoldevs/medium-feed-parser/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/ceoldevs/medium-feed-parser/actions/workflows/node.js.yml)
[![Node.js Package](https://github.com/ceoldevs/medium-feed-parser/actions/workflows/npm-publish.yml/badge.svg?branch=main)](https://github.com/ceoldevs/medium-feed-parser/actions/workflows/npm-publish.yml)

## Installation

```bash
npm i @ceol/medium-feed-parser
# or yarn add @ceol/medium-feed-parser
```

## Usage

```js
const {parse} = require('medium-feed-parser');

(async function() {
    let out = await parse('kirito');
    console.dir(out);
})();
```

### Available Methods

- `parse()` - argumet is profile (username) as parameter (will be formatted as `"https://medium.com/@{profile}/feed"`).
- `parseXML()` - argument is data that is used after fetching from the source to be parsed.
