import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('select-skill-effect-num-format', 'Integration | Component | select skill effect num format', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{select-skill-effect-num-format}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#select-skill-effect-num-format}}
      template block text
    {{/select-skill-effect-num-format}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
