const WA_NUMBER = '919999999999'; // Replace with actual number

export function getWhatsAppLink(serviceName: string): string {
  const message = `Hi! I'm interested in: ${serviceName}`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppCartLink(cartItems: Array<{ title: string; quantity: number }>): string {
  const items = cartItems.map((item) => `${item.quantity}x ${item.title}`).join('\n');
  const message = `Hi! I'd like to order:\n\n${items}\n\nPlease send me the details.`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}
