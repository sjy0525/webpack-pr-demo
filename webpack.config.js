
const path=require("path")
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin=require('html-webpack-plugin')
const TestPlugin=require('./plugins/test-plugin')
module.exports={
    entry:"./src/main.js", //入口更改为main.js
    output:{ //配置出口，是一个对象
        filename:"bundle.js", //配置出口文件名为bundle.js
        path:path.resolve(__dirname,"./build") 
    },
    mode:'development',
    devServer:{
        hot:true
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:["style-loader","css-loader",{
                    loader:'postcss',
                    options:{
                        postcssOptions:{
                            plugins:['postcss-preset-env']//为兼容问题的属性自动添加浏览器前缀
                        }
                    }
                }]
            },
            {
                test:/\.less$/,
                use:['less-loader',"style-loader","css-loader"]
            },
            {
                loader:"babel-loader",
                options:{
                  	presets:["@babel/preset-env"] //注意这里是预设preset配置项，已不再是plugins
                },
                exclude: [
                    /node_modules/,
                    /\.ejs$/ // 排除 EJS 文件
                ],
            },
            {
                test:'/\.(png|jpg|jpeg|svg|gif/',
                type:'asset',
                parser:{
                    dataUrlCondition:{
                        maxSize:6*1024
                    }
                }
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin(),
        new TestPlugin()
    ]
}
