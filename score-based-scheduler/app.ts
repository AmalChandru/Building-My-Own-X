import { Redis } from 'ioredis'

function RedisApi () {
  const redis = new Redis()
  return {
    addTask: async (queueName: string, task: string, epoch: string): Promise<void> => {
      if (+epoch >= +Date.now()) {
        console.log(`Scheduled new task with data ${JSON.stringify(task)} and timestamp ${epoch}`)
        await redis.zadd(queueName, epoch, JSON.stringify(task))
      } else {
        console.log(`Failed to add the task with data ${JSON.stringify(task)} since scheduled time ${epoch} is in past`)
      }
    },
    fetchTask: async (queueName: string, pollingInterval: string): Promise<void> => {
      while (await redis.zcard(queueName) !== 0) {
        const firstTask = await redis.zrange(queueName, 0, 0)
        const scoreOfFirstTask = await redis.zmscore(queueName, firstTask)
        const isReadyToPick = +scoreOfFirstTask[0] >= Date.now() - +pollingInterval && +scoreOfFirstTask[0] <= Date.now() + +pollingInterval
        if (isReadyToPick) {
          console.log(`Found task ${JSON.stringify(firstTask)}`)
          await redis.zpopmin(queueName)
          console.log(`Removing task ${JSON.stringify(firstTask)}`)
        } else {
          if (+scoreOfFirstTask[0] <= Date.now()) {
            await redis.zpopmin(queueName)
            console.log(`Deleting ${JSON.stringify(firstTask)} since it's scheduled time has been passed`)
          }
          break
        }
      }
    }
  }
}

function TaskScheduler (queueName, pollingTime) {
  const redisApi = RedisApi()
  return {
    schedule: async (task, scheduledTime): Promise<void> => {
      await redisApi.addTask(queueName, task, scheduledTime)
    },
    start: () => {
      console.log('Started scheduler')
      setInterval(async (): Promise<void> => {
        console.log('Polling for new tasks')
        try {
          await redisApi.fetchTask(queueName, pollingTime)
        } catch (error) {
          console.error('An error occurred while fetching tasks:', error)
        }
      }, pollingTime)
    }
  }
}

const userScheduler = TaskScheduler('users', '5000')
const scheduler = TaskScheduler('customers', '5000')

userScheduler.schedule({ name: 'Holmes1' }, '1685602918401')
scheduler.schedule({ name: 'Rolex' }, '1685602928401')

userScheduler.start()
scheduler.start()
