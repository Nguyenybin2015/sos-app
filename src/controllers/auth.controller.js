import { httpStatus } from "../constants/constants.http-status.code.js";
import { authMsg, serverMsg } from "../constants/constants.message-response.js";
import { registerAccountService } from "../services/auth.service.js";

export async function registerAccount(req, res) {
  try {
    const { body } = req;
    const result = await registerAccountService(res, body);
    if (!res.headerSent) {
      res.status(httpStatus.ok).send({
        statusCode: httpStatus.ok,
        data: result,
        message: authMsg.registerAccount,
      });
    }
    // res.send({ msg: 'hello' })
  } catch (error) {
    res.status(httpStatus.serverInterval).send({
      statusCode: httpStatus.serverInterval,
      message: serverMsg,
    });
  }
}

export function login(req, res) {}
