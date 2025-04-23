
const HASH_PRIME = 53;
const HASH_SIZE = 10003;
const BITSET_SIZE = Math.ceil(HASH_SIZE / 64);

const char_map = new Array(256).fill(0); 

const textSimilarity = (origin, compare) => {
    const hashSet = new BigUint64Array(BITSET_SIZE);
    let intersection = 0;
    let sizePairs = 0;

    function getCharMapped(c) {
        const code = c.charCodeAt(0);
        return char_map[code] ? String.fromCharCode(char_map[code]) : c;
    }

    for (let i = 0; i < origin.length - 1; i++) {
        const a = getCharMapped(origin[i]);
        const b = getCharMapped(origin[i + 1]);
        const number = ((a.charCodeAt(0) * HASH_PRIME + b.charCodeAt(0)) % HASH_SIZE) >>> 0;
        const idx = Math.floor(number / 64);
        const bit = BigInt(1) << BigInt(number % 64);
        hashSet[idx] |= bit;
        sizePairs++;
    }

    for (let i = 0; i < compare.length - 1; i++) {
        const a = getCharMapped(compare[i]);
        const b = getCharMapped(compare[i + 1]);
        const number = ((a.charCodeAt(0) * HASH_PRIME + b.charCodeAt(0)) % HASH_SIZE) >>> 0;
        const idx = Math.floor(number / 64);
        const bit = BigInt(1) << BigInt(number % 64);
        if ((hashSet[idx] & bit) !== BigInt(0)) {
            intersection++;
        }
        sizePairs++;
    }

    return sizePairs > 0 ? (2.0 * intersection) / sizePairs : 0.0;
}

const toLower = (text) => text.toLowerCase()


