import { cart } from "../../data/carts.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptins.js";
import { products } from "../../data/products.js";
import { getProducts } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { renderOrderSummery } from "./orderSummary.js";

export function renderPaymentSummary() {
  let totalquantity = 0;
  let priceCent = 0;
  let sumDelivery = 0;
  let totalBeforeTax = 0;

  cart.map((cartItem) => {
    totalquantity += cartItem.quantity;
    let matchingItem = getProducts(cartItem.id);

    priceCent += matchingItem.priceCents * cartItem.quantity;

    let delivery = getDeliveryOption(cartItem.deliveryOptionId);

    sumDelivery += delivery.priceCents;
    totalBeforeTax = priceCent + sumDelivery;
  });

  document.querySelector(
    ".payment-summary-money"
  ).innerHTML = `$${formatCurrency(priceCent)}`;

  document.querySelector(
    ".payment-count"
  ).innerHTML = `Item : (${totalquantity})`;

  document.querySelector(".payment-delivery").innerHTML = `$${formatCurrency(
    sumDelivery
  )}`;

  document.querySelector(".total-before-tax").innerHTML = `$${formatCurrency(
    totalBeforeTax
  )}`;

  document.querySelector(".estimated-tax").innerHTML = `$${formatCurrency(
    totalBeforeTax * 0.1
  )}`;

  document.querySelector(".total-purchase").innerHTML = `$${formatCurrency(
    totalBeforeTax + totalBeforeTax * 0.1
  )}`;
}
