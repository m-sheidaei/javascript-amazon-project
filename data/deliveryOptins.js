export const deliveryOptions = [
  {
    id: "1",
    deliveryDay: 7,
    priceCents: 0,
  },
  {
    id: "2",
    deliveryDay: 3,
    priceCents: 499,
  },
  {
    id: "3",
    deliveryDay: 1,
    priceCents: 988,
  },
];

export function getDeliveryOption(deliveryOptionId) {
  let delivery;
  deliveryOptions.map((option) => {
    if (option.id === deliveryOptionId) {
      delivery = option;
    }
  });

  return delivery || deliveryOptions[0];
}
