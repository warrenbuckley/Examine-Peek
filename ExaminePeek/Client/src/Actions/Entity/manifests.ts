import { UMB_DOCUMENT_ENTITY_TYPE } from "@umbraco-cms/backoffice/document";
import { ExaminePeekEntityAction } from "./examinepeek.entityaction.ts";

export const manifests: Array<UmbExtensionManifest> = [
    {
        type: "entityAction",
        kind: "default",
        alias: "examinepeek.entity.action",
        name: "Examine Peek - Entity Action",
        weight: 400,
        api: ExaminePeekEntityAction,
        meta: {
            icon: "icon-sensor",
            label: "Examine Peek",
        },
        forEntityTypes: [ UMB_DOCUMENT_ENTITY_TYPE ],
        conditions: [
            {
                alias: "Umb.Condition.UserPermission.Document",
                allOf: ["ExaminePeek.Enabled"]
            }
        ]
    }
];