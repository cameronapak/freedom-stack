import type { ModuleConfigs } from "bknd";

interface BkndState {
  initialConfig?: { version: number } & ModuleConfigs;
}

// Singleton state object
export const state: BkndState = {};

export function setInitialConfig(config: { version: number } & ModuleConfigs) {
  state.initialConfig = config;
}

export function getInitialConfig() {
  if (!state.initialConfig) {
    throw new Error("BKND: Initial config not set. Ensure the integration is properly initialized.");
  }
  return state.initialConfig;
}
