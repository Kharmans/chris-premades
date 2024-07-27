import {actorUtils, dialogUtils, itemUtils, tokenUtils} from '../../utils.js';
async function use({trigger, workflow}) {
    if (!workflow.hitTargets.size) return;
    let checkSize = itemUtils.getConfig(workflow.item, 'checkSize');
    for (let target of workflow.hitTargets) {
        if (actorUtils.getSize(target.actor) > 3 && checkSize) break;
        let options = [
            ['CHRISPREMADES.Distance.0', 0]
        ];
        let distance = tokenUtils.getDistance(workflow.token, target);
        if (distance <= 5) break;
        if (distance > 5) options.push(['CHRISPREMADES.Distance.5', 5]);
        if (distance > 10) options.push(['CHRISPREMADES.Distance.10', 10]);
        let selection = Number(await dialogUtils.buttonDialog(workflow.item.name, 'CHRISPREMADES.macros.thornWhip.pull', options));
        if (!selection) return;
        await tokenUtils.pushToken(workflow.token, target, -selection);
    }
}
export let thornWhip = {
    name: 'Thorn Whip',
    version: '0.12.0',
    midi: {
        item: [
            {
                pass: 'rollFinished',
                macro: use,
                priority: 50
            }
        ]
    },
    config: [
        {
            value: 'checkSize',
            label: 'CHRISPREMADES.macros.thornWhip.checkSize',
            type: 'checkbox',
            default: true,
            homebrew: true,
            category: 'homebrew'
        }
    ]
};