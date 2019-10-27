import Bee from 'bee-queue';

import redisConfig from '../config/redis';

import SubscriptionMail from '../app/jobs/SubscriptionMail';

const jobs = [SubscriptionMail];
class Queue {
	constructor() {
		this.queues = {};

		this.init();
	}

	init() {
		jobs.forEach(({ key, handle }) => {
			this.queues[key] = {
				bee: new Bee(key, {
					redis: redisConfig,
				}),
				handle,
			};
		});
	}

	// adiciona novos trabalhos na fila
	add(queue, job) {
		return this.queues[queue].bee.createJob(job).save();
	}

	// executa os jobs
	processQueue() {
		jobs.forEach(job => {
			const { bee, handle } = this.queues[job.key];

			bee.on('failure', this.handleFailure).process(handle);
		});
	}

	// caso haja algum erro no processo
	handleFailure(job, err) {
		console.log(`Queue ${job.queue.name}: FAILED`, err);
	}
}

export default new Queue();
