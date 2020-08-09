import React from 'react';

export const LanguageList = [
  {
    code: 'ES_ar',
    language: 'Español (Argentina)',
  },
  {
    code: 'EN_us',
    language: 'English (United States)',
  },
];

const LaguageContext = React.createContext({
  language: LanguageList[0],
});

export default LaguageContext;
