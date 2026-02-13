const UserRouter = require('./UserRouter')
const ProductRouter = require('./ProductRouter')

const routes = (app) => {
    app.use('/api/user', UserRouter)
    // // fix Can't not get 
    // app.use('/', (req, res) =>{
    //     res.send('Home page')
    // })

    app.use('/api/product', ProductRouter)
}

module.exports = routes