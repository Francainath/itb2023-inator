/*
	DEPENDENCIES -------------------------------------------------------------------------------------
*/

import logger from './loggingService.js';

import reportinatorSettings from '../../utility/reportinatorSettings.js';
const {
	couchbaseConnection,
	couchbaseAuth,
	couchbaseBucket,
	atomicDocumentName,
	couchbaseTimeout
} = reportinatorSettings;

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
			processError(logger, 'dataReportingService.init.connection.error', error);
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

let reportinatorCouchbaseService;
try {
	reportinatorCouchbaseService = new CouchbaseService(couchbaseBucket, options);
} catch(e) {
	processError(logger, 'dataReportingService.CouchbaseInstantiation.error', e)
	process.exit(1); //Kill node if this happens, we can't work without
}


/*
	FUNCTIONS ----------------------------------------------------------------------------------------
*/

async function getFullData() {
	try {
		const n1ql = `SELECT *
				FROM ${couchbaseBucket}
				WHERE data IS NOT MISSING`;

		const arFullData = await reportinatorCouchbaseService.n1qlQueryPromise(n1ql);

		return arFullData.map(add => add.inator);
	} catch(e) {
		return { error:processError(logger, 'dataReportingService.getDistinctData.error', e) };
	}
}


async function getDistinctData() {
	try {
		const n1ql = `SELECT DISTINCT data
				FROM ${couchbaseBucket}
				WHERE data IS NOT MISSING`;

		const arDistinctData = await reportinatorCouchbaseService.n1qlQueryPromise(n1ql);

		return arDistinctData.map(add => add.data);
	} catch(e) {
		return { error:processError(logger, 'dataReportingService.getDistinctData.error', e) };
	}
}


async function getDataPoint(dataPoint='') {
	try {
		const n1ql = `SELECT *
				FROM ${couchbaseBucket}
				WHERE data = '${dataPoint}'`;

		const arDataPoint = await reportinatorCouchbaseService.n1qlQueryPromise(n1ql);

		if(isPopulatedArray(arDataPoint)) {
			return arDataPoint[0].inator;
		} else {
			return { message: `no data found for '${dataPoint}'`};
		}
	} catch(e) {
		return { error:processError(logger, 'dataReportingService.getDistinctData.error', e) };
	}
}


/*
	EXPORTS ---------------------------------------------------------------------------------------------
*/

export default {
	getFullData,
	getDistinctData,
	getDataPoint
};