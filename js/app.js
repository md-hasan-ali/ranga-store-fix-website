// Load Products functions 
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
      <div style="background-color:#f9f9f9" class="card h-100 text-center single-product">
        <img src="${image}" class="product-image" alt="images">
        <div class="card-body">
          <h3 class="card-title">${product.title}</h3>
          <p>Category: ${product.category}</p>
          <p>Rating Avg : 
          <i class="fas fa-star rating-color"></i>
          <i class="fas fa-star rating-color"></i>
          <i class="fas fa-star rating-color"></i>
          <i class="fas fa-star-half-alt rating-color"></i>
          <i class="far fa-star rating-color"></i> <strong>${product.rating.rate} </strong></p>
          <p>(Total-Review :<strong> ${product.rating.count})</strong></p>
          <h2>Price: $ ${product.price}</h2>
        </div>
        <div class="pb-3">
          <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="btn btn-success">add to cart</button>
          <button id="details-btn" class="btn btn-danger">Details</button>
        </div>
      </div>
      </div>
    `;
    document.getElementById("all-products").appendChild(div);
  }
};
// Update My-Cart function
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  getInputValue("delivery-charge");
  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};
// update input value function
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};
//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
