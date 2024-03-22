import { ManifestLocalization } from "@umbraco-cms/backoffice/extension-registry";

const localizations: ManifestLocalization = {
    name: "English (US)",
    alias: "examinepeek.localizations.en-us",
    type: "localization",
    meta: {
        culture: "en-us",
        localizations : {
            "examinepeek": {
                "modal-title": "Examine Peek"
            }
        }
    }
}

export const manifests = [localizations];