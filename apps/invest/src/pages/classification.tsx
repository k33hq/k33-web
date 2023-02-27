import { Question } from '@/components';
import { classificationConfig } from '@/config';
import { Answers, Questions } from '@/config/classification';
import ArcaneFlow from 'flow';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { BasicButton } from 'ui';

export type QuestionOptions = {
  key: Answers;
  label: String;
};

export interface QuestionContent {
  title: string;
  description: string | null;
  options: ReadonlyArray<QuestionOptions>;
}

const questions: Record<Questions, QuestionContent> = {
  welcome: {
    title: 'Welcome',
    description: '',
    options: [
      { key: 'no', label: 'Cancel' },
      { key: 'yes', label: 'Forward' },
    ],
  },
  question1: {
    title: 'first question',
    description: 'some random description',
    options: [
      {
        key: 'no',
        label: 'Nope',
      },
      {
        key: 'yes',
        label: 'Yup',
      },
    ],
  },
  question2: {
    title: 'second question',
    description: 'some random second description',
    options: [
      {
        key: 'no',
        label: 'Nope',
      },
      {
        key: 'yes',
        label: 'Yup',
      },
    ],
  },
  question3: {
    title: 'third question',
    description: 'some third description',
    options: [
      {
        key: 'no',
        label: 'Nope',
      },
      {
        key: 'yes',
        label: 'Yup',
      },
    ],
  },
  question4: {
    title: 'fourth question',
    description: 'some random fourth description',
    options: [
      {
        key: 'no',
        label: 'Nope',
      },
      {
        key: 'yes',
        label: 'Yup',
      },
    ],
  },
  question5: {
    title: 'fifth question',
    description: 'some random fifth description',
    options: [
      {
        key: 'no',
        label: 'Nope',
      },
      {
        key: 'yes',
        label: 'Yup',
      },
    ],
  },
  question6: {
    title: 'sixth question',
    description: 'some random description sixth',
    options: [
      {
        key: 'no',
        label: 'Nope',
      },
      {
        key: 'yes',
        label: 'Yup',
      },
    ],
  },
  warning: {
    title: 'warning question',
    description: 'some random warning',
    options: [
      {
        key: 'no',
        label: 'Nope',
      },
      {
        key: 'yes',
        label: 'Yup',
      },
    ],
  },
};

const Classification: NextPage = () => {
  const router = useRouter();
  const { next, previous } = ArcaneFlow<Questions, Answers>(
    classificationConfig
  );

  const onChangePage = (question: Questions, answer: Answers) => {
    const route = next(question, answer);
    router.push('classification/?page=' + route, undefined, {
      shallow: true,
    });
  };

  useEffect(() => {
    router.push('classification/?page=' + 'welcome', undefined, {
      shallow: true,
    });
  }, []);

  return (
    <div className="md:container px-6 md:px-0 md:h-screen md:w-full md:p-20 md:gap-10">
      {router.query.page && (
        <Question question={questions[router.query.page as Questions]} />
      )}
      <div className="flex flex-col md:gap-2 w-20">
        <BasicButton
          variant="secondary"
          size="medium"
          onClick={() => onChangePage(router.query.page as Questions, 'no')}
        >
          No
        </BasicButton>
        <BasicButton
          size="medium"
          onClick={() => onChangePage(router.query.page as Questions, 'yes')}
        >
          Yes
        </BasicButton>
      </div>
    </div>
  );
};

export default Classification;
