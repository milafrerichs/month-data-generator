
function generateMinMaxData(min, max) {
  return Array.from({ length: max - min + 1 }, (_, i) => i+min)
}

function randomFromArray(arr) {
  let randomIndex = Math.random() * arr.length | 0;
  return arr[randomIndex];
}

export default function generateData(config = {}) {
  const { amount = 1, names = ['A'], minMaxData = [{min: 1, max: 2, name: "B"}] } = config;
  let randomDataAmount = amount - (minMaxData.length*2);
  if(randomDataAmount < 1) { randomDataAmount = 1 };
  let result = [];
  let singleResultNames = {};
  minMaxData.forEach((data) => {
    let name = randomFromArray(names)
    const min  = randomFromArray(generateMinMaxData(data.min, data.min))
    result.push({month: data.name, name, d: min})
    singleResultNames[data.name] = [name]
    if(names.length > 1) {
      let minName = name;
      while(name === minName) {
        name = randomFromArray(names)
      }
    }
    const max = randomFromArray(generateMinMaxData(data.max, data.max))
    result.push({month: data.name, name, d: max})
    singleResultNames[data.name].push(name)
  })
  for(let i=0;i<randomDataAmount;i++) {
    for (const [i, name] of Object.entries(names)) {
      minMaxData.forEach((data) => {
        // for each month we need to check if the islands name already has a value and then generate
        if(randomDataAmount === 1 && singleResultNames[data.name].includes(name)) { } else {
          const min = data.min + 1;
          const max = data.max - 1;
          const d = randomFromArray(generateMinMaxData(min, max))
          result.push({month: data.name, name, d})
        }
      })
    }
  }
  return result;
}
