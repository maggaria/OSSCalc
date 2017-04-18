import Ember from 'ember';

export default Ember.Component.extend({
	init() {
		this._super(...arguments);
		this.set('positions',["leader","sub1","sub2","sub3","helper"]);
	}
});
