import {attach} from '../extensions/attach.js';
import * as macros from '../macros.js';
import {actorUtils, effectUtils, genericUtils, itemUtils, socketUtils, templateUtils, tokenUtils} from '../utils.js';
import {auras} from './auras.js';
import {templateEvents} from './template.js';
function getMovementMacroData(entity) {
    return entity.flags['chris-premades']?.macros?.movement ?? [];
}
function collectMovementMacros(entity) {
    let macroList = [];
    macroList.push(...getMovementMacroData(entity));
    if (!macroList.length) return [];
    return macroList.map(i => macros[i]).filter(j => j);
}
function collectTokenMacros(token, pass, distance, target) {
    let triggers = [];
    if (token.actor) {
        let effects = actorUtils.getEffects(token.actor);
        for (let effect of effects) {
            let macroList = collectMovementMacros(effect);
            if (!macroList.length) continue;
            let movementMacros = macroList.filter(i => i.movement?.find(j => j.pass === pass)).flatMap(k => k.movement).filter(l => l.pass === pass);
            movementMacros.forEach(i => {
                if (distance && i.distance < distance) return;
                if (i.disposition) {
                    if (i.disposition === 'ally' && token.disposition != target?.disposition) return;
                    if (i.disposition === 'enemy' && token.disposition === target?.disposition) return;
                }
                triggers.push({
                    entity: effect,
                    castData: {
                        castLevel: effectUtils.getCastLevel(effect) ?? -1,
                        baseLevel: effectUtils.getBaseLevel(effect) ?? -1,
                        saveDC: effectUtils.getSaveDC(effect) ?? -1
                    },
                    macro: i.macro,
                    name: effect.name,
                    priority: i.priority,
                    token: token.object,
                    target: target?.object,
                    distance: distance
                });
            });
        }
        for (let item of token.actor.items) {
            let macroList = collectMovementMacros(item);
            if (!macroList.length) continue;
            let itemMacros = macroList.filter(i => i.movement?.find(j => j.pass === pass)).flatMap(k => k.movement).filter(l => l.pass === pass);
            itemMacros.forEach(i => {
                if (distance && i.distance < distance) return;
                if (i.disposition) {
                    if (i.disposition === 'ally' && token.disposition != target?.disposition) return;
                    if (i.disposition === 'enemy' && token.disposition === target?.disposition) return;
                }
                triggers.push({
                    entity: item,
                    castData: {
                        castLevel: i.system.level ?? -1,
                        baseLevel: i.system.level ?? -1,
                        saveDC: itemUtils.getSaveDC(i) ?? -1
                    },
                    macro: i.macro,
                    name: item.name,
                    priority: i.priority,
                    token: token.object,
                    target: target?.object,
                    distance: distance
                });
            });
        }
    }
    return triggers;
}
function getSortedTriggers(tokens, pass, token) {
    let allTriggers = [];
    tokens.forEach(i => {
        let distance;
        if (token) {
            distance = tokenUtils.getDistance(token.object, i.object, {wallsBlock: true});
            if (distance < 0) return;
        }
        allTriggers.push(...collectTokenMacros(i, pass, distance, token));
    });
    let names = new Set(allTriggers.map(i => i.name));
    let maxMap = {};
    names.forEach(i => {
        let maxLevel = Math.max(...allTriggers.map(i => i.castData.castLevel));
        let maxDC = Math.max(...allTriggers.map(i => i.castData.saveDC));
        maxMap[i] = {
            maxLevel: maxLevel,
            maxDC: maxDC
        };
    });
    let triggers = [];
    names.forEach(i => {
        let maxLevel = maxMap[i].maxLevel;
        let maxDC = maxMap[i].maxDC;
        let maxDCTrigger = allTriggers.find(j => j.castData.saveDC === maxDC);
        let selectedTrigger;
        if (maxDCTrigger.castData.castLevel === maxLevel) {
            selectedTrigger = maxDCTrigger;
        } else {
            selectedTrigger = allTriggers.find(j => j.castData.castLevel === maxLevel);
        }
        triggers.push(selectedTrigger);
    });
    return triggers.sort((a, b) => a.priority - b.priority);
}
async function executeMacro(trigger, options) {
    genericUtils.log('dev', 'Executing Movement Macro: ' + trigger.macro.name);
    try {
        await trigger.macro({trigger, options});
    } catch (error) {
        //Add some sort of ui notice here. Maybe even some debug info?
        console.error(error);
    }
}
async function executeMacroPass(tokens, pass, token, options) {
    genericUtils.log('dev', 'Executing Movement Macro Pass: ' + pass);
    let triggers = getSortedTriggers(tokens, pass, token);
    if (triggers.length) await genericUtils.sleep(50);
    for (let i of triggers) await executeMacro(i, options);
}
function preUpdateToken(token, updates, options, userId) {
    if (!socketUtils.isTheGM()) return;
    let templatesUuids = Array.from(templateUtils.getTemplatesInToken(token.object)).map(i => i.uuid);
    genericUtils.setProperty(options, 'chris-premades.templates.wasIn', templatesUuids);
    genericUtils.setProperty(options, 'chris-premades.coords.previous', {x: token.x, y: token.y, elevation: token.elevation});
}
async function updateToken(token, updates, options, userId) {
    if (!socketUtils.isTheGM()) return;
    if (!token.actor) return;
    if (token.parent.id != canvas.scene.id) return;
    if (!updates.x && !updates.y && !updates.elevation) return;
    let coords = {x: updates.x ?? token.x, y: updates.y ?? token.y};
    let previousCoords = genericUtils.getProperty(options, 'chris-premades.coords.previous');
    if (!previousCoords) return;
    let xDiff = token.width * canvas.grid.size / 2;
    let yDiff = token.height * canvas.grid.size / 2;
    coords.x += xDiff;
    coords.y += yDiff;
    previousCoords.x += xDiff;
    previousCoords.y += yDiff;
    let ignore = genericUtils.getProperty(options, 'chris-premades.movement.ignore');
    // eslint-disable-next-line no-undef
    await CanvasAnimation.getAnimation(token.object.animationName)?.promise;
    if (!ignore) {
        await auras.updateAuras(token, options);
        await executeMacroPass([token], 'moved', undefined, options);
        await executeMacroPass(token.parent.tokens.filter(i => i != token), 'movedNear', token, options);
        if (updates.x || updates.y) {
            let current = Array.from(templateUtils.getTemplatesInToken(token.object));
            let previous = options['chris-premades'].templates.wasIn.map(i => fromUuidSync(i)).filter(j => j);
            let leaving = previous.filter(i => !current.includes(i));
            let entering = current.filter(i => !previous.includes(i));
            let staying = previous.filter(i => current.includes(i));
            let through = token.parent.templates.reduce((acc, template) => {
                let intersected = templateUtils.rayIntersectsTemplate(template, new Ray(previousCoords, coords));
                if (!intersected) return acc;
                acc.push(template);
                return acc;
            }, []);
            let enteredAndLeft = through.filter(i => {
                return !leaving.includes(i) && !entering.includes(i) && !staying.includes(i);
            });
            if (leaving.length) await templateEvents.executeMacroPass(leaving, 'left', token.object, options);
            if (entering.length) await templateEvents.executeMacroPass(entering, 'enter', token.object, options);
            if (staying.length) await templateEvents.executeMacroPass(staying, 'stay', token.object, options);
            if (enteredAndLeft.length) await templateEvents.executeMacroPass(enteredAndLeft, 'passedThrough', token.object, options);
        }
    }
    await attach.updateAttachments(token, {x: coords.x - previousCoords.x, y: coords.y - previousCoords.y});
}
export let movementEvents = {
    updateToken,
    preUpdateToken
};