import type { NextConfig } from "next";

function sanitizeServerLocalStorage() {
  const globalRef = globalThis as typeof globalThis;
  const mutableGlobal = globalRef as Record<string, unknown>;

  const storage = mutableGlobal.localStorage as
    | { getItem?: unknown; setItem?: unknown; removeItem?: unknown }
    | undefined;

  if (!storage) return;

  const looksLikeWebStorage =
    typeof storage.getItem === "function" &&
    typeof storage.setItem === "function" &&
    typeof storage.removeItem === "function";

  if (looksLikeWebStorage) return;

  try {
    delete mutableGlobal.localStorage;
  } catch {
    try {
      Object.defineProperty(globalRef, "localStorage", {
        value: undefined,
        writable: true,
        configurable: true,
      });
    } catch {
      mutableGlobal.localStorage = undefined;
    }
  }
}

sanitizeServerLocalStorage();

const nextConfig: NextConfig = {
  devIndicators: false,
};

export default nextConfig;
