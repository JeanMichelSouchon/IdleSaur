/**
 * Énumération des types d'items.
 * - Consumable : objet consommé lors de son utilisation.
 * - Persistent : objet persistant qui peut évoluer via un système de leveling.
 */
export enum DinosaurItemType {
    Consumable = 'consumable',
    Persistent = 'persistent'
  }
  
  /**
   * Énumération des catégories d'items (pour faciliter le tri côté frontend).
   */
  export enum DinosaurItemCategory {
    Food = 'food',
    Energy = 'energy',
    Money = 'money',
    Karma = 'karma',
    Experience = 'experience'
  }
  