import { locateIndex } from "./locateIndex";
export const prepareChartData = (houses: any, planets: any) => {
  let houseChart = houses.map((h: any) => {
    return {
      houseId: h.house_id,
      houseSignName: h.sign_name,
      houseSignLord: h.sign_lord,
      houseNakshathraName: h.nakshatra_name,
      dhasaLord: h.nakshatra_lord,
      bukthiLord: h.sub_lord,
      antharaLord: h.sub_sub_lord,
      sukLord: h.sub_sub_sub_lord,
      degree: h.full_degree,
      houseNo: h.house,
      houseLord: h.house_lord,
    };
  });
  let planetChart = planets
    .filter(
      (p: any) =>
        !(
          p.planet_name.startsWith("Ur") ||
          p.planet_name.startsWith("Pl") ||
          p.planet_name.startsWith("Ne")
        )
    )
    .map((p: any) => {
      return {
        degree: p.full_degree,
        planet: p.planet_name,
        planetSignName: p.sign_name,
        planetSignLord: p.sign_lord,
        planetNakName: p.nakshatra_name,
        planetNakLord: p.nakshatra_lord,
        planetSubLord: p.sub_lord,
        planetSubSubLord: p.sub_sub_lord,
        planetSubSubSubLord: p.sub_sub_sub_lord,
      };
    });
  planetChart = planetChart.sort((a: any, b: any) => a.degree - b.degree);
  let chart = houseChart.sort((a: any, b: any) => a.houseId - b.houseId);
  for (let pIdx = 0; pIdx < planetChart.length; pIdx++) {
    let located = locateIndex(chart, planetChart[pIdx].degree);
    chart.splice(located, 0, planetChart[pIdx]);
  }
  return chart;
};
