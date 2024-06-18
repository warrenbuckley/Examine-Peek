import { UmbEntryPointOnInit } from '@umbraco-cms/backoffice/extension-api';
import { manifests as entityActionManifests } from './Actions/Entity/manifests.ts';
import { manifests as modalManifests } from './Modals/manifests.ts';
import { manifests as localizationManifests } from './Localizations/manifests.ts';
import { manifests as entityUserPermissionManifests } from './EntityUserPermissions/manifests.ts';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';
import { OpenAPI } from "./Api/index.ts";

// load up the manifests here
export const onInit: UmbEntryPointOnInit = (_host, extensionRegistry) => {
    // We can register many manifests at once via code 
    // as opposed to a long umbraco-package.json file
    extensionRegistry.registerMany([
        ...entityActionManifests,
        ...modalManifests,
        ...localizationManifests,
        ...entityUserPermissionManifests,
    ]);

    console.log('wat');

    // Do the OAuth token handshake stuff
    _host.consumeContext(UMB_AUTH_CONTEXT, (authContext) => {
        const config = authContext.getOpenApiConfiguration();

        console.log('OpenAPI Configuration', config);

        OpenAPI.BASE = config.base;
        OpenAPI.WITH_CREDENTIALS = config.withCredentials;
        OpenAPI.CREDENTIALS = config.credentials;
        OpenAPI.TOKEN = config.token;
    });
};