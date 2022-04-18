import { getInternal, getCommandNum } from '../cache/action.service'
import * as os from 'os';
import internal from 'stream';
import moment from 'moment';
import { config } from '../config/config';

export const validateUser = (body: any) => {

    var result = null;

    const password: string = config.pass || '';

    if (body) {
        var username = body.username;
        var pass = body.pass;
        if (pass === password) {
            result = {
                user: username,
                access_token: "yes"
            };
        }
    }

    return result;

}


const getLimitedStatus = (data: any[]) => {

    var quot: number = ~~(data.length / 100);

    if (quot === 0)
        quot = 1;

    var limitedData = data.reduce((result: any[], item: any, index: number) => {
        if (index % quot === 0) {
            result.push(item);
        };
        return result;
    }, [])

  
    if (data.length > 0) {
        var first = data[0];
        var last = data[data.length - 1];

        limitedData = limitedData.filter(item => item.time !== first.time && item.time !== last.time);
        limitedData = [first].concat(limitedData).concat([last]);
    }


    return limitedData;

}


export const getServerStatus = (body: any) => {

    var result = {
        cpuStatus: [] as any[],
        cpuCurrent: [{ name: '', value: 0 }] as any[],
        memStatus: [] as any[],
        memCurrent: [{ name: '', value: 0 }] as any[],
        serverName: '' as string,
        processMemStatus: [] as any[],
        processMemCurrent: [{ name: '', value: 0 }] as any[],
        commandNum: 0,
        upTime: ''
    };



    const serverName = os.hostname();

    var request = { key: "" };

    request.key = "cpuAvg";

    var cpuStatus = getLimitedStatus(getInternal(request));

    cpuStatus.forEach((item: any) => {
        item.idle = 100 - item.value;
        item.server = serverName;
    });

    let cpuLastStatus = cpuStatus.slice(-1)[0];

    let cpuCurrent = [
        { name: 'idle', value: cpuLastStatus.idle },
        { name: 'used', value: cpuLastStatus.value }
    ]

    request.key = "totalMem";

    var totalMemStatus = getInternal(request);

    let totalMem = totalMemStatus.length > 0 ? totalMemStatus[0].value : 0;

    request.key = "freeMem";

    var memStatus = getLimitedStatus(getInternal(request));

    memStatus.forEach((item: any) => {
        item.idle = item.value;
        item.server = serverName;
        item.value = totalMem - item.idle;

    });

    let memLastStatus = memStatus.slice(-1)[0];

    let memCurrent = [
        { name: 'idle', value: memLastStatus.idle },
        { name: 'used', value: memLastStatus.value }
    ]


    request.key = "processMem";

    var processMemStatus = getLimitedStatus(getInternal(request));

    processMemStatus.forEach((item: any) => {
        item.server = serverName;
        item.idle = totalMem - item.value;

    });

    let lastProcessMemStatus = processMemStatus.slice(-1)[0];

    let processMemCurrent = [
        { name: 'idle', value: lastProcessMemStatus.idle },
        { name: 'used', value: lastProcessMemStatus.value }
    ]

    var commandNum = getCommandNum(request);

    //   console.log(result);

    if (cpuStatus.length > 0) {

        var first = cpuStatus[0];
        var last = cpuStatus[cpuStatus.length -1];
        var startTime = moment(first.time, 'YYYY-MM-DD HH:mm:ss');
        var endTime = moment(last.time, 'YYYY-MM-DD HH:mm:ss');
        var duration = moment.duration(endTime.diff(startTime));
        var upTime = moment.utc(duration.asMilliseconds()).format('HH:mm:ss');

        result.upTime = upTime;

    }


    console.log('done');

    result.cpuStatus = cpuStatus;

    result.cpuCurrent = cpuCurrent;

    result.memStatus = memStatus;

    result.memCurrent = memCurrent;

    result.processMemStatus = processMemStatus;

    result.processMemCurrent = processMemCurrent;

    result.serverName = serverName;

    result.commandNum = commandNum;


    return [result];

}

