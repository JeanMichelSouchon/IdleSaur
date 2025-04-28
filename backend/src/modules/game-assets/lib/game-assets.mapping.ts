import { foodSkills } from './skills/food.skills';
import { energySkills } from './skills/energy.skills';
import { moneySkills } from './skills/money.skills';
import { karmaSkills } from './skills/karma.skills';
import { experienceSkills } from './skills/experience.skills';
import { advancedSkills } from './skills/advanced.skills';

import { consumableFoodItems } from './items/consumable.items.food';
import { consumableEnergyItems } from './items/consumable.items.energy';
import { consumableMoneyItems } from './items/consumable.items.money';
import { consumableKarmaItems } from './items/consumable.items.karma';
import { consumableExperienceItems } from './items/consumable.items.experience';
import { consumableAdvancedItems } from './items/consumable.items.advanced';

import { persistentEnergyItems } from './items/persistent.items.energy';
import { persistentFoodItems } from './items/persistent.items.food';
import { persistentMoneyItems } from './items/persistent.items.money';
import { persistentKarmaItems } from './items/persistent.items.karma';
import { persistentExperienceItems } from './items/persistent.items.experience';
import { persistentAdvancedItems } from './items/persistent.items.advanced';

import { allBuildingsMapping } from './buildings/game-assets.buildings.mapping';
import { soulSkills } from './soul-skills/dinosaur-soul-skill.mapping';

/**
 * Agrégation complète des définitions de Game Assets.
 */
export const GameAssetsMapping = {
  skills: [
    ...foodSkills,
    ...energySkills,
    ...moneySkills,
    ...karmaSkills,
    ...experienceSkills,
    ...advancedSkills
  ],
  soulSkills: [
    ...soulSkills
  ],
  items: {
    consumable: [
      ...consumableFoodItems,
      ...consumableEnergyItems,
      ...consumableMoneyItems,
      ...consumableKarmaItems,
      ...consumableExperienceItems,
      ...consumableAdvancedItems
    ],
    persistent: [
      ...persistentEnergyItems,
      ...persistentFoodItems,
      ...persistentMoneyItems,
      ...persistentKarmaItems,
      ...persistentExperienceItems,
      ...persistentAdvancedItems
    ]
  },
  buildings: allBuildingsMapping
};
