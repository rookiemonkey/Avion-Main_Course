
export default function decimalToFraction(value, donly = true) {

    if (parseInt(value) == value) return value // if whole number

    let tolerance = 1.0E-6; // from how many decimals the number is rounded
    let h1 = 1;
    let h2 = 0;
    let k1 = 0;
    let k2 = 1;
    let negative = false;
    let i;

    if (value < 0) {
        negative = true;
        value = -value;
    }

    if (donly) {
        i = parseInt(value);
        value -= i;
    }

    let b = value;

    do {
        var a = Math.floor(b);
        var aux = h1;
        h1 = a * h1 + h2;
        h2 = aux;
        aux = k1;
        k1 = a * k1 + k2;
        k2 = aux;
        b = 1 / (b - a);
    } while (Math.abs(value - h1 / k1) > value * tolerance);

    return (negative ? "-" : '') + ((donly & (i != 0)) ? i + ' ' : '') + (h1 == 0 ? '' : h1 + "/" + k1);
}