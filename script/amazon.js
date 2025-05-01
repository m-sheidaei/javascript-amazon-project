import { cart } from "../data/carts.js";
import { products } from "../data/products.js";

let htmlProduct = "";

function productList() {
  let productContainer = document.querySelector(".products-grid");

  products.map((value) => {
    htmlProduct += `
    <div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${value.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${value.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src='images/ratings/rating-${value.rating.stars * 10}.png'
            />
            <div class="product-rating-count link-primary">${
              value.rating.count
            }</div>
          </div>

          <div class="product-price">$ ${
            value.priceCents < 100
              ? value.priceCents
              : (value.priceCents / 100).toFixed(2)
          }</div>


          <div class="product-quantity-container">
            <select class='quantity-select'>
           
            </select>
          </div>
          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-card" data-product-id="${
            value.id
          }">Add to Cart</button>
        </div>

    `;
  });

  productContainer.innerHTML = htmlProduct;
}

productList();

const productQuantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const quantitySelect = [...document.querySelectorAll(".quantity-select")].map(
  (value) => {
    let quantityOption = "";
    productQuantity.map((value) => {
      quantityOption += `
          <option value="${value}" class="a">${value}</option>
        `;
    });
    value.innerHTML = quantityOption;
  }
);

// click button and reaction
[...document.querySelectorAll(".js-add-to-card")].map((value) => {
  const productId = value.dataset.productId;
  value.addEventListener("click", () => {
    const parent = value.closest(".product-container");
    const quantity = parseInt(parent.querySelector(".quantity-select").value);

    let machingItem;
    let cartQuantity = 0;
    cart.map((item) => {
      if (productId === item.id) {
        machingItem = item;
      }
    });
    if (machingItem) {
      machingItem.quantity += quantity;
    } else {
      cart.push({
        id: productId,
        quantity: quantity,
      });
    }

    const addedToCart = document.querySelector(".added-to-cart");

    addedToCart.style.opacity = 1;

    setTimeout(() => {
      addedToCart.style.opacity = 0;
    }, 2000);

    cart.map((value) => {
      cartQuantity = cartQuantity + value.quantity;
    });

    document.querySelector(".cart-quantity").innerHTML = cartQuantity;
  });
});
