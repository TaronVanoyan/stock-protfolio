export const calculatePercentage = (value, sum) => {
    const percent = (value * 100) / sum;

    return roundNumber(percent);
};

export const roundNumber = (number) => Math.round((number + Number.EPSILON) * 100) / 100;

export const generateInteger = () => Math.floor((Math.random() * 100));

export const toOppositeSign = (number) => (-1 * number);