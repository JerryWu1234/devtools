import {
  component$,
  useStore,
  noSerialize,
  useStyles$,
  useSignal,
  useTask$,
  isBrowser
} from "@qwik.dev/core";
import { tryCreateHotContext } from "vite-hot-client";
import {
  HiBoltOutline,
  HiCubeOutline,
  HiPhotoOutline,
  HiCodeBracketMini,
  HiMegaphoneMini
} from "@qwikest/icons/heroicons";
import { LuFolderTree } from "@qwikest/icons/lucide";
import {
  createClientRpc,
  getViteClientRpc,
  setViteClientContext,
  type NpmInfo,
  type RoutesInfo,
  RouteType,
} from "@devtools/kit";
import globalCss from "./global.css?inline";
import { Tab } from "./components/Tab/Tab";
import { TabContent } from "./components/TabContent/TabContent";
import { Overview } from "./features/Overview/Overview";
import { State } from "./types/state";
import { Assets } from "./features/Assets/Assets";
import { Routes } from "./features/Routes/Routes";
import { TabTitle } from "./components/TabTitle/TabTitle";
import { DevtoolsButton } from "./components/DevtoolsButton/DevtoolsButton";
import { DevtoolsContainer } from "./components/DevtoolsContainer/DevtoolsContainer";
import { DevtoolsPanel } from "./components/DevtoolsPanel/DevtoolsPanel";
import { Packages } from "./features/Packages/Packages";
import { Components } from "./features/Components/Components";
import { Inspect } from "./features/inspect/Inspect";

function getClientRpcFunctions() {
  return {
    healthCheck: () => true,
  };
}

interface QwikDevtoolsProps{
  isFull?: boolean;
}

export const QwikDevtools = component$(({isFull = false}:QwikDevtoolsProps) => {
  useStyles$(globalCss);

  const state = useStore<State>({
    isOpen: useSignal(false),
    activeTab: "overview",
    npmPackages: [],
    assets: [],
    components: [],
    routes: undefined,
    isFull,
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useTask$(async ({ track }) => {
    if (isBrowser) {
    const hot = await tryCreateHotContext(undefined, ["/"]);

    if (!hot) {
      throw new Error("Vite Hot Context not connected");
    }

    setViteClientContext(hot);
    createClientRpc(getClientRpcFunctions());

    track(() => {
      if (state.isOpen.value) {
        const rpc = getViteClientRpc();
        rpc.getAssetsFromPublicDir().then((data) => {
          state.assets = data;
        });
        rpc.getComponents().then((data) => {
          state.components = data;
        });
        rpc.getRoutes().then((data: RoutesInfo) => {
          const children: RoutesInfo[] = data.children || [];
          const directories: RoutesInfo[] = children.filter(
            (child) => child.type === "directory",
          );

          const values: RoutesInfo[] = [
            {
              relativePath: "",
              name: "index",
              type: RouteType.DIRECTORY,
              path: "",
              isSymbolicLink: false,
              children: undefined,
            },
            ...directories,
          ];

          state.routes = noSerialize(values);
        });

        rpc.getQwikPackages().then((data: NpmInfo) => {
          state.npmPackages = data;
        });
      }
    });
  }
  });

  return (
    <DevtoolsContainer>
      {state.isFull && <DevtoolsButton state={state} />}

      {(state.isOpen.value || state.isFull) && (
        <DevtoolsPanel state={state}>
          <div class="flex flex-col gap-2 border-r border-zinc-700 bg-zinc-900/95 p-3">
            <Tab state={state} id="overview" title="Overview">
              <HiBoltOutline class="h-5 w-5" />
            </Tab>
            <Tab state={state} id="packages" title="Packages">
              <HiCubeOutline class="h-5 w-5" />
            </Tab>
            <Tab state={state} id="routes" title="Routes">
              <LuFolderTree class="h-5 w-5" />
            </Tab>
            <Tab state={state} id="assets" title="Assets">
              <HiPhotoOutline class="h-5 w-5" />
            </Tab>
            <Tab state={state} id="components" title="Components Tree">
              <HiCodeBracketMini class="h-5 w-5" />
            </Tab>
            <Tab state={state} id="inspect" title="inspect">
              <HiMegaphoneMini class="h-5 w-5" />
            </Tab>
          </div>

          <div class="custom-scrollbar flex-1 overflow-y-auto p-4">
            {state.activeTab === "overview" && (
              <TabContent>
                <div class="flex items-center gap-3" q:slot="title">
                  <img
                    width={32}
                    height={32}
                    src="https://qwik.dev/logos/qwik-logo.svg"
                    alt="Qwik Logo"
                    class="h-8 w-8"
                  />
                  <h1 class="text-2xl font-semibold">Qwik DevTools</h1>
                </div>
                <Overview state={state} q:slot="content" />
              </TabContent>
            )}
            {state.activeTab === "assets" && (
              <TabContent>
                <TabTitle title="Public Assets" q:slot="title" />
                <div class="flex gap-4 text-sm text-zinc-400">
                  <span>
                    Total Size:{" "}
                    {(
                      state.assets?.reduce(
                        (acc, asset) => acc + asset.size,
                        0,
                      ) / 1024
                    ).toFixed(2)}{" "}
                    KB
                  </span>
                  <span>Count: {state.assets?.length || 0}</span>
                </div>

                <Assets state={state} q:slot="content" />
              </TabContent>
            )}
            {state.activeTab === "packages" && (
              <TabContent>
                <TabTitle title="Install an npm package" q:slot="title" />
                <Packages q:slot="content" />
              </TabContent>
            )}
            {state.activeTab === "routes" && (
              <TabContent>
                <TabTitle title="Application Routes" q:slot="title" />
                <Routes state={state} q:slot="content" />
              </TabContent>
            )}
            {state.activeTab === "components" && (
              <TabContent>
                <TabTitle title="Components Tree" q:slot="title" />
                <Components q:slot="content" />
              </TabContent>
            )}
            {state.activeTab === "inspect" && (
              <TabContent>
                <Inspect  q:slot="content" />
              </TabContent>
            )}
          </div>
        </DevtoolsPanel>
      )}
    </DevtoolsContainer>
  );
});
