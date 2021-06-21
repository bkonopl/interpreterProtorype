const operator = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b
}

const funcs = {
    'Abs': (a) => Math.abs(a),
    'Sum': (a, b) => a + b,
}
function parse(str) {
    const arr = str.split(' ');
    arr.forEach((item, index) => {
        if(item[0] === 'C' && !isNaN(item.slice(1))) {
            arr[index] = columns[+item.slice(1) - 1]
        } else
        if(!isNaN(item)) {
            arr[index] = +item
        }  else
        if(operator[item]) {
            arr[index] = operator[item]
        }
        else if(item.indexOf('(') > 0){
            const args = [];
            let pos = item.indexOf('(')
            let k = 0

            for (let i = pos + 1; i < item.length; i++) {
                if(item[i] === ')') k--
                else if(item[i] === '(') k++
                if ((k === 0 && item[i] === ',') || (k === -1 && item[i] === ')')) {
                    args.push(parse(item.slice(pos + 1, i)))
                    pos = i
                }
            }
            arr[index] = funcs[item.slice(0, item.indexOf('('))](...args)
        }
    })
    let result = arr[0]
    for(let i = 1; i < arr.length; i++) if (typeof arr[i] === 'function') {
        result = arr[i](result, arr[++i])
    }
    return result
}
const columns = [
    10,
    'AB',
    'BC',
    5,
]


columns.push(parse('C1'))
columns.push(parse('C1 + C4'))
columns.push(parse('3'))

columns.push(parse('Abs(C1) + Sum(C1,5)'))

columns.forEach((item) => console.log(item))
/*
parse('C1')
parse('C1 + C4')
parse('3')

parse('Abs(C1) + Sum(C1,5)')
10 | AB | BC| 5  |
 */
