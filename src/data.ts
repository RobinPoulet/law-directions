import { Mapping } from "./classes/Mapping";
import { type Solution, type Question } from "./types";

// Déclarer une interface pour le type de mappingFunction
interface MappingFunctions {
  question: (data: string[]) => Question;
  solution: (data: string[]) => Solution;
}

const url = "../csv/read-csv.js";

async function fetchDataAndProcessCSV(url: string, type: keyof MappingFunctions) : Promise<any> {
  const mappingFunction: MappingFunctions = {
    question: Mapping.toQuestion,
    solution: Mapping.toSolution,
  };
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération du fichier CSV");
    }
    const csvContent = await response.text();
    const jsonData = JSON.parse(csvContent);
    const mappedDatas = jsonData.slice(1).map(mappingFunction[type]);
    return mappedDatas;
  } catch (error: any) {
    console.error("Erreur:", error.message );
  }
}

export const fetchSolutions = await fetchDataAndProcessCSV(
  `${url}?path=solution`,
  "solution"
);

export const fetchQuestions = await fetchDataAndProcessCSV(
  `${url}?path=question`,
  "question"
);


