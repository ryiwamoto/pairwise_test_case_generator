export type RandomSeed = [number, number, number, number];

const defaultSeed: RandomSeed = [123456789, 362436069, 521288629, 88675123];

export function getRandom(
  seed: RandomSeed = defaultSeed
): [number, RandomSeed] {
  const [x, y, z, w] = seed;
  const t = x ^ (x << 11);
  const n = w ^ (w >>> 19) ^ (t ^ (t >>> 8));
  const nextSeed: RandomSeed = [y, z, w, n];
  return [n, nextSeed];
}

export function getRandomInt(
  min: number,
  max: number,
  seed?: RandomSeed
): [number, RandomSeed] {
  const [n, nextSeed] = getRandom(seed);
  const r = min + (Math.abs(n) % (max + 1 - min));
  return [r, nextSeed];
}
