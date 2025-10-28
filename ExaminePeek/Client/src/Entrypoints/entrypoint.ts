import { UmbEntryPointOnInit, UmbEntryPointOnUnload } from "@umbraco-cms/backoffice/extension-api";
import { UMB_AUTH_CONTEXT } from "@umbraco-cms/backoffice/auth";
import { client } from "../Api/client.gen";

// load up the manifests here
export const onInit: UmbEntryPointOnInit = (host) => {

  // Will use only to add in Open API config with generated TS OpenAPI HTTPS Client
  // Do the OAuth token handshake stuff
  host.consumeContext(UMB_AUTH_CONTEXT, async (authContext) => {

    // Get the token info from Umbraco
    const config = authContext.getOpenApiConfiguration();

    client.setConfig({
      baseUrl: config.base,
      credentials: config.credentials,
      auth: () => config.token(), // Dont need to use the interceptor approach anymore
    });

  });
};

export const onUnload: UmbEntryPointOnUnload = () => {
  console.log("Goodbye from Examine Peek👋");
};

