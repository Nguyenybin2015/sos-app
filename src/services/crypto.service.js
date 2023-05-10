/* eslint-disable import/no-extraneous-dependencies */
import CoinGecko from 'coingecko-api';
import { httpStatus } from '../constants/constants.http-status.code.js';
import { serverMsg } from '../constants/constants.message-response.js';
import responseFailed from '../utils/utils.response-failed.js';
import responseRequest from '../utils/utils.response.js';

const CoinGeckoClient = new CoinGecko();

export default async function getListCrypto(res) {
  try {
    const data = await CoinGeckoClient.coins.list();
    return data;
  } catch (error) {
    return responseFailed(res, httpStatus.serverInterval, serverMsg);
  }
}
