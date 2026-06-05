export function formatNumber(value){
    if (Math.abs(value) < 1e-9) {
        return 0;
    }
    if (Number.isInteger(value)){
        return Math.trunc(value);
    }
    return value.toFixed(2);
}