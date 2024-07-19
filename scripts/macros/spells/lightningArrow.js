import {animationUtils, compendiumUtils, constants, effectUtils, errors, genericUtils, itemUtils, tokenUtils, workflowUtils} from '../../utils.js';

async function use({workflow}) {
    let concentrationEffect = effectUtils.getConcentrationEffect(workflow.cator, workflow.item);
    let playAnimation = itemUtils.getConfig(workflow.item, 'playAnimation');
    let effectData = {
        name: workflow.item.name,
        img: workflow.item.img,
        origin: workflow.item.uuid,
        duration: {
            seconds: 60 * workflow.item.system.duration.value
        },
        flags: {
            'chris-premades': {
                lightningArrow: {
                    saveDC: itemUtils.getSaveDC(workflow.item),
                    playAnimation,
                },
                castData: workflow.castData
            }
        }
    };
    effectUtils.addMacro(effectData, 'midi.actor', ['lightningArrowBuffed']);
    await effectUtils.createEffect(workflow.actor, effectData, {concentrationItem: workflow.item, strictlyInterdependent: true, identifier: 'lightningArrow'});
    if (concentrationEffect) await genericUtils.update(concentrationEffect, {'duration.seconds': effectData.duration.seconds});
}
async function attack({workflow}) {
    workflow.workflowOptions.autoRollDamage = 'always';
    if (!workflow.isFumble) return;
    workflow.isFumble = false;
    let updatedRoll = await new Roll('-100').evaluate();
    await workflow.setAttackRoll(updatedRoll);
}
async function damage({workflow}) {
    if (itemUtils.getIdentifer(workflow.item) === 'lightningArrowBurst') return;
    if (workflow.targets.size !== 1) return;
    if (!workflow.item.system.properties.has('thr') && workflow.item.system.actionType !== 'rwak') return;
    let effect = effectUtils.getEffectByIdentifier(workflow.actor, 'lightningArrow');
    if (!effect) return;
    let targetToken = workflow.targets.first();
    let diceNumber = 1 + effect.flags['chris-premades'].castData.castLevel;
    let damageFormula = diceNumber + 'd8[lightning] + ' + itemUtils.getMod(workflow.item);
    await workflowUtils.replaceDamage(workflow, damageFormula, {damageType: 'lightning'});
    if (workflow.hitTargets.size === 0) await workflowUtils.applyDamage([targetToken], Math.floor(workflow.damageRolls[0].total / 2), 'lightning');
    let featureData = await compendiumUtils.getItemFromCompendium(constants.packs.spellFeatures, 'Lightning Arrow: Burst', {object: true, getDescription: true, translate: 'CHRISPREMADES.macros.lightningArrow.burst', identifier: 'lightningArrowBurst'});
    if (!featureData) {
        errors.missingPackItem();
        return;
    }
    featureData.system.save.dc = effect.flags['chris-premades'].lightningArrow.saveDC;
    genericUtils.setProperty(featureData, 'flags.chris-premades.castData', effect.flags['chris-premades'].castData);
    let newTargets = tokenUtils.findNearby(targetToken, 10);
    let playAnimation = effect.flags['chris-premades'].lightningArrow.playAnimation && animationUtils.jb2aCheck();
    let anim = 'jb2a.chain_lightning.secondary.blue';
    if (playAnimation) {
        animationUtils.simpleAttack(workflow.token, targetToken, anim);
        for (let i of newTargets) {
            if (playAnimation) animationUtils.simpleAttack(targetToken, i, anim);
        }
    }
    // TODO: why the hell am I getting into an infinite loop if I hit myself with the burst??
    if (newTargets.length) {
        await workflowUtils.syntheticItemDataRoll(featureData, workflow.actor, newTargets);
    }
    await genericUtils.remove(effect);
}
export let lightningArrow = {
    name: 'Lightning Arrow',
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
            value: 'playAnimation',
            label: 'CHRISPREMADES.config.playAnimation',
            type: 'checkbox',
            default: true,
            category: 'animation'
        }
    ]
};
export let lightningArrowBuffed = {
    name: 'Lightning Arrow: Buffed',
    version: lightningArrow.version,
    midi: {
        actor: [
            {
                pass: 'postAttackRoll',
                macro: attack,
                priority: 50
            },
            {
                pass: 'damageRollComplete',
                macro: damage,
                priority: 50
            }
        ]
    }
};