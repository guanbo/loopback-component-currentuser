# Loopback current user component
***
Base on [loopback3 current context](https://loopback.io/doc/en/lb3/Using-current-context.html#use-a-custom-strong-remoting-phase) package current user for loopback operation hooks

## Install

```bash
> npm install loopback-component-currentuser
```

## Config

`./server/component-config.json`
```json
{
  ...
    "loopback-component-currentuser": {
      "filter" : {
        "include": ["userIdentities", "userCredentials"]
     },
     "user": "user"
  }
  ...
}
```

## Usage

```js
'use strict';

module.exports = (Deal) => {
  Deal.observe('before save', (ctx, next)=>{
    if (ctx.instance) {
      if (ctx.isNewInstance) {
        if (ctx.options.accessToken) {
          console.log(ctx.options.currentUser);
        }
      }
      next();
    } else {
      next();
    }
  });
};

```