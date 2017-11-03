export const calculatorList = [
    {
        "order": 1,
        "name": "100m hurdles",
        "a": 9.23076,
        "b": 26.7,
        "c": 1.835
    },
    {
        "name": "highjump",
        "a": 1.84523,
        "b": 75.0,
        "c": 1.348
    },
    {
        "name": "shotput",
        "a": 56.0211,
        "b": 1.50,
        "c": 1.05
    },
    {
        "name": "run200m",
        "a": 4.99087,
        "b": 42.5,
        "c": 1.81
    },
    {
        "name": "longjump",
        "a": 0.188807,
        "b": 210,
        "c": 1.41
    },
    {
        "name": "javelin",
        "a": 15.9803,
        "b": 3.80,
        "c": 1.04
    },
    {
        "name": "run800m",
        "a": 0.11193,
        "b": 254,
        "c": 1.88
    }
];

export function calculateHeptathlonPoints(heptathlon) {
    console.log('--calculate hepthatlon points---');
    for (let i = 0; i < heptathlon.length; i++) {
        let consts = heptathlonConsts[i];
        console.log('event before ', heptathlon[i]);
        if (heptathlon[i].result == '') {
            heptathlon[i].points = '';
        } else {
            console.log('result: ', consts.a*(Math.pow((consts.b-heptathlon[i].result), consts.c)).toFixed(0));
            heptathlon[i].points = (consts.a*(Math.pow((consts.b-heptathlon[i].result), consts.c))).toFixed(0);
        }
        console.log('event after ', heptathlon[i]);
    }
    return heptathlon;
}