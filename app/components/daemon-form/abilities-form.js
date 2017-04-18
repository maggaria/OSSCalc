import Ember from 'ember';

export default Ember.Component.extend({
	hideRole: true,
	hideSortBox: true,
	hideNameBox: true,
	hideTypeBox: true,
	hideNumBox: true,

	actions: {
		showFields(selectedType) {

			this.set('hideRole', true);
			this.set('hideSortBox', true);
			this.set('hideNameBox', true);
			this.set('hideTypeBox', true);
			this.set('hideNumBox', true);			

			switch(selectedType) {
				case "self":
				case "all":		
					break;
				case "role":
					this.set('hideRole', false);
					break;
				case "type":
					this.set('hideTypeBox', false);		
					break;
				case "name":
					this.set('hideNameBox', false);			
					break;
				case "priority":
					this.set('hideRole', false);
					this.set('hideNumBox', false);		
					break;
				case "highest":
					this.set('hideSortBox', false);
					this.set('hideNumBox', false);
					break;
				case "lowest":
					this.set('hideSortBox', false);
					this.set('hideNumBox', false);		
					break;
				case "random":
					this.set('hideNumBox', false);		
					break;				
			}
		}
	}
});
