const express = require('express');
const exphbs = require('express-handlebars');
//section: tạo các {{{}}}
const hbs_sections = require('express-handlebars-sections');
const session = require('express-session');
//morgan:tạo ra log các request đến server
//morgan:tạo ra log các request đến server
const morgan = require('morgan');
//để bắt hết các lỗi vô chung render
require('express-async-errors');

const app = express();
app.use(morgan('dev'));
//hai middewware hỗ trợ
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,

    }))
    //e
    //express static hỗ trợ tạo route cho các tệp trong folder
app.use(express.static('public'));

app.engine('hbs', exphbs({
    defaultLayout: 'main.hbs',
    layoutsDir: 'views/_layouts',
    //hbr cho xây dựng hàm gọi là helper
    helpers: {
        //hàm thêm kí tự $ vào chuỗi tiền
        format: val => val + '$',
        //section:{{{}}}
        section: hbs_sections(),
    }

}));
app.set('view engine', 'hbs');

// app.use(require('./middlewares/locals.mdw'));
// để vô middlewares cho đồng bộ đỡ rối bên file app này, truyền app để chạy đc app.use
require('./middlewares/locals.mdw')(app);
require('./middlewares/routes.mdw')(app);


app.get('/', (req, res) => {
    // res.end('hello from expressjs');
    console.log(res.locals.authUser);
    res.render('home');
})

app.get('/about', (req, res) => {
    res.render('about');
})


//hàm bắt lỗi sai đường dẫn
app.use((req, res, next) => {
    console.log('you\'re lost');
    res.render('error', { layout: false });
    //res.send('You\'re lost');
})

//
//bắt mọi lỗi , để cuối cùng của tất cả app.use
// default error handler

app.use((err, req, res, next) => {
    // res.render('vwError/index');
    console.error(err.stack);
    console.log('error on csl');
    res.render('error', { layout: false });
    // res.status(500).send('View error on console.');
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})