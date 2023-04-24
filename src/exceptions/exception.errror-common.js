export default function execptionErrorCommon(res, statusCode, message) {
  res.status(statusCode).send({
    statusCode,
    message
  });
}
