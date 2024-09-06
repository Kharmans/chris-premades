let packs = {
    spellFeatures: 'chris-premades.CPRSpellFeatures',
    spells: 'chris-premades.CPRSpells',
    summonFeatures: 'chris-premades.CPRSummonFeatures',
    summons: 'chris-premades.CPRSummons',
    items: 'chris-premades.CPRItems',
    classFeatures: 'chris-premades.CPRClassFeatures',
    classFeatureItems: 'chris-premades.CPRClassFeatureItems',
    actions: 'chris-premades.CPRActions',
    miscellaneousItems: 'chris-premades.CPRMiscellaneousItems',
    itemFeatures: 'chris-premades.CPRItemFeatures',
    feats: 'chris-premades.CPRFeats',
    featFeatures: 'chris-premades.CPRFeatFeatures',
    miscellaneous: 'chris-premades.CPRMiscellaneous'
};
let featurePacks = {
    spellFeatures: 'chris-premades.CPRSpellFeatures',
    summonFeatures: 'chris-premades.CPRSummonFeatures',
    classFeatureItems: 'chris-premades.CPRClassFeatureItems',
    miscellaneousItems: 'chris-premades.CPRMiscellaneousItems',
    itemFeatures: 'chris-premades.CPRItemFeatures',
    featFeatures: 'chris-premades.CPRFeatFeatures'
};
function setUseLocalCompendium(value) {
    if (value) {
        packs.spellFeatures = 'world.cpr-spell-features';
        featurePacks.spellFeatures = 'world.cpr-spell-features';
        packs.spells = 'world.cpr-spells';
        packs.summonFeatures = 'world.cpr-summon-features';
        featurePacks.summonFeatures = 'world.cpr-summon-features';
        packs.summons = 'world.cpr-summons';
        packs.items = 'world.cpr-items';
        packs.classFeatures = 'world.cpr-class-features';
        packs.classFeatureItems = 'world.cpr-class-feature-items';
        featurePacks.classFeatureItems = 'world.cpr-class-feature-items';
        packs.actions = 'world.cpr-actions';
        packs.miscellaneousItems = 'world.cpr-miscellaneous-items';
        featurePacks.miscellaneousItems = 'world.cpr-miscellaneous-items';
        packs.itemFeatures = 'world.cpr-item-features';
        featurePacks.itemFeatures = 'world.cpr-item-features';
        packs.feats = 'world.cpr-feats';
        packs.featFeatures = 'world.cpr-feat-features';
        featurePacks.featFeatures = 'world.cpr-feat-features';
        packs.miscellaneous = 'world.cpr-miscellaneous';
    } else {
        packs.spellFeatures = 'chris-premades.CPRSpellFeatures';
        featurePacks.spellFeatures = 'chris-premades.CPRSpellFeatures';
        packs.spells = 'chris-premades.CPRSpells';
        packs.summonFeatures = 'chris-premades.CPRSummonFeatures';
        featurePacks.summonFeatures = 'chris-premades.CPRSummonFeatures';
        packs.summons = 'chris-premades.CPRSummons';
        packs.items = 'chris-premades.CPRItems';
        packs.classFeatures = 'chris-premades.CPRClassFeatures';
        packs.classFeatureItems = 'chris-premades.CPRClassFeatureItems';
        featurePacks.classFeatureItems = 'chris-premades.CPRClassFeatureItems';
        packs.actions = 'chris-premades.CPRActions';
        packs.miscellaneousItems = 'chris-premades.CPRMiscellaneousItems';
        featurePacks.miscellaneousItems = 'chris-premades.CPRMiscellaneousItems';
        packs.itemFeatures = 'chris-premades.CPRItemFeatures';
        featurePacks.itemFeatures = 'chris-premades.CPRItemFeatures';
        packs.feats = 'chris-premades.CPRFeats';
        packs.featFeatures = 'chris-premades.CPRFeatFeatures';
        featurePacks.featFeatures = 'chris-premades.CPRFeatFeatures';
        packs.miscellaneous = 'chris-premades.CPRMiscellaneous';
    }
}
setUseLocalCompendium(false);
const attacks = [
    'msak',
    'rsak',
    'mwak',
    'rwak'
];
const meleeAttacks = [
    'mwak',
    'msak'
];
const rangedAttacks = [
    'rwak',
    'rsak'
];
const weaponAttacks = [
    'mwak',
    'rwak'
];
const spellAttacks = [
    'msak',
    'rsak'
];
const unarmedAttacks = [
    'unarmedStrike',
    'monkUnarmedStrike',
    'tavernBrawlerUnarmedStrike',
    'fightingStyleUnarmedFightingUnarmedStrike'
];
let damageTypeOptions = () => Object.entries(CONFIG.DND5E.damageTypes).map(i => ({label: i[1].label, value: i[0]}));
const overTimeOptions = [
    {
        key: 'turn',
        label: 'CHRISPREMADES.Medkit.Effect.OverTime.Labels.Turn',
        default: 'start',
        type: 'radio',
        options: [
            {
                label: 'CHRISPREMADES.Medkit.Effect.OverTime.Labels.Start',
                value: 'start'
            },
            {
                label: 'CHRISPREMADES.Medkit.Effect.OverTime.Labels.End',
                value: 'end'
            }
        ],
        fieldset: 'parameters'
    },
    {
        key: 'label',
        label: 'CHRISPREMADES.Medkit.Effect.OverTime.Labels.Label',
        default: null,
        type: 'text',
        fieldset: 'parameters'
    },
    {
        key: 'allowIncapacitated',
        label: 'CHRISPREMADES.Medkit.Effect.OverTime.Labels.AllowIncapacitated',
        default: true,
        type: 'boolean',
        fieldset: 'parameters'
    },
    {
        key: 'applyCondition',
        label: 'CHRISPREMADES.Medkit.Effect.OverTime.Labels.ApplyCondition',
        default: null,
        type: 'text',
        fieldset: 'parameters',
    },
    {
        key: 'removeCondition',
        label: 'CHRISPREMADES.Medkit.Effect.OverTime.Labels.RemoveCondition',
        default: null,
        type: 'text',
        fieldset: 'parameters'
    },
    {
        key: 'rollType',
        label: 'CHRISPREMADES.Medkit.Effect.OverTime.Labels.RollType',
        default: false,
        type: 'select',
        options: [
            {
                label: 'CHRISPREMADES.Generic.Check',
                value: 'check'
            },
            {
                label: 'DND5E.SavingThrow',
                value: 'save'
            },
            {
                label: 'CHRISPREMADES.Generic.Skill',
                value: 'skill'
            },
            {
                label: 'DND5E.None',
                value: false
            }
        ],
        fieldset: 'rolls'
    },
    {
        key: 'saveAbility',
        label: 'CHRISPREMADES.Medkit.Effect.OverTime.Labels.SaveAbility',
        default: null,
        type: 'abilityOrSkill',
        requires: 'rollType',
        fieldset: 'rolls'
    },
    {
        key: 'saveDC',
        label: 'CHRISPREMADES.Medkit.Effect.OverTime.Labels.SaveDC',
        default: null,
        type: 'saves',
        requires: 'rollType',
        fieldset: 'rolls'
    },
    {
        key: 'saveDCNumber',
        label: 'CHRISPREMADES.Medkit.Effect.OverTime.Labels.SaveDCNumber',
        default: null,
        type: 'text',
        requires: 'other',
        fieldset: 'rolls'
    },
    {
        key: 'saveDCAbility',
        label: 'CHRISPREMADES.Medkit.Effect.OverTime.Labels.SaveDCAbility',
        default: 'str',
        type: 'ability',
        requires: 'other',
        fieldset: 'rolls'
    },
    {
        key: 'saveDamage',
        label: 'CHRISPREMADES.Medkit.Effect.OverTime.Labels.SaveDamage',
        default: 'nodamage',
        type: 'select',
        options: [
            {
                label: 'CHRISPREMADES.Medkit.Effect.OverTime.Labels.HalfDamage',
                value: 'halfdamage'
            },
            {
                label: 'CHRISPREMADES.Medkit.Effect.OverTime.Labels.NoDamage',
                value: 'nodamage'
            },
            {
                label: 'CHRISPREMADES.Medkit.Effect.OverTime.Labels.FullDamage',
                value: 'fulldamage'
            }
        ],
        requires: 'rollType',
        fieldset: 'rolls'
    },
    {
        key: 'saveRemove',
        label: 'CHRISPREMADES.Medkit.Effect.OverTime.Labels.SaveRemove',
        default: true,
        type: 'boolean',
        requires: 'rollType',
        fieldset: 'rolls'
    },
    {
        key: 'saveMagic',
        label: 'CHRISPREMADES.Medkit.Effect.OverTime.Labels.SaveMagic',
        default: false,
        type: 'boolean',
        requires: 'rollType',
        fieldset: 'rolls'
    },
    {
        key: 'actionSave',
        label: 'CHRISPREMADES.Medkit.Effect.OverTime.Labels.ActionSave',
        default: false,
        type: 'boolean',
        requires: 'rollType',
        fieldset: 'rolls'
    },
    {
        key: 'damageBeforeSave',
        label: 'CHRISPREMADES.Medkit.Effect.OverTime.Labels.DamageBeforeSave',
        default: false,
        type: 'boolean',
        requires: 'rollType',
        fieldset: 'rolls'
    },
    {
        key: 'damageRoll',
        label: 'CHRISPREMADES.Medkit.Effect.OverTime.Labels.DamageRoll',
        default: null,
        type: 'text',
        fieldset: 'damage'
    },
    {
        key: 'damageType',
        label: 'CHRISPREMADES.Medkit.Effect.OverTime.Labels.DamageType',
        default: null,
        type: 'damageTypes',
        requires: 'damageRoll',
        fieldset: 'damage'
    },
    {
        key: 'rollMode',
        label: 'CHRISPREMADES.Medkit.Effect.OverTime.Labels.RollMode',
        default: 'publicroll',
        type: 'select',
        options: [
            {
                label: 'CHRISPREMADES.Medkit.Effect.OverTime.Labels.GMRoll',
                value: 'gmroll'
            },
            {
                label: 'CHRISPREMADES.Medkit.Effect.OverTime.Labels.BlindRoll',
                value: 'blindroll'
            },
            {
                label: 'CHRISPREMADES.Medkit.Effect.OverTime.Labels.PublicRoll',
                value: 'publicroll'
            },
            {
                label: 'CHRISPREMADES.Medkit.Effect.OverTime.Labels.SelfRoll',
                value: 'selfroll'
            }
        ],
        fieldset: 'damage'
    },
    {
        key: 'macro',
        label: 'CHRISPREMADES.Medkit.Effect.OverTime.Labels.Macro',
        default: null,
        type: 'text',
        fieldset: 'macros'
    }
];
const summonAnimationOptions = [
    {
        value: 'default',
        label: 'CHRISPREMADES.Config.Animations.Default',
        requiredModules: ['jb2a_patreon', 'animated-spell-effects-cartoon']
    },
    {
        value: 'celestial',
        label: 'CHRISPREMADES.Config.Animations.Celestial',
        requiredModules: ['jb2a_patreon', 'animated-spell-effects-cartoon']
    },
    {
        value: 'fiend',
        label: 'CHRISPREMADES.Config.Animations.Fiend',
        requiredModules: ['jb2a_patreon', 'animated-spell-effects-cartoon']
    },
    {
        value: 'fire',
        label: 'CHRISPREMADES.Config.Animations.Fire',
        requiredModules: ['jb2a_patreon']
    },
    {
        value: 'water',
        label: 'CHRISPREMADES.Config.Animations.Water',
        requiredModules: ['jb2a_patreon']
    },
    {
        value: 'air',
        label: 'CHRISPREMADES.Config.Animations.Air',
        requiredModules: ['jb2a_patreon', 'animated-spell-effects-cartoon']
    },
    {
        value: 'earth',
        label: 'CHRISPREMADES.Config.Animations.Earth',
        requiredModules: ['jb2a_patreon', 'animated-spell-effects-cartoon']
    },
    {
        value: 'nature',
        label: 'CHRISPREMADES.Config.Animations.Nature',
        requiredModules: ['jb2a_patreon']
    },
    {
        value: 'shadow',
        label: 'CHRISPREMADES.Config.Animations.Shadow',
        requiredModules: ['jb2a_patreon']
    },
    {
        value: 'smoke',
        label: 'CHRISPREMADES.Config.Animations.Smoke',
        requiredModules: []
    },
    {
        value: 'future',
        label: 'CHRISPREMADES.Config.Animations.Future',
        requiredModules: ['jb2a_patreon']
    },
    {
        value: 'none',
        label: 'CHRISPREMADES.Config.Animations.None',
        requiredModules: []
    }
];
const sizes = {
    tiny: 0,
    small: 1,
    medium: 2,
    large: 3,
    huge: 4,
    gargantuan: 5
};
const itemTypes =  [
    'weapon',
    'equipment',
    'consumable',
    'tool',
    'backpack',
    'loot'
];
const tempConditionIcon = 'icons/magic/time/arrows-circling-green.webp';
export let constants = {
    packs,
    featurePacks,
    attacks,
    meleeAttacks,
    rangedAttacks,
    weaponAttacks,
    spellAttacks,
    unarmedAttacks,
    damageTypeOptions,
    setUseLocalCompendium,
    overTimeOptions,
    summonAnimationOptions,
    sizes,
    itemTypes,
    tempConditionIcon
};