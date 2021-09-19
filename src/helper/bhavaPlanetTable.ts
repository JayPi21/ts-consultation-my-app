const populatePrimaryPlanets = function (bhavaTable: any, bhavas: any) {
  let PParray: any = [];
  let PPobjTemp: any = {};
  bhavas.forEach((iterator: any) => {
    if (iterator.houseId) {
      PParray.push(PPobjTemp);
      PPobjTemp = {};
      PPobjTemp[iterator.bukthiLord] = true;
      PPobjTemp[iterator.dhasaLord] = true;
      PPobjTemp[iterator.antharaLord] = true;
    }
  });
  PParray.shift();
  PParray.push(PPobjTemp);
  PParray.forEach((iterator: any, index: number) => {
    bhavaTable[index + 1] = { primaryPL: iterator };
  });
};

const populateLocatedPL = function (bhavaTable: any, bhavas: any) {
  let locTemp: any = [];
  let locatedPLarr: any = [];
  bhavas.map((iterator: any) => {
    if (iterator.houseId) {
      locatedPLarr.push(locTemp);
      locTemp = [];
    } else {
      locTemp.push(iterator.planet);
    }
  });
  locatedPLarr.push(locTemp);
  locatedPLarr.shift();

  locatedPLarr.map((iterator: any, index: number) => {
    bhavaTable[index + 1]["locatedPL"] = iterator;
  });
};

const calculationPrimaryPlanets = function (bhavaTable: any) {
  let calcPPobj: any = {};
  let calcPParr: any = [];
  let index = 1;
  for (let bhava in bhavaTable) {
    calcPPobj = { ...bhavaTable[bhava]["primaryPL"] };

    bhavaTable[bhava]["locatedPL"].forEach((pt: any) => {
      calcPPobj[pt] = true;
    });

    calcPParr.push(calcPPobj);
  }
  return calcPParr;
};

const populateConnectedPL = function (
  bhavaTable: any,
  calcPrimaryPlanets: any,
  bhavas: any
) {
  const bhavaPlanetsOnly = bhavas.filter((b: any) => b.planet != undefined);
  let planetList: any = [];
  calcPrimaryPlanets.forEach((PrimaryPlanet: any) => {
    let planetListTemp = bhavaPlanetsOnly
      .map((bhavaPlanet: any) => {
        return PrimaryPlanet[bhavaPlanet.planet] == true ||
          PrimaryPlanet[bhavaPlanet.planetNakLord] == true ||
          PrimaryPlanet[bhavaPlanet.planetSubLord] == true ||
          (bhavaPlanet.planetNakLord == bhavaPlanet.planetSubLord &&
            PrimaryPlanet[bhavaPlanet.planetSubSubLord] == true)
          ? bhavaPlanet.planet
          : "";
      })
      .filter((x: any) => x != "");
    planetList.push(planetListTemp);
  });
  planetList.forEach((element: any, index: number) => {
    bhavaTable[index + 1]["connectedPL"] = element;
    bhavaTable[index + 1]["connectedPLCount"] = element.length;
  });
};

const populateSSLlist = function (
  bhavaTable: any,
  calcPrimaryPlanets: any,
  bhavas: any
) {
  const bhavaPlanetsOnly = bhavas.filter((b: any) => b.planet != undefined);
  let SSLlist: any = [];
  calcPrimaryPlanets.forEach((PrimaryPlanet: any) => {
    let SSLtemp: any = [];
    bhavaPlanetsOnly.forEach((bhavaPlanet: any) => {
      if (
        PrimaryPlanet[bhavaPlanet.planet] != true &&
        PrimaryPlanet[bhavaPlanet.planetNakLord] != true &&
        PrimaryPlanet[bhavaPlanet.planetSubLord] != true &&
        bhavaPlanet.planetNakLord != bhavaPlanet.planetSubLord &&
        PrimaryPlanet[bhavaPlanet.planetSubSubLord] == true
      )
        SSLtemp.push(bhavaPlanet.planet);
    });
    SSLlist.push(SSLtemp);
  });
  SSLlist.forEach((element: any, index: number) => {
    bhavaTable[index + 1]["SSLlist"] = element;
  });
};

const populateDefaultValue = function (bhavaTable: any, bhavas: any) {
  const LHS = bhavas.filter((b: any) => b.houseId);

  let BHL = [];
  BHL[0] = LHS[0]["bukthiLord"];
  for (let i = 2; i <= 12; i++) {
    if (bhavaTable[i]["connectedPL"].includes(BHL[0])) BHL[i - 1] = BHL[0];
    else BHL[i - 1] = LHS[i - 1]["bukthiLord"];
  }
  BHL.forEach((iterator, index) => {
    bhavaTable[index + 1]["defaultValue"] = iterator;
  });
};

const populateSublord = function (bhavaTable: any, bhavas: any) {
  const LHS = bhavas.filter((p: any) => p.houseId);

  LHS.forEach((bhava: any) => {
    if (bhava.bukthiLord != bhava.dhasaLord)
      bhavaTable[bhava.houseId]["subLord"] = bhava.bukthiLord;
    else bhavaTable[bhava.houseId]["subLord"] = bhava.antharaLord;
  });
};

const populatePrimaryBhava = function (
  planetTable: any,
  bhavas: any,
  planetList: string[]
) {
  let bhavaTable = {};
  populatePrimaryPlanets(bhavaTable, bhavas);
  populateLocatedPL(bhavaTable, bhavas);
  const calcPrimPlan: any = calculationPrimaryPlanets(bhavaTable);
  populateConnectedPL(bhavaTable, calcPrimPlan, bhavas);
  let primBhTemp: any = [];
  let primBhArray: any = [];
  planetList.forEach((planet: any) => {
    primBhArray.push(primBhTemp);
    primBhTemp = [];

    calcPrimPlan.forEach((item: any, i: number) => {
      if (calcPrimPlan[i][planet]) primBhTemp.push(i + 1);
    });
  });
  primBhArray.push(primBhTemp);
  primBhArray.shift();
  planetList.forEach((planet: any, index: number) => {
    planetTable[planet] = { primaryBhava: primBhArray[index] };
  });
};

const populateLocatedBhava = function (
  planetTable: any,
  bhavas: any,
  planetList: string[]
) {
  let locBhTemp: any = [];
  let locatedBh: any = [];
  let bhavaTable: any = {};
  populatePrimaryPlanets(bhavaTable, bhavas);
  populateLocatedPL(bhavaTable, bhavas);
  const calcPrimPlan = calculationPrimaryPlanets(bhavaTable);

  planetList.forEach((planet) => {
    locatedBh.push(locBhTemp);
    locBhTemp = [];
    calcPrimPlan.forEach((item: any, i: number) => {
      if (bhavaTable[i + 1]["locatedPL"].includes(planet))
        locBhTemp.push(i + 1);
    });
  });
  locatedBh.push(locBhTemp);
  locatedBh.shift();
  planetList.forEach((planet, index) => {
    planetTable[planet]["locatedBhava"] = locatedBh[index];
  });
};

const populateConnectedBhava = function (
  planetTable: any,
  bhavas: any,
  planetList: string[]
) {
  let bhavaTable: any = {};
  populatePrimaryPlanets(bhavaTable, bhavas);
  populateLocatedPL(bhavaTable, bhavas);
  const calcPrimPlan = calculationPrimaryPlanets(bhavaTable);
  populateConnectedPL(bhavaTable, calcPrimPlan, bhavas);
  let connectedBhavaTemp: any = [];
  let connectedBhavas: any = [];

  planetList.forEach((planet) => {
    connectedBhavas.push(connectedBhavaTemp);

    connectedBhavaTemp = [];

    calcPrimPlan.forEach((item: any, i: number) => {
      if (bhavaTable[i + 1]["connectedPL"].includes(planet))
        connectedBhavaTemp.push(i + 1);
    });
  });
  connectedBhavas.push(connectedBhavaTemp);
  connectedBhavas.shift();
  planetList.forEach((planet, index) => {
    connectedBhavas[index] = connectedBhavas[index].filter((cb: any) => {
      return (
        !planetTable[planet]["locatedBhava"].includes(cb) &&
        !planetTable[planet]["primaryBhava"].includes(cb)
      );
    });
    planetTable[planet]["connectedBhava"] = connectedBhavas[index];
  });
};

const populateSublordBh = function (planetTable: any, bhavas: any) {
  const LHS = bhavas.filter((bh: any) => bh.houseId);
  for (let planet in planetTable) {
    planetTable[planet]["sublordBh"] = [];
  }
  LHS.forEach((bhava: any) => {
    if (bhava.bukthiLord != bhava.dhasaLord)
      planetTable[bhava.bukthiLord]["sublordBh"].push(bhava.houseId);
    else planetTable[bhava.antharaLord]["sublordBh"].push(bhava.houseId);
  });
};

export const getPlanetTable = (bhavas: any) => {
  if (bhavas.length > 0) {
    const planetList = [
      "Sun",
      "Moon",
      "Mars",
      "Rahu",
      "Jupiter",
      "Saturn",
      "Mercury",
      "Ketu",
      "Venus",
    ];

    let planetTable: any = {};
    populatePrimaryBhava(planetTable, bhavas, planetList);
    populateLocatedBhava(planetTable, bhavas, planetList);
    populateConnectedBhava(planetTable, bhavas, planetList);
    populateSublordBh(planetTable, bhavas);
    let PlanetTableArray = [];
    for (const planet in planetTable) {
      PlanetTableArray.push({
        planetName: planet,
        primBh: planetTable[planet]["primaryBhava"],
        locBh: planetTable[planet]["locatedBhava"],
        connectBh: planetTable[planet]["connectedBhava"],
        sublordBh: planetTable[planet]["sublordBh"],
      });
    }

    return PlanetTableArray;
  }
};

export const getBhavaTable = function (bhavas: any) {
  if (bhavas.length > 0) {
    let bhavaTable: any = {};
    populatePrimaryPlanets(bhavaTable, bhavas);
    populateLocatedPL(bhavaTable, bhavas);
    const calcPrimPlan = calculationPrimaryPlanets(bhavaTable);
    populateConnectedPL(bhavaTable, calcPrimPlan, bhavas);
    populateSSLlist(bhavaTable, calcPrimPlan, bhavas);
    populateDefaultValue(bhavaTable, bhavas);
    populateSublord(bhavaTable, bhavas);
    const ppList = [];
    for (let bhava in bhavaTable) {
      ppList.push({
        houseId: bhava,
        count: bhavaTable[bhava]["connectedPLCount"],
        pp: Object.keys(bhavaTable[bhava]["primaryPL"]).map((p) =>
          p.substring(0, 2)
        ),
        subLord: bhavaTable[bhava]["subLord"].substring(0, 2),
        def: bhavaTable[bhava]["defaultValue"].substring(0, 2),
        loc: bhavaTable[bhava]["locatedPL"].map((p: string) =>
          p.substring(0, 2)
        ),
        pl: bhavaTable[bhava]["connectedPL"].map((p: string) =>
          p.substring(0, 2)
        ),
        SSLlist: bhavaTable[bhava]["SSLlist"].map((p: string) =>
          p.substring(0, 2)
        ),
      });
    }

    return ppList;
  }
};
