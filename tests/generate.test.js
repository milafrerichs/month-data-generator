import generateData from '../src/index.js'

const monthData = [
  { min: 1, max: 6, name: "January" },
  { min: 1, max: 6, name: "February" },
  { min: 1, max: 6, name: "March" },
  { min: 1, max: 6, name: "April" },
  { min: 1, max: 6, name: "May" },
  { min: 1, max: 6, name: "June" },
  { min: 1, max: 6, name: "July" },
  { min: 1, max: 6, name: "August" },
  { min: 1, max: 6, name: "September" },
  { min: 1, max: 6, name: "October" },
  { min: 1, max: 6, name: "November" },
  { min: 1, max: 6, name: "December" },
];
describe('#generateData', () => {
  it('returns the amount of data specified', () => {
    let amount = 1;
    let options = {
      names: ['A', 'B', 'C'],
      amount
    }
    let data = generateData(options);

    expect(data.length).toEqual(amount*options.names.length)
  })
  it('returns data for every month', () => {
    let amount = 1;
    let options = {
      names: ['A', 'B', 'C'],
      amount
    }
    let data = generateData(options);
    let [result,] = data;

    expect(result.month).toEqual("B")
    expect(result.name).toEqual("A")
  })
  it('returns data between min and max', () => {
    let amount = 1;
    let options = {
      names: ['A', 'B', 'C'],
      amount,
      minMaxData: monthData,
    }
    let data = generateData(options);
    let [result,] = data;

    expect(data.length).toEqual(36)
    expect(result.month).toEqual("January")
    expect(result.name).toEqual("A")
    expect(result.d).toBeGreaterThanOrEqual(1)
    expect(result.d).toBeLessThanOrEqual(6)
  })

  it.each([
    {min: 1, mx: 4},
    {min: 2, mx: 5},
    {min: 5, mx: 24},
    {min: 5, mx: 8},
    {min: 10, mx: 19},
  ])('for a given month there is only one max $min $mx', ({min, mx}) => {
    let amount = 1;
    let options = {
      names: ['A', 'B', 'C'],
      amount,
      minMaxData: [{min, max: mx, name: "B"}],
    }
    let data = generateData(options);

    let values = data.map((d) => d.d)
    let max = Math.max(...values)

    let result = data.filter((d) => d.d === max)

    expect(result.length).toEqual(1)
  })
  it.each([
    {min: 1, mx: 4},
    {min: 2, mx: 5},
    {min: 5, mx: 24},
    {min: 5, mx: 8},
    {min: 10, mx: 19},
  ])('for a given month there is only one min min: $min max: $mx', ({min, mx}) => {
    let amount = 1;
    let options = {
      names: ['A', 'B', 'C'],
      amount,
      minMaxData: [{min, max: mx, name: "B"}],
    }
    let data = generateData(options);

    let values = data.map((d) => d.d)
    let max = Math.min(...values)

    let result = data.filter((d) => d.d === max)

    expect(result.length).toEqual(1)
  })
})
