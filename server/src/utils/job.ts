import { CronJob } from 'cron';
import * as actionService from "../cache/action.service";

export class Job {

  cronJob: CronJob;

  constructor() {
    this.cronJob = new CronJob('0 0 5 * * *', async () => {
      try {
        await this.bar();
      } catch (e) {
        console.error(e);
      }
    });
    
    // Start job
    if (!this.cronJob.running) {
      this.cronJob.start();
    }
  }

  async bar(): Promise<void> {
    // Do some task
  }
}
