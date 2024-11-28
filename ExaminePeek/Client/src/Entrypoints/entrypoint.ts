import { UmbEntryPointOnInit, UmbEntryPointOnUnload } from "@umbraco-cms/backoffice/extension-api";
import { UMB_AUTH_CONTEXT } from "@umbraco-cms/backoffice/auth";
import { OpenAPI } from "../Api";

// load up the manifests here
export const onInit: UmbEntryPointOnInit = (host, _extensionRegistry) => {

  // Will use only to add in Open API config with generated TS OpenAPI HTTPS Client
  // Do the OAuth token handshake stuff
  host.consumeContext(UMB_AUTH_CONTEXT, async (authContext) => {

    // Get the token info from Umbraco
    const config = authContext.getOpenApiConfiguration();

    OpenAPI.BASE = config.base;
    OpenAPI.WITH_CREDENTIALS = config.withCredentials;
    OpenAPI.CREDENTIALS = config.credentials;
    OpenAPI.TOKEN = config.token;

  });
};

export const onUnload: UmbEntryPointOnUnload = (_host, _extensionRegistry) => {
  console.log("Goodbye from Examine Peek👋");
};

