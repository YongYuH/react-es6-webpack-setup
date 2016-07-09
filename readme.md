# webpack-basic-setup

在使用webpack建立ReactJS專案之前，要先安裝[nodeJS](https://nodejs.org)，安裝完後  
輸入*指令*
```sh
node -v
```
以及
```sh
npm -v
```
可查看現在使用的版本  
我使用的版本是  
**node** v6.2.1  
**npm** v3.10.3  
確定**npm**安裝完成後即可開始接下來的步驟  

## React JS+webpack環境設定&環境測試
### 安裝webpack
使用*指令*  
```sh
npm install webpack@1.13.1 --save-dev
```
將**webpack**安裝進專案資料夾中  
`--save-dev`代表將**webpack**安裝儲存於專案目錄下 

這句指令可簡寫成
```sh
npm i webpack@1.13.1 -D
```
`npm install`可簡寫成`npm i`  
`--save-dev`可以簡寫成`-D`  
`npm install`相關指令簡寫可參考 [install|npm Document]  
`--save-dev`指令代表安裝在哪參考 [WEBPACK入門教學筆記]  

### 資料夾與檔案結構
按照以下結構建立**檔案**與*資料夾*來測試環境設定:  
-  *app*/
    - **main.js**
- *build*/ 
    - **index.html**
    - (**bundle.js**) (此檔案不用建立，使用 `webpack`指令後會自動生成)
- **package.json**
- **webpack.config.js**  

##### 建立**wepack.config.js**  , 填入以下程式碼: 
```js
/* webpack.config.js */
var path = require('path');

module.exports = {
    entry: [path.resolve(__dirname, 'app/main.js')],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    }
};
```

我們先測試一下
##### 建立 *app*/**main.js** , 填入以下程式碼:
```js
document.write('It works');
```

##### 建立 *build*/**index.html** , 填入以下程式碼:
```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
</head>

<body>
    <script src="bundle.js"></script>
</body>

</html>
```
html中script tag引入了 **bundle.js**， 這是執行`webpack`指令後，將js打包之後輸出的檔案  

輸入*指令*
```sh
webpack
```
用瀏覽器開啟*build*資料夾中的**index.html**，如果成功的話，會看到瀏覽器顯示 It works  

### 設定**package.json**
在專案目錄下用*指令*  
```sh
npm init
```
建立 **package.json** ，建立的過程中全按enter就好  
##### 修改**package.json**中scripts的值
```js
{
...
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "./node_modules/.bin/webpack"
  }
}
```
現在輸入*指令*
```sh
npm run build
``` 
就等同於輸入*指令*`./node_modules/.bin/webpack`  
為什麼不直接用`webpack`而是前面要用`./node_modules/.bin/webpack`呢？  
原因可參考[影片 REACT JS TUTORIAL #1 - cleaner setting for developers] 8:51 ~ 10:08

### 安裝需要的模組
安裝 [React](https://facebook.github.io/react/)
```sh
npm i react@15.2.1 react-dom@15.2.1 -D
```

安装 [Babel](https://babeljs.io/) 的 loader 以支持 ES6 語法
```sh
npm i babel-core@6.10.4 babel-loader@6.2.4 babel-preset-es2015@6.9.0 babel-preset-react@6.11.1 -D
```

##### 修改**webpack.config.js**來使用安裝的loader
```js
/* webpack.config.js */
var path = require('path');

module.exports = {
    entry: [path.resolve(__dirname, 'app/main.js')],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
        {
            test: /\.js$/,
            loaders: ['babel?presets[]=es2015,presets[]=react']
        }
        ]
    }
};
```
此處test的語法為正規表示法([Regular Expression])  
loaders相關的語法參考  
[stackoverflow: Webpack - Error: Cannot define 'query' and multiple loaders in loaders list]  
測試一下開發環境是否建立完成
##### 修改*app*/**main.js**
```js
/* main.js */
import React from 'react';
import { render } from 'react-dom';

export default class Main extends React.Component {
    render() {
        return (
            <div>Hello World</div>      
        );
    }
};

var myElement = document.getElementById('content');

render(<Main />, myElement);
```

Hello World被放進id為content的DOM元素中  
所以需要增加元件到**index.html**中
##### *build*/**index.html**
```html
...
<body>
  <div id="content"></div>
  <script src="./bundle.js"></script>  
</body>
...
```
經過以上步驟，我們已將所有的環境設定建立完成  
以上步驟參考[build-a-hn-front-page]  

## 按鈕轉換state專案練習
此專案程式碼參考[Rhadow's Tech Note]  
### 資料夾與檔案結構
按照以下結構建立**檔案**與*資料夾*來建立專案:  
-  *app*/
    - **main.js**
    - **TestOne.js**
    - **TestTwo.js**
- *build*/ 
    - **index.html**
    - (**bundle.js**) (此檔案不用建立，使用 `webpack`指令後會自動生成)
- **package.json**
- **webpack.config.js**  


##### 新增*app*/**TestOne.js**，並輸入以下程式碼
```js
/* TestOne.js */
import React from 'react';

export default class TestOne extends React.Component {
    render() {
        return (
            <div>Hello I am TestOne Component</div>
        );
    }
};
```
##### 新增*app*/**TestTwo.js**，並輸入以下程式碼
```js
/* TestTwo.js */
import React from 'react';

export default class TestTwo extends React.Component {
    render() {
        return (
            <h1>Hello I am TestTwo Component</h1>
        );
    }
};
```
import和export為es6的語法  
用法可參考 [module 影片 Javascript ES6 Cheatsheet #2] 13:33 ~ 17:37  
class和extend也是es6的語法  
用法可參考 [class 影片 Javascript ES6 Cheatsheet #2] 4:32 ~ 7:11  
export default用法參考  [Modules 我的筆記]  

React es6的寫法和之前版本寫法的差異  
可參考 [React.createClass versus extends React.Component]  


##### 修改*app*/**main.js**
```js
/* main.js */
import React from 'react';
import { render } from 'react-dom';
import TestOne from './TestOne.js';
import TestTwo from './TestTwo.js';

export default class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            isActive: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick () {
        var active = !this.state.isActive;
        this.setState({ isActive: active });
    }

    render() {
        return (
            <div>
                <input type="button" onClick={this.handleClick} value="Press Me!"/>
                {this.state.isActive ? <TestTwo /> : <TestOne />}
            </div>      
        );
    }
};

var myElement = document.getElementById('content');

render(<Main />, myElement);
```
{ render } 為es6 destructure的寫法  
詳細用法可參考 [destructure 影片 Javascript ES6 Cheatsheet]  
關於component state的寫法  
可參考 [Best Practices for Component State in React.js]  
這邊要注意一點  
React的createClass方法(舊寫法)的this的context一律對應到class  
但React class extends React.Component(es6，新寫法)中method裡的this的context會改變  
所以要記得在後面加bind(this)  


最後用瀏覽器開啟 *build*/**index.html**  
無打字錯誤的話，應該能看到功能執行  

## 功能  
顯示Hello I am TestOne Component  
(render TestOne Component: <div>Hello I am TestOne Component </div>)  
按下Click me按鈕後變成顯示粗體的Hello I am TestOne Component  
(render TestTwo Component: <h1>Hello I am TestOne Component </h1>)  
### [功能Demo影片]  



[install|npm Document]: https://docs.npmjs.com/cli/install
[影片 REACT JS TUTORIAL #1 - cleaner setting for developers]: https://www.youtube.com/watch?v=MhkGQAoc7bc#t=8m51s
[WEBPACK入門教學筆記]: http://blog.kkbruce.net/2015/10/webpack.html
[Regular Expression]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Regular_Expressions
[stackoverflow: Webpack - Error: Cannot define 'query' and multiple loaders in loaders list]: http://stackoverflow.com/questions/35266706/webpack-error-cannot-define-query-and-multiple-loaders-in-loaders-list  
[build-a-hn-front-page]: https://github.com/theJian/build-a-hn-front-page  
[Rhadow's Tech Note]: https://rhadow.github.io/2015/04/02/webpack-workflow/  
[module 影片 Javascript ES6 Cheatsheet #2]: https://www.youtube.com/watch?v=LmL0Gh193M0&list=PLoYCgNOIyGACDQLaThEEKBAlgs4OIUGif&index=1#t=13m33s  
[class 影片 Javascript ES6 Cheatsheet #2]: https://www.youtube.com/watch?v=LmL0Gh193M0&index=2&list=PLoYCgNOIyGACDQLaThEEKBAlgs4OIUGif#t=4m32s  
[Modules 我的筆記]: http://www.evernote.com/l/AdrV7kNFZkxPy6gk9TjJs8RliE_2Uce-ZmU/  
[React.createClass versus extends React.Component]: https://toddmotto.com/react-create-class-versus-component/  
[destructure 影片 Javascript ES6 Cheatsheet]: https://www.youtube.com/watch?v=AfWYO8t7ed4&list=PLoYCgNOIyGACDQLaThEEKBAlgs4OIUGif&index=1#t=1m35s
[Best Practices for Component State in React.js]: http://brewhouse.io/blog/2015/03/24/best-practices-for-component-state-in-reactjs.html  
[功能Demo影片]: https://www.youtube.com/watch?v=5iGb3woErg8&feature=youtu.be  