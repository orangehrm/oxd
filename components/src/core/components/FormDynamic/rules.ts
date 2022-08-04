import {RulesParams} from './types';

/* eslint-disable */
export const setRules = (params: RulesParams) => {
  const paramObj: RulesParams = {
    charLength: params?.charLength || 30
  }
  const ruleList = [
    {
      "required": (v: any) => (!!v && v.trim() !== '') || 'Required',
    },
    {
      "length": (v: any) => (v && v.length <= paramObj.charLength) || `Should be less than ${paramObj.charLength} characters`,
    },
    {
      "email": (v: any) => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
    },
    {
      "number": (v: any) => !v || /^[0-9+()-\/]+$/.test(v) || 'Allows numbers and only + - / ( )',
    }
  ];
  return ruleList;
};
