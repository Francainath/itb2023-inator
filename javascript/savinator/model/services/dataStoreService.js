/*
	DEPENDENCIES -------------------------------------------------------------------------------------
*/

import logger from './loggingService.js';

import savinatorSettings from '../../utility/savinatorSettings.js';
const {
	couchbaseConnection,
	couchbaseAuth,
	couchbaseBucket,
	atomicDocumentName,
	couchbaseTimeout
} = savinatorSettings;

import utilityFunctions from '../../utility/utilityFunctions.js';
const { processError, isPopulatedArray } = utilityFunctions;

import CouchbaseService from 'couchbase-service';

const options = {
	cluster: couchbaseConnection,
	auth: couchbaseAuth,
	atomicCounter: atomicDocumentName,
	operationTimeout: couchbaseTimeout,
	onConnectCallback: (error) => {
		if(error) {
			processError(logger, 'dataStoreService.init.connection.error', error);
			process.exit(1);//Kill node if this happens, can't work without it
		} else {
			logger.info(`connected to Couchbase ${couchbaseBucket} bucket.`);
		}
	},
	onReconnectCallback: (error, message) => {
		if(error) throw error;
		logger.info(message);
	}
};

let savinatorCouchbaseService;
try {
	savinatorCouchbaseService = new CouchbaseService(couchbaseBucket, options);
} catch (e) {
	processError(logger, 'dataStorService.CouchbaseInstantiation.error', e)
	process.exit(1); //Kill node if this happens, we can't work without
}


/*
	FUNCTIONS ----------------------------------------------------------------------------------------
*/

async function dataStoreRequest(request) {
	try {
		logger.debug(`Savinator data: ${JSON.stringify(request)}`);

		const n1ql = `SELECT meta().id
						FROM ${couchbaseBucket}
						WHERE data = '${request.data}'`;

		const arRequestDocName = await savinatorCouchbaseService.n1qlQueryPromise(n1ql);

		if(isPopulatedArray(arRequestDocName)) {
			const requestDocName = arRequestDocName[0].id;
			const { value, cas } = await savinatorCouchbaseService.getAndLockPromise(requestDocName, 15);

			value.numberOfUploads++;

			await savinatorCouchbaseService.upsertPromise(requestDocName, value, { cas });

			return { data:`Updated ${JSON.stringify(request)} in Savinator successfully. Now has ${value.numberOfUploads} numberOfUploads.` };
		} else {
			const { value: freshCounter} = await getAtomicCounter();

			const docData = { data:request.data, numberOfUploads:1 };

			await savinatorCouchbaseService.upsertPromise(`inator::${freshCounter}`, docData, {});

			return { data:`Created ${JSON.stringify(request)} in Savinator successfully.` };
		}
	} catch(e) {
		return { error:processError(logger, 'storeService.dataStoreRequest.error', e) };
	}
}


async function getAtomicCounter() {
	return await savinatorCouchbaseService.counterPromise();
}


/*
	EXPORTS ---------------------------------------------------------------------------------------------
*/

export default dataStoreRequest;