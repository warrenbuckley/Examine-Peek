export const manifests: Array<UmbExtensionManifest> = [
    {
        type: "modal",
        alias: "examinepeek.modal",
        name: "Examine Peek - Modal",
        js: () => import("./examinepeek.modal.element.js")
    }
];
