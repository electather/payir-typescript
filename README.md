# pay.ir node.js typescript module

## what is

By using this package, you'll be able to work with Pay.ir REST Api in Node.js (Back-End) without any problem! This package is usable for all Node.js Frameworks such as Express.js, Hapi.js, Sails.js, Adonis.js or others.

This package is written in Typescript and targets ES6. the main difference between this package and [official](https://github.com/erfansahaf/payir) one is the typings and readability. I rewrote everything from scratch and added the much needed improvements to the original package.
so even if you don't use the typescript to write your app the improvements must be clear.

## improvements

- typings. get assist from IDEs when writing your code.
- better networking. this library uses [Axios](https://github.com/axios/axios) for networking and error handling is much more to my liking.
- smaller code due to better error handling

## Installing

first you need to pass your API key to the constructor.

Using npm:

```bash
npm install payir-typescript
```

## Example

import library using

```javascript
const Pay = require("payir-typescript");
```

or:

```javascript
import PayIrTypescript from "payir-typescript";
```

then pass the API key to the constructor

```javascript
const pay = new PayIrTypescript(APIKEY);
```

now you can use the following methods on the pay instance

### Send

this method accepts payment parameters as an object and returns a promise.

```javascript
pay
  .sendRequest(
    {
      amount: AMOUNT,
      redirect: REDIRECT_URL
    },
    true
  )
  .then(redirectUrl => {
    console.log(redirectUrl);
  })
  .catch(e => console.log(e));
```

or using `async/await` we can have

```javascript
const payment = await pay.sendRequest({
  amount: AMOUNT,
  redirect: REDIRECT_URL
});
```

full list of parameters accepted are listed in [pay.ir](https://pay.ir/docs/gateway/).

### Verify

this method accepts verify parameters as an object and returns a promise.

```javascript
pay
  .verify({
    token: "token"
  })
  .then(item => console.log(item))
  .catch(e => console.log(e));
```

or using `async/await` we can have

```javascript
const payment = await pay.verify({
  token: "token"
});
```

full list of parameters accepted are listed in [pay.ir](https://pay.ir/docs/gateway/).
