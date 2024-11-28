import { UMB_DOCUMENT_ENTITY_TYPE } from "@umbraco-cms/backoffice/document";

export const manifests: Array<UmbExtensionManifest> = [
    {
        type: "entityUserPermission",
        alias: "examinepeek.permission",
        name: "Examine Peek - User Permission",
        forEntityTypes: [ UMB_DOCUMENT_ENTITY_TYPE ],
        weight: -1000,
        meta: {
            verbs: ["ExaminePeek.Enabled"], // This is key persisted back to server & what we look up in our condition
            group: "Examine Peek",
            label: "Enable Examine Peek",
            description: "Allows a user to peek at the stored Examine values in the index for a given piece of content."
        }
    }
];