import { customElement, html, state } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement, UmbModalRejectReason } from "@umbraco-cms/backoffice/modal";
import { tryExecuteAndNotify } from '@umbraco-cms/backoffice/resources';

import { TemplateResult, css } from "lit";

import { ExaminePeekModalData, ExaminePeekModalValue } from "./examinepeek.modal.token.ts";
import { ExaminePeekService, ISearchResult } from "../Api/index.ts";
import { UUIButtonElement } from "@umbraco-cms/backoffice/external/uui";

@customElement('examine-peek-modal')
export class ExaminePeekmModalElement extends UmbModalBaseElement<ExaminePeekModalData, ExaminePeekModalValue>
{
    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback();

        if(this.data?.entityKey){
            // Use Swagger API client to get the record
            this._getExamineRecord(this.data.entityKey).then((record) => {
                this.examineRecord = record;
            });
        }
        else {
            // This is a problem
            console.error("Examine Peek Modal connectedCallback. There is NO EntityKey passed into the modal");
        }
    }

    @state()
    examineRecord : ISearchResult | undefined;
    
    @state()
    hasLoadedRecord : boolean = false;
    
    private handleClose() {
        this.modalContext?.reject({ type: "close" } as UmbModalRejectReason);
    }
    
    private async _getExamineRecord(key: string) : Promise<ISearchResult | undefined> {
        const { data, error } = await tryExecuteAndNotify(this, ExaminePeekService.getUmbracoExaminepeekApiV1RecordByKey({key: key}))
        if (error){
            console.error(error);
            return undefined;
        }
        
        this.hasLoadedRecord = true;
        return data as ISearchResult;
    }
    
    private async _copyValue(e: Event, textToCopy: string) {
        // the e.target may or may not be UUIButtonElement
        // it could be the nested uui-icon item
        var target = e.target as HTMLElement; // Could be <uui-button> or <uui-icon> nested inside the button
        let button: UUIButtonElement | undefined = undefined;

        if (target instanceof UUIButtonElement) {
            button = target;
        } else if (target.parentElement instanceof UUIButtonElement) {
            button = target.parentElement;
        }

        

        //const text = this.textContent;
        const text = textToCopy;
		if (text) {
			await navigator.clipboard.writeText(text);
			
            // Check if button is defined before setting the state
            if (button) {
                button.state = "success";
            }
		}
    };
    
    render() {

        let listItems: TemplateResult[] = [];

        // Convert the record to an array of entries, sort them by key, then iterate over them
        Object.entries(this.examineRecord?.values ?? {})
            .forEach(([key, value]) => {
                listItems.push(html`
                    <umb-property-layout label="${key}">                      
                        <div id="editor" slot="editor">
                            <code>${value}</code>                            
                        </div>
                        <uui-button slot="action-menu" label="copy" look="secondary" color="default" @click="${(e: Event) => this._copyValue(e, value)}" compact>
                            <uui-icon name="copy"></uui-icon>
                        </uui-button>
                        
                    </umb-property-layout>
                `);
        });
        
        return html`
            <umb-body-layout headline="${this.localize.term('examinepeek_modal-title')}">
                
                <uui-box headline="Data">
                    ${listItems}
                </uui-box>
                
                <div slot="actions">
                    <uui-button id="close" label="Close" @click="${this.handleClose}">Close</uui-button>
                </div>
            </umb-body-layout>
        `;
    }
    
    static styles = css`
        uui-box {
            margin-bottom: 1rem;
        }

        umb-property-layout {
            padding-top:0;
            padding-bottom:0;
        }

        umb-property-layout uui-button {
            opacity: 0;
        }

        umb-property-layout:hover uui-button {
            opacity: 1;
        }
    `;
}

export default ExaminePeekmModalElement;