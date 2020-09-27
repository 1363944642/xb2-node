```|-- Desktop
    |-- .DS_Store
    |-- .env ---应用里需要的环境变量配置
    |-- .gitignore ---git配置
    |-- .prettierrc ---自动排版配置
    |-- README.md ---说明文档
    |-- package-lock.json
    |-- package.json
    |-- tsconfig.json ---TypeScript配置文件
    |-- dist ---TypeScript编译后文件目录
    |   |-- main.d.ts
    |   |-- main.js
    |   |-- main.js.map
    |   |-- playground.d.ts
    |   |-- playground.js
    |   |-- playground.js.map
    |   |-- tsconfig.tsbuildinfo
    |   |-- app
    |   |   |-- app.comfig.d.ts
    |   |   |-- app.comfig.js
    |   |   |-- app.comfig.js.map
    |   |   |-- app.config.d.ts
    |   |   |-- app.config.js
    |   |   |-- app.config.js.map
    |   |   |-- app.middleware.d.ts
    |   |   |-- app.middleware.js
    |   |   |-- app.middleware.js.map
    |   |   |-- index.d.ts
    |   |   |-- index.js
    |   |   |-- index.js.map
    |   |-- post
    |       |-- post.controller.d.ts
    |       |-- post.controller.js
    |       |-- post.controller.js.map
    |       |-- post.router.d.ts
    |       |-- post.router.js
    |       |-- post.router.js.map
    |       |-- post.serivice.d.ts
    |       |-- post.serivice.js
    |       |-- post.serivice.js.map
    |       |-- post.service.d.ts
    |       |-- post.service.js
    |       |-- post.service.js.map
    |-- src ---TypeScript编译前文件目录
        |-- main.ts ---入口文件
        |-- app ---应用相关的模块
        |   |-- app.config.ts ---环境变量
        |   |-- app.middleware.ts ---中间件
        |   |-- index.ts ---应用出口
        |-- post ---内容接口
            |-- post.controller.ts ---控制器
            |-- post.router.ts ---路由
            |-- post.service.ts ---服务
```
