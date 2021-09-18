const populatePrimaryPlanets = function (bhavaTable, bhavas) {
  let PParray = [];
  let PPobjTemp = {};
  bhavas.forEach((iterator) => {
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
  PParray.forEach((iterator, index) => {
    bhavaTable[index + 1] = { primaryPL: iterator };
  });
};

const populateLocatedPL = function (bhavaTable, bhavas) {
  let locTemp = [];
  let locatedPLarr = [];
  bhavas.map((iterator) => {
    if (iterator.houseId) {
      locatedPLarr.push(locTemp);
      locTemp = [];
    } else {
      locTemp.push(iterator.planet);
    }
  });
  locatedPLarr.push(locTemp);
  locatedPLarr.shift();

  locatedPLarr.map((iterator, index) => {
    bhavaTable[index + 1]["locatedPL"] = iterator;
  });
};

const calculationPrimaryPlanets = function (bhavaTable) {
  let calcPPobj = {};
  let calcPParr = [];
  let index = 1;
  for (let bhava in bhavaTable) {
    calcPPobj = { ...bhavaTable[bhava]["primaryPL"] };

    bhavaTable[bhava]["locatedPL"].forEach((pt) => {
      calcPPobj[pt] = true;
    });

    calcPParr.push(calcPPobj);
  }
  return calcPParr;
};

const populateConnectedPL = function (bhavaTable, calcPrimaryPlanets, bhavas) {
  const bhavaPlanetsOnly = bhavas.filter((b) => b.planet != undefined);
  let planetList = [];
  calcPrimaryPlanets.forEach((PrimaryPlanet) => {
    let planetListTemp = bhavaPlanetsOnly
      .map((bhavaPlanet) => {
        return PrimaryPlanet[bhavaPlanet.planet] == true ||
          PrimaryPlanet[bhavaPlanet.planetNakLord] == true ||
          PrimaryPlanet[bhavaPlanet.planetSubLord] == true ||
          (bhavaPlanet.planetNakLord == bhavaPlanet.planetSubLord &&
            PrimaryPlanet[bhavaPlanet.planetSubSubLord] == true)
          ? bhavaPlanet.planet
          : "";
      })
      .filter((x) => x != "");
    planetList.push(planetListTemp);
  });
  planetList.forEach((element, index) => {
    bhavaTable[index + 1]["connectedPL"] = element;
    bhavaTable[index + 1]["connectedPLCount"] = element.length;
  });
};

const populateSSLlist = function (bhavaTable, calcPrimaryPlanets, bhavas) {
  const bhavaPlanetsOnly = bhavas.filter((b) => b.planet != undefined);
  let SSLlist = [];
  calcPrimaryPlanets.forEach((PrimaryPlanet) => {
    let SSLtemp = [];
    bhavaPlanetsOnly.forEach((bhavaPlanet) => {
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
  SSLlist.forEach((element, index) => {
    bhavaTable[index + 1]["SSLlist"] = element;
  });
};

const populateDefaultValue = function (bhavaTable, bhavas) {
  const LHS = bhavas.filter((b) => b.houseId);

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

const populateSublord = function (bhavaTable, bhavas) {
  const LHS = bhavas.filter((p) => p.houseId);

  LHS.forEach((bhava) => {
    if (bhava.bukthiLord != bhava.dhasaLord)
      bhavaTable[bhava.houseId]["subLord"] = bhava.bukthiLord;
    else bhavaTable[bhava.houseId]["subLord"] = bhava.antharaLord;
  });
};

const populatePrimaryBhava = function (planetTable, bhavas, planetList) {
  let bhavaTable = {};
  populatePrimaryPlanets(bhavaTable, bhavas);
  populateLocatedPL(bhavaTable, bhavas);
  const calcPrimPlan = calculationPrimaryPlanets(bhavaTable);
  populateConnectedPL(bhavaTable, calcPrimPlan, bhavas);
  let primBhTemp = [];
  let primBhArray = [];
  planetList.forEach((planet) => {
    primBhArray.push(primBhTemp);
    primBhTemp = [];

    calcPrimPlan.forEach((item, i) => {
      if (calcPrimPlan[i][planet]) primBhTemp.push(i + 1);
    });
  });
  primBhArray.push(primBhTemp);
  primBhArray.shift();
  planetList.forEach((planet, index) => {
    planetTable[planet] = { primaryBhava: primBhArray[index] };
  });
};

const populateLocatedBhava = function (planetTable, bhavas, planetList) {
  let locBhTemp = [];
  let locatedBh = [];
  let bhavaTable = {};
  populatePrimaryPlanets(bhavaTable, bhavas);
  populateLocatedPL(bhavaTable, bhavas);
  const calcPrimPlan = calculationPrimaryPlanets(bhavaTable);

  planetList.forEach((planet) => {
    locatedBh.push(locBhTemp);
    locBhTemp = [];
    calcPrimPlan.forEach((item, i) => {
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

const populateConnectedBhava = function (planetTable, bhavas, planetList) {
  let bhavaTable = {};
  populatePrimaryPlanets(bhavaTable, bhavas);
  populateLocatedPL(bhavaTable, bhavas);
  const calcPrimPlan = calculationPrimaryPlanets(bhavaTable);
  populateConnectedPL(bhavaTable, calcPrimPlan, bhavas);
  let connectedBhavaTemp = [];
  let connectedBhavas = [];

  planetList.forEach((planet) => {
    connectedBhavas.push(connectedBhavaTemp);

    connectedBhavaTemp = [];

    calcPrimPlan.forEach((item, i) => {
      if (bhavaTable[i + 1]["connectedPL"].includes(planet))
        connectedBhavaTemp.push(i + 1);
    });
  });
  connectedBhavas.push(connectedBhavaTemp);
  connectedBhavas.shift();
  planetList.forEach((planet, index) => {
    connectedBhavas[index] = connectedBhavas[index].filter((cb) => {
      return (
        !planetTable[planet]["locatedBhava"].includes(cb) &&
        !planetTable[planet]["primaryBhava"].includes(cb)
      );
    });
    planetTable[planet]["connectedBhava"] = connectedBhavas[index];
  });
};

const populateSublordBh = function (planetTable, bhavas) {
  const LHS = bhavas.filter((bh) => bh.houseId);
  for (let planet in planetTable) {
    planetTable[planet]["sublordBh"] = [];
  }
  LHS.forEach((bhava) => {
    if (bhava.bukthiLord != bhava.dhasaLord)
      planetTable[bhava.bukthiLord]["sublordBh"].push(bhava.houseId);
    else planetTable[bhava.antharaLord]["sublordBh"].push(bhava.houseId);
  });
};

export const getPlanetTable = (bhavas) => {
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

    let planetTable = {};
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

export const getBhavaTable = function (bhavas) {
  if (bhavas.length > 0) {
    let bhavaTable = {};
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
        loc: bhavaTable[bhava]["locatedPL"].map((p) => p.substring(0, 2)),
        pl: bhavaTable[bhava]["connectedPL"].map((p) => p.substring(0, 2)),
        SSLlist: bhavaTable[bhava]["SSLlist"].map((p) => p.substring(0, 2)),
      });
    }

    return ppList;
  }
};
