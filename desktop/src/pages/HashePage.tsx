import React, { useState, useEffect } from 'react';
import { runCommand, setToken } from '../services/restfulClient';
import { useDispatch, useSelector } from 'react-redux';
import ContextDetails from './ContextDetails';
import { saveAs } from 'file-saver';

const classNames = require('classnames');

const HashePage = (props: any) => {


    const { classes, contextKey } = props;

    // console.log(contextKey);

    const stateResult = useSelector((state: any) => state.user);

    const [hasheKeyList, setHashKeyList] = useState([]);

    const [selectItem, setSelectItem] = useState({
        field: '',
        value: ''
    })

    setToken(stateResult.access_token);

    const [refresh, setRefresh] = useState(false);

    const getHkeys = async () => {

        console.log('debug');
        console.log(contextKey);

        const result: any = await runCommand('api/cache/hkeys', {
            key: contextKey
        });

        console.log(result);

        setHashKeyList(result);

        if (result.length > 0) {
            getValue(result[0]);
        }

    }

    const getValue = async (field: string) => {

        const result: any = await runCommand('api/cache/hget', {
            key: contextKey,
            field: field
        });

        setSelectItem({
            field: field,
            value: result
        })

    }

    const download = () => {
        var blob = new Blob([selectItem.value], { type: "text/plain;charset=utf-8" });
        saveAs(blob, `Hashe_${contextKey}_${selectItem.field}.txt`);
    }



    useEffect(() => {

        getHkeys();

    }, [contextKey]);

    console.log('debug -- *');


    return (

        <div className="grid grid-cols-12 gap-2 flex-shrink-0 w-full">

            <div className="col-span-12 bg-white flex  ">
                <nav className="relative w-full flex flex-wrap items-center justify-between py-2 border-b 0  shadow-lg">
                        <div className="container-fluid px-2">
                            <div className="flex items-center text-gray-900 hover:text-gray-900 focus:text-gray-900 mt-2 lg:mt-0 mr-1" >
                                <span className="font-bold text-lg text-blue-600">Hashe:</span>
                                <span className="font-medium text-sm text-gray-600 ml-1">{contextKey}</span>
                                <button className="bg-blue-400 active:bg-blue-500 rounded shadow hover:shadow-md outline-none focus:outline-none text-white ease-linear transition-all absolute w-9 pl-2 right-2" type="button"
                                onClick={download} data-bs-toggle="tooltip" data-bs-placement="top" title="download" >
                                <svg width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20,6.52797748 L20,19.5 C20,20.8807119 18.8807119,22 17.5,22 L6.5,22 C5.11928813,22 4,20.8807119 4,19.5 L4,4.5 C4,3.11928813 5.11928813,2 6.5,2 L15.4720225,2 C15.6047688,1.99158053 15.7429463,2.03583949 15.8535534,2.14644661 L19.8535534,6.14644661 C19.9641605,6.25705373 20.0084195,6.39523125 20,6.52797748 Z M15,3 L6.5,3 C5.67157288,3 5,3.67157288 5,4.5 L5,19.5 C5,20.3284271 5.67157288,21 6.5,21 L17.5,21 C18.3284271,21 19,20.3284271 19,19.5 L19,7 L15.5,7 C15.2238576,7 15,6.77614237 15,6.5 L15,3 Z M16,3.70710678 L16,6 L18.2928932,6 L16,3.70710678 Z M12,16.2928932 L14.1464466,14.1464466 C14.3417088,13.9511845 14.6582912,13.9511845 14.8535534,14.1464466 C15.0488155,14.3417088 15.0488155,14.6582912 14.8535534,14.8535534 L11.9198269,17.7872799 C11.8307203,17.9246987 11.6759769,18.0156098 11.5,18.0156098 C11.3240231,18.0156098 11.1692797,17.9246987 11.0801731,17.7872799 L8.14644661,14.8535534 C7.95118446,14.6582912 7.95118446,14.3417088 8.14644661,14.1464466 C8.34170876,13.9511845 8.65829124,13.9511845 8.85355339,14.1464466 L11,16.2928932 L11,9.5 C11,9.22385763 11.2238576,9 11.5,9 C11.7761424,9 12,9.22385763 12,9.5 L12,16.2928932 L12,16.2928932 Z" />
                                </svg>

                            </button>
                            </div>
                        </div>
                   
                </nav>
            </div>

            <div className="col-span-1 bg-white flex ">

                <ul className="bg-white rounded-lg border text-sm border-gray-200 w-full text-gray-900">
                    {
                        hasheKeyList.map(item => (
                            <li className={`px-2 py-1 mb-1 border-b border-gray-200 w-full overflow-x-auto ${selectItem.field === item ? "bg-gray-200" : ''}  `} onClick={() => getValue(item)}>
                                {item}
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="col-span-11 bg-white flex ">
                <ContextDetails value={selectItem.value} />
            </div>
        </div>


    );
};


export default HashePage as any;

