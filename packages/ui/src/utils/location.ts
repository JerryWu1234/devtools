import { isBrowser} from '@qwik.dev/core';
import {  _getDomContainer } from '@qwik.dev/core/internal';
export function getCurrentLocation() {
  if (!isBrowser) return '';

  if (window.location.pathname === '/') return '/';

  return window.location.pathname.slice(0, -1);
}


export function htmlContainer() {
  const htmlElement = document.documentElement;
  return _getDomContainer(htmlElement)
}