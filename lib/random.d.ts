export type RandomSeed = [number, number, number, number];
export declare function getRandom(seed?: RandomSeed): [number, RandomSeed];
export declare function getRandomInt(min: number, max: number, seed?: RandomSeed): [number, RandomSeed];
