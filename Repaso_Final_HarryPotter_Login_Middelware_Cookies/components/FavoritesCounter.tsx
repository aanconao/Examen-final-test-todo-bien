// components/FavoritesCounter.tsx
import { favoritesSignal } from "../Signal/favoritesSignal.tsx";

export default function FavoritesCounter() {
  return <p>Favoritos: {favoritesSignal.value.length}</p>;
}
