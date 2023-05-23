import { Server } from "socket.io";
import ProductManager from "./controllers/ProductManager.js";

const productManager = new ProductManager();

const serverSocket = (server) => {
  const io = new Server(server);

  // Configurar eventos de Socket.io
  io.on("connection", (socket) => {
    console.log("Usuario conectado");

    // Evento para emitir la lista de productos actualizada a los clientes
    const generarListProduct = async () => {
      const products = await productManager.getProducts();
      socket.emit("productList", products);
    };

    // Emitir la lista de productos al cliente recién conectado
    generarListProduct();

    // Escuchar el evento de creación de un nuevo producto
    socket.on("createProduct", async (productData) => {
      try {
        await productManager.addProducts(productData);
        generarListProduct();
      } catch (error) {
        console.error("Error creando el producto:", error);
      }
    });

    // Escuchar el evento de eliminación de un producto
    socket.on("deleteProduct", async (productId) => {
      await productManager.deleteProducts(productId);
      generarListProduct();
    });

    // Manejar la desconexión del cliente
    socket.on("disconnect", () => {
      console.log("El usuario se ha ido");
    });
  });
};

export default serverSocket;
