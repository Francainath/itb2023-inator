component {
	function configure() {
		setFullRewrites( true );

		// GREETING
		route( '/greeting', function(event,rc,prc) {
			return { greeting: 'Hello! Welcome to the Accessinator!', language:'ColdFusion'};
		} );

		// PROCESS
		route(
			pattern='/process',
    		target='accessinator.process',
    		name='accessinator.process'
		);
	}
}
