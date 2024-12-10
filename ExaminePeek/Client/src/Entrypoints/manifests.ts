export const manifests: Array<UmbExtensionManifest> = [
  {
    name: "Examine Peek - Entrypoint",
    alias: "examinepeek.entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint")
  }
];
