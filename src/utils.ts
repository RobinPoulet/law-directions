import { type Solution, type Path } from "./types";

export function filterSolutionsByUserPath(solutions: Array<Solution>, userPath: Array<Path>) : Array<Solution> {
  return solutions.filter((solution) =>
    userPath.every(
      (step) => {
        const criterias =  solution?.criterias.find((criteria) => criteria.ref === step.ref)
        return criterias 
        ? (
            criterias["data"].includes(step.answer) || 
            step.answer === "Je n'ai pas de préférences"
          ) 
        : false
      }
    )
  );
}
  
export function centerElementInView(elementId: string) {
  const retryDelay = 10;
  let retryCount = 0;

  /**
   * Fonction interne pour centrer l'élément dans la vue.
   */
  const tryCenterElement = () => {
    const element = document.getElementById(elementId);
    if (!element) {
      if (retryCount < 10) {
        retryCount++;
        setTimeout(tryCenterElement, retryDelay);
      } else {
        console.log("Element not found after 10 retries");
      }
      return;
    }
    element.scrollIntoView({ behavior: 'smooth' });
  };

  tryCenterElement();
}
  
export function isMobileDevice() {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  const screenWidth = window.innerWidth;
  const isSmallScreen = screenWidth < 769;

  return isMobile || isSmallScreen;
}