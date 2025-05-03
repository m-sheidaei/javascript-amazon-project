export const cart = [];

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
}
