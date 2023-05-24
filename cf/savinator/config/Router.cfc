
component {
	function configure(){
		setFullRewrites( true );

		// GREETING
		route( '/greeting', function(event,rc,prc) {
			return { greeting: 'Hello! Welcome to the Savinator!', language:'ColdFusion' };
		} );

		// SAVEREQUEST
		route(
			pattern='/saveRequest',
    		target='savinator.saveRequest',
    		name='savinator.saveRequest'
		);
	}
}
