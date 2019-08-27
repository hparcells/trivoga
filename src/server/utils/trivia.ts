import fetch from 'node-fetch';

import { GameOptions } from '../../shared/types';

interface QuestionData {
  question: string,
  answer: string,
  incorrectAnswers: string[]
}
interface ResponseData {
  category: string,
  correct_answer: string,
  difficulty: 'easy' | 'medium' | 'hard',
  incorrect_answers: string[],
  question: string,
  type: 'multiple' | 'boolean'
}

export async function getSessionToken() {
  const response = await fetch('https://opentdb.com/api_token.php?command=request').then((r: any) => {
    return r.json();
  });

  return response.token;
}
export function getApiUrl(gameOptions: GameOptions, sessionToken: string) {
  let url = 'https://opentdb.com/api.php?amount=1';

  if(gameOptions.category !== 'any') {
    url = url + `&category=${gameOptions.category}`;
  }
  if(gameOptions.difficulty !== 'any') {
    url = url + `&difficulty=${gameOptions.difficulty}`;
  }
  if(gameOptions.type !== 'any') {
    url = url + `&type=${gameOptions.type}`;
  }
  url = url + `&token=${sessionToken}`;

  return url;
}
export async function getQuestionData(apiUrl: string): Promise<QuestionData> {
  const response = await fetch(apiUrl).then((r: any) => {
    return r.json();
  });
  const responseResults: ResponseData = response.results[0];

  return {
    question: responseResults.question,
    answer: responseResults.correct_answer,
    incorrectAnswers: responseResults.incorrect_answers
  };
}
