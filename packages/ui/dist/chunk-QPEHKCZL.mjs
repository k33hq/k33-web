import { jsxs, jsx } from 'react/jsx-runtime';

var c=({logo:e,title:a,description:r,variant:t="primary"})=>jsxs("div",{className:`ui-flex ui-flex-col ui-gap-4 ui-w-80 ${t==="secondary"?"ui-items-center ui-justify-center ui-content-center":""}`,children:[e,jsx("p",{className:t==="primary"?"ui-text-heading6 ui-text-label-light-primary":"ui-text-heading8 ui-text-brand-light-primary",children:a}),jsx("p",{className:t==="primary"?"ui-text-heading8 ui-text-label-light-tertiary":"ui-text-body3 ui-text-default-systemGrey-light-1 ui-text-center",children:r})]});

export { c as a };
