// This file is auto-generated by @hey-api/openapi-ts

import type { CancelablePromise } from './core/CancelablePromise';
import { OpenAPI } from './core/OpenAPI';
import { request as __request } from './core/request';
import type { $OpenApiTs } from './models';

export class ExaminePeekService {
	/**
	 * Test API call to ensure API routing etc is setup correctly
	 * Sample request:
 * 
 * GET /umbraco/api/examinepeek/v1/ping
	 * @returns string Returns 'Pong'
	 * @throws ApiError
	 */
	public static getUmbracoExaminepeekApiV1Ping(): CancelablePromise<$OpenApiTs['/umbraco/examinepeek/api/v1/Ping']['get']['res'][200]> {
		
		return __request(OpenAPI, {
			method: 'GET',
			url: '/umbraco/examinepeek/api/v1/Ping',
			errors: {
				401: `The resource is protected and requires an authentication token`,
			},
		});
	}

	/**
	 * Show the stored data in Examine for a given content node based on its key
	 * Sample request:
 * 
 * GET /umbraco/api/examinepeek/v1/record/7222e75b-9396-4cc9-bedb-149ca12c846d
	 * @returns ISearchResult Returns the Examine record for the given content node
	 * @returns void No entry exists in Examine for the given content node
	 * @throws ApiError
	 */
	public static getUmbracoExaminepeekApiV1RecordByKey(data: $OpenApiTs['/umbraco/examinepeek/api/v1/Record/{key}']['get']['req']): CancelablePromise<$OpenApiTs['/umbraco/examinepeek/api/v1/Record/{key}']['get']['res'][200] | $OpenApiTs['/umbraco/examinepeek/api/v1/Record/{key}']['get']['res'][204]> {
		const {
                    key
                } = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/umbraco/examinepeek/api/v1/Record/{key}',
			path: {
				key
			},
			errors: {
				400: `KABOOM! We have more than one entry for the GUID/key in Examine. How that happen!?`,
				401: `The resource is protected and requires an authentication token`,
				404: `Unable to find Umbraco's Examine External Index`,
			},
		});
	}

}