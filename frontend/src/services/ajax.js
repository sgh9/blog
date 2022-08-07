const url = process.env.SERVER_URL || 'http://localhost:8080';

class Ajax {

    async get(path="", reqBody= {}, headers= {}, paramsObj= {}) {
        let paramsLen = Object.keys(paramsObj).length;
        let params = '';

        if(paramsLen > 0) {
            params += "?" ;
            let i = paramsLen;
            for(let key in paramsObj) {
                params += key + '=' + paramsObj[key];
                i--;
                if(i !== 0 ) params += "&";
            }
        }
        const response = await fetch(url + path + params);
        const data = await response.json();
        
        if (response.status === 400) {
            throw new Error(response.message)
        }

        if (response.status === 401) {
            throw new Error(response.message)
        }

        if (response.status === 200) {
            return data;
        }
    }

    async post(path="", reqBody= {}, headers= {}, paramsObj= {}) {
        let paramsLen = Object.keys(paramsObj).length;
        let params = '';

        if(paramsLen > 0) {
            params += "?" ;
            let i = paramsLen;
            for(let key in paramsObj) {
                params += key + '=' + paramsObj[key];
                i--;
                if(i !== 0 ) params += "&";
            }
        }

        const response = await fetch(url + path + params, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
                ...headers
            },
            body: JSON.stringify(reqBody)
        });
        const data = await response.json();
        
        if(response.status === 400) {
            throw new Error(response.message)
        }

        if(response.status === 401) {
            throw new Error(response.message)
        }

        if(response.status === 200) {
            return data;
        }
    }
}

export const ajax = new Ajax();