import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { runCommand, setToken } from '../services/restfulClient';
// import { store } from '../store/Store';
import { ActionType } from '../store/Helpers';
import { Redirect, useLocation, Route } from "react-router-dom";
import * as querystring from 'querystring';

const LoginPage = (props: any) => {

    const { classes } = props;

    const dispatch = useDispatch();

    const location = useLocation();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const stateResult = useSelector((state: any) => state.user);

    setToken(stateResult.access_token);

    const handleEmailAddressChange = (event: any) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    }

    const handleLogin = async () => {

        const user: any = await runCommand('api/user/login', {
            "username": email,
            "pass": password
        });

        console.log(user);



        if (user.user && user.access_token) {
            dispatch({
                type: ActionType.LOGIN_SUCCESS, payload: user
            })
        }

        console.log(stateResult);



        console.log('debug -- 1');
        console.log(user);

    }

    const handleCancel = () => {

        console.log(stateResult);
    }


    console.log('debug - 1');
    console.log(stateResult);

    if (stateResult && stateResult.user) {
        console.log(stateResult);

        return <Redirect to={{
            pathname: "/",
        }} />
    }



    const rederLogin = (props: any): any => {
        return (
            <div className="bg-white font-family-karla h-screen">

                <div className="w-full flex flex-wrap">

                    <div className="w-full md:w-1/2 flex flex-col">

                        <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
                            <a href="#" className="bg-black text-white font-bold text-xl p-4">Active Discs</a>
                        </div>

                        <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                            <p className="text-center text-3xl">Welcome.</p>
                            <div className="flex flex-col pt-3 md:pt-8">
                                <div className="flex flex-col pt-4">
                                    <label htmlFor="email" className="text-lg">Email</label>
                                    <input type="text" id="email" placeholder="your@email.com" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                                        value={email} onChange={handleEmailAddressChange} />
                                </div>

                                <div className="flex flex-col pt-4">
                                    <label htmlFor="password" className="text-lg">Password</label>
                                    <input type="password" id="password" placeholder="Password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                                        value={password} onChange={handlePasswordChange} />
                                </div>

                                <button type="button" className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8" onClick={handleLogin}>Log In</button>
                            </div>
                        </div>

                    </div>

                    <div className="w-1/2 shadow-2xl bg-blue-50">
                        <div className="grid place-items-center h-screen">
                                
                                <p className="text-9xl font-bold text-blue-500">A</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <Route path={"/account"} render={rederLogin} />
    )

}


export default (LoginPage as any) as any;

