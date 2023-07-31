export interface Solution {
    title: string;
    type: string;
    descriptif: string;
    prolongementInfo: string;
    avertissements: string;
    contact: string;
    links: Array<Link>;
    criterias: Array<Criteria>;
}
  
interface Criteria {
    data: Array<string>;
    ref: string;
}
  
interface Link {
    name: string;
    url: string;
}
  
export interface Path {
    ref: string;
    answer: string;
    question: string;
}

export interface Question {
    question: string;
    ref: string;
    enjeux: Array<string>;
    answer: Array<Answer>;
}

interface Answer {
    text: string;
    next: number;
  }