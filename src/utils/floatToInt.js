export function signFigures(num){
	let rank = 6;
	if(!num) return(0);
    const sign = num / Math.abs(num);
    const number = num * sign;
    const temp = rank - 1 - Math.floor(Math.log10(number));
    let ans;
    if (temp > 0) {
        ans = parseFloat(number.toFixed(temp));
    }
    else if (temp < 0) {
        ans = Math.round(number / Math.pow(10, temp)) * temp;
    }
    else {
        ans = Math.round(number);
    }
    return (ans * sign);
}