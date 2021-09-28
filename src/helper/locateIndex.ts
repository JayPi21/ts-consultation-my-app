export const locateIndex = (chart: any, planetDegree: any) => {
  let located = chart.length;
  for (let idx = 0; idx < chart.length - 1; idx++) {
    let currentDegree = chart[idx].degree;
    let nextDegree = chart[idx + 1].degree;
    if (currentDegree <= nextDegree) {
      if (currentDegree <= planetDegree && planetDegree <= nextDegree) {
        located = idx;
      }
    } else {
      if (currentDegree <= planetDegree && planetDegree > nextDegree) {
        located = idx;
      } else if (planetDegree <= nextDegree) {
        located = idx;
      }
    }
  }
  return located + 1;
};
