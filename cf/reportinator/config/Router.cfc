component {
	function configure() {
		setFullRewrites( true );

		// GREETING
		route( '/greeting', function(event,rc,prc) {
			return { greeting: 'Hello! Welcome to the Reportinator!', language:'ColdFusion' };
		} );

		// FULLDATA
		route(
			pattern='/fullData',
    		target='reportinator.fullData',
    		name='reportinator.fullData'
		);

		// DISTINCTDATA
		route(
			pattern='/distinctData',
    		target='reportinator.distinctData',
    		name='reportinator.distinctData'
		);

		// HASDATAPOINT
		route(
			pattern='/hasDataPoint',
    		target='reportinator.hasDataPoint',
    		name='reportinator.hasDataPoint'
		);
	}
}
