import { type Solution, type Question } from "../types";

export class Mapping {
  static toSolution(data: Array<string>): Solution {
    const [
      title,
      type,
      descriptif,
      prolongementInfo,
      avertissements,
      contact,
      linksString,
      pourQui,
      infoConseil,
      accessInfo,
      niveauInfo,
      accessConseil,
      niveauConseil,
      cout,
    ] = data;

    const linksArray = linksString
      ? linksString.split(";").map((link) => {
          const [name, url] = link.split("|");
          return { name: name.trim(), url: url.trim() };
        })
      : [];

    const criteriaArray = [
      { data: pourQui ? pourQui.split(";") : [], ref: "data_pour_qui" },
      { data: infoConseil ? infoConseil.split(";") : [], ref: "data_info_ou_conseil" },
      { data: accessInfo ? accessInfo.split(";") : [], ref: "data_access_info" },
      { data: niveauInfo ? niveauInfo.split(";") : [], ref: "data_niveau_info" },
      { data: accessConseil ? accessConseil.split(";") : [], ref: "data_access_conseil" },
      { data: niveauConseil ? niveauConseil.split(";") : [], ref: "data_niveau_conseil" },
      { data: cout ? cout.split(";") : [], ref: "data_cout" },
    ].filter((criteria) => criteria.data.length);

    return {
      title,
      type,
      descriptif,
      prolongementInfo,
      avertissements,
      contact,
      links: linksArray,
      criterias: criteriaArray,
    };
  }

  static toQuestion(data: Array<string>): Question {
    const [question, ref, enjeux, answers] = data;
    const enjeuxArray = enjeux.split(";");

    const answersArray = answers.split(";").map((answer) => {
      const [textArr, nextArr] = answer.split(",");
      const text = textArr.split(":")[1].trim();
      const next = +nextArr.split(":")[1].trim() || -1;
      return { text, next };
    });

    return {
      question,
      ref,
      enjeux: enjeuxArray,
      answer: answersArray,
    };
  }
}
