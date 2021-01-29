export function shuffle(array) {
  let currentIndex = array.length
  let temporaryValue
  let randomIndex

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

export const randomize = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const calculatePercentage = (arr) => {
  const len = arr.length
  return (len / len ** 2) * 100
}

export const createAllPairs = (arr) =>
  arr.map((x, i) => arr.slice(i + 1).map((y) => [x, y])).flat()
