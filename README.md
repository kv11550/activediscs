## ActiveDiscs v1.0.0

ActiveDiscs is a Redis like open-source, in-memory data structure store.  ActiveDiscs is written by typescripts.  It can be easily compiled and used on Linux and Windows.

ActiveDiscs has the a Admin Desktop written by react typescripts.

ActiveDiscs has the Nodejs and C# client so far, might provide more client for other language in the future. 

# Desktop Preview
[Demo](http://www.ac.workflowexp.com:7000/)
``` bash
user: demo 
pass: 1234abcd
```

# Install and build the source code for ActiveDiscs:
1. Download the source code:
[ActiveDiscs source code](https://github.com/kv11550/activediscs)
2.	Under Server folder:
``` bash
$ npm install
$ npm run build
```
3.	Under Desktop folder:
``` bash
$ npm install
$ npm run build
```

# Download the latest ready-to-use package:
1.	[Download the latest binary package](https://objectstorage.ca-toronto-1.oraclecloud.com/n/yzx9535dp9qz/b/bucket-20220417-1402/o/activediscs_release_v1.0.0.zip)
2.	Unzip the zip file
3.  The downloadable package include server, desktop and the client side dirver, user don't need to go through the install and build steps.

# Basic Usage:
1.	Edit the environment file:
server\dist\ .env

2.	Start the server
cd server\dist
Node index 

3.	Navigate to http://localhost:7000, this will open the desktop page.

4.	Refer to the sample code in the driver folders to see how to create the client and update data in ActiveDiscs.

