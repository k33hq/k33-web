import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { flow, pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import { useGetFundRegistrationQuery } from '@/services';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

interface SurveyQueryPageOptions<T extends string> {
  page: string;
  initialQuestion: T;
}

export const useSurveyQueryPage = <T extends string>({
  page,
  initialQuestion,
}: SurveyQueryPageOptions<T>) => {
  const router = useRouter();
  const url = `${page}/?page=`;
  useEffect(() => {
    router.push(url + initialQuestion, undefined, {
      shallow: true,
    });
  }, []);

  const changeRoute = (route: string) => {
    router.push(url + route, undefined, {
      shallow: true,
    });
  };

  return { page: router.query.page as T, changeRoute };
};

/**
 * Special utility type that assigne string literal type in generics
 */
export type StringLiteral<T> = T extends `${string & T}` ? T : never;

export type History<NodeName extends string, Answer> = {
  node: NodeName;
  answer: Answer;
};

type Logic<NodeName extends string, Answer> = (
  val: Answer,
  history: Array<History<NodeName, Answer>>
) => NodeName;

export type ArcaneFlowConfig<NodeName extends string, Answers> = {
  [P in NodeName]?: Logic<NodeName, Answers>;
};

export const useArcaneFlow = <NodeName extends string, Answer>(
  config: ArcaneFlowConfig<NodeName, Answer>
) => {
  const [history, setHistory] = useState<Array<History<NodeName, Answer>>>([]);

  const next = (node: NodeName, val: Answer) => {
    const dest = pipe(
      config[node],
      O.fromNullable,
      O.map((d) => d(val, history)),
      O.getOrElse(() => node)
    );

    if (dest !== node) {
      setHistory((history) => [...history, { node, answer: val }]);
    }
    return dest;
  };
  const previous = () => {
    const last = history.pop();
    const lastIndex = history.length - 1;
    if (lastIndex > 0) {
      setHistory((history) => history.filter((_, i) => i !== lastIndex));
    }
    return last;
  };

  return { next, previous };
};

export const useFundRedirection = () => {
  const router = useRouter();
  const { error, data, isLoading } = useGetFundRegistrationQuery(
    'k33-assets-i-fund-limited'
  );

  if (error && (error as FetchBaseQueryError).status === 404) {
    router.push('/');
  }

  return { data, isLoading };
};
