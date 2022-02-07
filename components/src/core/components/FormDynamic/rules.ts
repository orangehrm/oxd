export const rulesList = [
  {
    "required": (v: any) => (!!v && v.trim() !== '') || 'Required',
  },
  {
    "name": (v: any) => (v && v.length <= 30) || 'Should be less than 30 characters',
  },
  {
    "email": (v: any) => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
  }
];
