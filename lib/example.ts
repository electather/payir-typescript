import PayIrTypescript from './index';

const pay = new PayIrTypescript('testa');

pay
  .send({
    amount: 1000,
    redirect: 'https://www.typescriptlang.org/docs/handbook/modules.html'
  })
  .then(item => {
    const val = <string>item;
    console.log(val);
  })
  .catch(e => console.log(e));

pay
  .verify({
    token: 'token'
  })
  .then(item => console.log(item))
  .catch(e => console.log(e));
