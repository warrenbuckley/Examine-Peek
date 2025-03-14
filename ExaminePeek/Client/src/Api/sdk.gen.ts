// This file is auto-generated by @hey-api/openapi-ts

import type { Options as ClientOptions, TDataShape, Client } from '@hey-api/client-fetch';
import type { GetUmbracoExaminepeekApiV1PingData, GetUmbracoExaminepeekApiV1PingResponse, GetUmbracoExaminepeekApiV1RecordByKeyData, GetUmbracoExaminepeekApiV1RecordByKeyResponse } from './types.gen';
import { client as _heyApiClient } from './client.gen';

export type Options<TData extends TDataShape = TDataShape, ThrowOnError extends boolean = boolean> = ClientOptions<TData, ThrowOnError> & {
    /**
     * You can provide a client instance returned by `createClient()` instead of
     * individual options. This might be also useful if you want to implement a
     * custom client.
     */
    client?: Client;
    /**
     * You can pass arbitrary values through the `meta` object. This can be
     * used to access values that aren't defined as part of the SDK function.
     */
    meta?: Record<string, unknown>;
};

export class ExaminePeekService {
    /**
     * Test API call to ensure API routing etc is setup correctly
     * Sample request:
     *
     * GET /umbraco/api/examinepeek/v1/ping
     */
    public static getUmbracoExaminepeekApiV1Ping<ThrowOnError extends boolean = false>(options?: Options<GetUmbracoExaminepeekApiV1PingData, ThrowOnError>) {
        return (options?.client ?? _heyApiClient).get<GetUmbracoExaminepeekApiV1PingResponse, unknown, ThrowOnError>({
            security: [
                {
                    scheme: 'bearer',
                    type: 'http'
                }
            ],
            url: '/umbraco/examinepeek/api/v1/Ping',
            ...options
        });
    }
    
    /**
     * Show the stored data in Examine for a given content node based on its key
     * Sample request:
     *
     * GET /umbraco/api/examinepeek/v1/record/7222e75b-9396-4cc9-bedb-149ca12c846d
     */
    public static getUmbracoExaminepeekApiV1RecordByKey<ThrowOnError extends boolean = false>(options: Options<GetUmbracoExaminepeekApiV1RecordByKeyData, ThrowOnError>) {
        return (options.client ?? _heyApiClient).get<GetUmbracoExaminepeekApiV1RecordByKeyResponse, unknown, ThrowOnError>({
            security: [
                {
                    scheme: 'bearer',
                    type: 'http'
                }
            ],
            url: '/umbraco/examinepeek/api/v1/Record/{key}',
            ...options
        });
    }
    
}