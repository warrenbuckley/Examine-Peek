import { ManifestModal } from "@umbraco-cms/backoffice/extension-registry";

const examinePeekModal: ManifestModal = {
    type: 'modal',
    alias: 'examinepeek.modal',
    name: 'Examine Peek Modal',
    js: () => import('./examinepeek.modal.element.js')
}
export const manifests = [examinePeekModal];