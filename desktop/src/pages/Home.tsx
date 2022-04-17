import React, { useState, useEffect } from 'react';
import {
    BarChart, CartesianGrid, XAxis, YAxis, Bar, Tooltip, Legend, PieChart, Pie,
    ResponsiveContainer, Cell,
    AreaChart, Area
} from 'recharts';
import { runCommand } from '../services/restfulClient';

const classNames = require('classnames');

const HomePage = (props: any) => {

    const { classes } = props;

    const data01 = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
    ];

    const colors = ['#3f51b5', '#ff6e40'];

    const initServerStatusList: any[] = [];

    const [serverStatusList, setServerStatusList] = useState(initServerStatusList);

    const [serverName, setServerName] = useState('');

    const [cpuCurrent, setCpuCurrent] = useState([]);

    const [cpuStatus, setCpuStatus] = useState([]);

    const [memStatus, setMemStatus] = useState([]);

    const [memCurrent, setMemCurrent] = useState([]);

    const cpuData = [
        {
            month: '2015.01',
            a: 19,
            b: 81
        },
        {
            month: '2015.02',
            a: 22,
            b: 78
        },
        {
            month: '2015.03',
            a: 40,
            b: 60
        },
        {
            month: '2015.04',
            a: 30,
            b: 70
        },
        {
            month: '2015.05',
            a: 18,
            b: 48,
            c: 21,
        },
        {
            month: '2015.06',
            a: 23,
            b: 38,
            c: 25,
        }
    ];

    const getServerStatus = async () => {

        console.log('update server status');

        const serverStatusList: any[] = await runCommand('api/user/getServerStatus', {});

        console.log(serverStatusList);

        setServerStatusList(serverStatusList);

        /*

        const cpuStatus = result.cpuStatus;

        const memStatus = result.memStatus;

        const cpuCurrent = result.cpuCurrent;

        const memCurrent = result.memCurrent;

        const serverName = result.serverName;

        console.log(cpuCurrent);

        setCpuStatus(cpuStatus);

        setMemStatus(memStatus);

        setCpuCurrent(cpuCurrent);

        setMemCurrent(memCurrent);

        setServerName(serverName);

        */

    }

    const toPercent = (decimal: any, fixed = 0) => `${(decimal * 100)}%`;

    const getPercent = (value: any, total: any) => {
        const ratio = total > 0 ? value / total : 0;

        return toPercent(ratio, 0);
    };

    const renderTooltipContent = (o: any) => {
        const { payload, label } = o;

        if (payload) {
            const total = payload.reduce((result: any, entry: any) => result + entry.value, 0);

            return (
                <div className="customized-tooltip-content">
                    <p className="total">{`${label} (Total: ${total})`}</p>
                    <ul className="list">
                        {payload.map((entry: any, index: any) => (
                            <li key={`item-${index}`} style={{ color: entry.color }}>
                                {`${entry.name}: ${entry.value}(${getPercent(entry.value, total)})`}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        } else {
            return null;
        }
    };


    useEffect(() => {

        console.log('debug - 1');

        getServerStatus();

        const timeValue = setInterval(() => {
            getServerStatus();
        }, 5000);

        return () => {
            clearInterval(timeValue);
            console.log('dashboard is closed')
        }

    }, []);

    return (
        <div className="gridbg-gray-100 font-sans px-2">

            <nav className="relative w-full flex flex-wrap items-center justify-between py-2 border-b 0  shadow-lg">
                <div className="container-fluid px-2">
                    <a className="flex items-center text-gray-900 hover:text-gray-900 focus:text-gray-900 mt-2 lg:mt-0 mr-1" href="#">
                        <span className="font-bold text-lg text-blue-600">Server Status</span>

                    </a>
                </div>

            </nav>

            <div>
                {serverStatusList.map((serverStatus: any) => {

                    const cpuStatus: any[] = serverStatus.cpuStatus;

                    const memStatus: any[] = serverStatus.memStatus;

                    const processMemStatus: any[] = serverStatus.processMemStatus;

                    const cpuCurrent: any[] = serverStatus.cpuCurrent;

                    const memCurrent: any[] = serverStatus.memCurrent;

                    const processMemCurrent: any[] = serverStatus.processMemCurrent;

                    const serverName = serverStatus.serverName;

                    const commandNum = serverStatus.commandNum;

                    const upTime = serverStatus.upTime;

                    return (

                        <div className="grid grid-cols-3 gap-1 bg-gray-100 font-sans">

                            <div className="col-span-3 bg-white flex ">

                                <div className="text-blueGray-500 p-2 mt-4 text-center inline-flex items-center justify-center bg-blue-100 mb-5 shadow-lg rounded-lg ">
                                    <img className="object-contain h-20 w-20" src="/img/server.png" />
                                
                                    <div className="text-sm font-semibold  py-1 px-2 uppercase rounded text-gray-500">
                                        {serverName}
                                    </div>

                                </div>


                            </div>

                            <div className="col-span-2 grid grid-cols-3 gap-1 bg-gray-100 font-sans">

                                <div className="col-span-3 bg-white flex ">

                                    <span className="font-medium">
                                        CPU usage
                                    </span>

                                </div>

                                <div className="col-span-1 bg-white flex ">

                                    <ResponsiveContainer width="100%" height={200}>
                                        <PieChart>
                                            <Pie
                                                data={cpuCurrent}
                                                dataKey="value"
                                                nameKey="name"
                                                cx="50%"
                                                cy="50%"
                                                label={true}
                                                fill="#8884d8" >

                                                {cpuCurrent.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={colors[index]} />
                                                ))}

                                            </Pie>
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>

                                </div>

                                <div className="col-span-2 bg-white flex ">

                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart
                                            width={500}
                                            height={400}
                                            data={cpuStatus}
                                            stackOffset="expand"
                                            margin={{
                                                top: 10,
                                                right: 30,
                                                left: 0,
                                                bottom: 0,
                                            }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                                            <YAxis tickFormatter={toPercent} tick={{ fontSize: 12 }} />
                                            <Tooltip content={renderTooltipContent} />
                                            <Area type="monotone" dataKey="value" stackId="1" stroke="#8884d8" fill="#ff6e40" />
                                            <Area type="monotone" dataKey="idle" stackId="1" stroke="#2196f3" fill="#3f51b5" />

                                        </AreaChart>
                                    </ResponsiveContainer>

                                </div>

                                <div className="col-span-3 bg-white flex ">

                                    <span className="font-medium">
                                        Server Memory usage
                                    </span>

                                </div>


                                <div className="col-span-1 bg-white flex ">

                                    <ResponsiveContainer width="100%" height={200}>
                                        <PieChart>
                                            <Pie
                                                data={memCurrent}
                                                dataKey="value"
                                                nameKey="name"
                                                cx="50%"
                                                cy="50%"
                                                label={true}
                                                fill="#8884d8" >
                                                {cpuCurrent.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={colors[index]} />
                                                ))}

                                            </Pie>
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>

                                </div>

                                <div className="col-span-2 bg-white flex ">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart
                                            width={500}
                                            height={400}
                                            data={memStatus}
                                            stackOffset="expand"
                                            margin={{
                                                top: 10,
                                                right: 30,
                                                left: 0,
                                                bottom: 0,
                                            }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                                            <YAxis tickFormatter={toPercent} tick={{ fontSize: 12 }} />
                                            <Tooltip content={renderTooltipContent} />
                                            <Area type="monotone" dataKey="value" stackId="1" stroke="#8884d8" fill="#ff6e40" />
                                            <Area type="monotone" dataKey="idle" stackId="1" stroke="#2196f3" fill="#3f51b5" />

                                        </AreaChart>
                                    </ResponsiveContainer>

                                </div>

                                <div className="col-span-3 bg-white flex ">

                                    <span className="font-medium">
                                        Active Mem Memory usage
                                    </span>

                                </div>


                                <div className="col-span-1 bg-white flex ">

                                    <ResponsiveContainer width="100%" height={200}>
                                        <PieChart>
                                            <Pie
                                                data={processMemCurrent}
                                                dataKey="value"
                                                nameKey="name"
                                                cx="50%"
                                                cy="50%"
                                                label={true}
                                                fill="#8884d8" >
                                                {cpuCurrent.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={colors[index]} />
                                                ))}

                                            </Pie>
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>

                                </div>

                                <div className="col-span-2 bg-white flex ">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart
                                            width={500}
                                            height={400}
                                            data={processMemStatus}
                                            stackOffset="expand"
                                            margin={{
                                                top: 10,
                                                right: 30,
                                                left: 0,
                                                bottom: 0,
                                            }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                                            <YAxis tickFormatter={toPercent} tick={{ fontSize: 12 }} />
                                            <Tooltip content={renderTooltipContent} />
                                            <Area type="monotone" dataKey="value" stackId="1" stroke="#8884d8" fill="#ff6e40" />
                                            <Area type="monotone" dataKey="idle" stackId="1" stroke="#2196f3" fill="#3f51b5" />

                                        </AreaChart>
                                    </ResponsiveContainer>

                                </div>

                            </div>



                            <div className="col-span-1 bg-white">

                                <div className="flex flex-wrap">
                                    <div className="w-full md:w-1/2 xl:w-1/2 p-3">

                                        <div className="bg-white border rounded shadow p-2">
                                            <div className="flex flex-row items-center">
                                                <div className="flex-shrink pr-4">
                                                    <div className="rounded p-3 bg-green-600"><i><svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                                    </svg></i></div>
                                                </div>
                                                <div className="flex-1 text-right md:text-center">
                                                    <h5 className="font-bold uppercase text-gray-500">Command Number</h5>
                                                    <h3 className="font-bold text-3xl">{commandNum}<span className="text-green-500"></span></h3>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="w-full md:w-1/2 xl:w-1/2 p-3">

                                        <div className="bg-white border rounded shadow p-2">
                                            <div className="flex flex-row items-center">
                                                <div className="flex-shrink pr-4">
                                                    <div className="rounded p-3 bg-blue-600"><i><svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                                    </svg></i></div>
                                                </div>
                                                <div className="flex-1 text-right md:text-center">
                                                    <h5 className="font-bold uppercase text-gray-500">Server Uptime</h5>
                                                    <h3 className="font-bold text-3xl">{upTime}</h3>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="w-full md:w-1/2 xl:w-1/2 p-3">

                                        <div className="bg-white border rounded shadow p-2">
                                            <div className="flex flex-row items-center">
                                                <div className="flex-shrink pr-4">
                                                    <div className="rounded p-3 bg-pink-600"><i><svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                                    </svg></i></div>
                                                </div>
                                                <div className="flex-1 text-right md:text-center">
                                                    <h5 className="font-bold uppercase text-gray-500">Client Number</h5>
                                                    <h3 className="font-bold text-3xl">15 <span className="text-pink-500"></span></h3>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="w-full md:w-1/2 xl:w-1/2 p-3">

                                        <div className="bg-white border rounded shadow p-2">
                                            <div className="flex flex-row items-center">
                                                <div className="flex-shrink pr-4">
                                                    <div className="rounded p-3 bg-yellow-600"><i><svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                                    </svg></i></div>
                                                </div>
                                                <div className="flex-1 text-right md:text-center">
                                                    <h5 className="font-bold uppercase text-gray-500">User Number</h5>
                                                    <h3 className="font-bold text-3xl">2 <span className="text-yellow-600"></span></h3>
                                                </div>
                                            </div>
                                        </div>

                                    </div>


                                </div>
                            </div>
                        </div>

                    )

                })}

            </div >
        </div >
    );
}


export default HomePage as any;