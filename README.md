## btc-cli

npm registry [http://94.191.21.122:4873](http://94.191.21.122:4873)

npm换源推荐[nrm](https://github.com/Pana/nrm)

```bash
$ npm install @btc/btc-cli -g
$ btc-cli create     
$ cd my-app           
$ npm run serve        # develop
$ npm run build        # release
```

Directory description:

```
├─ public
├─ src
│  ├─ api
│  ├─ assets
│  ├─ components  // global component
│  ├─ config      // config  request url
│  ├─ layout      // layout components
│  ├─ libs        // utils libs
│  ├─ menu        // config menu
│  ├─ plugin      // plugin libs
│  ├─ router      // config router
│  ├─ store       // Store all this store of pages
│  ├─ views       // custom components
│  ├─ main.js     // Entry js of compiler
│  └─ setting.js  // global setting
```

## Project Template

| **Template Type**|    **Describe**|
| ------------ |  ----------------- |
|vue-element Template| Build with vue and element project template.|

# License

This content is released under the [MIT](http://opensource.org/licenses/MIT) License.
