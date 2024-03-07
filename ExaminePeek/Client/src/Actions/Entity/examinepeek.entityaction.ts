import { UmbControllerHostElement } from "@umbraco-cms/backoffice/controller-api";
import { UMB_DOCUMENT_ENTITY_TYPE } from "@umbraco-cms/backoffice/document";
import { UmbEntityActionArgs, UmbEntityActionBase } from "@umbraco-cms/backoffice/entity-action";
import { UMB_MODAL_MANAGER_CONTEXT, UmbModalManagerContext } from "@umbraco-cms/backoffice/modal";
import { EXAMINE_PEEK_MODAL } from "../../Modals/examinepeek.modal.token.ts";

export class ExaminePeekEntityAction extends UmbEntityActionBase<any> {

    // Modal Manager Context - to open modals such as our custom one or a icon picker,
    // content picker etc
    #modalManagerContext?: UmbModalManagerContext;

    constructor(host: UmbControllerHostElement, args: UmbEntityActionArgs<never>) {
        super(host, args)

        // Fetch/consume the contexts & assign to the private fields
        this.consumeContext(UMB_MODAL_MANAGER_CONTEXT, (instance) => {
            this.#modalManagerContext = instance;
        });
    }

    async execute() {
        if (!this.args.unique){
            throw new Error('The document unique identifier is missing');
        }

        // The modal does NOT return any data when closed (it does not submit)
        this.#modalManagerContext?.open(this, EXAMINE_PEEK_MODAL, {
            data: {
                entityKey: this.args.unique
            }
        });
    }
}