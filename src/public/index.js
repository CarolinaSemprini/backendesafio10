const socket = io();

// Escuchar el evento 'productList' y actualizar la lista de productos
socket.on("productList", (products) => {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  products.forEach((product) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${product.id} - ${product.title} - ${product.price}`;
    productList.appendChild(listItem);
  });
});

const createProductForm = document.getElementById('createProductForm');
  createProductForm.addEventListener('submit', event => {
    event.preventDefault();
    const title = createProductForm.elements.title.value;
    const description = createProductForm.elements.description.value;
    const price = createProductForm.elements.price.value;
    const code = createProductForm.elements.code.value;
    const stock = createProductForm.elements.stock.value;
    const category = createProductForm.elements.category.value;
    // const thumbnailFile = createProductForm.elements.thumbnail.files[0];

    // Crear un objeto FormData para enviar los datos y la imagen como una solicitud multipart/form-data
    const formData = {
    title: title,
    description: description,
    price: price,
    code: code,
    stock: stock,
    category: category,
    // thumbnail: thumbnailFile);
    }
    socket.emit('createProduct', formData); // Enviar los datos y la imagen como FormData
    createProductForm.reset();
  });

// Enviar el evento 'deleteProduct' cuando se envíe el formulario de eliminación de productos
const deleteProductForm = document.getElementById("deleteProductForm");
deleteProductForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const productId = deleteProductForm.elements.productId.value;
  socket.emit("deleteProduct", productId);
  deleteProductForm.reset();
});
