import { component$, Slot } from "@qwik.dev/core";
import { State, TabName } from "../../types/state";

interface TabProps {
  state: State;
  id: TabName;
  title: string;
}

export const Tab = component$<TabProps>(({ state, id, title }) => {
  return (
    <button
      onClick$={() => (state.activeTab = id)}
      title={title}
      class={{
        "flex h-10 w-10 items-center justify-center rounded-lg p-2.5 transition-all duration-200":
          true,
        // Inactive tab: transparent background, muted foreground text, hover to slightly opaque foreground background and foreground text
        "bg-transparent text-muted-foreground hover:bg-foreground hover:bg-opacity-10 hover:text-foreground":
          state.activeTab !== id,
        // Active tab: primary background, primary foreground text, and a primary-colored shadow
        "bg-primary text-primary-foreground shadow-lg shadow-primary":
          state.activeTab === id,
      }}
    >
      <Slot />
    </button>
  );
});
