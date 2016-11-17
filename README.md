# node-message-retention
A demonstration of gc-resistant http parsing

# Setup
```
npm install
npm start
```

Running `npm start` will simulate a request/response lifecycle using keep-alive connections. After handling, the program will GC and print the path to a heapsnapshot before exiting. The heapsnapshot can be viewed in chrome dev tools.

## Example
![Image](https://github.com/jbellenger/node-message-retention/raw/master/heapsnapshot.png)

### Interpretation
The heapsnapshot above shows that after a complete request/response lifecycle and a GC, the server retains a reference to the request (the type shown here is `IncomingMessage`) after it is no longer useful.

This is problematic as the server may have set properties on the request with the expectation that they would be garbage collected within a reasonable time. This example uses sets a 30MB buffer named `REQUEST_LOCAL_DATA` on the request, though frameworks like express use the same underlying mechanism to manage [request-scoped data](http://expressjs.com/en/4x/api.html#res.locals)