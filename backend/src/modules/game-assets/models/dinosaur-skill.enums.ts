/**
 * Énumération des catégories de skills adaptées à votre jeu (Tamagotchi Idle).
 */
export enum DinosaurSkillCategory {
    Food = 'food',
    Energy = 'energy',
    Money = 'money',
    Karma = 'karma',
    Experience = 'experience',
    Advanced = 'advanced'
  }
  
  /**
   * Énumération des types de skills.
   * - Permanent : effets appliqués en continu.
   * - Triggered : nécessitent d'être activés et ont une durée d'effet.
   */
  export enum DinosaurSkillType {
    Permanent = 'permanent',
    Triggered = 'triggered'
  }
  