# OSSCalc
Skill sequence calculator written in JS
## Current Capabilities
* Supports calculation of % debuffs and buffs to skill and crits
* Supports pure skill DMG (no poison/burn/auto)
## To Do
* Support calculation of flat increases
* Accommodate more effect types
* UI layer

## Usage Samples
### Creating Daemons
    daemons["A1"] = new Daemon(ranged, 3174, new Bonds(0,0,0), [], [new Effect("DMG_DEALT", 0.6)]);
### Calculating Approximate Damage
    run_calc(["F", "K", "F", "A2", "A2", "T3", "T3", "B1"])
### Find the best skill sequence given a set of skills
    find_best(uniquePermute(["T2","T2","T3","T3","F","K","F","B1"]))

    
