
import { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { runCommand, setToken } from '../services/restfulClient';
import 'tw-elements';

const classNames = require('classnames');

export default function AppDrawer(props: any) {


  const history = useHistory();

  const { authentication, utility } = props;

  const [fullActiveMemItems, setFullActiveMemItems] = useState({
    string: [],
    hashe: [],
    list: []
  });


  const [activeMemItems, setActiveMemItems] = useState({
    filter: '',
    string: [],
    hashe: [],
    list: []
  });

  const [currentKey, setCurrentKey] = useState('');


  const showDetails = (type: string, key: string) => {

    console.log('debug --- 0');
    setCurrentKey(key);

    var url: any = "";
    switch (type) {
      case "host":
        url = "/";
        break;
      case "string":
        url = "/StringContext";
        break;
      case "hashe":
        url = "/HasheContext";
        break;
      case "list":
        url = "/ListContext";
        break;

    }

    history.push({
      pathname: url,
      state: key
    })
  }




  const getActiveMemItems = async () => {

    const result: any = await runCommand('api/cache/keys', {});

    setFullActiveMemItems({
      string: result.string,
      hashe: result.hashe,
      list: result.list
    })

    setActiveMemItems({
      filter: '',
      string: result.string,
      hashe: result.hashe,
      list: result.list
    })

    console.log(result);

  }


  const handleFilterChange = (event: any) => {

    var newFilter = event.target.value;

    var newActiveMemItems = {
      filter: newFilter,
      string: fullActiveMemItems.string.filter((item: string) => item.includes(newFilter)),
      hashe: fullActiveMemItems.hashe.filter((item: string) => item.includes(newFilter)),
      list: fullActiveMemItems.list.filter((item: string) => item.includes(newFilter)),
    }

    setActiveMemItems(newActiveMemItems);

  }

  useEffect(() => {

    getActiveMemItems();

  }, []);


  return (

    /*

  <ProSidebar>
    <Menu iconShape="square">
      <MenuItem icon={<ReportIcon />}>Home</MenuItem>
      <SubMenu title="Components" icon={<ReportIcon />}>
        <MenuItem>Menu Item 1</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem>Menu Item 3</MenuItem>
        ...
      </SubMenu>
    </Menu>
  </ProSidebar>

  */
    <nav className="flex flex-col flex-shrink-0 w-64 border-r border-gray-300 ">

      <nav className="relative w-full flex flex-wrap items-center justify-between py-2 border-b bg-gray-100 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg">
        <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
          <div className="container-fluid">
            <a className="flex items-center text-gray-900 hover:text-gray-900 focus:text-gray-900 mt-2 lg:mt-0 mr-1" href="#">
              <span className="font-bold text-lg text-blue-600">Active</span>
              <span className="font-medium text-sm text-gray-600 ml-1">Space</span>
            </a>
          </div>
        </div>
      </nav>


      <button className="flex-shrink-0 relative text-sm focus:outline-none px-1 border-b bg-white group" onClick={() => showDetails('host', '')}>

        <div className="flex items-center h-8 hover:bg-gray-300 text-sm px-3" >
          <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M216 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
          <span className="ml-2 leading-none" >Host</span>
        </div>
      </button>

      <div>

        <div className="m-2" />

        <div className="h-12 bg-white px-4 pb-4">
          <div className="flex items-center border-2 border-gray-300 rounded-sm p-1">

            <textarea className="flex-grow text-sm px-3 border-l border-gray-300 ml-1" style={{ resize: "none" }}
              placeholder="Search" rows={1} value={activeMemItems.filter}
              onChange={handleFilterChange} />

            <button className="flex-shrink flex items-center justify-center h-6 w-6 rounded hover:bg-gray-200" data-bs-toggle="tooltip" data-bs-placement="top" title="Refresh keys from server" onClick={getActiveMemItems}>
              <svg aria-hidden="true" focusable="false" data-prefix="fas" className="w-3 h-3 mr-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="currentColor" d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path>
              </svg>
            </button>


          </div>
        </div>

      </div>

      <div className="flex flex-col flex-grow overflow-auto">


        <div className="w-60 h-full shadow-md bg-white px-1 " id="sidenavExample">
          <ul className="relative">


            <li className="relative" id="sidenavEx1">
              <a className="flex items-center h-8 hover:bg-gray-300 text-sm px-3" data-mdb-ripple="true" data-mdb-ripple-color="dark" data-bs-toggle="collapse" data-bs-target="#collapseSidenavEx1" aria-expanded="true" aria-controls="collapseSidenavEx1">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" className="w-3 h-3 mr-3" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill="currentColor" d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path>
                </svg>
                <span className="ml-2 leading-none">String</span>
                <svg aria-hidden="true" focusable="false" data-prefix="fas" className="w-3 h-3 ml-auto" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
                </svg>
              </a>
              <ul className="relative accordion-collapse collapse" id="collapseSidenavEx1" aria-labelledby="sidenavEx1" data-bs-parent="#sidenavExample">
                {
                  activeMemItems.string.map(item => (
                    <div className="flex items-center h-8 hover:bg-gray-300 text-sm pl-8 pr-3" onClick={() => showDetails('string', item)}>
                      <div className="flex justify-center w-4">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      </div>
                      <span className="ml-2 leading-none" data-mdb-ripple="true" data-mdb-ripple-color="dark"
                      >{item}</span>
                    </div>
                  ))
                }
              </ul>

            </li>
            <li className="relative" id="sidenavEx2">
              <a className="flex items-center h-8 hover:bg-gray-300 text-sm px-3" data-mdb-ripple="true" data-mdb-ripple-color="dark" data-bs-toggle="collapse" data-bs-target="#collapseSidenavEx2" aria-expanded="false" aria-controls="collapseSidenavEx2">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" className="w-3 h-3 mr-3" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                  <path fill="currentColor" d="M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z"></path>
                </svg>
                <span className="ml-2 leading-none">Hashe</span>
                <svg aria-hidden="true" focusable="false" data-prefix="fas" className="w-3 h-3 ml-auto" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
                </svg>
              </a>
              <ul className="relative accordion-collapse collapse" id="collapseSidenavEx2" aria-labelledby="sidenavEx1" data-bs-parent="#sidenavExample">
                {
                  activeMemItems.hashe.map(item => (
                    <div className="flex items-center h-8 hover:bg-gray-300 text-sm pl-8 pr-3" onClick={() => showDetails('hashe', item)}>
                      <div className="flex justify-center w-4">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      </div>
                      <span className="ml-2 leading-none" data-mdb-ripple="true" data-mdb-ripple-color="dark"
                      >{item}</span>
                    </div>
                  ))
                }
              </ul>
            </li>
            <li className="relative" id="sidenavEx3">
              <a className="flex items-center h-8 hover:bg-gray-300 text-sm px-3" data-mdb-ripple="true" data-mdb-ripple-color="dark" data-bs-toggle="collapse" data-bs-target="#collapseSidenavEx3" aria-expanded="false" aria-controls="collapseSidenavEx3">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" className="w-3 h-3 mr-3" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill="currentColor" d="M192 208c0-17.67-14.33-32-32-32h-16c-35.35 0-64 28.65-64 64v48c0 35.35 28.65 64 64 64h16c17.67 0 32-14.33 32-32V208zm176 144c35.35 0 64-28.65 64-64v-48c0-35.35-28.65-64-64-64h-16c-17.67 0-32 14.33-32 32v112c0 17.67 14.33 32 32 32h16zM256 0C113.18 0 4.58 118.83 0 256v16c0 8.84 7.16 16 16 16h16c8.84 0 16-7.16 16-16v-16c0-114.69 93.31-208 208-208s208 93.31 208 208h-.12c.08 2.43.12 165.72.12 165.72 0 23.35-18.93 42.28-42.28 42.28H320c0-26.51-21.49-48-48-48h-32c-26.51 0-48 21.49-48 48s21.49 48 48 48h181.72c49.86 0 90.28-40.42 90.28-90.28V256C507.42 118.83 398.82 0 256 0z"></path>
                </svg>
                <span className="ml-2 leading-none">List</span>
                <svg aria-hidden="true" focusable="false" data-prefix="fas" className="w-3 h-3 ml-auto" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
                </svg>
              </a>
              <ul className="relative accordion-collapse collapse" id="collapseSidenavEx3" aria-labelledby="sidenavEx3" data-bs-parent="#sidenavExample">
                {
                  activeMemItems.list.map(item => (
                    <div className="flex items-center h-8 hover:bg-gray-300 text-sm pl-8 pr-3" onClick={() => showDetails('list', item)}>
                      <div className="flex justify-center w-4">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      </div>
                      <span className="ml-2 leading-none" data-mdb-ripple="true" data-mdb-ripple-color="dark"
                      >{item}</span>
                    </div>
                  ))
                }
              </ul>
            </li>
          </ul>

        </div>

      </div>

    </nav>


  );

}
