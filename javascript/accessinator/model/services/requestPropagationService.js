/*
	DEPENDENCIES -------------------------------------------------------------------------------------
*/

import axios from 'axios';

import logger from './loggingService.js';

import accessinatorSettings from '../../utility/accessinatorSettings.js';
const { savinatorHTTPSettings } = accessinatorSettings;

import utilityFunctions from '../../utility/utilityFunctions.js';
const { parseUrl, processError }  = utilityFunctions;

const savinatorURL = parseUrl(savinatorHTTPSettings);


/*
	FUNCTIONS ----------------------------------------------------------------------------------------
*/

async function propagateRequest(request) {
	try {
		const postData = JSON.stringify(request);
		const savinatorRequestOptions = {
			headers: {
				'content-type': 'application/json',
				'content-length': Buffer.byteLength(postData)//this syntax ensures utf8 characters don't mess w/length
			}
		};

		logger.debug(`Savinator post parameters: url:${savinatorURL}, postData:${postData}, requestOptions:${JSON.stringify(savinatorRequestOptions)}`);

		await axios.post(savinatorURL, postData, savinatorRequestOptions);

		return { data:`Sent ${JSON.stringify(request)} to Savinator successfully` };
	} catch(e) {
		processError(logger, 'requestPropagataionService.propagateRequest.error', e);
		if(e.response) {
			throw (e.response && e.response.data) ? e.response.data : e.response;
		} else if(e.message) {
			throw new Error(e.message);
		} else {
			throw e;
		}
	}
}


/*
	EXPORTS ---------------------------------------------------------------------------------------------
*/

export default propagateRequest;