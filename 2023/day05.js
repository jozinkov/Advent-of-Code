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
    rules.forEach(rule => {
      if (range[0] >= rule[1][0] && range[0] <= rule[1][1]) {
        if (range[1] <= rule[1][1]) {
          return [
            rule[0][0] + (range[0] - rule[1][0]),
            rule[0][1] - (rule[1][1] - range[1]),
          ];
        } else {
          return [
            [rule[0][0] + (range[0] - rule[1][0]), rule[0][1]],
            mapRanges([rule[0][1] + 1, range[1]], rules),
          ];
        }
      } else if (range[1] >= rule[1][0] && range[1] <= rule[1][1]) {
        return [
          [rule[0][0] + (range[0] - rule[1][0]), rule[0][1]],
          mapRanges([range[0], range[1] - (range[1] - rule[1][0])], rules),
        ];
      }
    });
  };

  let seedRanges = [];
  for (let i = 0; i < seeds.length; i += 2)
    seedRanges.push([seeds[i], seeds[i] + seeds[i + 1] - 1]);

  seedRanges.forEach(range => {
    mapRanges(range, seedSoil);

    if (!res2 || result < res2) res2 = result;
  });
};
export { getResults, res1, res2 };
