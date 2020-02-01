# call /projects api against dev server.

```json
{
    "config": {
        "headers": {
            "Accept": "application/json, text/plain, */*"
        },
        "maxContentLength": -1,
        "method": "get",
        "timeout": 0,
        "transformRequest": [
            null
        ],
        "transformResponse": [
            null
        ],
        "url": "http://localhost:8181/token",
        "withCredentials": true,
        "xsrfCookieName": "XSRF-TOKEN",
        "xsrfHeaderName": "X-XSRF-TOKEN"
    },
    "data": {
        "login": false,
        "message": "either token or user credentials is not valid."
    },
    "headers": {
        "content-type": "application/json;charset=UTF-8"
    },
    "request": {},
    "status": 401,
    "statusText": ""
}
```
