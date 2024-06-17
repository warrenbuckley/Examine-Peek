// This file is auto-generated by @hey-api/openapi-ts


export type ISearchResult = {
    readonly id?: string | null;
    readonly score: number;
    readonly values?: Record<string, string> | null;
    readonly allValues?: Record<string, Array<string>> | null;
};

export type $OpenApiTs = {
    '/umbraco/examinepeek/api/v1/Ping': {
    get: {
    res: {
    200: string;
};
};
};
    '/umbraco/examinepeek/api/v1/Record/{key}': {
    get: {
    req: {
    /**
     * The GUID/Key of the Content Node in Umbraco
     */
    key: string;
};
    res: {
    200: ISearchResult;
    204: void;
};
};
};
};