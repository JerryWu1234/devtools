import { component$ } from "@qwik.dev/core";
import { State } from "../../types/state";

interface RoutesProps {
  state: State;
}

export const Routes = component$(({ state }: RoutesProps) => {

  return (
    <div class="overflow-hidden rounded-xl border border-[var(--color-border-translucent)] flex-1">
      <div class="grid grid-cols-4 gap-4 bg-[var(--color-card-item-bg)] p-4 text-sm font-medium">
        <div>Route Path</div>
        <div>Name</div>
        <div>Middleware</div>
        <div>Layout</div>
      </div>
      {state.routes?.map((route, i) => {
        const children = route.children || [];
        const layout =
          route.relativePath !== "" &&
          route.type === "directory" &&
          children.find((child) => child.name.startsWith("layout"));

        return (
          <div
            key={route.relativePath}
            class="grid grid-cols-4 gap-4 border-t border-t-[var(--color-border-translucent)] p-4 text-sm hover:bg-[var(--color-card-item-bg)]" // Using --color-card-item-bg for hover as it's very close
          >
            <div>
              <span
                class={{ // Active route text color
                  "text-[var(--color-active-route-text)]":
                    (location.pathname === "/" &&
                      route.relativePath === "") ||
                    location.pathname === `/${route.relativePath}/`,
                }}
              >
                {route.relativePath === "" ? "/" : `/${route.relativePath}/`}
              </span>
            </div>
            <div class="text-muted-foreground">{route.name}</div>
            <div class="text-muted-foreground">-</div>
            <div>
              <span
                class={{ // Active/inactive layout text color
                  "text-[var(--color-active-route-text)]": layout && i > 0,
                  "text-muted-foreground": !layout || i === 0,
                }}
              >
                {layout && i > 0 ? `${route.relativePath}/layout` : "default"}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
});
