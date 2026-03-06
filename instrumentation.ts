export async function register() {
  if (typeof window !== "undefined") {
    return;
  }

  const globalRef = globalThis as typeof globalThis & {
    localStorage?: unknown;
  };

  const storage = globalRef.localStorage as
    | { getItem?: unknown }
    | undefined;

  if (!storage) {
    return;
  }

  if (typeof storage.getItem === "function") {
    return;
  }

  try {
    Object.defineProperty(globalRef, "localStorage", {
      value: undefined,
      writable: true,
      configurable: true,
    });
  } catch {
    globalRef.localStorage = undefined;
  }
}
