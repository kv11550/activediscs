import axios from "axios";
import config from "../config/config";



const hostname: string = window.location.hostname;

let currentAuthToken: string = '';

export const setToken = (token: string) => {
  currentAuthToken = token;
}


export const runCommand = async <T>(command: any, params: any) : Promise<T> => {
  return new Promise<T>((resolve, reject) => {

    //console.log('debug -- 4');
    //console.log(currentAuthToken);

    //console.log(config);

    const url: string =  `http://${hostname}:${config.port}/${command}`;

    //console.log(url);

    axios
      .post(url, params, {
        headers: {
        Authorization: `Bearer ${currentAuthToken}`
      }
      })
      .then((res: any) => {
        resolve(res.data);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};


export const upload = async <T>(command: any, file: any) : Promise<T> => {
  return new Promise<T>((resolve, reject) => {

    const formData = new FormData();
    formData.append('file', file);

    const url: string =  `http://${hostname}:${config.port}/${command}`;
    axios
      .post(url, formData, {
        headers: {
          'Content-Type': file.type
        }
      })
      .then((res: any) => {
        resolve(res.data);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};

