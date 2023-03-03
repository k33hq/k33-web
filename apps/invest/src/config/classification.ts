import type { ArcaneFlowConfig } from '../hooks';

export const surveyTypes = [
  'question1',
  'question2',
  'question3',
  'question4',
  'question5',
  'question6',
] as const;

export const termsTypes = ['approved', 'terms', 'unapproved'] as const;

export const formTypes = [
  'welcome-form',
  'personal-company',
  'personal',
  'company',
  'registered',
] as const;

export const appTypes = ['invest', 'home', 'welcome'] as const;

export type SurveyQuestionTypes = (typeof surveyTypes)[number];
export type TermsQuestionTypes = (typeof termsTypes)[number];
export type FormQuestionTypes = (typeof formTypes)[number];
export type AppQuestionTypes = (typeof appTypes)[number];

// export const surveyTypes = [
//   'question1',
//   'question2',
//   'question3',
//   'question4',
//   'question5',
//   'question6',
// ] as const;

// export const termsTypes = ['approved', 'terms', 'unapproved'] as const;

// export const formTypes = [
//   'welcome-form',
//   'personal-company',
//   'personal',
//   'company',
//   'registered',
// ] as const;

// export const appTypes = ['invest', 'home', 'welcome'] as const;

// export type SurveyQuestionTypes = (typeof surveyTypes)[number];
// export type TermsQuestionTypes = (typeof termsTypes)[number];
// export type FormQuestionTypes = (typeof formTypes)[number];
// export type AppQuestionTypes = (typeof appTypes)[number];

export type Questions =
  | SurveyQuestionTypes
  | TermsQuestionTypes
  | FormQuestionTypes
  | AppQuestionTypes;

export type Answers = 'yes' | 'no';

const config: ArcaneFlowConfig<Questions, Answers> = {
  welcome: (val, history) => {
    console.log(history);
    return 'question1';
  },
  question1: (val, history) => {
    console.log(history);
    if (val === 'yes') return 'approved';
    return 'question2';
  },
  question2: (val, history) => {
    console.log(history);
    if (val === 'yes') return 'approved';
    return 'question3';
  },
  question3: (val, history) => {
    console.log(history);
    if (val === 'yes') return 'approved';
    return 'question4';
  },
  question4: (val, history) => {
    return 'question5';
  },
  question5: (val, history) => {
    const question4 = history.find(
      (question) => question.node === 'question4'
    )!;

    if (question4.answer === 'yes' && val === 'yes') return 'approved';

    if (question4.answer === 'no' && val === 'no') return 'unapproved';
    return 'question6';
  },
  question6: (val, history) => {
    const question4 = history.find(
      (question) => question.node === 'question4'
    )!;
    const question5 = history.find(
      (question) => question.node === 'question5'
    )!;

    let yesCount = 0;
    if (question4.answer === 'yes') ++yesCount;
    if (question5.answer === 'yes') ++yesCount;
    if (val === 'yes') ++yesCount;
    if (yesCount >= 2) {
      return 'approved';
    }
    return 'unapproved';
  },
  approved: (val, history) => {
    return 'terms';
  },

  terms: (val, history) => {
    return 'welcome-form';
  },

  unapproved: (val, history) => {
    return 'invest';
  },

  'welcome-form': (val, history) => {
    return 'personal-company';
  },

  'personal-company': (val, history) => {
    if (val === 'yes') return 'company';
    return 'personal';
  },

  personal: (val, history) => {
    return 'registered';
  },

  company: (val, history) => {
    return 'registered';
  },

  registered: (val, history) => {
    return 'home';
  },
};

export default config;
