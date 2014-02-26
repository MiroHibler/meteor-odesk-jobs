Package.describe({
	summary: 'oDesk Jobs - the Meteor way'
});

Package.on_use(function ( api, where ) {

	api.use( ['templating'/*, 'handlebars'*/], 'client' );

	api.add_files( 'lib/server/jobs.js', 'server' );

	api.add_files( 'lib/client/views/jobs/job_item.html', 'client' );
	api.add_files( 'lib/client/views/jobs/jobs.html', 'client' );
	api.add_files( 'lib/client/views/jobs/refresh.html', 'client' );
	api.add_files( 'lib/client/loader.html', 'client' );

	api.add_files( 'lib/client/views/jobs/jobs.js', 'client' );
	api.add_files( 'lib/client/jobs.js', 'client' );

	if ( api.export ) {
		api.export( 'oDeskJobs', ['server', 'client'] );
	}
});
