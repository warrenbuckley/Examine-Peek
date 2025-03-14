// This file is auto-generated by @hey-api/openapi-ts

export type ISearchResult = {
    readonly id?: string | null;
    readonly score: number;
    readonly values?: {
        [key: string]: string | null;
    } | null;
    readonly allValues?: {
        [key: string]: Array<string> | null;
    } | null;
};

export type GetUmbracoExaminepeekApiV1PingData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/umbraco/examinepeek/api/v1/Ping';
};

export type GetUmbracoExaminepeekApiV1PingErrors = {
    /**
     * The resource is protected and requires an authentication token
     */
    401: unknown;
};

export type GetUmbracoExaminepeekApiV1PingResponses = {
    /**
     * Returns 'Pong'
     */
    200: string;
};

export type GetUmbracoExaminepeekApiV1PingResponse = GetUmbracoExaminepeekApiV1PingResponses[keyof GetUmbracoExaminepeekApiV1PingResponses];

export type GetUmbracoExaminepeekApiV1RecordByKeyData = {
    body?: never;
    path: {
        /**
         * The GUID/Key of the Content Node in Umbraco
         */
        key: string;
    };
    query?: never;
    url: '/umbraco/examinepeek/api/v1/Record/{key}';
};

export type GetUmbracoExaminepeekApiV1RecordByKeyErrors = {
    /**
     * KABOOM! We have more than one entry for the GUID/key in Examine. How that happen!?
     */
    400: unknown;
    /**
     * The resource is protected and requires an authentication token
     */
    401: unknown;
    /**
     * Unable to find Umbraco's Examine External Index
     */
    404: unknown;
};

export type GetUmbracoExaminepeekApiV1RecordByKeyResponses = {
    /**
     * Returns the Examine record for the given content node
     */
    200: ISearchResult;
    /**
     * No entry exists in Examine for the given content node
     */
    204: void;
};

export type GetUmbracoExaminepeekApiV1RecordByKeyResponse = GetUmbracoExaminepeekApiV1RecordByKeyResponses[keyof GetUmbracoExaminepeekApiV1RecordByKeyResponses];

export type ClientOptions = {
    baseUrl: 'https://localhost:44365' | (string & {});
};