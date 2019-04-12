import PayIrTypescript from './index';

const pay = new PayIrTypescript('testa');

pay.send({
  amount: 1000,
  redirect: 'https://www.typescriptlang.org/docs/handbook/modules.html'
});
