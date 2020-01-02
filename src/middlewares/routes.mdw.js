module.exports = function(app) {
    //bê ngoài app.js vô đây cho gọn 
    app.use('/categories', require('../routes/category.route'));
    app.use('/admin/categories', require('../routes/admin/category.route'));
    app.use('/admin/users', require('../routes/admin/user.route'));
};