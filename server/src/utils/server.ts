import { delay } from "./utils";
import * as os from 'os';
import * as actionService from "../cache/action.service";
var process = require('process')

export class ServerTask {

    constructor() {

    }

    async queryServerInfo(): Promise<void> {

        while (1 === 1) {

            const cpuAvg = await this.getCPULoadAVG(1000, 100);
            const totalMem = Math.round(os.totalmem() / (1024 * 1024));
            const freeMem = Math.round(os.freemem() / (1024 * 1024));
            const processMem = Math.round(process.memoryUsage().heapUsed / (1024 * 1024));
            const serverName = os.hostname();
    
            actionService.setInternal({key: "cpuAvg", value: cpuAvg});
            actionService.setInternal({key: "totalMem", value: totalMem});
            actionService.setInternal({key: "freeMem", value: freeMem});
            actionService.setInternal({key: "processMem", value: processMem});

            await delay(1000);

        }      

    }


    cpuAverage() {

        //Initialise sum of idle and time of cores and fetch CPU info
        var totalIdle = 0, totalTick = 0;
        var cpus = os.cpus();

        //Loop through CPU cores
        for (var i = 0, len = cpus.length; i < len; i++) {

            //Select CPU core
            var cpu = cpus[i];

            //Total up the time in the cores tick
            //https://stackoverflow.com/questions/57086672/element-implicitly-has-an-any-type-because-expression-of-type-string-cant-b

            for (const myType in cpu.times) {
                totalTick += cpu.times[myType as keyof typeof cpu.times];
            }

            //Total up the idle time of the core
            totalIdle += cpu.times.idle;
        }

        //Return the average Idle and Tick times
        return { idle: totalIdle / cpus.length, total: totalTick / cpus.length };
    }


    // function to calculate average of array
    arrAvg(arr: any[]) {
        if (arr && arr.length >= 1) {
            const sumArr = arr.reduce((a, b) => a + b, 0)
            return sumArr / arr.length;
        } else
            return 0;
    };

    getCPULoadAVG(avgTime = 1000, delay = 100) {

        return new Promise((resolve, reject) => {

            const n = ~~(avgTime / delay);
            if (n <= 1) {
                reject('Error: interval to small');
            }

            let i = 0;
            let samples: number[] = [];
            const avg1 = this.cpuAverage();

            let interval = setInterval(() => {
                //  console.debug('CPU Interval: ', i);

                if (i >= n) {
                    clearInterval(interval);
                    resolve(~~((this.arrAvg(samples) * 100)));
                }

                const avg2 = this.cpuAverage();
                const totalDiff = avg2.total - avg1.total;
                const idleDiff = avg2.idle - avg1.idle;

                samples[i] = (1 - idleDiff / totalDiff);

                i++;

            }, delay);

        });

    }

}