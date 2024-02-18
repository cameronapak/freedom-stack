import type { Alpine } from 'alpinejs';
// @ts-ignore - Has no associated types.
import intersect from '@alpinejs/intersect';
// @ts-ignore - Has no associated types.
import persist from '@alpinejs/persist';

export default (Alpine: Alpine) => {
  Alpine.plugin(intersect);
  Alpine.plugin(persist);
}
