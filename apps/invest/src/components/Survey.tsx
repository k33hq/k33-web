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

const hidePage = [
  'welcome',
  'registered',
  'approved',
  'unapproved',
  'welcome-form',
];

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
    'Thank you for your interest in our fund. Please answer the following questions to help us determine your eligibility to view more details about the fund, including the performance and fund investment strategy.',
  label: 'Start Classification',
};

const professionalInvestor = {
  title: 'Investor Classification',
  description:
    'You are classified as a Professional Investor and are eligible to view details about the fund.',
  label: 'Continue',
};

const investorUnapproved = {
  title: 'Investor Classification',
  description:
    'Due to regulatory requirements, you are unfortunately not eligible to invest in the fund. Feel free to contact us if you have any questions.',
  label: 'Back To Investments',
};

const surveyForm = {
  title: 'User Information',
  description:
    'In order to complete your registration we need some personal information about you.',
  label: 'Continue',
};

const registrationSuccess = {
  title: '',
  description:
    'Your registration is complete! You will now be redirected to  K33 Investments.',
  label: 'See Fund Details',
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
    router.push('home');
  };

  const renderSurvey = (page: Questions) => {
    switch (page) {
      case 'welcome':
        return (
          <SurveyWelcome
            icon={<InvestorClassificationLogo />}
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
            icon={<InvestorClassificationLogo />}
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
            icon={<InvestorClassificationLogo />}
            title={investorUnapproved.title}
            description={investorUnapproved.description}
            label={investorUnapproved.label}
            onNext={routeLandingPage}
          />
        );
      case 'welcome-form':
        return (
          <SurveyWelcome
            icon={<UserBigLogo />}
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
            icon={<K33Invest />}
            description={registrationSuccess.description}
            label={registrationSuccess.label}
            onNext={routeHomePage}
          />
        );
      default:
        return 'loading';
    }
  };

  const renderHeader = (page: Questions) => {
    switch (page) {
      case 'welcome':
        return <SurveyLogo />;
      case 'question1':
      case 'question2':
      case 'question3':
      case 'question4':
      case 'question5':
      case 'question6':
        return <InvestorHeader />;

      case 'approved':
        return null;
      case 'terms':
        return <InvestorHeader />;
      case 'unapproved':
        return null;
      case 'welcome-form':
        return <SurveyLogo />;
      case 'personal-company':
      case 'personal':
      case 'company':
        return <UserHeader />;
      case 'registered':
        return null;
      default:
        return 'loading';
    }
  };

  return (
    <div className="flex flex-col md:gap-10 gap-10 md:py-14 py-6 items-center overflow-scroll">
      <div className="w-full flex items-center justify-center">
        {renderHeader(page)}
      </div>
      <div className="min-h-[400px] md:py-10">{renderSurvey(page)}</div>
      <div className="w-full flex justify-between md:pt-20">
        {!hidePage.includes(page) && <SurveyLogo />}
        <div className="flex flex-row gap-2">
          {!hidePage.includes(page) && (
            <BasicButton
              size="medium"
              onClick={() => {
                changeRoute(prev()?.node as Questions);
              }}
            >
              Back
            </BasicButton>
          )}
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

export const K33Invest: React.FC = () => {
  return (
    <svg
      width="232"
      height="96"
      viewBox="0 0 1250 519"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M95.2321 -0.00012207H66.8367C66.8367 36.8557 36.8012 66.75 0 66.75V95.1085C36.9037 95.1085 66.8367 125.105 66.8367 161.859H95.2321C95.2321 125.003 125.268 95.1085 162.069 95.1085V66.75C125.165 66.75 95.2321 36.7534 95.2321 -0.00012207Z"
        fill="#A54242"
      />
      <path
        d="M276.573 -0.00012207H248.177C248.177 36.8557 218.142 66.75 181.341 66.75V95.1085C218.244 95.1085 248.177 125.105 248.177 161.859H276.573C276.573 125.003 306.608 95.1085 343.409 95.1085V66.75C306.506 66.75 276.573 36.7534 276.573 -0.00012207Z"
        fill="#A54242"
      />
      <path
        d="M457.811 -0.00012207H429.416C429.416 36.8557 399.38 66.75 362.579 66.75V95.1085C399.483 95.1085 429.416 125.105 429.416 161.859H457.811C457.811 125.003 487.847 95.1085 524.648 95.1085V66.75C487.744 66.75 457.811 36.7534 457.811 -0.00012207Z"
        fill="#A54242"
      />
      <path
        d="M95.2321 178.137H66.8367C66.8367 214.993 36.8012 244.887 0 244.887V273.245C36.9037 273.245 66.8367 303.242 66.8367 339.995H95.2321C95.2321 303.14 125.268 273.245 162.069 273.245V244.887C125.165 244.887 95.2321 214.89 95.2321 178.137Z"
        fill="#A54242"
      />
      <path
        d="M276.573 178.137H248.177C248.177 214.993 218.142 244.887 181.341 244.887V273.245C218.244 273.245 248.177 303.242 248.177 339.995H276.573C276.573 303.14 306.608 273.245 343.409 273.245V244.887C306.506 244.887 276.573 214.89 276.573 178.137Z"
        fill="#A54242"
      />
      <path
        d="M457.811 178.137H429.416C429.416 214.993 399.38 244.887 362.579 244.887V273.245C399.483 273.245 429.416 303.242 429.416 339.995H457.811C457.811 303.14 487.847 273.245 524.648 273.245V244.887C487.744 244.887 457.811 214.89 457.811 178.137Z"
        fill="#A54242"
      />
      <path
        d="M639.049 178.137H610.654C610.654 214.993 580.619 244.887 543.817 244.887V273.245C580.721 273.245 610.654 303.242 610.654 339.995H639.049C639.049 303.14 669.085 273.245 705.886 273.245V244.887C668.982 244.887 639.049 214.89 639.049 178.137Z"
        fill="#A54242"
      />
      <path
        d="M820.288 178.137H791.892C791.892 214.993 761.857 244.887 725.055 244.887V273.245C761.959 273.245 791.892 303.242 791.892 339.995H820.288C820.288 303.14 850.323 273.245 887.124 273.245V244.887C850.221 244.887 820.288 214.89 820.288 178.137Z"
        fill="#A54242"
      />
      <path
        d="M820.288 356.171H791.892C791.892 393.027 761.857 422.921 725.055 422.921V451.28C761.959 451.28 791.892 481.276 791.892 518.03H820.288C820.288 481.174 850.323 451.28 887.124 451.28V422.921C850.221 422.921 820.288 392.925 820.288 356.171Z"
        fill="#A54242"
      />
      <path
        d="M1001.63 178.137H973.233C973.233 214.993 943.197 244.887 906.396 244.887V273.245C943.3 273.245 973.233 303.242 973.233 339.995H1001.63C1001.63 303.14 1031.66 273.245 1068.47 273.245V244.887C1031.56 244.887 1001.63 214.89 1001.63 178.137Z"
        fill="#A54242"
      />
      <path
        d="M1182.87 178.137H1154.47C1154.47 214.993 1124.44 244.887 1087.63 244.887V273.245C1124.54 273.245 1154.47 303.242 1154.47 339.995H1182.87C1182.87 303.14 1212.9 273.245 1249.7 273.245V244.887C1212.8 244.887 1182.87 214.89 1182.87 178.137Z"
        fill="#A54242"
      />
      <path
        d="M1182.87 356.171H1154.47C1154.47 393.027 1124.44 422.921 1087.63 422.921V451.28C1124.54 451.28 1154.47 481.276 1154.47 518.03H1182.87C1182.87 481.174 1212.9 451.28 1249.7 451.28V422.921C1212.8 422.921 1182.87 392.925 1182.87 356.171Z"
        fill="#A54242"
      />
      <path
        d="M95.2321 356.171H66.8367C66.8367 393.027 36.8012 422.921 0 422.921V451.28C36.9037 451.28 66.8367 481.276 66.8367 518.03H95.2321C95.2321 481.174 125.268 451.28 162.069 451.28V422.921C125.165 422.921 95.2321 392.925 95.2321 356.171Z"
        fill="#A54242"
      />
      <path
        d="M276.573 356.171H248.177C248.177 393.027 218.142 422.921 181.341 422.921V451.28C218.244 451.28 248.177 481.276 248.177 518.03H276.573C276.573 481.174 306.608 451.28 343.409 451.28V422.921C306.506 422.921 276.573 392.925 276.573 356.171Z"
        fill="#A54242"
      />
      <path
        d="M457.811 356.171H429.416C429.416 393.027 399.38 422.921 362.579 422.921V451.28C399.483 451.28 429.416 481.276 429.416 518.03H457.811C457.811 481.174 487.847 451.28 524.648 451.28V422.921C487.744 422.921 457.811 392.925 457.811 356.171Z"
        fill="#A54242"
      />
    </svg>
  );
};

export const SurveyLogo: React.FC = () => {
  return (
    <div>
      <svg
        width="97"
        height="40"
        viewBox="0 0 1250 519"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M95.2321 -0.00012207H66.8367C66.8367 36.8557 36.8012 66.75 0 66.75V95.1085C36.9037 95.1085 66.8367 125.105 66.8367 161.859H95.2321C95.2321 125.003 125.268 95.1085 162.069 95.1085V66.75C125.165 66.75 95.2321 36.7534 95.2321 -0.00012207Z"
          fill="#A54242"
        />
        <path
          d="M276.573 -0.00012207H248.177C248.177 36.8557 218.142 66.75 181.341 66.75V95.1085C218.244 95.1085 248.177 125.105 248.177 161.859H276.573C276.573 125.003 306.608 95.1085 343.409 95.1085V66.75C306.506 66.75 276.573 36.7534 276.573 -0.00012207Z"
          fill="#A54242"
        />
        <path
          d="M457.811 -0.00012207H429.416C429.416 36.8557 399.38 66.75 362.579 66.75V95.1085C399.483 95.1085 429.416 125.105 429.416 161.859H457.811C457.811 125.003 487.847 95.1085 524.648 95.1085V66.75C487.744 66.75 457.811 36.7534 457.811 -0.00012207Z"
          fill="#A54242"
        />
        <path
          d="M95.2321 178.137H66.8367C66.8367 214.993 36.8012 244.887 0 244.887V273.245C36.9037 273.245 66.8367 303.242 66.8367 339.995H95.2321C95.2321 303.14 125.268 273.245 162.069 273.245V244.887C125.165 244.887 95.2321 214.89 95.2321 178.137Z"
          fill="#A54242"
        />
        <path
          d="M276.573 178.137H248.177C248.177 214.993 218.142 244.887 181.341 244.887V273.245C218.244 273.245 248.177 303.242 248.177 339.995H276.573C276.573 303.14 306.608 273.245 343.409 273.245V244.887C306.506 244.887 276.573 214.89 276.573 178.137Z"
          fill="#A54242"
        />
        <path
          d="M457.811 178.137H429.416C429.416 214.993 399.38 244.887 362.579 244.887V273.245C399.483 273.245 429.416 303.242 429.416 339.995H457.811C457.811 303.14 487.847 273.245 524.648 273.245V244.887C487.744 244.887 457.811 214.89 457.811 178.137Z"
          fill="#A54242"
        />
        <path
          d="M639.049 178.137H610.654C610.654 214.993 580.619 244.887 543.817 244.887V273.245C580.721 273.245 610.654 303.242 610.654 339.995H639.049C639.049 303.14 669.085 273.245 705.886 273.245V244.887C668.982 244.887 639.049 214.89 639.049 178.137Z"
          fill="#A54242"
        />
        <path
          d="M820.288 178.137H791.892C791.892 214.993 761.857 244.887 725.055 244.887V273.245C761.959 273.245 791.892 303.242 791.892 339.995H820.288C820.288 303.14 850.323 273.245 887.124 273.245V244.887C850.221 244.887 820.288 214.89 820.288 178.137Z"
          fill="#A54242"
        />
        <path
          d="M820.288 356.171H791.892C791.892 393.027 761.857 422.921 725.055 422.921V451.28C761.959 451.28 791.892 481.276 791.892 518.03H820.288C820.288 481.174 850.323 451.28 887.124 451.28V422.921C850.221 422.921 820.288 392.925 820.288 356.171Z"
          fill="#A54242"
        />
        <path
          d="M1001.63 178.137H973.233C973.233 214.993 943.197 244.887 906.396 244.887V273.245C943.3 273.245 973.233 303.242 973.233 339.995H1001.63C1001.63 303.14 1031.66 273.245 1068.47 273.245V244.887C1031.56 244.887 1001.63 214.89 1001.63 178.137Z"
          fill="#A54242"
        />
        <path
          d="M1182.87 178.137H1154.47C1154.47 214.993 1124.44 244.887 1087.63 244.887V273.245C1124.54 273.245 1154.47 303.242 1154.47 339.995H1182.87C1182.87 303.14 1212.9 273.245 1249.7 273.245V244.887C1212.8 244.887 1182.87 214.89 1182.87 178.137Z"
          fill="#A54242"
        />
        <path
          d="M1182.87 356.171H1154.47C1154.47 393.027 1124.44 422.921 1087.63 422.921V451.28C1124.54 451.28 1154.47 481.276 1154.47 518.03H1182.87C1182.87 481.174 1212.9 451.28 1249.7 451.28V422.921C1212.8 422.921 1182.87 392.925 1182.87 356.171Z"
          fill="#A54242"
        />
        <path
          d="M95.2321 356.171H66.8367C66.8367 393.027 36.8012 422.921 0 422.921V451.28C36.9037 451.28 66.8367 481.276 66.8367 518.03H95.2321C95.2321 481.174 125.268 451.28 162.069 451.28V422.921C125.165 422.921 95.2321 392.925 95.2321 356.171Z"
          fill="#A54242"
        />
        <path
          d="M276.573 356.171H248.177C248.177 393.027 218.142 422.921 181.341 422.921V451.28C218.244 451.28 248.177 481.276 248.177 518.03H276.573C276.573 481.174 306.608 451.28 343.409 451.28V422.921C306.506 422.921 276.573 392.925 276.573 356.171Z"
          fill="#A54242"
        />
        <path
          d="M457.811 356.171H429.416C429.416 393.027 399.38 422.921 362.579 422.921V451.28C399.483 451.28 429.416 481.276 429.416 518.03H457.811C457.811 481.174 487.847 451.28 524.648 451.28V422.921C487.744 422.921 457.811 392.925 457.811 356.171Z"
          fill="#A54242"
        />
      </svg>
    </div>
  );
};

export const InvestorClassificationLogo: React.FC = () => {
  return (
    <svg
      width="72"
      height="72"
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="72" height="72" rx="16" fill="#090A0B" />
      <path
        d="M39.75 18.5C40.4375 18.5 41 19.0594 41 19.75V23.5C42.3828 23.5 43.5 24.6172 43.5 26V33.5C43.5 34.8828 42.3828 36 41 36V39.75C41 40.4375 40.4375 41 39.75 41C39.0625 41 38.5 40.4375 38.5 39.75V36C37.1172 36 36 34.8828 36 33.5V26C36 24.6172 37.1172 23.5 38.5 23.5V19.75C38.5 19.0594 39.0625 18.5 39.75 18.5ZM48.5 27.25C48.5 26.5625 49.0625 26 49.75 26C50.4375 26 51 26.5625 51 27.25V31C52.3828 31 53.5 32.1172 53.5 33.5V38.5C53.5 39.8828 52.3828 41 51 41V44.75C51 45.4375 50.4375 46 49.75 46C49.0625 46 48.5 45.4375 48.5 44.75V41C47.1172 41 46 39.8828 46 38.5V33.5C46 32.1172 47.1172 31 48.5 31V27.25ZM26 28.5C26 27.1172 27.1172 26 28.5 26V22.25C28.5 21.5594 29.0625 21 29.75 21C30.4375 21 31 21.5594 31 22.25V26C32.3828 26 33.5 27.1172 33.5 28.5V38.5C33.5 39.8828 32.3828 41 31 41V44.75C31 45.4375 30.4375 46 29.75 46C29.0625 46 28.5 45.4375 28.5 44.75V41C27.1172 41 26 39.8828 26 38.5V28.5Z"
        fill="white"
      />
      <path
        opacity="0.4"
        d="M18.5 18.5C19.8805 18.5 21 19.6195 21 21V47.25C21 47.9375 21.5594 48.5 22.25 48.5H53.5C54.8828 48.5 56 49.6172 56 51C56 52.3828 54.8828 53.5 53.5 53.5H22.25C18.7984 53.5 16 50.7031 16 47.25V21C16 19.6195 17.1195 18.5 18.5 18.5Z"
        fill="white"
      />
    </svg>
  );
};

export const InvestorSmall: React.FC = () => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" rx="8" fill="#090A0B" />
      <path
        d="M22.25 9.5C22.6625 9.5 23 9.83562 23 10.25V12.5C23.8297 12.5 24.5 13.1703 24.5 14V18.5C24.5 19.3297 23.8297 20 23 20V22.25C23 22.6625 22.6625 23 22.25 23C21.8375 23 21.5 22.6625 21.5 22.25V20C20.6703 20 20 19.3297 20 18.5V14C20 13.1703 20.6703 12.5 21.5 12.5V10.25C21.5 9.83562 21.8375 9.5 22.25 9.5ZM27.5 14.75C27.5 14.3375 27.8375 14 28.25 14C28.6625 14 29 14.3375 29 14.75V17C29.8297 17 30.5 17.6703 30.5 18.5V21.5C30.5 22.3297 29.8297 23 29 23V25.25C29 25.6625 28.6625 26 28.25 26C27.8375 26 27.5 25.6625 27.5 25.25V23C26.6703 23 26 22.3297 26 21.5V18.5C26 17.6703 26.6703 17 27.5 17V14.75ZM14 15.5C14 14.6703 14.6703 14 15.5 14V11.75C15.5 11.3356 15.8375 11 16.25 11C16.6625 11 17 11.3356 17 11.75V14C17.8297 14 18.5 14.6703 18.5 15.5V21.5C18.5 22.3297 17.8297 23 17 23V25.25C17 25.6625 16.6625 26 16.25 26C15.8375 26 15.5 25.6625 15.5 25.25V23C14.6703 23 14 22.3297 14 21.5V15.5Z"
        fill="white"
      />
      <path
        opacity="0.4"
        d="M9.5 9.5C10.3283 9.5 11 10.1717 11 11V26.75C11 27.1625 11.3356 27.5 11.75 27.5H30.5C31.3297 27.5 32 28.1703 32 29C32 29.8297 31.3297 30.5 30.5 30.5H11.75C9.67906 30.5 8 28.8219 8 26.75V11C8 10.1717 8.67172 9.5 9.5 9.5Z"
        fill="white"
      />
    </svg>
  );
};

export const UserIcon: React.FC = () => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" rx="8" fill="#090A0B" />
      <g clip-path="url(#clip0_104_2836)">
        <path
          d="M22.3773 22.2509H17.6239C13.1382 22.2509 9.5 25.8886 9.5 30.3748C9.5 31.272 10.2275 32 11.1248 32H28.8774C29.7746 32.0014 30.5012 31.2748 30.5012 30.3748C30.5012 25.8886 26.8635 22.2509 22.3773 22.2509Z"
          fill="white"
        />
        <path
          opacity="0.4"
          d="M26.0009 14.0004C26.0009 17.3141 23.3149 20.0007 20.0006 20.0007C16.6863 20.0007 14.0002 17.3146 14.0002 14.0004C14.0002 10.6861 16.6868 8 20.0006 8C23.3149 8 26.0009 10.6866 26.0009 14.0004Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_104_2836">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(8 8)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

interface SurveyHeaderProps {
  logo: React.ReactNode;
  label: string;
}

export const SurveyHeader: React.FC<SurveyHeaderProps> = ({ logo, label }) => {
  return (
    <div className="flex flex-row items-center gap-4">
      <div className="h-[40px] w-[40px]">{logo}</div>
      <p className="text-body1 text-label-light-primary">{label}</p>
    </div>
  );
};

export const InvestorHeader: React.FC = () => {
  return (
    <SurveyHeader logo={<InvestorSmall />} label="Investor Classification" />
  );
};

export const UserHeader: React.FC = () => {
  return <SurveyHeader logo={<UserIcon />} label="User Information" />;
};

export const UserBigLogo: React.FC = () => {
  return (
    <svg
      width="73"
      height="72"
      viewBox="0 0 73 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" width="72" height="72" rx="16" fill="#090A0B" />
      <g clip-path="url(#clip0_104_3220)">
        <path
          d="M40.4622 39.7514H32.5399C25.0636 39.7514 19 45.8143 19 53.2913C19 54.7867 20.2126 56 21.708 56H51.2956C52.791 56.0024 54.002 54.7913 54.002 53.2913C54.002 45.8143 47.9392 39.7514 40.4622 39.7514Z"
          fill="white"
        />
        <path
          opacity="0.4"
          d="M46.5016 26.0006C46.5016 31.5236 42.0248 36.0012 36.501 36.0012C30.9773 36.0012 26.5004 31.5243 26.5004 26.0006C26.5004 20.4768 30.978 16 36.501 16C42.0248 16 46.5016 20.4776 46.5016 26.0006Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_104_3220">
          <rect
            width="40"
            height="40"
            fill="white"
            transform="translate(16.5 16)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
