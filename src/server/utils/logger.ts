import { log } from 'log-type';

export function room(message: string): void {
  log('[Room]', 'magenta', message);
}
export function player(message: string): void {
  log('[Player]', 'cyan', message);
}
