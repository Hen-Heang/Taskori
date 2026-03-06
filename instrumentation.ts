export async function register() {
  if (typeof window !== "undefined") {
    return;
  }

  const globalRef = globalThis as typeof globalThis;

  const storage = (globalRef as { localStorage?: unknown }).localStorage as
    | { getItem?: unknown }
    | undefined;

  if (!storage) {
    return;
  }

  if (typeof storage.getItem === "function") {
    return;
  }

  try {
    delete (globalRef as { localStorage?: unknown }).localStorage;
  } catch {
    Object.defineProperty(globalRef, "localStorage", {
      value: undefined,
      writable: true,
      configurable: true,
    });
  }
}
