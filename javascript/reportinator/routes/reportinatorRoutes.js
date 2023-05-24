/*
	DEPENDENCIES ----------------------------------------------------------------------------------------------------------------------------
*/

import express from 'express';
const reportinatorRoutes = express.Router();

import bodyParser from 'body-parser';
reportinatorRoutes.use(bodyParser.json({limit: '5mb'}));

reportinatorRoutes.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	next();
});

import logger from '../model/services/loggingService.js';

import utilityFunctions from '../utility/utilityFunctions.js';
const { processError } = utilityFunctions;

import dataReportingService from '../model/services/dataReportingService.js';
const { getFullData, getDistinctData, getDataPoint } = dataReportingService;


/*
	GREETING --------------------------------------------------------------------------------------------------------------------------------------------
*/

reportinatorRoutes.get('/greeting', (req, res) => {
	return res.status(200).json({ greeting: 'Hello! Welcome to the Reportinator!', language:'JavaScript'});
});


/*
	PROCESS ROUTES ------------------------------------------------------------------------------------------------------------------------------------------------
*/

reportinatorRoutes.get('/fullData', async (req, res) => {
	try {
		logger.debug(`/fullData request time:${Date.now()}`);

		const fullData = await getFullData();

		return res.status(200).json(fullData);
	} catch(e) {
		processError(logger, 'reportinatorRoutes.route.fullData.error', e);
		return res.status(400).json(e);
	}
});


reportinatorRoutes.get('/distinctData', async (req, res) => {
	try {
		logger.debug(`/distinctData request time:${Date.now()}`);

		const distinctData = await getDistinctData();

		return res.status(200).json(distinctData);
	} catch(e) {
		processError(logger, 'reportinatorRoutes.route.distinctData.error', e);
		return res.status(400).json(e);
	}
});


reportinatorRoutes.get('/hasDataPoint', async (req, res) => {
	try {
		logger.debug(`/hasDataPoint request time:${Date.now()}`);

		if(!req.query.hasOwnProperty('dataPoint')) {
			res.status(400).json({ errorData: 'No data point submitted to check.'});
		} else {
			const hasDataPoint = await getDataPoint(req.query.dataPoint);

			return res.status(200).json(hasDataPoint);
		}
	} catch(e) {
		processError(logger, 'reportinatorRoutes.route.distinctData.error', e);
		return res.status(400).json(e);
	}
});


/*
	EXPORTS ------------------------------------------------------------------------------------------------------------------------------------------------
*/

export default reportinatorRoutes;