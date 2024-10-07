import { generateCombinationsWithoutRepetition } from "../day17/utils.ts";

export function decomposeToPrimeNumbers(
  num: number,
  knownPrimeNumbers = [1],
): number[] {
  if (num < 1) {
    throw new Error("Can decompose only numbers > 1");
  }
  if (num === 1) {
    return [];
  }
  if (knownPrimeNumbers.includes(num)) {
    return [num];
  }

  // case 1: num is 3
  // limit is 3**0.5 cca 1.73...
  const limit = num ** 0.5;
  // list of prime numbers except 1 is [2]
  const filteredKnownPrimeNumbers = knownPrimeNumbers.filter((n) => n <= limit);
  // list of prime numbers except 1 and bellow 1.7 is []
  if (filteredKnownPrimeNumbers.length === 0) {
    // there is no prime number to test
    // add number to list of known prime numbers
    knownPrimeNumbers.push(num);
    return [num];
  } else {
    for (const filteredKnownPrimeNumber of filteredKnownPrimeNumbers) {
      if (num % filteredKnownPrimeNumber === 0) {
        const result = num / filteredKnownPrimeNumber;
        return [
          filteredKnownPrimeNumber,
          ...decomposeToPrimeNumbers(result, knownPrimeNumbers),
        ].sort((a, b) => a - b);
      }
    }
    knownPrimeNumbers.push(num);
    return [num];
  }
  // check foundPrimeNumber of foundPrimeNumbers till foundPrimeNumber <= num**0.5
  // if none of foundPrimeNumbers (except 1) divides the number with remainder 0

  // case 1: num is 11
  // limit is 11**0.5 cca 3.31...
  // list of prime numbers except 1 is [2, 3, 5, 7]
  // list of prime numbers except 1 and bellow 3.31 is [2, 3]
  // test given prime numbers
  // 11 % 2 is 1, not 0, continue
  // 11 % 3 is 2, not 0, continue
  // there are no more numbers -> add 11 to list of prime numbers
  // return [1, 11] (1, new prime number)
}

// case3 : num is 11
// check if num is among mapped numbers
// if not

//    compute limit 11**0.5
//    filter prime numbers up to the limit
//    limit is cca 3.31... there are prime numbers bellow or equal to that limit ([2, 3])
//    test given prime numbers
//    11 % 2 is 1, not 0, continue
//    11 % 3 is 2, not 0, continue
//    there are no more numbers ->
//    save number 11 to the map ({isPrime: true, spread: [11]})

// case4 : num is 4
// check if num is among mapped numbers
// if not

//    compute limit 4**0.5
//    filter prime numbers up to the limit
//    limit is 2 there are prime numbers bellow or equal to that limit ([2])
//    test given prime numbers
//    4 % 2 is 0
//    4 / 2 is 2 ; call spreadToPrimeNumbers for 2 - save to RESULT
//    save number 4 to the map ({isPrime: false, spread: [...RESULT.spread, 2]})
//    return number 4 from the map

export type NumberInfo = {
  isPrime: boolean;
  spread: number[];
};

export type NumberInfoMap = Map<number, NumberInfo>;

export function spreadToPrimeNumbers(
  num: number,
  mappedNumbers: NumberInfoMap,
): number[] {
  // check if num is among mapped numbers?
  if (mappedNumbers.has(num)) {
    return mappedNumbers.get(num)!.spread;
  }
  // Case1 : num is 1
  if (num === 1) {
    // if not, set 1 to [1] in mapped numbers
    mappedNumbers.set(num, { isPrime: false, spread: [] });
    return mappedNumbers.get(num)!.spread;
  }

  // case2 : num is 5
  // check if num is among mapped numbers
  // if not
  //    compute limit 5**0.5
  const limit = num ** 0.5;
  //    filter prime numbers up to the limit
  const primeNumbersUpToTheLimit = [...mappedNumbers.entries()].filter((
    [n, info],
  ) => n <= limit && info.isPrime).map(([n]) => n);
  //    limit is cca 1.73... there are no prime numbers bellow or equal to that limit
  if (primeNumbersUpToTheLimit.length === 0) {
    //    save number 5 to the map ({isPrime: true, spread: [5]})
    mappedNumbers.set(num, { isPrime: true, spread: [num] });
    return mappedNumbers.get(num)!.spread;
  }
  for (const primeNumber of primeNumbersUpToTheLimit) {
    if (num % primeNumber === 0) {
      // process
      const result = num / primeNumber;
      const spread = [
        primeNumber,
        ...spreadToPrimeNumbers(result, mappedNumbers),
      ];
      mappedNumbers.set(num, {
        isPrime: false,
        spread,
      });
      return spread;
    }
  }
  // no primeNumber found, the num is prime
  mappedNumbers.set(num, { isPrime: true, spread: [num] });
  return mappedNumbers.get(num)!.spread;
}

export function uniq<T>(items: T[]): T[] {
  return items.reduce(function (
    acc: T[],
    item,
  ) {
    return acc.includes(item) ? acc : acc.concat(item);
  }, []);
}
/*

visited by elf with numbers | prime numbers decomposition
1                           |
1, 2                        | 2
1, 3                        | 3
1, 2, 4                     | 2, 2
1, 5                        | 5
1, 2, 3, 6                  | 2, 3
1, 7                        | 7
1, 2, 4, 8                  | 2, 2, 2
1, 3, 9                     | 3, 3
1, 2, 5, 10                 | 2, 5
1, 11                       | 11
1, 2, 3, 4, 6, 12           | 2, 2, 3
...
1, 2, 4, 8, 16              | 2, 2, 2, 2
 */

export function mapPrimeNumbersToElfNumbers(primeNumbers: number[]): number[] {
  const combinations = [...generateCombinationsWithoutRepetition(primeNumbers)];
  const result = [];
  for (const combination of combinations) {
    result.push(combination.reduce((acc, prime) => acc * prime, 1));
  }
  return uniq(result).sort((a, b) => a - b);
}

export function getTotalPresentsDelivered(
  visitedByElvesWithNumbers: number[],
): number {
  return visitedByElvesWithNumbers.reduce(function (acc, item) {
    return acc + item;
  }, 0) * 10;
}

export function getDivisors(n: number): number[] {
  const smallDivisors = [];
  for (let i = 1; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      smallDivisors.push(i);
    }
  }
  const largeDivisors = [];
  for (const smallDivisor of smallDivisors.concat([]).reverse()) {
    const largeDivisor = n / smallDivisor;
    if (largeDivisor !== smallDivisor) {
      largeDivisors.push(largeDivisor);
    }
  }
  return smallDivisors.concat(largeDivisors);
}

export function findNumberOfGiftsForHouseNumber(
  houseNumber: number,
): number {
  const divisors = getDivisors(houseNumber);
  return divisors.reduce((acc, divisor) => acc + divisor, 0) * 10;
}

// the last house of elf 1 is 50
// the last house of elf 2 is 100
// ...
// 3 ... 150

// i have house number and elf number

// will elf number X visit house number Y?
// for elf 2
// house number is bellow 2 * 50 ? I will come: I won't

// for elf 3
// house number is bellow 3 * 50 ? I will come: I won't

export function findNumberOfGiftsForHouseNumberForPuzzle2(
  houseNumber: number,
): number {
  const divisors = getDivisors(houseNumber);
  const filteredDivisors = divisors.filter((divisor) =>
    houseNumber <= divisor * 50
  );
  return filteredDivisors.reduce((acc, divisor) => acc + divisor, 0) * 11;
}
