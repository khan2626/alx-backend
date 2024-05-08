const kue = require('kue');

// Array of blacklisted phone numbers
const blacklistedNumbers = ['4153518780', '4153518781'];

// Create a queue with Kue
const queue = kue.createQueue({ concurrency: 2 });

// Define the sendNotification function
function sendNotification(phoneNumber, message, job, done) {
    job.progress(0, 100); // Track the progress of the job

    if (blacklistedNumbers.includes(phoneNumber)) {
        return done(new Error(`Phone number ${phoneNumber} is blacklisted`));
    }

    job.progress(50, 100); // Track the progress of the job

    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);

    done(); // Job completed successfully
}

// Process jobs from the push_notification_code_2 queue
queue.process('push_notification_code_2', 2, (job, done) => {
    const { phoneNumber, message } = job.data;
    sendNotification(phoneNumber, message, job, done);
});