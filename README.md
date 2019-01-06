# Flot 

<p align="center">
<a href="#" target="_blank">
<img alt="Flot" title="Flot" src="https://github.com/ajainvivek/flot/blob/master/chrome/assets/img/icon-128.png" width="100">
</a>
</p>
<p align="center">Floating Video for Youtube, Twitch, Vimeo and other websites.</p>

## Installation

```bash
# clone it
$ git clone https://github.com/ajainvivek/flot.git

# Install dependencies
$ npm install
```

## Development

* Run script
```bash
# build files to './dev'
# start webpack development server
$ npm run dev
```
* If you're developing Inject page, please allow `https://localhost:3000` connections. (Because `injectpage` injected GitHub (https) pages, so webpack server procotol must be https.)
* [Load unpacked extensions](https://developer.chrome.com/extensions/getstarted#unpacked) with `./dev` folder.

#### Using Redux DevTools Extension

You can use [redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension) on development mode.

## Build

```bash
# build files to './build'
$ npm run build
```

## Compress

```bash
# compress build folder to {manifest.name}.zip and crx
$ npm run build
$ npm run compress -- [options]
```

#### Options

If you want to build `crx` file (auto update), please provide options, and add `update.xml` file url in [manifest.json](https://developer.chrome.com/extensions/autoupdate#update_url manifest.json).

* --app-id: your extension id (can be get it when you first release extension)
* --key: your private key path (default: './key.pem')  
  you can use `npm run compress-keygen` to generate private key `./key.pem`
* --codebase: your `crx` file url

See [autoupdate guide](https://developer.chrome.com/extensions/autoupdate) for more information.

## Test

* `test/app`: React components, Redux actions & reducers tests
* `test/e2e`: E2E tests (use [chromedriver](https://www.npmjs.com/package/chromedriver), [selenium-webdriver](https://www.npmjs.com/package/selenium-webdriver))

```bash
# lint
$ npm run lint
# test/app
$ npm test
$ npm test -- --watch  # watch files
# test/e2e
$ npm run build
$ npm run test-e2e
```

## Copyright / License

Copyright 2018-2019 Ajain Vivek and [other contributors](https://github.com/ajainvivek/flot/graphs/contributors)

This software is licensed under the terms of the Mozilla Public License v2.0. See the [COPYRIGHT](https://github.com/ajainvivek/flot/blob/master/COPYRIGHT) and [LICENSE](https://github.com/ajainvivek/flot/blob/master/LICENSE) files.

Please do not use the name Flot to endorse or promote products derived from this software without the maintainers' permission, except as may be necessary to comply with the notice/attribution requirements.

We also wish that any documentation file generated using this software be attributed to Flot. Let's be fair to all contributors by giving credit where credit's due. Thanks!

## Questions?

If you have any questions, please feel free to ask them on github issues.