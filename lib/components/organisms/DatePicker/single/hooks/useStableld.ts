import { useId, useRef } from "react";

/**
 * Generates a stable unique ID for client/server rendering.
 * @param prefix - Optional prefix for the id
 * @returns Stable unique id as string
 */
export const useStableId = (prefix = "id"): string => {
  const reactId = useId();
  const fallback = useRef(
    `${prefix}-${Math.random().toString(36).slice(2, 10)}`
  );
  return reactId || fallback.current;
};