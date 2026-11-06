const transforms = require("../../../utilities/apiResponse");
const Validators = require("../../../utilities/Validator");

module.exports=new (class notificationMiddlewre{
    async sendNotification(req,res,next){
        const{title,body,reciever}= req.body;
        const key=Object.keys(reciever)[0]
        const id = reciever[key]

        //title
        if (
          typeof title != "string" ||
          !title
        ) {
          return await transforms.BadRequest(res, "عنوان معتبر نیست", "title has problem", "title");
        }

        //body
        if (
          typeof body != "string" ||
          !body
        ) {
          return await transforms.BadRequest(res, "متن معتبر نیست", "body has problem ", "body");
        }
        //reciever
        if (
            !id ||
            typeof id != "string" ||
            !Validators.IsObjectId(id).Success
          ) {
            return await transforms.BadRequest(res, "شناسه گیرنده معتبر نیست", "reciever has problem", "reciever");
          }

          return await next();
    }

    async IdPrameterValidation (req, res, next) {
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
    };
  async deletenotifuser(req , res , next){
    const {notification_id} = req.body;

    
    
      //id
      if (!Validators.IsDefined(notification_id).Success) {
        return transforms.BadRequest(
          res,
          Validators.IsDefined(notification_id).Message,
          Validators.IsDefined(notification_id).en_Message,
          "notification_id"
        );
      }
      if (!Validators.IsntEmpty(notification_id).Success) {
        return transforms.BadRequest(
          res,
          Validators.IsntEmpty(notification_id).Message,
          Validators.IsntEmpty(notification_id).en_message,
          "notification_id"
        );
      }
      if (!Validators.IsObjectId(notification_id).Success) {
        return transforms.BadRequest(
          res,
          Validators.IsObjectId(notification_id).Message,
          Validators.IsObjectId(notification_id).en_Message,
          "notification_id"
        );
      }
    
      next();
      return;

  }
})