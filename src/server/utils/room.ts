export function generateRoomCode() {
  return Math.floor(Math.random() * 2 ** 16).toString(16).toUpperCase().padStart(4, '0');
}
