const asyncMap = (iterable, callback, concurrency, results) => {
    if (!iterable.length)
        return Promise.all(results).then(results => console.log(results));

    const queue = iterable.splice(0, concurrency - 1);

    while (queue.length) {
        const task = queue.shift();
        callback(task, iterable, callback, concurrency, results);
    }
}

const callback = (task, iterable, callback, concurrency, results) => {
    results.push(
        new Promise((resolve, reject) => {
            if (typeof task === 'function') {
                resolve(task());
            } else {
                resolve(task);
            }
        })
    );
    asyncMap(iterable, callback, concurrency, results);
}

const functionList = [
    () => [1, new Date().getMilliseconds()],
    () => [2, new Date().getMilliseconds()],
    () => [3, new Date().getMilliseconds()],
    () => [4, new Date().getMilliseconds()],
    () => [5, new Date().getMilliseconds()],
];


asyncMap(functionList, callback, 2, []);