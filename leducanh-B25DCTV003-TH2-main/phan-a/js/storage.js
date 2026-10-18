const FAV_KEY = 'favorite_books';

export function getFavorites() {
  return JSON.parse(localStorage.getItem(FAV_KEY)) || [];
}

export function saveFavorites(favIds) {
  localStorage.setItem(FAV_KEY, JSON.stringify(favIds));
}