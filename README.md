# auto-typings-css-loader

全自动处理 css module 生成对应 .d.ts 类型文件，不受规则限制的 webpack loader。

### 特性

 - 收敛 loader 数量，管理更加方便。

 - 没有 `.module.scss` 结尾的限制，全自动识别是否是 css module：

   ```js
    // css module
    import styles from './index.scss'

    // global style
    import './index.scss'
   ```

 - css module 将自动生成对应的 `.d.ts` 类型文件，无需做全局类型配置。

### 使用

安装：

```bash
  yarn add -D auto-typings-css-loader
```

将 `css-loader` 替换为该 loader 即可，原 `css-loader` 配置移至 `cssLoaderOptions` 配置项，例子如下：

```diff
module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
+         {
+           loader: 'auto-typings-css-loader',
+           options: {
+             cssLoaderOptions: {},
+             typingsLoaderOptions: {}
+           },
+         },
-         {
-           loader: 'css-loader',
-         },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
}
```

### 对比

|                            方案                             | loader 数量 | 自动生成 `.d.ts` | 自动识别 css module | 不会生成多余的 `.d.ts` 文件 | 不受 `.module.scss` 结尾限制 |
| :---------------------------------------------------------: | :---------: | :--------------: | :-----------------: | :-------------------------: | ---------------------------- |
|                  `auto-typings-css-loader`                   |     `1`     |        ✅        |         ✅          |             ✅              | ✅                           |
| `css-loader` <br/> + <br/> `typings-for-css-modules-loader` |     `2`     |        ✅        |         ❌          |             ❌              | ❌                           |


### 配置

|name|default|type|description|
|:-:|:-:|:-:|:-:|
|`includes`|`src`|`string` \| `string[]`|自动识别的目录，一般情况你不需要配置该项 |
|`exts`|`['scss', 'less']`|`string[]`|自动识别生成 `.d.ts` 的样式文件后缀|
|`cssLoaderOptions`|`{}`|`CssLoaderOption`| [css-loader](https://github.com/webpack-contrib/css-loader) options
|`typingsLoaderOptions`|`{}`|`TypingsLoaderOption`| [typings-for-css-modules-loader](https://github.com/TeamSupercell/typings-for-css-modules-loader) options