// Requires oDesk API Smart Package!

var Future = Npm.require( 'fibers/future' );

/*
 |
 |	http://developers.odesk.com/search-jobs
 |
  - Search for Jobs parameters:

	params: {
		q 				optional*	The search query
		title 			optional*	Search in title of jobs profile
		skills			optional*	Search in skills of jobs profile

		* at least one of the parameters [q, title or skills] must be specified

		category		optional	Search for category of job profile
		subcategory		optional	Search for subcategory of job profile
		job_type		optional	Type of job
									acceptable values are: hourly or fixed
		duration		optional	Indicates job duration
									acceptable values are: week, month, quarter, semester, ongoing
		workload		optional	Indicates workload for the job
									acceptable values are: as_needed, part_time, full_time
		client_feedback	optional	Constrains the search to jobs posted by clients with rating within a range.
									If the value is None, then jobs from clients without rating are returned
									- single params like 1 or 2,3 are acceptable (comma separated values result to OR queries)
									- ranges like [2 TO 4] are acceptable

									E.g.
									5.0 - rating should be equal to 5.0;
									1-5 - rating r should be 1 <= n <= 5;
									1- - rating should be >=1;
									-5 - rating should be <= 5
		client_hires	optional	Constrains the search to jobs from clients with range within the given number of past hires
									- single params like 1 or 2,3 are acceptable (comma separated values result to OR queries)
									- ranges like [10 TO 20] are acceptable

									E.g.
									5 - number of hires should be equal to 5;
									0-10 - number of hires should be 0 <= n <= 10;
									10- - number of hires should be >=10;
									-5 - number of hires should be <= 5
		budget			optional	Constrains the search to jobs having the budget within the range given
									- ranges like [100 TO 1000] are acceptable

									E.g.
									1000 - budget should be equal to 1000;
									500-1000 - budget b should be 500 <= b <= 1000;
									1000- - budget should be >=1000;
									-200 - budget should be <= 200
		job_status		optional	The status that the job is currently in
									- acceptable values are: open, completed, cancelled
		days_posted		optional	Number of days since the job was posted
		paging			optional	Pagination, formed as $offset;$count, e.g. page=20;10. The default values are 0;10. Count is restricted to be <= 100
		sort			optional	Field and direction sorting search results. create_time desc is used by default.
									Allowed sorting fields are: create_time, client_rating, client_total_charge, client_total_hours, score, workload, duration, e.g. sort=create_time%20desc
	}
*/

oDeskJobs = function() {
	this._asyncAPI = new oDesk();
	this._urls = {
		'search': 'https://www.odesk.com/api/profiles/v2/search/jobs.json'
	}
}

oDeskJobs.prototype.call = function( method, params, callback ) {
	this._asyncAPI.get( this._urls[method.toLowerCase()], params, function( error, result ) {
		if ( error ) {
			console.log( '[oDeskJobs] ' + method.toUpperCase() + ' Error: ' + error.code + ' - ' + error.message );
		}
		callback( error, result );
	});
}

Meteor.methods({
	'oDeskJobs': function ( method, params, asyncCallback ) {
		try {
			var odeskJobs = new oDeskJobs();
		} catch ( error ) {
			throw new Meteor.Error( error.error, error.reason, error.details );
		}

		var future = new Future();
		odeskJobs.call( method, params, function ( error, result ) {
			if ( error ) {
				// Pass the original oDeskAPI Error to the client
				future.throw( new Meteor.Error( error.code, error.message ) );
			} else {
				future.return( result );
			}
		});
		return future.wait();
	}
});

