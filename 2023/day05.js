let res1 = 0;
let res2 = undefined;

const getResults = function (fileData) {
  let [
    seeds,
    seedSoil,
    soilFert,
    fertWater,
    waterLight,
    lightTemp,
    tempHumidity,
    humidityLoc,
  ] = fileData
    .split('\n\n')
    .filter(d => d !== '')
    .map((d, i) =>
      i === 0
        ? d
            .replace('seeds: ', '')
            .split(' ')
            .map(n => +n)
        : d
            .split('\n')
            .slice(1)
            .map(r => r.split(' ').map(n => +n))
    );

  let seedTOsoil = new Map();
  let soilTOfert = new Map();
  let fertTOwater = new Map();
  let waterTOlight = new Map();
  let lightTOtemp = new Map();
  let tempTOhumidity = new Map();
  let humidityTOloc = new Map();

  const mapValues = function (arr, rules, mapTO) {
    arr.forEach(s => {
      rules.forEach(rule => {
        if (s >= rule[1] && s <= rule[1] + rule[2] - 1)
          mapTO.set(s, rule[0] + (s - rule[1]));
      });
      if (!mapTO.get(s)) mapTO.set(s, s);
    });
  };

  const lowestLocation = function (seedsArr) {
    mapValues(seedsArr, seedSoil, seedTOsoil);
    mapValues([...seedTOsoil.values()], soilFert, soilTOfert);
    mapValues([...soilTOfert.values()], fertWater, fertTOwater);
    mapValues([...fertTOwater.values()], waterLight, waterTOlight);
    mapValues([...waterTOlight.values()], lightTemp, lightTOtemp);
    mapValues([...lightTOtemp.values()], tempHumidity, tempTOhumidity);
    mapValues([...tempTOhumidity.values()], humidityLoc, humidityTOloc);
    return Math.min(...humidityTOloc.values());
  };
  res1 = lowestLocation(seeds);

  ////////////////////////////////////////

  const findRanges = d => [
    [d[0], d[0] + d[2] - 1],
    [d[1], d[1] + d[2] - 1],
  ];

  seedSoil = seedSoil.map(r => findRanges(r));
  soilFert = soilFert.map(r => findRanges(r));
  fertWater = fertWater.map(r => findRanges(r));
  waterLight = waterLight.map(r => findRanges(r));
  lightTemp = lightTemp.map(r => findRanges(r));
  tempHumidity = tempHumidity.map(r => findRanges(r));
  humidityLoc = humidityLoc.map(r => findRanges(r));

  const mapRanges = function (range, rules) {
    let destRanges = [];
    let range2 = [];
    const rangeMIN = range[0];
    const rangeMAX = range[1];
    const mapRan = function () {
      rules.forEach(rule => {
        const sourceMIN = rule[1][0];
        const sourceMAX = rule[1][1];
        const destMIN = rule[0][0];
        const destMAX = rule[0][1];
        // all seeds within
        if (rangeMIN >= sourceMIN && rangeMAX <= sourceMAX) {
          destRanges.push([
            destMIN + (rangeMIN - sourceMIN),
            destMAX - (sourceMAX - rangeMAX),
          ]);
          range = [];
          return;
        }
        // seed range exceeds the rule
        if (rangeMIN < sourceMIN && rangeMAX > sourceMAX) {
          destRanges.push([destMIN, destMAX]);
          range2.push([sourceMAX + 1, rangeMAX]);
          range = [rangeMIN, sourceMIN - 1];
        }
        // partially - beggining
        if (
          rangeMIN >= sourceMIN &&
          rangeMIN <= sourceMAX &&
          rangeMAX > sourceMAX
        ) {
          destRanges.push([destMIN + (rangeMIN - sourceMIN), destMAX]);
          range = [rangeMAX - (rangeMAX - sourceMAX) + 1, rangeMAX];
        }
        // partially - ending
        if (
          rangeMIN < sourceMIN &&
          rangeMAX >= sourceMIN &&
          rangeMAX <= sourceMAX
        ) {
          destRanges.push([destMIN, destMIN + (rangeMAX - sourceMIN)]);
          range = [rangeMIN, rangeMAX - (rangeMAX - sourceMIN) - 1];
        }
      });
    };
    mapRan();
    if (range.length !== 0) {
      mapRan();
      if (range.length !== 0) destRanges.push(range);
    }
    if (range2.length !== 0) {
      range2.forEach(r => {
        range = r;
        mapRan();
        if (range.length !== 0) {
          mapRan();
          if (range.length !== 0) destRanges.push(range);
        }
      });
    }

    return destRanges;
  };

  let seedRanges = [];
  for (let i = 0; i < seeds.length; i += 2)
    seedRanges.push([seeds[i], seeds[i] + seeds[i + 1] - 1]);

  let ranges;
  let acc = [];
  const assign = () => {
    ranges = acc.flat();
    acc = [];
  };
  let result;
  seedRanges.forEach(range => {
    ranges = mapRanges(range, seedSoil);
    ranges.forEach(r => acc.push(mapRanges(r, soilFert)));
    assign();
    ranges.forEach(r => acc.push(mapRanges(r, fertWater)));
    assign();
    ranges.forEach(r => acc.push(mapRanges(r, waterLight)));
    assign();
    ranges.forEach(r => acc.push(mapRanges(r, lightTemp)));
    assign();
    ranges.forEach(r => acc.push(mapRanges(r, tempHumidity)));
    assign();
    ranges.forEach(r => acc.push(mapRanges(r, humidityLoc)));
    assign();
    result = Math.min(...ranges.flat(2));
    if (!res2 || (result < res2 && result !== 0)) res2 = result;
  });
};
export { getResults, res1, res2 };
