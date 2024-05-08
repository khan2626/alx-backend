import { expect } from 'chai';
import kue from 'kue';
import createPushNotificationsJobs from './8-job.js';

describe('createPushNotificationsJobs', () => {
    let queue;

    // Before each test, create a new Kue queue and enter test mode
    beforeEach(() => {
        queue = kue.createQueue();
        queue.testMode.enter();
    });

    // After each test, clear the queue and exit test mode
    afterEach(() => {
        queue.testMode.clear();
        queue.testMode.exit();
    });

    it('should display an error message if jobs is not an array', () => {
        expect(() => {
            createPushNotificationsJobs({}, queue);
        }).to.throw('Jobs is not an array');
    });

    it('should create two new jobs to the queue', () => {
        const list = [
            {
                phoneNumber: '4153518780',
                message: 'This is the code 1234 to verify your account'
            },
            {
                phoneNumber: '4153518781',
                message: 'This is the code 4562 to verify your account'
            }
        ];

        createPushNotificationsJobs(list, queue);

        // Ensure two jobs are added to the queue
        expect(queue.testMode.jobs.length).to.equal(2);

        // Ensure the correct jobs are added to the queue
        expect(queue.testMode.jobs[0].type).to.equal('push_notification_code_3');
        expect(queue.testMode.jobs[1].type).to.equal('push_notification_code_3');
    });
});