
import express from 'express'
import handlebars from 'express-handlebars';
import ProductManager from "./controllers/ProductManager.js"
import ProductRouter from './routes/products.router.js'
import CartRouter from './routes/carts.router.js'
import views from './routes/views.router.js'
import serverSocket from './serverSocket.js'
import __dirname from "./utils.js"
import path from 'path';
const PORT = 8080
const product=new ProductManager();
const app = express()



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


app.engine('hbs', handlebars.engine({
    extname: "hbs",
    defaultLayout: false,
    layoutsDir: "views/layouts/",
  }));
app.set('view engine', 'hbs');
app.set("views", __dirname + "/views");


// Implementacion de Router
app.use('/', views)
app.use('/api/products', ProductRouter)
app.use('/api/carts', CartRouter)

app.get("/", async(req,res)=>{
  let products= await product.getProducts()
  res.render("home", {
      title:"Express avanzado",
      products: products

  })
})


const server = app.listen(PORT , (req, res) => {
  console.log(`funcionando, puerto ${PORT}`);
})

serverSocket(server);