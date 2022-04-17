
import { IcacheHashKey, ItypeList } from "./action.interface";
import moment from 'moment';

const NodeCache = require("node-cache");
const myCache = new NodeCache();

enum InternalKey {
    Internal = "active-Mem-Internal",
    Single = "active-Mem-String",
    Hashe = "active-Mem-Hashe",
    List = "active-Mem-List",
    HasheList = "active-Mem-HasheList"
}


/*
var casheKeyList: {
    single: string[],
    hashe: string[]
} = {
    single: [],
    hashe: []
};

*/

var cacheHashKeys: IcacheHashKey[] = [];

var commandNum = 0;

export const getCommandNum = (body: any) => {

    return commandNum;

}


export const setInternal = (body: any) => {

    var result = "";

    var key: string = body.key;
    var value: string = body.value;

    var keyObject = {
        type: InternalKey.Internal,
        name: key
    }
    var keyString = JSON.stringify(keyObject);

    var existingValue = myCache.get(keyString);

    var existingList = [];

    if (existingValue) {

         existingList = JSON.parse(existingValue); 

    }

    var newItem = {
        time: moment().format('YYYY-MM-DD HH:mm:ss'),
        value: value
    }

    existingList.push(newItem);

    myCache.set(keyString, JSON.stringify(existingList));

    result = "ok";

    return result;

}


export const getInternal = (body: any) => {

    var key: string = body.key;

    var keyObject = {
        type: InternalKey.Internal,
        name: key
    }
    var keyString = JSON.stringify(keyObject);

    var existingValue = myCache.get(keyString);

    var existingList = [];

    if (existingValue) {

         existingList = JSON.parse(existingValue); 

    }

    return existingList;

}



export const incr = (body: any) => {

    commandNum ++;

    var keyObject = {
        type: InternalKey.Single,
        name: body.key
    }
    var keyString = JSON.stringify(keyObject);

    var value = myCache.get(keyString);

    var nextValue = 0;
    if (!value) {
        nextValue = 1
    } else {
        nextValue = Number(value) + 1;
    }
    myCache.set(keyString, nextValue.toString());
    
    return nextValue.toString();

}


export const set = (body: any) => {

    commandNum ++;

    // var key = InternalKey.Single + "_" + body.key;
    // casheKeyList.single.push(body.key);
    // casheKeyList.single = [... new Set(casheKeyList.single)];

    var keyObject = {
        type: InternalKey.Single,
        name: body.key
    }
    var keyString = JSON.stringify(keyObject);

    var value = body.value;

    myCache.set(keyString, value);

}


export const get = (body: any): any => {

    commandNum ++;

    //  var key = InternalKey.Single + "_" + body.key;

    var keyObject = {
        type: InternalKey.Single,
        name: body.key
    }
    var keyString = JSON.stringify(keyObject);

    var value = myCache.get(keyString);
    return value;

}


export const hmset = (body: any) => {

    commandNum ++;

    var result = "";
    var hasheName = body.key;
    //  casheKeyList.hashe.push(hasheName);
    //  casheKeyList.hashe = [... new Set(casheKeyList.hashe)];

    var value = body.value;

    //  console.log(typeof value);

    if (typeof value === "object") {

        var keyList = Object.keys(value);

        /*
        var hasheDetails: IcacheHashKey | undefined = cacheHashKeys.find(item => item.hasheName === hasheName);

        if (!hasheDetails) {

            hasheDetails = {
                hasheName: hasheName,
                keys: keyList
            };
            cacheHashKeys.push(hasheDetails);

        } else {

            hasheDetails.keys.push(...keyList);
            hasheDetails.keys = [... new Set(hasheDetails.keys)];

        }
        */

        var toSave = keyList.reduce((result: any, field: string) => {
            // var newkey: string = InternalKey.Hashe + "_" + hasheName + "_" + field;
            var keyObject = {
                type: InternalKey.Hashe,
                name: hasheName,
                field: field
            }
            var keyString = JSON.stringify(keyObject);
            var item = {
                key: keyString,
                val: value[field]
            }
            result.push(item);
            return result;
        }, [])

        //  console.log(toSave);

        myCache.mset(toSave);

        result = "ok";
    } else {
        result = "value has to be a object";
    }


    return result;
    //console.log(value);
    //myCache.set(key, value);

}


export const hset = (body: any) => {

    commandNum ++;

    var result = "";

    var hasheName = body.key;

    var field = body.field;

    var value = body.value;

    var keyObject = {
        type: InternalKey.Hashe,
        name: hasheName,
        field: field
    }
    var keyString = JSON.stringify(keyObject);

    result = "ok";

    myCache.set(keyString, value);

    return result;

}


export const hvals = (body: any): any => {

    commandNum ++;

    var activeKey = body.key;

    var cacheKeys = myCache.keys();

    var hasheCacheKeys = cacheKeys.map((item: string) => JSON.parse(item)).filter((item: any) => item.type === InternalKey.Hashe && item.name === activeKey);

    var hasheCacheKeysStringList = hasheCacheKeys.map((item: any) => JSON.stringify({
        type: InternalKey.Hashe,
        name: item.name,
        field: item.field
    }))

    //console.log('debug');

    //console.log(hasheCacheKeysStringList);

    var value = myCache.mget(hasheCacheKeysStringList);

    var hasheValue = Object.keys(value).reduce((result: any, field: string) => {
        var item = value[field];
        result.push(item);
        return result;
    }, [])
    return hasheValue;

}


export const hget = (body: any): any => {

    commandNum ++;

    //var key = InternalKey.Hashe + "_" + body.key + "_" + body.field;
    var hasheCacheKey = {
        type: InternalKey.Hashe,
        name: body.key,
        field: body.field
    }
    var hasheCacheKeyString = JSON.stringify(hasheCacheKey);

    var value = myCache.get(hasheCacheKeyString);
    return value;

}

export const keys = (): ItypeList => {

    commandNum ++;

    var result: ItypeList = {
        string: [],
        hashe: [],
        list: []
    }

    var keys = myCache.keys();

    result.hashe = keys.map((item: string) => JSON.parse(item)).filter((item: any) => item.type === InternalKey.Hashe).map((item: any) => item.name);

    result.hashe = [... new Set(result.hashe)];

    result.string = keys.map((item: string) => JSON.parse(item)).filter((item: any) => item.type === InternalKey.Single).map((item: any) => item.name);

    result.list = keys.map((item: string) => JSON.parse(item)).filter((item: any) => item.type === InternalKey.List).map((item: any) => item.name);


    //console.log(keys);

    //console.log(keys[0].substr(0,5));

    //result.string = keys.filter((item: string) => item.substr(0,6) === InternalKey.Single).map((item : string) => item.substr(7));
    //result.hashe = keys.filter((item: string) => item.substr(0,5) === InternalKey.Hashe).map((item : string) => item.substr(item.indexOf("_") + 1).substr(0, item.indexOf("_") + 1));

    // result.hashe = [... new Set(result.hashe)];

    return result;
}

export const hkeys = (body: any): string[] => {

    commandNum ++;

    var result: string[] = [];

    /*
    var hasheDetails: IcacheHashKey | undefined = cacheHashKeys.find(item => item.hasheName === key);

    if (hasheDetails) {
        result = hasheDetails.keys;
    }
    */
    var keys = myCache.keys();

    result = keys.map((item: string) => JSON.parse(item)).filter((item: any) => item.type === InternalKey.Hashe && item.name === body.key).map((item: any) => item.field);

    return result;

}


export const lrpush = (body: any) => {

    commandNum ++;

    var result = "";

    try {

        if (body.value && body.key) {

            var value = body.value;

            var listCacheKey = {
                type: InternalKey.List,
                name: body.key,
            }

            var listCacheKeyString = JSON.stringify(listCacheKey);

            var listString = myCache.get(listCacheKeyString);

            console.log('debug');
            console.log(listString);

            var listValue = [];

            var id = 0;

            if (listString) {
                listValue = JSON.parse(listString);
                if (listValue.length > 0) {
                    var lastItem = listValue[listValue.length - 1];
                    id = lastItem.id + 1;
                }
            }

            var newItem = {
                id: id,
                value: value
            }

            listValue.push(newItem);

            myCache.set(listCacheKeyString, JSON.stringify(listValue));

            result = "ok";

        }

    } catch (err) {

        console.log(err);
    }

    return result;

}

export const lrange = (body: any) => {

    commandNum ++;

    var listCacheKey = {
        type: InternalKey.List,
        name: body.key
    }

    var start = body.start;

    var end = body.end;

    var listCacheKeyString = JSON.stringify(listCacheKey);

    var listString = myCache.get(listCacheKeyString);

    var listObjectList = [];

    if (listString) {

        var listFull = JSON.parse(listString);

        if (end === -1) {
            listObjectList = listFull.slice(start);
        }
        else {
            listObjectList = listFull.slice(start, end + 1);
        }

    }

    var listValue = listObjectList.map((item: any) => item.value);


    return listValue;

}



export const llen = (body: any) => {

    commandNum ++;

    var length = 0;

    try {
        var listCacheKey = {
            type: InternalKey.List,
            name: body.key
        }

        var listCacheKeyString = JSON.stringify(listCacheKey);

        var listString = myCache.get(listCacheKeyString);

        if (listString) {

            var listFull = JSON.parse(listString);
            length = listFull.length;

        }

    } catch (err) {
        console.log(err);
    }

    return length.toString();

}
