export let cart = JSON.parse(localStorage.getItem("cart") || []);

// export let cart = [
//   {
//     productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
//     quantity: 1,
//   },
//   {
//     productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
//     quantity: 2,
//   },
// ];

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId, parent) {
  let machingItem;
  const quantity = parseInt(parent.querySelector(".quantity-select").value);

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
  saveToStorage();
}

export function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveToStorage();
}
