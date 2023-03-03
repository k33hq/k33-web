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
    console.log(route);
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
            description={investorUnapproved.description}
            label={investorUnapproved.label}
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
      width="216"
      height="98"
      viewBox="0 0 216 98"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M70.8637 64L26.9872 31.2517L69.5232 0H52.0977L17.6936 26.0578C15.3702 27.8184 14.834 29.227 14.834 31.1637C14.834 32.9243 15.1915 34.3329 17.1574 35.8294L53.5275 64H70.8637ZM11.3489 64V0H0V64H11.3489Z"
        fill="#090A0B"
      />
      <path
        d="M121.174 64C133.864 64 142.085 56.2531 142.085 44.6327C142.085 37.1499 137.795 32.044 131.898 30.1953C136.723 28.6988 140.834 24.6492 140.834 16.5502C140.834 5.63411 132.523 0 119.923 0H76.9402V11.0922H117.689C125.195 11.0922 129.395 13.1169 129.395 19.0151C129.395 24.5612 126.357 26.762 119.923 26.762H92.0423V36.1816H120.727C127.072 36.1816 130.557 39.0867 130.557 44.3686C130.557 49.9147 125.553 52.8198 118.404 52.8198H76.6722V64H121.174Z"
        fill="#090A0B"
      />
      <path
        d="M195.089 64C207.779 64 216 56.2531 216 44.6327C216 37.1499 211.711 32.044 205.813 30.1953C210.638 28.6988 214.749 24.6492 214.749 16.5502C214.749 5.63411 206.438 0 193.838 0H150.855V11.0922H191.604C199.111 11.0922 203.311 13.1169 203.311 19.0151C203.311 24.5612 200.272 26.762 193.838 26.762H165.958V36.1816H194.643C200.987 36.1816 204.472 39.0867 204.472 44.3686C204.472 49.9147 199.468 52.8198 192.319 52.8198H150.587V64H195.089Z"
        fill="#090A0B"
      />
      <path d="M3.17609 97.7587V80.2172H0V97.7587H3.17609Z" fill="#2D3339" />
      <path
        d="M22.2226 97.3244C22.6728 97.7587 23.148 97.9759 23.6731 97.9759C24.5984 97.9759 25.2487 97.3003 25.2487 96.1421V80.0724H22.2226V92.9088L9.39325 80.6273C8.91809 80.1689 8.51795 80 8.04279 80C7.04245 80 6.41723 80.6997 6.41723 81.8338V97.7587H9.44327V84.9223L22.2226 97.3244Z"
        fill="#2D3339"
      />
      <path
        d="M37.554 97.0107C37.9292 97.6139 38.4043 98 39.1046 98C39.7548 98 40.255 97.6139 40.6301 97.0107L51.1087 80.2172H47.4574L39.2296 93.7292L30.9768 80.2172H27.1005L37.554 97.0107Z"
        fill="#2D3339"
      />
      <path
        d="M69.3214 97.7587V94.6944H56.2169V83.2815H69.2963V80.2172H53.0658V97.7587H69.3214ZM68.6211 90.134V87.5523H58.5427V90.134H68.6211Z"
        fill="#2D3339"
      />
      <path
        d="M85.6717 97.7587C89.473 97.7587 91.3236 95.563 91.3236 92.6193C91.3236 89.2172 89.3479 87.5523 85.6717 87.5523H77.3438C75.9433 87.5523 75.068 86.756 75.068 85.429C75.068 84.1019 75.9183 83.2815 77.3688 83.2815H90.4233V80.2172H77.3688C73.7426 80.2172 71.7669 82.3164 71.7669 85.1394C71.7669 88.0349 73.8926 90.134 77.3188 90.134H85.6717C87.3723 90.134 88.3226 90.9062 88.3226 92.4021C88.3226 93.7775 87.3723 94.6944 85.6717 94.6944H72.042V97.7587H85.6717Z"
        fill="#2D3339"
      />
      <path
        d="M103.05 97.7587V83.2815H109.952V80.2172H92.9712V83.2815H99.8736V97.7587H103.05Z"
        fill="#2D3339"
      />
      <path
        d="M135.803 97.7587L131.151 81.2547C130.901 80.4102 130.401 80 129.626 80C128.95 80 128.4 80.3619 128.1 81.0375L122.498 93.4397L116.896 81.0375C116.596 80.3619 115.971 80 115.296 80C114.445 80 113.945 80.4102 113.72 81.2547L109.044 97.7587H112.17L115.646 85.429L120.773 96.8418C121.098 97.5898 121.648 98 122.398 98C123.173 98 123.674 97.5898 124.024 96.8418L129.175 85.429L132.652 97.7587H135.803Z"
        fill="#2D3339"
      />
      <path
        d="M154.165 97.7587V94.6944H141.06V83.2815H154.14V80.2172H137.909V97.7587H154.165ZM153.465 90.134V87.5523H143.386V90.134H153.465Z"
        fill="#2D3339"
      />
      <path
        d="M172.616 97.3244C173.066 97.7587 173.541 97.9759 174.066 97.9759C174.992 97.9759 175.642 97.3003 175.642 96.1421V80.0724H172.616V92.9088L159.786 80.6273C159.311 80.1689 158.911 80 158.436 80C157.436 80 156.81 80.6997 156.81 81.8338V97.7587H159.836V84.9223L172.616 97.3244Z"
        fill="#2D3339"
      />
      <path
        d="M187.722 97.7587V83.2815H194.625V80.2172H177.644V83.2815H184.546V97.7587H187.722Z"
        fill="#2D3339"
      />
      <path
        d="M210.348 97.7587C214.149 97.7587 216 95.563 216 92.6193C216 89.2172 214.024 87.5523 210.348 87.5523H202.02C200.62 87.5523 199.744 86.756 199.744 85.429C199.744 84.1019 200.595 83.2815 202.045 83.2815H215.1V80.2172H202.045C198.419 80.2172 196.443 82.3164 196.443 85.1394C196.443 88.0349 198.569 90.134 201.995 90.134H210.348C212.049 90.134 212.999 90.9062 212.999 92.4021C212.999 93.7775 212.049 94.6944 210.348 94.6944H196.718V97.7587H210.348Z"
        fill="#2D3339"
      />
    </svg>
  );
};

export const SurveyLogo: React.FC = () => {
  return (
    <div>
      <svg
        width="86"
        height="41"
        viewBox="0 0 86 41"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M28.2142 26L10.7449 12.696L27.6805 0H20.7426L7.04466 10.586C6.11961 11.3012 5.90613 11.8735 5.90613 12.6602C5.90613 13.3755 6.04845 13.9477 6.83119 14.5557L21.3119 26H28.2142ZM4.51855 26V0H0V26H4.51855Z"
          fill="#090A0B"
        />
        <path
          d="M48.2453 26C53.2975 26 56.5708 22.8528 56.5708 18.132C56.5708 15.0922 54.863 13.0179 52.5148 12.2669C54.436 11.6589 56.0727 10.0138 56.0727 6.72352C56.0727 2.28886 52.7638 0 47.7472 0H30.6336V4.50619H46.8577C49.8463 4.50619 51.5186 5.32875 51.5186 7.7249C51.5186 9.97799 50.3089 10.8721 47.7472 10.8721H36.6465V14.6988H48.0674C50.5935 14.6988 51.9811 15.879 51.9811 18.0248C51.9811 20.2779 49.9887 21.458 47.1423 21.458H30.5269V26H48.2453Z"
          fill="#090A0B"
        />
        <path
          d="M77.6745 26C82.7267 26 86 22.8528 86 18.132C86 15.0922 84.2922 13.0179 81.944 12.2669C83.8652 11.6589 85.5019 10.0138 85.5019 6.72352C85.5019 2.28886 82.193 0 77.1764 0H60.0628V4.50619H76.2869C79.2755 4.50619 80.9478 5.32875 80.9478 7.7249C80.9478 9.97799 79.7381 10.8721 77.1764 10.8721H66.0757V14.6988H77.4966C80.0227 14.6988 81.4103 15.879 81.4103 18.0248C81.4103 20.2779 79.4179 21.458 76.5715 21.458H59.9561V26H77.6745Z"
          fill="#090A0B"
        />
        <path d="M1.26455 40.9062V34.0845H0V40.9062H1.26455Z" fill="#2D3339" />
        <path
          d="M8.8479 40.7373C9.02713 40.9062 9.21631 40.9906 9.42541 40.9906C9.79383 40.9906 10.0527 40.7279 10.0527 40.2775V34.0282H8.8479V39.0201L3.73991 34.244C3.55072 34.0657 3.39141 34 3.20222 34C2.80394 34 2.55501 34.2721 2.55501 34.7131V40.9062H3.75982V35.9142L8.8479 40.7373Z"
          fill="#2D3339"
        />
        <path
          d="M14.9521 40.6153C15.1014 40.8499 15.2906 41 15.5694 41C15.8283 41 16.0274 40.8499 16.1768 40.6153L20.3488 34.0845H18.8951L15.6192 39.3391L12.3334 34.0845H10.79L14.9521 40.6153Z"
          fill="#2D3339"
        />
        <path
          d="M27.6002 40.9062V39.7145H22.3826V35.2761H27.5902V34.0845H21.128V40.9062H27.6002ZM27.3214 37.941V36.937H23.3087V37.941H27.3214Z"
          fill="#2D3339"
        />
        <path
          d="M34.11 40.9062C35.6235 40.9062 36.3603 40.0523 36.3603 38.9075C36.3603 37.5845 35.5737 36.937 34.11 36.937H30.7943C30.2367 36.937 29.8882 36.6273 29.8882 36.1113C29.8882 35.5952 30.2267 35.2761 30.8043 35.2761H36.0019V34.0845H30.8043C29.3605 34.0845 28.5739 34.9008 28.5739 35.9987C28.5739 37.1247 29.4202 37.941 30.7843 37.941H34.11C34.7871 37.941 35.1655 38.2413 35.1655 38.8231C35.1655 39.3579 34.7871 39.7145 34.11 39.7145H28.6834V40.9062H34.11Z"
          fill="#2D3339"
        />
        <path
          d="M41.029 40.9062V35.2761H43.7772V34.0845H37.0163V35.2761H39.7645V40.9062H41.029Z"
          fill="#2D3339"
        />
        <path
          d="M54.0696 40.9062L52.2176 34.4879C52.118 34.1595 51.9188 34 51.6102 34C51.3413 34 51.1223 34.1408 51.0028 34.4035L48.7724 39.2265L46.542 34.4035C46.4225 34.1408 46.1736 34 45.9048 34C45.5662 34 45.3671 34.1595 45.2775 34.4879L43.4155 40.9062H44.6601L46.0442 36.1113L48.0854 40.5496C48.2148 40.8405 48.4339 41 48.7326 41C49.0412 41 49.2404 40.8405 49.3798 40.5496L51.4309 36.1113L52.815 40.9062H54.0696Z"
          fill="#2D3339"
        />
        <path
          d="M61.3804 40.9062V39.7145H56.1629V35.2761H61.3705V34.0845H54.9083V40.9062H61.3804ZM61.1016 37.941V36.937H57.0889V37.941H61.1016Z"
          fill="#2D3339"
        />
        <path
          d="M68.7267 40.7373C68.9059 40.9062 69.0951 40.9906 69.3042 40.9906C69.6726 40.9906 69.9315 40.7279 69.9315 40.2775V34.0282H68.7267V39.0201L63.6187 34.244C63.4295 34.0657 63.2702 34 63.081 34C62.6827 34 62.4338 34.2721 62.4338 34.7131V40.9062H63.6386V35.9142L68.7267 40.7373Z"
          fill="#2D3339"
        />
        <path
          d="M74.7412 40.9062V35.2761H77.4894V34.0845H70.7285V35.2761H73.4767V40.9062H74.7412Z"
          fill="#2D3339"
        />
        <path
          d="M83.7497 40.9062C85.2632 40.9062 86 40.0523 86 38.9075C86 37.5845 85.2134 36.937 83.7497 36.937H80.434C79.8764 36.937 79.5279 36.6273 79.5279 36.1113C79.5279 35.5952 79.8664 35.2761 80.4439 35.2761H85.6416V34.0845H80.4439C79.0002 34.0845 78.2135 34.9008 78.2135 35.9987C78.2135 37.1247 79.0599 37.941 80.424 37.941H83.7497C84.4268 37.941 84.8052 38.2413 84.8052 38.8231C84.8052 39.3579 84.4268 39.7145 83.7497 39.7145H78.3231V40.9062H83.7497Z"
          fill="#2D3339"
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
