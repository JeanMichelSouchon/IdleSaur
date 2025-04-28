import { gardenBuilding } from './garden.building';
import { pastureBuilding } from './pasture.building';
import { gymBuilding } from './gym.building';
import { universityBuilding } from './university.building';
import { worshipBuilding } from './worship.building';
import { shaolinTempleBuilding } from './shaolin-temple.building';

/**
 * Agrégation de toutes les définitions de bâtiments.
 */
export const allBuildingsMapping = {
  garden: gardenBuilding,
  pasture: pastureBuilding,
  gym: gymBuilding,
  university: universityBuilding,
  worship: worshipBuilding,
  shaolinTemple: shaolinTempleBuilding
};
