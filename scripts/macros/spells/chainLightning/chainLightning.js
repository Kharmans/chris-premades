import {chris} from '../../../helperFunctions.js';
export async function chainLightning(workflow) {
    if (workflow.targets.size != 1) return;
    let maxTargets = workflow.castData.castLevel - 3;
    let targetToken = workflow.targets.first();
    let nearbyTokens = chris.findNearby(targetToken, 30, 'ally');
    if (nearbyTokens.length === 0) return;
    let addedTargets = [];
    let addedTargetUuids = [];
    if (nearbyTokens.length > maxTargets) {
        let buttons = [
            {
                'label': 'OK',
                'value': true
            }, {
                'label': 'Cancel',
                'value': false
            }
        ];
        let selection = await chris.selectTarget('Where should the lightning bounce? Max: ' + maxTargets, buttons, nearbyTokens, true, true);
        if (!selection.buttons) return;
        for (let i of selection.inputs) {
            if (i) {
                addedTargets.push(await fromUuid(i));
                addedTargetUuids.push(i);
            }
        }
        if (addedTargets.length > maxTargets) {
            ui.notifications.info('Too many targets selected!');
            return;
        }
    } else {
        for (let i of nearbyTokens) {
            addedTargets.push(i);
            addedTargetUuids.push(i.document.uuid);
        }
    }
    new Sequence().effect().atLocation(workflow.token).stretchTo(targetToken).file('jb2a.chain_lightning.secondary.blue').play();
    let previousToken = targetToken;
    for (let i of addedTargets) {
        new Sequence().effect().atLocation(previousToken).stretchTo(i).file('jb2a.chain_lightning.secondary.blue').play();
        previousToken = i;
    }
    let featureData = await chris.getItemFromCompendium('chris-premades.CPR Spell Features', 'Chain Lightning Leap', false);
    if (!featureData) return;
    featureData.system.description.value = chris.getItemDescription('CPR - Descriptions', 'Chain Lightning Leap');
    featureData.system.save.dc = chris.getSpellDC(workflow.item);
    featureData.system.damage.parts = [
        [
            workflow.damageTotal + '[lightning]',
            'lightning'
        ]
    ];
    let feature = new CONFIG.Item.documentClass(featureData, {parent: workflow.actor});
    let options = {
		'showFullCard': false,
		'createWorkflow': true,
		'targetUuids': addedTargetUuids,
		'configureDialog': false,
		'versatile': false,
		'consumeResource': false,
		'consumeSlot': false
	};
    await MidiQOL.completeItemUse(feature, {}, options);
}