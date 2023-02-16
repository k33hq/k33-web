export const getUrl = (...slugs: Array<string>) => `/${slugs.join('/')}`;

export const colors = {
  systemBlue: 'bg-default-systemBlue-light',
  systemRed: 'bg-default-systemRed-light',
  systemOrange: 'bg-default-systemOrange-light',
  systemYellow: 'bg-default-systemYellow-light',
  systemGreen: 'bg-default-systemGreen-light',
  systemTeal: 'bg-default-systemTeal-light',
  systemIndigo: 'bg-default-systemIndigo-light',
  systemPurple: 'bg-default-systemPurple-light',
  systemPink: 'bg-default-systemPink-light',
};

export * from './get-stripejs';
