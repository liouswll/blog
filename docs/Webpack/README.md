## 入口（entry）
- 入口起点（entry point）指示应该使用那个模块，来作为内部依赖图的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。
- 每个依赖项随即被处理，最后输出到称之为 bundles 的文件中
- 文件webpack.config.js
    ```
    module.exports = {
    entry: './path/to/my/entry/file.js'
    };
    ```
## 出口（output）
- output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 ./dist。
- 基本上，整个应用程序结构，都会被编译到你指定的输出路径的文件夹中。你可以通过在配置中指定一个 output 字段，来配置这些处理过程：
- 文件webpack.config.js
    ```
    const path = require('path');

    module.exports = {
    entry: './path/to/my/entry/file.js',
    output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'my-first-webpack.bundle.js'
        }
    };
    上面的示例中，我们通过 output.filename 和 output.path 属性，来告诉 webpack bundle 的名称，
    以及我们想要 bundle 生成(emit)到哪里。可能你想要了解在代码最上面导入的 path 模块是什么，
    它是一个 Node.js 核心模块，用于操作文件路径。
    ```     
## loader
- loader 让 webpack 能够去处理那些非 JavaScript 文件。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理。
- 本质上，webpack loader 将所有类型的文件，转换为应用程序的依赖图（和最终的 bundle）可以直接引用的模块。
>loader 能够 import 导入任何类型的模块（例如 .css 文件），这是 webpack 特有的功能，其他打包程序或任务执行器的可能并不支持。我们认为这种语言扩展是有很必要的，因为这可以使开发人员创建出更准确的依赖关系图。

- 在更高层面，在 webpack 的配置中 loader 有两个目标：  
**test 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件。**  
**use 属性，表示进行转换时，应该使用哪个 loader。**

- 文件webpack.config.js
    ```
    const path = require('path');
    const config = {
        output: {
        filename: 'my-first-webpack.bundle.js'
    },
    module: {
            rules: [
                { test: /\.txt$/, use: 'raw-loader' }
            ]
        }
    };
    module.exports = config;
    ```

## 插件（plugins）
- oader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务。
- 想要使用一个插件，你只需要 require() 它，然后把它添加到 plugins 数组中。多数插件可以通过选项(option)自定义。你也可以在一个配置文件中因为不同目的而多次使用同一个插件，这时需要通过使用 new 操作符来创建它的一个实例。

- 文件webpack.config.js
    ```
    const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
    const webpack = require('webpack'); // 用于访问内置插件

    const config = {
    module: {
        rules: [
        { test: /\.txt$/, use: 'raw-loader' }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: './src/index.html'})
    ]
    };

    module.exports = config;
    ```

## 模式
- 通过选择 development 或 production 之中的一个，来设置 mode 参数，你可以启用相应模式下的 webpack 内置的优化
    ```
    module.exports = {
        mode: 'production'
    };
    ```