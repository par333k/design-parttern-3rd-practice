const promiseAll = async (promises) => {
    for (const promise of promises) {
        await promise;
    }
}

const delayTest = (ms, str) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof ms !== 'number') {
                reject()
            }
            resolve(console.log(`end${str}`))
            ,ms });
    })
}

const promises = [
    delayTest(1000,'first'),
    delayTest(2000, 'second'),
    delayTest('abc', 'err'),
    delayTest(500, 'third')
]

promiseAll(promises)
