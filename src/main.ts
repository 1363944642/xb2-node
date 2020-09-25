const express = require('express');
const app = express();
const port = 3000;

/**
 * 使用 JSON 中间件
 */
app.use(express.json());

app.listen(port, () => {
    console.log('🚀 服务已启动!');
});

app.get('/', (req, res) => {
    res.send('你好');
});

const data = [
    {
        id: 1,
        title: '关山月',
        content: '明月出天山,苍茫云海见'
    },
    {
        id: 2,
        title: '望岳',
        content: '会当凌绝顶,一览众山小'
    },
    {
        id: 3,
        title: '忆江南',
        content: '日出江华红胜火,春来江水绿如蓝'

    }
];

app.get('/posts', (req, res) => {
    res.send(data);
});

app.get('/posts/:postId', (req, res) => {
    //获取内容ID
    const { postId } = req.params;

    //查找具体内容
    const posts = data.filter(item => item.id == postId);

    //做出响应
    res.send(posts[0]);
});

/**
 * 创建内容
 */
app.post('/posts', (req, res) => {
    //获取请求里的数据
    const { content } = req.body;

    //设置响应状态码
    res.status(201);

    //输出请求头部数据
    console.log(req.headers['sing-along'])

    //设置响应的头部数据
    res.set('Sing-Along', 'How I wonder what you are!');

    //做出响应
    res.send({
        message: `成功创建了内容: ${content}`
    });
});