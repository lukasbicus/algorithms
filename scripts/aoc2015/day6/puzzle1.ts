/**
 * --- Day 6: Probably a Fire Hazard ---
 * Because your neighbors keep defeating you in the holiday house decorating contest year after year, you've decided to deploy one million lights in a 1000x1000 grid.
 *
 * Furthermore, because you've been especially nice this year, Santa has mailed you instructions on how to display the ideal lighting configuration.
 *
 * Lights in your grid are numbered from 0 to 999 in each direction; the lights at each corner are at 0,0, 0,999, 999,999, and 999,0. The instructions include whether to turn on, turn off, or toggle various inclusive ranges given as coordinate pairs. Each coordinate pair represents opposite corners of a rectangle, inclusive; a coordinate pair like 0,0 through 2,2 therefore refers to 9 lights in a 3x3 square. The lights all start turned off.
 *
 * To defeat your neighbors this year, all you have to do is set up your lights by doing the instructions Santa sent you in order.
 *
 * For example:
 *
 * turn on 0,0 through 999,999 would turn on (or leave on) every light.
 * toggle 0,0 through 999,0 would toggle the first line of 1000 lights, turning off the ones that were on, and turning on the ones that were off.
 * turn off 499,499 through 500,500 would turn off (or leave off) the middle four lights.
 * After following the instructions, how many lights are lit?
 */

// definitions

// a grid of lights
// - each light will be looked by a position: [x, y] tupple
// - each light can be in 2 states turned on/turned off
// - starting position is turned off

export enum LightState {
  TurnedOff = 'turnedOff',
  TurnedOn = 'turnedOn',
}

const grid = new Map<string, LightState>()

export type Position = {
  x: number
  y: number
}

function getGridKey(pos: Position) {
  return `${pos.x}-${pos.y}`;
}

// fill starting grid
function setupGrid() {
  for (let i = 0; i < 1000; i++) {
    for (let j = 0; j < 1000; j++) {
      grid.set(getGridKey({x: i, y: j}), LightState.TurnedOff)
    }
  }
}

// instructions
// examples:
// turn on 0,0 through 999,999
// toggle 0,0 through 999,0
// turn off 499,499 through 500,500

// <<action>> <<startX>>,<<startY>> through <<endX>>,<<endY>>


// algorithm

// utils
// get data from instruction

export enum Action {
  TurnOn = 'turnOn',
  TurnOff = 'turnOff',
  Toggle = 'toggle'
}

type Instruction = {
  action: Action
  startX: number
  startY: number
  endX: number
  endY: number
}

export function parseInstruction(instruction: string): Instruction {
// turn on 0,0 through 999,999
// toggle 0,0 through 999,0
// turn off 499,499 through 500,500

// <<action>> <<startX>>,<<startY>> through <<endX>>,<<endY>>
  return null
}

// perform action on position(s)


// define grid
// read instructions one by one in a loop
//    mutate grid based on instruction
// once loop finishes, iterate grid and get count of turned on lights

// question: how many lights are lit