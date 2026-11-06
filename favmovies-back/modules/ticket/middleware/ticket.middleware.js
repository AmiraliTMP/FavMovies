const transforms = require("../../../utilities/apiResponse");
const Validators = require("../../../utilities/Validator");

module.exports = new (class tickectMiddleware {
  async addTicket(req, res, next) {
    const { subject, description } = await req.body;

    //subject
    if (!Validators.IsDefined(subject).Success) {
      return transforms.BadRequest(
        res,
        Validators.IsDefined(subject).Message,
        Validators.IsDefined(subject).en_Message,
        "subject"
      );
    }
    if (!Validators.IsntEmpty(subject).Success) {
      return transforms.BadRequest(
        res,
        Validators.IsntEmpty(subject).Message,
        Validators.IsntEmpty(subject).en_message,
        "subject"
      );
    }
    if (!Validators.IsString(subject).Success) {
      return transforms.BadRequest(
        res,
        Validators.IsString(subject).Message,
        Validators.IsString(subject).en_Message,
        "subject"
      );
    }

    //description
    if (!Validators.IsDefined(description).Success) {
      return transforms.BadRequest(
        res,
        Validators.IsDefined(description).Message,
        Validators.IsDefined(description).en_Message,
        "description"
      );
    }
    if (!Validators.IsntEmpty(description).Success) {
      return transforms.BadRequest(
        res,
        Validators.IsntEmpty(description).Message,
        Validators.IsntEmpty(description).en_message,
        "description"
      );
    }
    if (!Validators.IsString(description).Success) {
      return transforms.BadRequest(
        res,
        Validators.IsString(description).Message,
        Validators.IsString(description).en_Message,
        "description"
      );
    }
    return await next();
  }

  async IdPrameterValidation(req, res, next) {
    let id = req.params.id;

    //id
    if (!Validators.IsDefined(id).Success) {
      return transforms.BadRequest(
        res,
        Validators.IsDefined(id).Message,
        Validators.IsDefined(id).en_Message,
        "id"
      );
    }
    if (!Validators.IsntEmpty(id).Success) {
      return transforms.BadRequest(
        res,
        Validators.IsntEmpty(id).Message,
        Validators.IsntEmpty(id).en_message,
        "id"
      );
    }
    if (!Validators.IsObjectId(id).Success) {
      return transforms.BadRequest(
        res,
        Validators.IsObjectId(id).Message,
        Validators.IsObjectId(id).en_Message,
        "id"
      );
    }

    next();
    return;
  }

  async answerTicket(req, res, next) {
    const { description, ticket_id } = await req.body;

    //description
    if (!Validators.IsDefined(description).Success) {
      return transforms.BadRequest(
        res,
        Validators.IsDefined(description).Message,
        Validators.IsDefined(description).en_Message,
        "description"
      );
    }
    if (!Validators.IsntEmpty(description).Success) {
      return transforms.BadRequest(
        res,
        Validators.IsntEmpty(description).Message,
        Validators.IsntEmpty(description).en_message,
        "description"
      );
    }
    if (!Validators.IsString(description).Success) {
      return transforms.BadRequest(
        res,
        Validators.IsString(description).Message,
        Validators.IsString(description).en_Message,
        "description"
      );
    }

    //ticket_id
    if (!Validators.IsDefined(ticket_id).Success) {
      return transforms.BadRequest(
        res,
        Validators.IsDefined(ticket_id).Message,
        Validators.IsDefined(ticket_id).en_Message,
        "ticket_id"
      );
    }
    if (!Validators.IsntEmpty(ticket_id).Success) {
      return transforms.BadRequest(
        res,
        Validators.IsntEmpty(ticket_id).Message,
        Validators.IsntEmpty(ticket_id).en_message,
        "ticket_id"
      );
    }
    if (!Validators.IsObjectId(ticket_id).Success) {
      return transforms.BadRequest(
        res,
        Validators.IsObjectId(ticket_id).Message,
        Validators.IsObjectId(ticket_id).en_Message,
        "ticket_id"
      );
    }
    return await next();
  }

  async changeStatusTicket(req, res, next) {
    const { ticket_id } = await req.params;
    const { status } = await req.body;

    if (
      !ticket_id ||
      typeof ticket_id != "string" ||
      !Validators.IsObjectId(ticket_id).Success
    ) {
      return await transforms.invalidData(
        res,
        "فرمت شناسه تیکت نامعتبر است",
        "ticket_id"
      );
    }

    if (
      !status ||
      typeof status != "string" ||
      !["open", "in_progress", "closed"].includes(status)
    ) {
      return await transforms.invalidData(
        res,
        "فرمت وضعیت نامعتبر است",
        "status"
      );
    }
    return await next();
  }
  
})();
