/*
	DEPENDENCIES ----------------------------------------------------------------------------------------------------------------------------
*/

import express from 'express';
const savinatorRoutes = express.Router();

import bodyParser from 'body-parser';
savinatorRoutes.use(bodyParser.json({limit: '5mb'}));

savinatorRoutes.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	next();
});

import logger from '../model/services/loggingService.js';

import utilityFunctions from '../utility/utilityFunctions.js';
const { processError, isObjectWithProperty } = utilityFunctions;

import dataStoreRequest from '../model/services/dataStoreService.js';


/*
	GREETING --------------------------------------------------------------------------------------------------------------------------------------------
*/

savinatorRoutes.get('/greeting', (req, res) => {
	return res.status(200).json({ greeting: 'Hello! Welcome to the Savinator!', language:'JavaScript'});
});


/*
	PROCESS ROUTES ------------------------------------------------------------------------------------------------------------------------------------------------
*/

savinatorRoutes.post('/saveRequest', checkData, async (req, res) => {
	try {
		logger.debug(`/process request time:${Date.now()}, body:${JSON.stringify(req.body)}`);

		const returnData = await dataStoreRequest(req.body);

		return res.status(200).json(returnData);
	} catch(e) {
		processError(logger, 'savinatorRoutes.route.saveRequest.error', e);
		return res.status(400).json(e);
	}
});


/*
	HELPER FUNCTIONS ---------------------------------------------------------------------------------------------------------------------------
*/

function checkData(req, res, next) {
	try {
		if(!isObjectWithProperty(req.body, 'data')) {
			return res.status(200).json({ error: 'no data to save in Savinator' });
		} else {
			next();
		}
	} catch(e) {
		processError(logger, 'savinator.checkData.error', e);
		return res.status(400).json(e);
	}
}


/*
	EXPORTS ------------------------------------------------------------------------------------------------------------------------------------------------
*/

export default savinatorRoutes;