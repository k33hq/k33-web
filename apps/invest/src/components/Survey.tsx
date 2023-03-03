import {
  Answers,
  Questions,
  SurveyQuestionTypes,
} from '@/config/classification';
import { History, useSurveyQueryPage } from '@/hooks';
import { useRouter } from 'next/router';
import * as React from 'react';
import SurveyWelcome from './SurveyWelcome';
import Question from './Question';
import Terms from './Terms';
import PersonalForm from './PersonalForm';
import CompanyForm from './CompanyForm';
import { BasicButton } from 'ui';

export interface QuestionContent {
  title: string;
  description: ReadonlyArray<string>;
}

const questions: Record<SurveyQuestionTypes, QuestionContent> = {
  question1: {
    title:
      'Do you represent an entity which is regulated to operate in the financial markets?',
    description: [],
  },
  question2: {
    title:
      'Do you represet a large undertaking meeting two of the following size requirements?',
    description: [
      'Balance sheet total at least 20,000,000 Euro',
      'Net turnover at least 40,000,000 Euro',
      'Own funds at least 2,000,000 Euro',
    ],
  },
  question3: {
    title: 'Do you represent any of the following institutions?',
    description: [
      'National and regional governments, public bodies that manage public debt, central banks, international and supranational institutions such as the World Bank, the International Monetary Fund, the European Central Bank, the European Investment Bank and other similar international organisations.',
    ],
  },
  question4: {
    title:
      'Have you carried out transactions, of significant size, in the crypto market at an average frequency of 10 per quarter over the previous four quarters?',
    description: [],
  },
  question5: {
    title:
      'Does the size of your financial instrument portfolio, defined as including cash deposits and financial instruments exceed 500,000 Euro?',
    description: [],
  },
  question6: {
    title:
      'Have you worked in the financial sector for at least one year in a professional position, which requires knowledge of the transactions or services envisaged?',
    description: [],
  },
};

const welcome = {
  title: 'Investor Classification',
  description:
    'Thank you for your interest in our fund. Please answer the following questions to help us determine your eligibility to view more details about the fund, including performance and fund investment strategy, and more.',
  label: 'Start Classification',
};

const professionalInvestor = {
  title: 'Investor Classification',
  description:
    'Congratulations! You are a Professional Investor and therefore are eligible to view details about the fund.',
  label: 'Continue',
};

const investorUnapproved = {
  title: 'Investor Classification',
  description:
    'We unfortunately can not offer you a spot in our fund right now. Feel free to contact us if you have any question.',
  label: 'Visit K33',
};

const surveyForm = {
  title: 'User Information',
  description:
    'In order to complete your registration we need some quick information from you.',
  label: 'Continue',
};

interface SurveyProps {
  next: (question: Questions, answer: Answers) => Questions;
  prev: () => History<Questions, Answers> | undefined;
}

const Survey: React.FC<SurveyProps> = ({ next, prev }) => {
  const router = useRouter();
  const { page, changeRoute } = useSurveyQueryPage<Questions>({
    page: 'classification',
    initialQuestion: 'welcome',
  });

  const onChangePage = (question: Questions, answer: Answers) => {
    const route = next(question, answer);
    changeRoute(route);
  };

  const positiveChange = () => {
    onChangePage(page, 'yes');
  };

  const negativeChange = () => {
    onChangePage(page, 'no');
  };

  const routeLandingPage = () => {
    router.push('/');
  };

  const routeHomePage = () => {
    router.push('/home');
  };

  const renderSurvey = (page: Questions) => {
    switch (page) {
      case 'welcome':
        return (
          <SurveyWelcome
            title={welcome.title}
            description={welcome.description}
            label={welcome.label}
            onNext={positiveChange}
          />
        );
      case 'question1':
      case 'question2':
      case 'question3':
      case 'question4':
      case 'question5':
      case 'question6':
        return (
          <Question
            question={questions[page as SurveyQuestionTypes]}
            key={page}
            onNegative={negativeChange}
            onPositive={positiveChange}
          />
        );

      case 'approved':
        return (
          <SurveyWelcome
            title={professionalInvestor.title}
            description={professionalInvestor.description}
            label={professionalInvestor.label}
            onNext={positiveChange}
          />
        );
      case 'terms':
        return <Terms onPositive={positiveChange} />;
      case 'unapproved':
        return (
          <SurveyWelcome
            title={investorUnapproved.title}
            description={investorUnapproved.description}
            label={investorUnapproved.label}
            onNext={routeLandingPage}
          />
        );
      case 'welcome-form':
        return (
          <SurveyWelcome
            title={surveyForm.title}
            description={surveyForm.description}
            label={surveyForm.label}
            onNext={positiveChange}
          />
        );
      case 'personal-company':
        return (
          <Question
            question={{
              title: 'Are you making this request on your company’s behalf ?',
              description: [],
            }}
            onNegative={negativeChange}
            onPositive={positiveChange}
          />
        );
      case 'personal':
        return <PersonalForm onPositive={positiveChange} />;
      case 'company':
        return <CompanyForm onPositive={positiveChange} />;
      case 'registered':
        return (
          <SurveyWelcome
            title={''}
            description={investorUnapproved.description}
            label={investorUnapproved.label}
            onNext={routeHomePage}
          />
        );
      default:
        return 'loading';
    }
  };
  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <div className="h-2/3">{renderSurvey(page)}</div>
      <div className="w-full flex md:justify-between">
        <div></div>
        <div className="flex flex-row gap-2">
          {page !== 'welcome' ? (
            <BasicButton
              size="medium"
              onClick={() => {
                changeRoute(prev()?.node as Questions);
              }}
            >
              Back
            </BasicButton>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Survey;

// interface QuestionTemplateProps {
//   children: React.ReactNode;
// }

// const QuestionTemplate: React.FC<QuestionTemplateProps> = ({ children }) => {
//   return <div>{children}</div>;
// };
