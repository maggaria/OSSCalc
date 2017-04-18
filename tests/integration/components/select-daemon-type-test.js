import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('select-daemon-type', 'Integration | Component | select daemon type', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{select-daemon-type}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#select-daemon-type}}
      template block text
    {{/select-daemon-type}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
