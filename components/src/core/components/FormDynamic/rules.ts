export const rulesList = [
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    "required": (v: any) => (!!v && v.trim() !== '') || 'Required',
  },
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    "name": (v: any) => (v && v.length <= 30) || 'Should be less than 30 characters',
  },
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    "url": (v: any) => (v && v.length <= 100) || 'Should be less than 100 characters',
  },
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    "keywords": (v: any) => (v && v.length <= 254) || 'Should be less than 254 characters',
  },
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    "email": (v: any) => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
  },
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    "tel": (v: any) => !v || /^[0-9+()-\/]+$/.test(v) || 'Allows numbers and only + - / ( )',
  }
];
