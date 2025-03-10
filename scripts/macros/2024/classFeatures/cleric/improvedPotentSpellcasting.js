import {activityUtils, dialogUtils, itemUtils, tokenUtils, workflowUtils} from '../../../../utils.js';
async function use({trigger: {entity: item}, workflow}) {
    if (workflow.item?.type != 'spell' || !workflow.activity || !workflow.token || !workflow.castData) return;
    if (workflowUtils.getCastLevel(workflow) != 0) return;
    let classIdentifier = itemUtils.getConfig(item, 'classIdentifier');
    if (workflow.item.system.sourceClass != classIdentifier) return;
    if (activityUtils.isSpellActivity(workflow.activity)) return;
    let range = itemUtils.getConfig(item, 'range');
    let nearbyTokens = tokenUtils.findNearby(workflow.token, range, 'ally', {includeIncapacitated: true, includeToken: true});
    let selection;
    if (nearbyTokens.length === 1) {
        selection = nearbyTokens[0];
    } else {
        let selected = await dialogUtils.selectTargetDialog(item.name, 'CHRISPREMADES.Macros.ImprovedPotentSpellcasting.Target', nearbyTokens, {skipDeadAndUnconscious: false});
        if (!selected?.length) return;
        selection = selected[0];
    }
    await workflowUtils.syntheticItemRoll(item, [selection]);
}
export let improvedPotentSpellcasting = {
    name: 'Improved Blessed Strikes: Potent Spellcasting',
    version: '1.2.12',
    rules: 'modern',
    midi: {
        actor: [
            {
                pass: 'rollFinished',
                macro: use,
                priority: 50
            }
        ]
    },
    config: [
        {
            value: 'classIdentifier',
            label: 'CHRISPREMADES.Config.ClassIdentifier',
            type: 'text',
            default: 'cleric',
            category: 'homebrew',
            homebrew: true
        },
        {
            value: 'range',
            label: 'CHRISPREMADES.Config.Range',
            type: 'number',
            default: 60,
            homebrew: true,
            category: 'homebrew'
        }
    ]
};