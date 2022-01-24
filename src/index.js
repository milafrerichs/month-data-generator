
export const monthNames = [ "January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December" ];

function generateMinMaxData(min, max) {
  return Array.from({ length: max - min + 1   }, (_, i) => i+min)
}

function randomFromArray(arr) {
  let randomIndex = Math.random() * arr.length | 0;
  return arr[randomIndex];
}

export default function generateData(config = {}) {
  const { amount = 1, names = ['A'], minMaxData = [{min: 1, max: 2, name: "B"}] } = config;
  let result = [];
  for(let i=0;i<amount;i++) {
    names.forEach((name) => {
      minMaxData.forEach((data) => {
        result.push({month: data.name, name, d: 1})
      })
    })
  }
  return result;

}
