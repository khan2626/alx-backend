const kue = require('kue');

// Create an array of jobs
const jobs = [
  {
    phoneNumber: '4153518780',
    message: 'This is the code 1234 to verify your account'
  },
  {
    phoneNumber: '4153518781',
    message: 'This is the code 4562 to verify your account'
  },
  // Add more jobs here as per the requirement
];

// Create a queue with Kue
const queue = kue.createQueue();

// Loop through the array of jobs
jobs.forEach((jobData, index) => {
    // Create a new job for each jobData and add it to the queue
    const job = queue.create('push_notification_code_2', jobData)
        .save((err) => {
            if (!err) {
                console.log(`Notification job created: ${job.id}`);
            } else {
                console.error(`Error creating notification job ${index + 1}: ${err}`);
            }
        });

    // Event listener for job completion
    job.on('complete', () => {
        console.log(`Notification job ${job.id} completed`);
    });

    // Event listener for job failure
    job.on('failed', (err) => {
        console.error(`Notification job ${job.id} failed: ${err}`);
    });

    // Event listener for job progress
    job.on('progress', (progress) => {
        console.log(`Notification job ${job.id} ${progress}% complete`);
    });
});
