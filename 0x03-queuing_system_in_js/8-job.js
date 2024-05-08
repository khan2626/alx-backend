function createPushNotificationsJobs(jobs, queue) {
    // Check if jobs is an array
    if (!Array.isArray(jobs)) {
        throw new Error('Jobs is not an array');
    }

    // Loop through the array of jobs
    jobs.forEach((jobData, index) => {
        // Create a new job for each jobData and add it to the queue
        const job = queue.create('push_notification_code_3', jobData)
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
}

export default createPushNotificationsJobs;