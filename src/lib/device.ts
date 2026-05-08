import type { DeviceSpecs } from "./tiers";

interface NavigatorWithMemory extends Navigator {
  deviceMemory?: number;
}

export function detectDevice(): Partial<DeviceSpecs> & { gpuRenderer?: string } {
  if (typeof window === "undefined") return {};
  const nav = navigator as NavigatorWithMemory;
  const ua = nav.userAgent || "";

  let os = "Unknown";
  if (/Windows/i.test(ua)) os = "Windows";
  else if (/Mac OS X|Macintosh/i.test(ua)) os = "macOS";
  else if (/Linux/i.test(ua)) os = "Linux";
  else if (/Android/i.test(ua)) os = "Android";
  else if (/iPhone|iPad|iOS/i.test(ua)) os = "iOS";

  const cores = nav.hardwareConcurrency || 4;
  // deviceMemory is capped at 8 by browsers; treat as a lower bound.
  const ramGB = nav.deviceMemory ? nav.deviceMemory : 8;

  let gpuRenderer: string | undefined;
  let hasGPU = false;
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (gl) {
      const ext = gl.getExtension("WEBGL_debug_renderer_info");
      if (ext) {
        gpuRenderer = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) as string;
      }
      if (gpuRenderer) {
        hasGPU = /nvidia|radeon|amd|geforce|rtx|gtx|apple|m1|m2|m3|m4|intel arc/i.test(gpuRenderer);
      }
    }
  } catch {
    // ignore
  }

  return { os, cores, ramGB, hasGPU, gpuRenderer, diskFreeGB: 50 };
}
