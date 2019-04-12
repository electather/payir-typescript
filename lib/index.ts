import Axios from 'axios';

interface ISendArguments {
  amount: number;
  redirect: string;
  mobile?: string;
  factorNumber?: string;
  description?: string;
}

interface IVerifyArguments {
  token: number;
}

/**
 * this class proved all of your required functions to make a successful payment using pay.ir gateway
 */
export default class PayIrTypescript {
  private readonly API_KEY: string;
  private readonly sendEndPoint = 'https://pay.ir/pg/send';
  private readonly verifyEndPoint = 'https://pay.ir/pg/verify';
  private readonly gateway = 'https://pay.ir/pg/';
  /**
   * Creates an instance of pay ir typescript.
   * @param api api code received from pay.ir
   */
  constructor(api: string) {
    if (api === '' || typeof api !== 'string') {
      throw new Error(
        'You should pass your Pay.ir API Key to the constructor.'
      );
    }
    this.API_KEY = api;
  }
  /**
   * Handle errors of pay ir typescript
   */
  private handleErrors = (reject: Function, error: any) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      reject(error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      reject(new Error('The request was made but no response was received'));
    } else {
      // Something happened in setting up the request that triggered an Error
      reject(
        new Error(
          'Something happened in setting up the request that triggered an Error'
        )
      );
    }
  };
  /**
   * get payment url
   */
  public send = (args: ISendArguments, getRedirect: boolean = false) => {
    return new Promise((resolve, reject) => {
      if (typeof args.amount !== 'number' || args.amount < 1000) {
        throw new Error(
          "Transaction's amount must be a number and equal/greater than 1000"
        );
      } else if (
        typeof args.redirect !== 'string' ||
        args.redirect.length < 5
      ) {
        throw new Error('Redirect URL must be a string.');
      } else if (args.redirect.slice(0, 4) != 'http') {
        throw new Error('Callback URL must start with http/https');
      }

      Axios.post(this.sendEndPoint, { ...args, api: this.API_KEY })
        .then(res => {
          if (getRedirect) {
            resolve(`${this.gateway}${res.data.token}`);
            return;
          }
          resolve(res.data);
        })
        .catch(error => {
          this.handleErrors(reject, error);
        });
    });
  };
  /**
   * Verify successful  payment token
   */
  public verify = (args: IVerifyArguments) => {
    return new Promise((resolve, reject) => {
      if (typeof args.token !== 'number') {
        reject(new Error('token must be a number'));
      }

      Axios.post(this.verifyEndPoint, { ...args, api: this.API_KEY })
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          this.handleErrors(reject, error);
        });
    });
  };
}
