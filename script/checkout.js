import { cart, removeFromCart, updateDeliveryOption } from "../data/carts.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions } from "../data/deliveryOptins.js";

function renderOrderSummery() {
  let htmlCheckOut = "";
  let orderSummary = document.querySelector(".order-summary");

  let machingProduct;

  cart.map((item) => {
    let pId = item.id;

    products.map((productItem) => {
      if (pId === productItem.id) {
        machingProduct = productItem;
      }
    });

    let delivery;
    deliveryOptions.map((option) => {
      if (option.id === item.deliveryOptionId) {
        delivery = option;
      }
    });

    const today = dayjs();
    const deliveryDay = today.add(delivery.deliveryDay, "day");
    const dateFormat = deliveryDay.format("dddd , MMMM , D");

    htmlCheckOut += `
    <div class="cart-item-container">
           <div class="delivery-date">Delivery date: ${dateFormat}</div>

           <div class="cart-item-details-grid">
             <img
               class="product-image"
               src="${machingProduct.image}"
             />

             <div class="cart-item-details">
               <div class="product-name">
                 ${machingProduct.name}
               </div>
               <div class="product-price">$${formatCurrency(
                 machingProduct.priceCents
               )}</div>
               <div class="product-quantity">
                 <span> Quantity: <span class="quantity-label">${
                   item.quantity
                 }</span> </span>
                 <span class="update-quantity-link link-primary">
                   Update
                 </span>
                 <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
                   machingProduct.id
                 }">
                   Delete
                 </span>
               </div>
             </div>

             <div class="delivery-options " >
               <div class="delivery-options-title">
                 Choose a delivery option:
               </div>
                ${deliveryOption(machingProduct, item.deliveryOptionId)}
             </div>
           </div>
         </div>
 `;
  });
  orderSummary.innerHTML = htmlCheckOut;

  function deliveryOption(machingProduct, deliveryOptionId) {
    let html = "";
    deliveryOptions.map((dateItem) => {
      const today = dayjs();
      const deliveryDay = today.add(dateItem.deliveryDay, "day");
      const dateFormat = deliveryDay.format("dddd , MMMM , D");
      const priceString =
        dateItem.priceCents === 0
          ? "Free -"
          : `$${formatCurrency(dateItem.priceCents)} -`;

      const ischecked = dateItem.id === deliveryOptionId;

      html += `
        <div class="delivery-option js-delivery-option" data-product-id=${
          machingProduct.id
        }
             data-delivery-option-id=${dateItem.id}>
                 <input
                   type="radio"
                   ${ischecked ? "checked" : ""}
                   class="delivery-option-input"
                   name="delivery-option-${machingProduct.id}"
                 />
                 <div>
                   <div class="delivery-option-date">${dateFormat}</div>
                   <div class="delivery-option-price">${priceString} Shipping</div>
                 </div>
               </div>
        
        `;
    });

    return html;
  }

  [...document.querySelectorAll(".js-delete-link")].map((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      const parent = link.closest(".cart-item-container");
      parent.remove();
      removeFromCart(productId);
    });
  });

  [...document.querySelectorAll(".js-delivery-option")].map((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummery();
    });
  });
}

renderOrderSummery();
