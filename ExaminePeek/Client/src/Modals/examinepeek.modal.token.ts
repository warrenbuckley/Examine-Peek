import { UmbModalToken } from "@umbraco-cms/backoffice/modal";
export interface ExaminePeekModalData {
    entityKey: string | null;
}

export interface ExaminePeekModalValue {
}

export const EXAMINE_PEEK_MODAL = new UmbModalToken<ExaminePeekModalData, ExaminePeekModalValue>('examinepeek.modal', {
    modal: {
        type: "sidebar",
        size: "medium" // full, large, medium, small
    }
});