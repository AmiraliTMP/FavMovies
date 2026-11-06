exports.successRespond = function (res, msg, en_msg, data) {
  const resdata = {
    status: 200,
    success: true,
    message: msg,
    en_message: en_msg,
    data: data,
  };
  return res.status(200).json(resdata);
};

// exports.ErrorRespond = function (res, msg, field) {   // پاک بشه
//     let status=422
//     let message=msg
//     if(msg.status){
//         status=msg.status
//         message=msg.message
//         field=msg.field
//     }
//     const data = {
//         status:status,
//         success:false ,
//         message:message,
//         field: field
//     }
//     return res.status(status).json(data)
// }

exports.notFoundRespond = function (res, msg, en_msg) {
  const data = {
    status: 404,
    success: false,
    message: msg,
    en_message: en_msg,
  };
  return res.status(404).json(data);
};

// exports.validationError = function (res, msg, field) {   //TODO: هندل کردن ارورها
//     const resdata = {
//         status:422,
//         success:false ,
//         message:msg,
//         field: field
//     }
//     return res.status(422).json(resdata)
// }

exports.unauthorizedResponse = function (res, msg, en_msg) {
  const data = {
    status: 401,
    success: false,
    message: msg,
    en_message: en_msg,
  };
  return res.status(401).json(data);
};

exports.RefreshTokenException = function (res, msg, en_msg, field) {
  const data = {
    status: 418,
    success: false,
    message: msg,
    field: field,
  };
  return res.status(418).json(data);
};

exports.conflict = function (res, msg, en_msg) {
  const data = {
    status: 409,
    success: false,
    message: msg,
    en_message: en_msg,
  };
  return res.status(409).json(data);
};

exports.errorserver = function (res, msg, en_msg, field) {
  const data = {
    status: 500,
    success: false,
    message: msg,
    en_message: en_msg,
    field: field,
  };
  return res.status(400).json({ data });
};

exports.BadRequest = function (res, msg, en_msg, field) {
  const data = {
    status: 400,
    success: false,
    message: msg,
    en_message: en_msg,
    field: field,
  };
  return res.status(400).json({ data });
};

exports.Forbidden = function (res, msg, en_msg) {
  return res.status(403).json({
    status: 403,
    message: msg,
    en_message: en_msg,
    success: false,
  });
};

exports.ForbiddenPermission = function (res, msg, en_msg) {
  return res.status(418).json({
    status: 418,
    message: msg,
    en_message: en_msg,
    success: false,
  });
};


exports.redirect = function (response, url, status = 302) {
  return response.redirect(status, url);
}