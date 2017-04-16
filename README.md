# OSSCalc
Skill sequence calculator written in JS
## Current Capabilities
* Supports calculation of % debuffs and buffs to skill and crits
* Considers pure skill DMG (no poison/burn/auto-attack)
* Have you ever wondered whether it's better to alternate your Amanojaku with Titanium Elf or use each skill type one at a time? Click 'Optimize', and the numbers will crunch.
## Future Improvements
* Move to a JS framework which will allow us more flexibility.
* More preset options.
* Optimize for a given shard cost.

## FAQ
### How do I account for reserves or special bonds?
Add reserves as abilities to any daemon on the team, and add special bonds as an ability to the daemon who would be affected by that bond.
### The card's leader skill is active even though it's not in the leader position!
Remove the passive associated with the leader skill. We currently do not support abilities based on team position.