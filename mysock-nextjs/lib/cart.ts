import { Service } from './services';

export interface CartItem extends Service {
  quantity: number;
}

const CART_KEY = 'mysock_cart';

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
}

export function addToCart(service: Service): void {
  const cart = getCart();
  const existing = cart.find((item) => item.id === service.id);
  
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...service, quantity: 1 });
  }
  
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event('cart-updated'));
}

export function removeFromCart(serviceId: number): void {
  const cart = getCart().filter((item) => item.id !== serviceId);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event('cart-updated'));
}

export function updateQuantity(serviceId: number, quantity: number): void {
  const cart = getCart();
  const item = cart.find((i) => i.id === serviceId);
  
  if (item) {
    if (quantity <= 0) {
      removeFromCart(serviceId);
    } else {
      item.quantity = quantity;
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      window.dispatchEvent(new Event('cart-updated'));
    }
  }
}

export function clearCart(): void {
  localStorage.removeItem(CART_KEY);
  window.dispatchEvent(new Event('cart-updated'));
}

export function getCartTotal(): number {
  // Since we removed prices, return item count instead
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

export function getCartCount(): number {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}
