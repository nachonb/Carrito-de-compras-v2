// Lista de los productos

const productList = [
  { name: "Notebook", price: 149999, category: "Computacion" },
  { name: "Auriculares", price: 24999, category: "Audio" },
  { name: "Parlante JBL", price: 11999, category: "Audio" },
  { name: "Mouse", price: 14999, category: "Computacion" },
  { name: "Teclado", price: 10999, category: "Computacion" },
  { name: "Joystick PS5", price: 39999, category: "Videojuegos" },
  { name: "Consola Play Station 5", price: 349999, category: "Videojuegos" }
];

let cart = [];

// Cargar la lista de productos en el DOM
const loadProducts = () => {
  const productListEl = document.getElementById("productList");
  productList.forEach(product => {
    const li = document.createElement("li");
    li.innerHTML = `<b> <u> ${product.name} </u> </b> <br> Precio: $${product.price} <br> Categoria: ${product.category}`;
    productListEl.appendChild(li);
  });

  const productSelectEl = document.getElementById("productSelect");
  productList.forEach((product, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.text = product.name;
    productSelectEl.add(option);
  });
};

// Cargar el carrito en el DOM
const loadCart = () => {
  const cartListEl = document.getElementById("cartList");
  cartListEl.innerHTML = "";
  cart.forEach(product => {
    const li = document.createElement("li");
    li.innerHTML = `<b> ${product.name} </b> - $${product.price} - ${product.category}`;
    cartListEl.appendChild(li);
  });

  let totalAmount = 0;
  cart.forEach(product => {
    totalAmount += product.price;
  });

  const totalAmountEl = document.getElementById("totalAmount");
  totalAmountEl.innerHTML = `<i> Total: $${totalAmount}`;
};

// Añadir un producto al carrito
const addToCart = product => {
  cart.push(product);
  loadCart();
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Eliminar un producto del carrito
const removeFromCart = product => {
  const index = cart.indexOf(product);
  if (index !== -1) {
    cart.splice(index, 1);
  }
  loadCart();
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Manejar el evento al hacer clic en el botón "Añadir al Carrito"
const addButtonEl = document.getElementById("addButton");
addButtonEl.addEventListener("click", () => {
  const productSelectEl = document.getElementById("productSelect");
  const selectedIndex = productSelectEl.value;
  addToCart(productList[selectedIndex]);
});

// Manejar el evento al hacer clic en el botón "Eliminar del Carrito"
const removeButtonEl = document.getElementById("removeButton");
removeButtonEl.addEventListener("click", () => {
  const productSelectEl = document.getElementById("productSelect");
  const selectedIndex = productSelectEl.value;
  removeFromCart(productList[selectedIndex]);
});

// Cargar el carrito desde el Storage
const savedCart = localStorage.getItem("cart");
if (savedCart) {
  cart = JSON.parse(savedCart);
}

loadProducts();
loadCart();

