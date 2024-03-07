import { UMB_DOCUMENT_ENTITY_TYPE } from "@umbraco-cms/backoffice/document";
import { ManifestEntityAction } from "@umbraco-cms/backoffice/extension-registry";
import { ExaminePeekEntityAction } from "./examinepeek.entityaction.ts";

const entityAction: ManifestEntityAction = {
    type: 'entityAction',
    kind: 'default',
    alias: 'examinepeek.entity.action',
    name: 'Examine Peek Entity Action',
    weight: 400,
    api: ExaminePeekEntityAction,
    meta: {
        icon: 'icon-sensor',
        label: 'Examine Peek',
    },
    forEntityTypes: [ UMB_DOCUMENT_ENTITY_TYPE ]
}
export const manifests = [entityAction];