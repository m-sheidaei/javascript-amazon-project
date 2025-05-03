export function formatCurrency(priceCents) {
  return priceCents < 100 ? priceCents : (priceCents / 100).toFixed(2);
}
