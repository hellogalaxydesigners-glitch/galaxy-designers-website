import { useEffect, useState } from 'react';

/** True after the page has become interactive in the browser (false during pre-rendering). */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
