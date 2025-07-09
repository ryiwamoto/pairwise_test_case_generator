"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandom = getRandom;
exports.getRandomInt = getRandomInt;
const defaultSeed = [123456789, 362436069, 521288629, 88675123];
function getRandom(seed = defaultSeed) {
    const [x, y, z, w] = seed;
    const t = x ^ (x << 11);
    const n = w ^ (w >>> 19) ^ (t ^ (t >>> 8));
    const nextSeed = [y, z, w, n];
    return [n, nextSeed];
}
function getRandomInt(min, max, seed) {
    const [n, nextSeed] = getRandom(seed);
    const r = min + (Math.abs(n) % (max + 1 - min));
    return [r, nextSeed];
}
