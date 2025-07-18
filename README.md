first step: pnpm install 

second step: pnpm run build 

third step: cd packages/ui

fourth step: open packages/ui/src/devtools.tsx

fifth step: open comment in devtools.tsx

sixth step: open file @qwik.dev/core/optimizer.mjs 

seventh step: add code `export {isStore} from './core.mjs'` into `@qwik.dev/core/optimizer.mjs`

eighth step: export isStore in `./core.mjs

ninth step: pnpm run dev in ui folder