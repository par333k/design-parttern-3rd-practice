export class TaskQueuePC {
    constructor (concurrency) {
        this.taskQueue = []
        this.consumerQueue = []

        for (let i = 0; i < concurrency; i++) {
            this.consumer()
        }
    }

    consumer () {
        return new Promise((resolve,reject)=>{
            try{
                const task = this.getNextTask()
                resolve(task) //resolve task to pass to next promise
            } catch (err) {
                reject(err)
            }
        })
            .then(task=>task()) //resolve and complete task
            .then(()=>this.consumer()) // recursively call consumer
    }

    getNextTask () {
        return new Promise((resolve) => {
            if (this.taskQueue.length !== 0) {
                return resolve(this.taskQueue.shift())
            }
            this.consumerQueue.push(resolve)
        })
    }

    runTask (task) {
        return new Promise((resolve, reject) => {
            const taskWrapper = () => {
                const taskPromise = task()
                taskPromise.then(resolve, reject)
                return taskPromise
            }

            if (this.consumerQueue.length !== 0) {
                const consumer = this.consumerQueue.shift()
                consumer(taskWrapper)
            } else {
                this.taskQueue.push(taskWrapper)
            }
        })
    }
}