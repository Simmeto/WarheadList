// ============================================================
// DATA — вся информация о крафте
// ============================================================

const CRAFT_DATA = {
  // Компоненты верхнего уровня (сборка Warhead)
  assembly: [
    { name: 'Plutonium Core', qty: 1 },
    { name: 'Iron', qty: 100 },
    { name: 'Reactor', qty: 75 },
    { name: 'EnergyBomb', qty: 6 },
    { name: 'Primer', qty: 70 }
  ],

  // Ветки крафта с полным деревом
  branches: [
    {
      name: 'Plutonium Core',
      qty: 1,
      tree: [
        { type: 'raw', mat: 'Plutonium', qty: 125, color: 'var(--m-plutonium)' },
        { type: 'raw', mat: 'Beryllium', qty: 20, color: 'var(--m-beryllium)' }
      ]
    },
    {
      name: 'Reactor',
      qty: 75,
      tree: [
        { type: 'raw', mat: 'Iron', qty: 3750, color: 'var(--m-iron)' },
        {
          type: 'craft',
          name: 'Pipe',
          qty: 1875,
          children: [
            { type: 'raw', mat: 'Iron', qty: 3750, color: 'var(--m-iron)' }
          ]
        },
        { type: 'raw', mat: 'Quartz', qty: 750, color: 'var(--m-quartz)' },
        {
          type: 'craft',
          name: 'Wire',
          qty: 1125,
          children: [
            { type: 'raw', mat: 'Copper', qty: 2250, color: 'var(--m-copper)' }
          ]
        },
        {
          type: 'craft',
          name: 'Rubber',
          qty: 2250,
          children: [
            { type: 'raw', mat: 'Stone', qty: 2250, color: 'var(--m-stone)' },
            { type: 'raw', mat: 'Grass', qty: 2250, color: 'var(--m-grass)' }
          ]
        }
      ]
    },
    {
      name: 'EnergyBomb',
      qty: 6,
      tree: [
        {
          type: 'craft',
          name: 'Explosive',
          qty: 30,
          children: [
            { type: 'raw', mat: 'Sulfur', qty: 1200, color: 'var(--m-sulfur)' },
            {
              type: 'craft',
              name: 'Cloth',
              qty: 300,
              children: [
                { type: 'raw', mat: 'Grass', qty: 600, color: 'var(--m-grass)' }
              ]
            }
          ]
        },
        { type: 'raw', mat: 'Quartz', qty: 600, color: 'var(--m-quartz)' },
        {
          type: 'craft',
          name: 'BlastingCap',
          qty: 12,
          children: [
            { type: 'raw', mat: 'Silicon', qty: 300, color: 'var(--m-silicon)' },
            {
              type: 'craft',
              name: 'TriggerWire',
              qty: 300,
              children: [
                {
                  type: 'craft',
                  name: 'Wire',
                  qty: 300,
                  children: [
                    { type: 'raw', mat: 'Copper', qty: 600, color: 'var(--m-copper)' }
                  ]
                },
                { type: 'raw', mat: 'Flint', qty: 300, color: 'var(--m-flint)' }
              ]
            },
            {
              type: 'craft',
              name: 'Gear',
              qty: 24,
              children: [
                { type: 'raw', mat: 'Iron', qty: 48, color: 'var(--m-iron)' }
              ]
            },
            { type: 'raw', mat: 'Iron', qty: 300, color: 'var(--m-iron)' }
          ]
        }
      ]
    },
    {
      name: 'Primer',
      qty: 70,
      tree: [
        {
          type: 'craft',
          name: 'Polysilicon',
          qty: 3500,
          children: [
            { type: 'raw', mat: 'Silicon', qty: 7000, color: 'var(--m-silicon)' }
          ]
        },
        {
          type: 'craft',
          name: 'TriggerWire',
          qty: 3500,
          children: [
            {
              type: 'craft',
              name: 'Wire',
              qty: 3500,
              children: [
                { type: 'raw', mat: 'Copper', qty: 7000, color: 'var(--m-copper)' }
              ]
            },
            { type: 'raw', mat: 'Flint', qty: 3500, color: 'var(--m-flint)' }
          ]
        },
        {
          type: 'craft',
          name: 'Wire',
          qty: 700,
          children: [
            { type: 'raw', mat: 'Copper', qty: 1400, color: 'var(--m-copper)' }
          ]
        },
        { type: 'raw', mat: 'Titanium', qty: 1750, color: 'var(--m-titanium)' }
      ]
    },
    {
      name: 'Iron',
      qty: 100,
      tree: [
        { type: 'raw', mat: 'Iron', qty: 100, color: 'var(--m-iron)' }
      ]
    }
  ],

  // Промежуточные крафты (для отображения в чипсах)
  intermediates: {
    'Wire': 5625,
    'TriggerWire': 3800,
    'Polysilicon': 3500,
    'Rubber': 2250,
    'Pipe': 1875,
    'Cloth': 300,
    'Reactor': 75,
    'Primer': 70,
    'Explosive': 30,
    'Gear': 24,
    'BlastingCap': 12,
    'EnergyBomb': 6
  },

  // Цвета сырья для спектра и таблицы
  materialColors: {
    'Copper': 'var(--m-copper)',
    'Iron': 'var(--m-iron)',
    'Silicon': 'var(--m-silicon)',
    'Flint': 'var(--m-flint)',
    'Grass': 'var(--m-grass)',
    'Stone': 'var(--m-stone)',
    'Titanium': 'var(--m-titanium)',
    'Quartz': 'var(--m-quartz)',
    'Sulfur': 'var(--m-sulfur)',
    'Plutonium': 'var(--m-plutonium)',
    'Beryllium': 'var(--m-beryllium)'
  }
};