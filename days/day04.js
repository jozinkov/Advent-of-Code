let res1 = 0;
let res2 = 0;

const getResults = function (fileData) {
  const dataset = fileData.split('\n\n').map(d => {
    const data = d.replaceAll('\n', ' ').trim().split(' ');
    return new Map(data.map(a => a.split(':')));
  });

  dataset.forEach(function (r) {
    if (
      ['byr', 'ecl', 'eyr', 'hcl', 'hgt', 'iyr', 'pid'].every(k =>
        [...r.keys()].includes(k)
      )
    ) {
      res1++;
      /////////// VALIDATION
      // byr (Birth Year) - four digits; at least 1920 and at most 2002.
      // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
      // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
      // hgt (Height) - a number followed by either cm or in:
      // If cm, the number must be at least 150 and at most 193.
      // If in, the number must be at least 59 and at most 76.
      // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
      // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
      // pid (Passport ID) - a nine-digit number, including leading zeroes.
      // cid (Country ID) - ignored, missing or not.

      const byr = r.get('byr');
      const iyr = r.get('iyr');
      const eyr = r.get('eyr');
      const hgt = r.get('hgt');
      const hcl = r.get('hcl');
      const ecl = r.get('ecl');
      const pid = r.get('pid');

      const hgtValue = Number(hgt.slice(0, -2));

      if (
        [byr, iyr, eyr].every(y => /^\d{4}$/.test(y) === true) &&
        +byr >= 1920 &&
        +byr <= 2002 &&
        +iyr >= 2010 &&
        +iyr <= 2020 &&
        +eyr >= 2020 &&
        +eyr <= 2030 &&
        /^\d*(cm|in)$/.test(hgt) &&
        ((hgt.slice(-2) === 'cm' && hgtValue >= 150 && hgtValue <= 193) ||
          (hgt.slice(-2) === 'in' && hgtValue >= 59 && hgtValue <= 76)) &&
        /^#[0-9a-f]{6}$/.test(hcl) &&
        ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].some(
          s => s === ecl
        ) &&
        /^\d{9}$/.test(pid)
      )
        res2++;
    }
  });
};
export { getResults, res1, res2 };
