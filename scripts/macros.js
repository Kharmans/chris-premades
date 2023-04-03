import { crusher } from './macros/feats/crusher.js';
import { zealousPresence } from './macros/classFeatures/barbarian/zealot/zealousPresence.js';
import {aasimarRadiantSoul} from './macros/raceFeatures/aasimar/radiantSoul.js';
import {acidArrow} from './macros/spells/acidArrow.js';
import {ancestralProtectors} from './macros/classFeatures/barbarian/ancestralGuardian/ancestralProtectors.js';
import {armorModel} from './macros/classFeatures/artificer/armorer/armorModel.js';
import {armorOfAgathys} from './macros/spells/armorOfAgathys.js';
import {auraOfAlacrity} from './macros/classFeatures/paladin/oathOfGlory/auraOfAlacrity.js';
import {auraOfCourage} from './macros/classFeatures/paladin/auraOfCourage.js';
import {auraOfProtection} from './macros/classFeatures/paladin/auraOfProtection.js';
import {auraOfPurity} from './macros/spells/auraOfPurity.js';
import {auraOfVitality} from './macros/spells/auraOfVitality.js';
import {balmOfPeace} from './macros/classFeatures/cleric/peaceDomain/balmOfPeace.js';
import {bardicInspiration} from './macros/classFeatures/bard/magicalInspiration/magicalInspiration.js'
import {beaconOfHope} from './macros/spells/beaconOfHope.js';
import {beguilingTwist} from './macros/classFeatures/ranger/feyWanderer/beguilingTwist.js';
import {bladeFlourish} from './macros/classFeatures/bard/collegeOfSwords/bladeFlourish.js'
import {blessingOfTheForge} from './macros/classFeatures/cleric/forgeDomain/blessingOfTheForge.js';
import {blight} from './macros/spells/blight.js';
import {blink} from './macros/spells/blink.js';
import {bloodSpear} from './macros/items/bloodSpear.js';
import {brandOfCastigation} from './macros/classFeatures/bloodHunter/brandOfCastigation/brandOfCastigation.js';
import {bulette} from './macros/monsterFeatures/bulette/bulette.js';
import {callLightning} from './macros/spells/callLightning.js';
import {catoblepas} from './macros/monsterFeatures/catoblepas/catoblepas.js';
import {chainLightning} from './macros/spells/chainLightning.js';
import {charmPerson} from './macros/spells/charmPerson.js';
import {chasme} from './macros/monsterFeatures/chasme/chasme.js';
import {chillTouch} from './macros/spells/chillTouch.js';
import {circleOfMortality} from './macros/classFeatures/cleric/graveDomain/circleOfMortality.js';
import {clayGolem} from './macros/monsterFeatures/clayGolem/clayGolem.js';
import {cleave} from './macros/mechanics/cleave/cleave.js';
import {cloudkill} from './macros/spells/cloudkill.js';
import {conditionResistanceEarly, conditionResistanceLate} from './macros/mechanics/conditionResistance/conditionResistance.js';
import {conditionVulnerabilityEarly, conditionVulnerabilityLate} from './macros/mechanics/conditionVulnerability/conditionVulnerability.js';
import {corpseFlower} from './macros/monsterFeatures/corpseFlower/corpseFlower.js';
import {crimsonRite} from './macros/classFeatures/bloodHunter/crimsonRite/crimsonRite.js';
import {darkOnesBlessing} from './macros/classFeatures/warlock/fiend/darkOnesBlessing.js';
import {darkness} from './macros/spells/darkness.js';
import {deathWard} from './macros/spells/deathWard.js';
import {destructiveWrath} from './macros/classFeatures/cleric/tempestDomain/destructiveWrath.js';
import {detectThoughts} from './macros/spells/detectThoughts.js';
import {divineFury} from './macros/classFeatures/barbarian/zealot/divineFury.js';
import {divineSmite} from './macros/classFeatures/paladin/divineSmite.js';
import {divineStrike} from './macros/classFeatures/cleric/divineStrike.js';
import {dragonVessel} from './macros/items/dragonVessel.js';
import {dragonsBreath} from './macros/spells/dragonsBreath.js';
import {dragonsWrath} from './macros/items/dragonsWrath.js';
import {dreadAmbusher} from './macros/classFeatures/ranger/gloomStalker/dreadAmbusher.js';
import {drow} from './macros/monsterFeatures/drow/drow.js';
import {duergar} from './macros/monsterFeatures/duergar/duergar.js';
import {dybbuk} from './macros/monsterFeatures/dybbuk/dybbuk.js';
import {eladrinSeason} from './macros/raceFeatures/eladrin/eladrinSeason.js';
import {elderBrain} from './macros/monsterFeatures/elderBrain/elderBrain.js';
import {elderOblex} from './macros/monsterFeatures/elderOblex/elderOblex.js';
import {elementalAdept} from './macros/feats/elementalAdept.js';
import {elixirOfHealth} from './macros/items/elixirOfHealth.js';
import {experimentalElixir} from './macros/classFeatures/artificer/alchemist/experimentalElixir.js'
import {expertDivination} from './macros/classFeatures/wizard/schoolOfDivination/expertDivination.js';
import {explodingHeals} from './macros/mechanics/explodingHeals/explodingHeals.js';
import {fallenPuppet} from './macros/classFeatures/bloodHunter/bloodCurses/fallenPuppet.js';
import {feyPresence} from './macros/classFeatures/warlock/archfey/feyPresence.js';
import {fireElemental} from './macros/monsterFeatures/fireElemental/fireElemental.js';
import {fireSnake} from './macros/monsterFeatures/fireSnake/fireSnake.js';
import {focusedAim} from './macros/classFeatures/monk/focusedAim.js';
import {formOfDread} from './macros/classFeatures/warlock/undead/formOfDread.js';
import {gallowsSpeaker} from './macros/monsterFeatures/gallowsSpeaker/gallowsSpeaker.js';
import {generic} from './macros/monsterFeatures/generic/generic.js';
import {ghast} from './macros/monsterFeatures/ghast/ghast.js';
import {graveTouched} from './macros/classFeatures/warlock/undead/graveTouched.js';
import {grovelthrash} from './macros/items/grovelthrash.js';
import {healingLight} from './macros/classFeatures/warlock/celestial/healingLight.js';
import {heartOfTheStorm} from './macros/classFeatures/sorcerer/stormSorcery/heartOfTheStorm.js';
import {heatMetal} from './macros/spells/heatMetal.js';
import {help} from './macros/mechanics/help/help.js';
import {hex} from './macros/spells/hex.js';
import {hezrou} from './macros/monsterFeatures/hezrou/hezrou.js';
import {holyWeapon} from './macros/spells/holyWeapon.js';
import {homunculus} from './macros/monsterFeatures/homunculus/homunculus.js';
import {hungryJaws} from './macros/raceFeatures/lizardfolk/hungryJaws.js';
import {hybridTransformation} from './macros/classFeatures/bloodHunter/orderOfTheLycan/hybridTransformation.js';
import {inspiringSmite} from './macros/classFeatures/paladin/oathOfGlory/inspiringSmite.js';
import {intellectDevourer} from './macros/monsterFeatures/intellectDevourer/intellectDevourer.js';
import {leucrotta} from './macros/monsterFeatures/leucrotta/leucrotta.js';
import {lightningArrow} from './macros/spells/lightningArrow.js';
import {maneuvers} from './macros/classFeatures/fighter/battleMaster/maneuvers.js';
import {massCureWounds} from './macros/spells/massCureWounds.js';
import {mirrorImage} from './macros/spells/mirrorImage.js';
import {muddledMind} from './macros/classFeatures/bloodHunter/bloodCurses/muddledMind.js';
import {mutagencraft} from './macros/classFeatures/bloodHunter/orderOfTheMutant/mutagencraft.js';
import {oilOfSharpness} from './macros/items/oilOfSharpness.js';
import {orcishFury} from './macros/feats/orcishFury.js';
import {piercer} from './macros/feats/piercer.js';
import {potionOfDiminution} from './macros/items/potionOfDiminution.js';
import {potionOfFireBreath} from './macros/items/potionOfFireBreath.js';
import {potionOfGiantSize} from './macros/items/potionOfGiantSize.js';
import {potionOfGrowth} from './macros/items/potionOfGrowth.js';
import {potionOfMaximumPower} from './macros/items/potionOfMaximumPower.js';
import {potionOfPoison} from './macros/items/potionOfPoison.js';
import {potionOfVitality} from './macros/items/potionOfVitality.js';
import {preserveLife} from './macros/classFeatures/cleric/lifeDomain/preserveLife.js';
import {protectionFromEvilAndGood} from './macros/spells/protectionFromEvilAndGood.js';
import {radiantSoul} from './macros/classFeatures/warlock/celestial/radiantSoul.js';
import {rayOfEnfeeblement} from './macros/spells/rayOfEnfeeblement.js';
import {reaper} from './macros/classFeatures/cleric/deathDomain/reaper.js';
import {removeTemplate} from './macros/generic/removeTemplate.js';
import {ringOfSpellStoring} from './macros/items/ringOfSpellStoring.js';
import {riteOfTheDawn} from './macros/classFeatures/bloodHunter/orderOfTheGhostslayer/riteOfTheDawn.js';
import {salamander} from './macros/monsterFeatures/salamander/salamander.js';
import {sanctuary} from './macros/spells/sanctuary.js';
import {shadowBlade} from './macros/spells/shadowBlade.js';
import {shadowDemon} from './macros/monsterFeatures/shadowDemon/shadowDemon.js';
import {shadowghast} from './macros/monsterFeatures/shadowghast/shadowghast.js';
import {shadow} from './macros/monsterFeatures/shadow/shadow.js';
import {shamblingMound} from './macros/monsterFeatures/shamblingMound/shamblingMound.js';
import {shockingGrasp} from './macros/spells/shockingGrasp.js';
import {spikeGrowth} from './macros/spells/spikeGrowth.js';
import {spiritGuardians} from './macros/spells/spiritGuardians.js';
import {spiritShroud} from './macros/spells/spiritShroud.js';
import {sprite} from './macros/monsterFeatures/sprite/sprite.js';
import {stenchKow} from './macros/monsterFeatures/stenchKow/stenchKow.js';
import {stillnessOfMind} from './macros/classFeatures/monk/stillnessOfMind.js';
import {stormSphere} from './macros/spells/stormSphere.js';
import {stormgirdle} from './macros/items/stormgirdle.js';
import {succubus} from './macros/monsterFeatures/succubus/succubus.js';
import {thunderboltStrike} from './macros/classFeatures/cleric/tempestDomain/thunderboltStrike.js';
import {troglodyte} from './macros/monsterFeatures/troglodyte/troglodyte.js';
import {turnUndead} from './macros/classFeatures/cleric/turnUndead.js';
import {twilightSanctuary} from './macros/classFeatures/cleric/twilightDomain/twilightSanctuary.js';
import {vampiricBite} from './macros/raceFeatures/dhampir/vampiricBite.js';
import {vampiricTouch} from './macros/spells/vampiricTouch.js';
import {wildhunt} from './macros/raceFeatures/shifter/wildhunt.js';
import {witherAndBloom} from './macros/spells/witherAndBloom.js';
import {wrathOfTheStorm} from './macros/classFeatures/cleric/tempestDomain/wrathOfTheStorm.js';
import {zombie} from './macros/monsterFeatures/zombie/zombie.js';
export async function onHitMacro(workflow) {
	if (workflow.targets.size === 0) return;
	workflow.targets.forEach(async token => {
		let onHitName = token.actor.flags['chris-premades']?.feature?.onHit;
		if (!onHitName) return;
		if (token.document.uuid === workflow.token.document.uuid) return;
		let onHitFunction = macros.onHit[onHitName];
		if (typeof onHitFunction != 'function') {
			ui.notifications.warn('Invalid actor onHit macro!');
			return;
		}
		await onHitFunction(workflow, token);
	});
}
let monster = {
	'bulette': bulette,
	'catoblepas': catoblepas,
	'chasme': chasme,
	'clayGolem': clayGolem,
	'corpseFlower': corpseFlower,
	'drow': drow,
	'duergar': duergar,
	'dybbuk': dybbuk,
	'elderBrain': elderBrain,
	'elderOblex': elderOblex,
	'fireElemental': fireElemental,
	'fireSnake': fireSnake,
	'gallowsSpeaker': gallowsSpeaker,
	'generic': generic,
	'ghast': ghast,
	'hezrou': hezrou,
	'homunculus': homunculus,
	'intellectDevourer': intellectDevourer,
	'leucrotta': leucrotta,
	'salamander': salamander,
	'shadow': shadow,
	'shadowDemon': shadowDemon,
	'shadowghast': shadowghast,
	'shamblingMound': shamblingMound,
	'sprite': sprite,
	'stenchKow': stenchKow,
	'succubus': succubus,
	'troglodyte': troglodyte,
	'zombie': zombie
}
let onHit = {
	'fireForm': fireElemental.fireForm,
	'heatedBody': fireSnake.heatedBody
}
async function onMove(macroName, token, castLevel, spellDC, damage, damageType, tokenID) {
	switch (macroName) {
		case 'spiritGuardians':
			await spiritGuardians.moved(token, castLevel, spellDC, damage, damageType, tokenID);
			break;
	}
}
async function onMoveEffect(macroName, token, selectedAura) {
	switch (macroName) {
		case 'auraOfPurity': 
			await auraOfPurity.move(token, selectedAura);
			break;
		case 'auraOfProtection':
			await auraOfProtection(token, selectedAura);
			break;
		case 'auraOfCourage':
			await auraOfCourage(token, selectedAura);
			break;
	}
}
export let macros = {
	'aasimarRadiantSoul': aasimarRadiantSoul,
	'acidArrow': acidArrow,
	'ancestralProtectors': ancestralProtectors,
	'armorModel': armorModel,
	'armorOfAgathys': armorOfAgathys,
	'auraOfAlacrity': auraOfAlacrity,
	'auraOfCourage': auraOfCourage,
	'auraOfProtection': auraOfProtection,
	'auraOfPurity': auraOfPurity,
	'auraOfVitality': auraOfVitality,
	'balmOfPeace': balmOfPeace,
	'bardicInspiration': bardicInspiration,
	'beaconOfHope': beaconOfHope,
	'beguilingTwist': beguilingTwist,
	'bladeFlourish': bladeFlourish,
	'blessingOfTheForge': blessingOfTheForge,
	'blight': blight,
	'blink': blink,
	'bloodSpear': bloodSpear,
	'brandOfCastigation': brandOfCastigation,
	'callLightning': callLightning,
	'chainLightning': chainLightning,
	'charmPerson': charmPerson,
	'chillTouch': chillTouch,
	'circleOfMortality': circleOfMortality,
	'cleave': cleave,
	'cloudkill': cloudkill,
	'conditionResistanceEarly': conditionResistanceEarly,
	'conditionResistanceLate': conditionResistanceLate,
	'conditionVulnerabilityEarly': conditionVulnerabilityEarly,
	'conditionVulnerabilityLate': conditionVulnerabilityLate,
	'crimsonRite': crimsonRite,
	'crusher': crusher,
	'darkOnesBlessing': darkOnesBlessing,
	'darkness': darkness,
	'deathWard': deathWard,
	'destructiveWrath': destructiveWrath,
	'detectThoughts': detectThoughts,
	'divineFury': divineFury,
	'divineSmite': divineSmite,
	'divineStrike': divineStrike,
	'dragonVessel': dragonVessel,
	'dragonsBreath': dragonsBreath,
	'dragonsWrath': dragonsWrath,
	'dreadAmbusher': dreadAmbusher,
	'eladrinSeason': eladrinSeason,
	'elementalAdept': elementalAdept,
	'elixirOfHealth': elixirOfHealth,
	'experimentalElixir': experimentalElixir,
	'expertDivination': expertDivination,
	'explodingHeals': explodingHeals,
	'fallenPuppet': fallenPuppet,
	'feyPresence': feyPresence,
	'focusedAim': focusedAim,
	'formOfDread': formOfDread,
	'graveTouched': graveTouched,
	'grovelthrash': grovelthrash,
	'healingLight': healingLight,
	'heartOfTheStorm': heartOfTheStorm,
	'heatMetal': heatMetal,
	'help': help,
	'hex': hex,
	'holyWeapon': holyWeapon,
	'hungryJaws': hungryJaws,
	'hybridTransformation': hybridTransformation,
	'inspiringSmite': inspiringSmite,
	'lightningArrow': lightningArrow,
	'maneuvers': maneuvers,
	'massCureWounds': massCureWounds,
	'mirrorImage': mirrorImage,
	'monster': monster,
	'muddledMind': muddledMind,
	'mutagencraft': mutagencraft,
	'oilOfSharpness': oilOfSharpness,
	'onHit': onHit,
	'onMove': onMove,
	'onMoveEffect': onMoveEffect,
	'orcishFury': orcishFury,
	'piercer': piercer,
	'potionOfDiminution': potionOfDiminution,
	'potionOfFireBreath': potionOfFireBreath,
	'potionOfGiantSize': potionOfGiantSize,
	'potionOfGrowth': potionOfGrowth,
	'potionOfMaximumPower': potionOfMaximumPower,
	'potionOfPoison': potionOfPoison,
	'potionOfVitality': potionOfVitality,
	'preserveLife': preserveLife,
	'protectionFromEvilAndGood': protectionFromEvilAndGood,
	'radiantSoul': radiantSoul,
	'rayOfEnfeeblement': rayOfEnfeeblement,
	'reaper': reaper,
	'removeTemplate': removeTemplate,
	'ringOfSpellStoring': ringOfSpellStoring,
	'riteOfTheDawn': riteOfTheDawn,
	'sanctuary': sanctuary,
	'shadowBlade': shadowBlade,
	'shockingGrasp': shockingGrasp,
	'spikeGrowth': spikeGrowth,
	'spiritGuardians': spiritGuardians,
	'spiritShroud': spiritShroud,
	'stillnessOfMind': stillnessOfMind,
	'stormSphere': stormSphere,
	'stormgirdle': stormgirdle,
	'thunderboltStrike': thunderboltStrike,
	'turnUndead': turnUndead,
	'twilightSanctuary': twilightSanctuary,
	'vampiricBite': vampiricBite,
	'vampiricTouch': vampiricTouch,
	'wildhunt': wildhunt,
	'witherAndBloom': witherAndBloom,
	'wrathOfTheStorm': wrathOfTheStorm,
	'zealousPresence': zealousPresence
}