import {Summons} from '../../../../lib/summons.js';
import {actorUtils, animationUtils, compendiumUtils, constants, dialogUtils, effectUtils, genericUtils, itemUtils, socketUtils, tokenUtils, workflowUtils} from '../../../../utils.js';

async function use({workflow}) {
    let sourceActor = await compendiumUtils.getActorFromCompendium(constants.packs.summons, 'CPR - Steel Defender');
    if (!sourceActor) return;
    let deflectAttackData = await Summons.getSummonItem('Deflect Attack', {}, workflow.item, {translate: 'CHRISPREMADES.Macros.SteelDefender.DeflectAttack', identifier: 'steelDefenderDeflectAttack'});
    let rendData = await Summons.getSummonItem( 'Force-Empowered Rend', {}, workflow.item, {translate: 'CHRISPREMADES.Macros.SteelDefender.ForceEmpoweredRend', identifier: 'steelDefenderForceEmpoweredRend', flatAttack: true});
    let mendingData = await Summons.getSummonItem( 'Mending (Steel Defender)', {}, workflow.item, {translate: 'CHRISPREMADES.Macros.SteelDefender.Mending', identifier: 'steelDefenderMending'});
    let repairData = await Summons.getSummonItem( 'Repair', {}, workflow.item, {translate: 'CHRISPREMADES.Macros.SteelDefender.Repair', identifier: 'steelDefenderRepair'});
    let vigilantData = await Summons.getSummonItem( 'Vigilant', {}, workflow.item, {translate: 'CHRISPREMADES.Macros.SteelDefender.Vigilant', identifier: 'steelDefenderVigilant'});
    let dodgeData = await compendiumUtils.getItemFromCompendium(constants.packs.actions, 'Dodge', {object: true, getDescription: true, translate: 'CHRISPREMADES.Macros.Actions.Dodge', identifier: 'steelDefenderDodge'});
    let itemsToAdd = [deflectAttackData, rendData, mendingData, repairData, vigilantData, dodgeData];
    if (!itemsToAdd.every(i => i)) return;
    let classLevel = workflow.actor.classes?.artificer?.system.levels;
    if (!classLevel) return;
    let repairUses = workflow.item.flags['chris-premades']?.steelDefenderRepair?.uses;
    if (isNaN(repairUses)) await genericUtils.setFlag(workflow.item, 'chris-premades', 'steelDefenderRepair.uses', 3);
    repairData.system.uses.value = repairUses;
    let hpValue = 2 + workflow.actor.system.abilities.int.mod + 5 * classLevel;
    let name = itemUtils.getConfig(workflow.item, 'name');
    if (!name?.length) name = genericUtils.translate('CHRISPREMADES.Summons.CreatureNames.SteelDefender');
    let updates = {
        actor: {
            name,
            system: {
                details: {
                    cr: actorUtils.getCRFromProf(workflow.actor.system.attributes.prof)
                },
                attributes: {
                    hp: {
                        formula: hpValue,
                        max: hpValue,
                        value: hpValue
                    }
                },
                traits: {
                    languages: workflow.actor.system?.traits?.languages
                }
            },
            prototypeToken: {
                name,
                disposition: workflow.token.document.disposition
            },
            items: itemsToAdd
        },
        token: {
            name,
            disposition: workflow.token.document.disposition
        }
    };
    let originArcaneJolt = itemUtils.getItemByIdentifier(workflow.actor, 'arcaneJolt');
    if (originArcaneJolt) {
        let effectData = {
            name: originArcaneJolt.name,
            img: originArcaneJolt.img,
            origin: originArcaneJolt.uuid,
            flags: {
                'chris-premades': {
                    info: {
                        identifier: 'steelDefenderArcaneJolt'
                    }
                }
            }
        };
        effectUtils.addMacro(effectData, 'midi.actor', ['steelDefenderArcaneJolt']);
        updates.actor.effects = [effectData];
    }
    let avatarImg = itemUtils.getConfig(workflow.item, 'avatar');
    let tokenImg = itemUtils.getConfig(workflow.item, 'token');
    if (avatarImg) updates.actor.img = avatarImg;
    if (tokenImg) {
        genericUtils.setProperty(updates, 'actor.prototypeToken.texture.src', tokenImg);
        genericUtils.setProperty(updates, 'token.texture.src', tokenImg);
    }
    if (classLevel > 14) {
        updates.actor.system.attributes.ac = {flat: 17};
        updates.actor.items[0].system.damage.parts = [['1d4[force] + ' + workflow.actor.system.abilities.int.mod, 'force']];
    }
    let animation = itemUtils.getConfig(workflow.item, 'animation') ?? 'none';
    let commandFeatureData = await compendiumUtils.getItemFromCompendium(constants.featurePacks.classFeatureItems, 'Steel Defender: Command', {object: true, getDescription: true, translate: 'CHRISPREMADES.Macros.SteelDefender.Command', identifier: 'steelDefenderCommand'});
    if (!commandFeatureData) return;
    await Summons.spawn(sourceActor, updates, workflow.item, workflow.token, {
        range: 10,
        animation,
        initiativeType: 'follows',
        additionalVaeButtons: [{type: 'use', name: commandFeatureData.name, identifier: 'steelDefenderCommand'}],
        additionalSummonVaeButtons: 
            itemsToAdd
                .filter(i => ['steelDefenderForceEmpoweredRend', 'steelDefenderRepair', 'steelDefenderDodge'].includes(i.flags['chris-premades'].info.identifier))
                .map(i => ({type: 'use', name: i.name, identifier: i.flags['chris-premades'].info.identifier}))
    });
    let casterEffect = effectUtils.getEffectByIdentifier(workflow.actor, 'steelDefender');
    if (!casterEffect) return;
    await itemUtils.createItems(workflow.actor, [commandFeatureData], {favorite: true, parentEntity: casterEffect});
}
async function arcaneJolt({workflow}) {
    if (workflow.hitTargets.size !== 1) return;
    let effect = effectUtils.getEffectByIdentifier(workflow.actor, 'steelDefenderArcaneJolt');
    let originItem = await fromUuid(effect?.origin);
    if (!originItem || originItem.system.uses.value === 0) return;
    let selection = await dialogUtils.confirm(originItem.name, genericUtils.format('CHRISPREMADES.Dialog.Use', {itemName: originItem.name}), {userId: socketUtils.firstOwner(originItem)});
    if (!selection) return;
    await workflowUtils.syntheticItemRoll(originItem, [workflow.hitTargets.first()]);
}
async function early({trigger: {entity: item, token}, workflow}) {
    if (workflow.token.document.disposition === token.document.disposition) return;
    if (actorUtils.hasUsedReaction(token.actor)) return;
    if (workflow.targets.has(token)) return;
    if (tokenUtils.getDistance(token, workflow.token, {wallsBlock: true}) > 5) return;
    if (!tokenUtils.canSee(token, workflow.token)) return;
    let selection = await dialogUtils.confirm(token.name, genericUtils.format('CHRISPREMADES.Dialog.Use', {itemName: item.name}));
    if (!selection) return;
    workflow.disadvantage = true;
    workflow.attackAdvAttribution.add(genericUtils.translate('DND5E.Disadvantage') + ': ' + item.name);
    await workflowUtils.syntheticItemRoll(item, [workflow.token]);
}
async function longRest({trigger: {entity: item}}) {
    await genericUtils.setFlag(item, 'chris-premades', 'steelDefenderRepair.uses', 3);
}
async function repair({workflow}) {
    let effect = effectUtils.getEffectByIdentifier(workflow.actor, 'summonedEffect');
    let originItem = await fromUuid(effect?.origin);
    if (!originItem) return;
    await genericUtils.setFlag(originItem, 'chris-premades', 'steelDefenderRepair.uses', workflow.item.system.uses.value);
}
export let steelDefender = {
    name: 'Steel Defender',
    version: '0.12.28',
    midi: {
        item: [
            {
                pass: 'rollFinished',
                macro: use,
                priority: 50
            }
        ]
    },
    rest: [
        {
            pass: 'long',
            macro: longRest,
            priority: 50
        }
    ]
};
export let steelDefenderArcaneJolt = {
    name: 'Steel Defender: Arcane Jolt',
    version: steelDefender.version,
    midi: {
        actor: [
            {
                pass: 'damageRollComplete',
                macro: arcaneJolt,
                priority: 50
            }
        ]
    }
};
export let steelDefenderDeflectAttack = {
    name: 'Steel Defender: Deflect Attack',
    version: steelDefender.version,
    midi: {
        actor: [
            {
                pass: 'scenePreambleComplete',
                macro: early,
                priority: 50
            }
        ]
    }
};
export let steelDefenderRepair = {
    name: 'Steel Defender: Repair',
    version: steelDefender.version,
    midi: {
        item: [
            {
                pass: 'rollFinished',
                macro: repair,
                priority: 50
            }
        ]
    }
};