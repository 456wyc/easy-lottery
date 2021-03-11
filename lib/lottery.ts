function lotteryMachine(
    prizes, {
        prob = 'probability',
        precision = 100,
        defaultVal
    }
) {
    const prizeSet = []
    const max = precision * 100
    let cursor = 0
    for (const p of prizes) {
        const probability = (p[prob] || 0) * precision
        prizeSet.push({
            prize: p,
            range: [cursor, cursor + probability - 1],
        })
        cursor = cursor + probability
    }
    if (cursor < max - 1) {
        prizeSet.push({
            prize: defaultVal || null,
            range: [cursor, max - 1],
        })
    }
    return {
        draw: () => {
            const nonce = Math.floor(Math.random() * max)
            const prize = prizeSet.find((item) => {
                return nonce >= item['range'][0] && nonce <= item['range'][1]
            })
            console.log('抽奖:', {
                prizeSet: JSON.stringify(prizeSet),
                nonce,
                prize,
            })
            return prize['prize']
        },
    }
}

export {
    lotteryMachine
}

/* const machine = lotteryMachine(
  [
    { id: 1, pr: 0.01 },
    { id: 2, pr: 0.02 },
    { id: 3, pr: 0.03 },
    { id: 4, pr: 0.4 },
    { id: 5, pr: 0.5 },
  ],
  'pr'
)
const rsCount = {
  '1': 0,
  '2': 0,
  '3': 0,
  '4': 0,
  '5': 0,
  '999': 0,
}
for (let i = 0; i < 100000; i++) {
  console.log('i', i)
  const p = machine.draw()
  if (p) {
    rsCount[p['id']] += 1
  } else {
    rsCount['999'] += 1
  }
}
console.log(rsCount)
// out:
// {
//   '1': 1077,
//   '2': 1987,
//   '3': 2943,
//   '4': 40024,
//   '5': 50006,
//   '999': 3963
// }
*/