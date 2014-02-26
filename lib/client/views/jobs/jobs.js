var odeskJobs;

Template.oDeskJobs.created = function () {
	odeskJobs = new oDeskJobs();
	odeskJobs.refresh();
}

Template.oDeskJobs.helpers({
	jobs: function() {
		return odeskJobs.jobs();
	},
});

Template.oDeskJobsItem.itemClass = function() {
	return Session.equals( 'oDeskJobs.jobId', $( this ).attr( 'id' ) ) ? 'active' : '';
};

Template.oDeskJobsItem.events({
	'click': function() {
		Session.set( 'oDeskJobs.jobId', $( this ).attr( 'id' ) );
	}
});

Template.oDeskJobsRefresh.events({
	"click .refresh": function () {
		odeskJobs.refresh();
	}
});
