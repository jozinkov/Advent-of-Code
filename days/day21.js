let res1 = 0;
let res2 = 'see below';

const getResults = function (fileData) {
  const dataset = fileData.split('\n').filter(l => l !== '');

  // ingredients for each food
  const ingredients = dataset.map(d => d.split(' (contains ')[0].split(' '));
  // listed allergens for each food
  const allergens = dataset.map(d => {
    const str = d.split(' (contains ')[1].replace(')', '');
    if (str.includes(',')) return str.split(', ');
    else return [str];
  });

  // all allergen types
  const allergenTypes = new Set(allergens.flat());

  // ingredients with allergen
  let allergenIngredients = [];
  let allergenIngredientsMap = new Map();

  // find foods that contain the allergen
  allergenTypes.forEach(type => {
    const foodIndxs = [];
    allergens.forEach((a, i) => a.includes(type) && foodIndxs.push(i));
    let theIngredient = [
      ...new Set(
        foodIndxs.reduce((acc, i) => acc.concat(ingredients[i]), new Array())
      ),
    ];
    foodIndxs.forEach(
      i =>
        (theIngredient = theIngredient.filter(d => ingredients[i].includes(d)))
    );
    allergenIngredientsMap.set(type, theIngredient);
    allergenIngredients = allergenIngredients.concat(theIngredient);
  });

  allergenIngredients = [...new Set(allergenIngredients)];

  // COUNT all ingredients without allergens
  ingredients.forEach(d => {
    d.forEach(ing => {
      if (!allergenIngredients.includes(ing)) res1++;
    });
  });

  // assign allergen <-> ingredient
  let used = [];
  const assignAllergen = function () {
    const assigned = [...allergenIngredientsMap.entries()].filter(
      e => e[1].length === 1
    );
    assigned.forEach(v => {
      if (!used.includes(v[0])) {
        used.push(v[0]);
        allergenIngredientsMap.set(v[0], v[1]);
        allergenIngredientsMap.forEach((ingrdnts, allrgn) => {
          if (allrgn !== v[0] && ingrdnts.includes(v[1][0])) {
            ingrdnts.splice(ingrdnts.indexOf(v[1][0]), 1);
            allergenIngredientsMap.set(allrgn, ingrdnts);
            if (used.length === allergenIngredients.length) return;
            else assignAllergen();
          } else return;
        });
      }
    });
  };
  assignAllergen();

  // display canonical dangerous ingredient list
  let list = '';
  [...allergenTypes]
    .sort()
    .forEach(e => (list += ',' + allergenIngredientsMap.get(e)));
  console.log(list.slice(1));
};
export { getResults, res1, res2 };
