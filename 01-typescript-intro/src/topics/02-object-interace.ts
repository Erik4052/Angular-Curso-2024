  const skills:(string | boolean)[] = ['bash', 'counter', 'heal', true];
  interface Character {
    name: string;
    hp: number;
    skills: string[];
    hometown?: string;
  }

  const strider:Character = {
    name: 'Strider',
    hp: 100,
    skills: ['bash', 'counter', 'heal']
  }

  strider.hometown = 'Gondor';

  console.table(strider);
  
