const ticketRepositories = require("../repositories/ticket.repositories");
const transforms = require("../../../utilities/apiResponse");
const userRepositories = require("../../user/repositories/user.repositories");
const { sendNotification } = require("../../push-notification");

const { find } = require("lodash");
module.exports = new (class TicketService {
  async userCreateTicket(req, res) {
    const { subject, description } = await req.body;
    const { user } = await req;

    let ticket_detail = {
      subject,
      user,
    };

    const { _id } = await ticketRepositories.userCreateTicket(ticket_detail);

    let result = await ticketRepositories.addUserTicketMessage(
      _id,
      user,
      description
    );

    return transforms.successRespond(
      res,
      "تیکت با موفقیت ساخته شده",
      "ticket created successfully",
      result
    );
  }


  async getTicketListUser(req, res) {
    const { user } = await req;

    const findTickets=await ticketRepositories.find({
        $and:[
            { "creator.user_id": { $exists: true } },
            { "creator.user_id": user }
        ]
    })

    if (!findTickets) {
      return await transforms.notFoundRespond(res, "تیکتی یافت نشد");
    }

    return await transforms.successRespond(
      res,
      findTickets,
      "تیکت های شما با موفقیت یافت شد"
    );
  }

  async getTicketMessagesUser(req, res) {
    const { user } = await req;
    const { id } = await req.params;

    const findTicket = await ticketRepositories.findOne({
      _id: id,
      "creator.user_id": user,
    });

    if (!findTicket) {
      return await transforms.notFoundRespond(res, "تیکت یافت نشد");
    }

    const findMessages = await ticketRepositories.findMessages({ "ticket_id":id });

    if (!findMessages.length) {
      return await transforms.notFoundRespond(res, "پیامی در این تیکت یافت نشد");
    }

    return await transforms.successRespond(
      res,
      findMessages,
      "اطلاعات با موفقیت یافت شد"
    );
  }

  async getMyTicketListAdmin(req, res) {
    const limit = req.query.limit ? req.query.limit : 40;
    const page = req.query.page ? req.query.page : 1;
    const pagination = req.query.pagination === "true"; 
    const search = req.query.search;
  
    const $and = [{ isDeleted: false }];
    const $or = [];
  
    if (search) {
      $or.push({ subject: { $regex: new RegExp(search, "i") } });
      const matchingUsers = await userRepositories.findAll({
        $or: [
          { userName: { $regex: new RegExp(search, "i") } },
          { mobile: { $regex: new RegExp(search, "i") } }
        ]
      });
  
      if (matchingUsers.length > 0) {
        const userIds = matchingUsers.map(user => user._id);
        $or.push({ "creator.user_id": { $in: userIds } });
      }
      
      if ($or.length > 0) {
        $and.push({ $or });
      }
    }
  
    const finalQuery = { $and };
  
    let findTickets;
    if (pagination) {
      const options = { page, limit };
      findTickets = await ticketRepositories.paginate(finalQuery, options);
    } else {
      findTickets = await ticketRepositories.findAllTicketAdmin(finalQuery);
    }
  
    return await transforms.successRespond(
      res,
      findTickets,
      "تیکت های شما با موفقیت یافت شد"
    );
  }


  async getTicketMessagesAdmin(req, res) {
    const { id } = await req.params;

    const findTicket = await ticketRepositories.findOne({_id:id});

    if (!findTicket) {
      return await transforms.notFoundRespond(res, "تیکت یافت نشد" ,"ticket not found ");
    }

    const findMessages = await ticketRepositories.findMessages({ "ticket_id":id });

    if (!findMessages.length) {
      return await transforms.notFoundRespond(res, "پیامی در این تیکت یافت نشد" ,"there is no ticketmessage in ticket ");
    }

    return await transforms.successRespond(
      res,
      findMessages,
      "اطلاعات با موفقیت یافت شد"
    );
  }

  async deleteTicket(req, res) {
    const { ticket_id } = await req.params;
    const findTicket = await ticketRepositories.findByid(ticket_id);
    if (!findTicket) {
      return await transforms.notFoundRespond(res, "تیکت یافت نشد");
    }
    const findTicketMessages = await ticketRepositories.findMessages({
      ticket_id,
    });

    for (const message of findTicketMessages) {
      message.isDeleted = await true;
      const now = await new Date();
      message.deletedDate = await now;
      await message.save();
    }

    findTicket.isDeleted = await true;
    const now = await new Date();
    findTicket.deletedDate = await now;
    await findTicket.save();

    return await transforms.successRespond(
      res,
      findTicket,
      "اطلاعات با موفقیت حذف شد"
    );
  }

  async userAnswerTicket(req, res) {
    const { description,ticket_id } = await req.body;
    const { user } = await req;

    const findTicket = await ticketRepositories.findByid(ticket_id);
    if (!findTicket) {
      return await transforms.notFoundRespond(res, "تیکت یافت نشد");
    }

    const { creator } = await findTicket;

    if (!creator.user_id || !creator.user_id.equals(user._id)) {
      return await transforms.Forbidden(res, "پاسخگویی به این تیکت مجاز نیست");
    }

    const result = await ticketRepositories.addUserTicketMessage(
      ticket_id,
      user,
      description
    );

    return transforms.successRespond(res, result, "پیام با موفقیت ارسال شد");
  }

  async adminAnswerTicket(req, res) {
    const { description,ticket_id  } = await req.body;
    const { admin } = await req;
    console.log(ticket_id);
    const user_type = "USER";
    const user_role = "admin";
    const findTicket = await ticketRepositories.findOne({_id:ticket_id});
    
    const user_id = findTicket.creator.user_id
    console.log(user_id);
    
    const finduser= await userRepositories.findOne({_id:user_id})
    const destination_device_token = await finduser.push_token;
    if (destination_device_token) {
            await sendNotification(
              destination_device_token,
              {
                title: "جواب تیکت",
                body: description,
              },
              { from: user_role, to: user_type },
              finduser._id
            );
          }
    console.log(user_id);
    
    if (!findTicket) {
      return await transforms.notFoundRespond(res, "تیکت یافت نشد","ticket not found");
    }

    const result = await ticketRepositories.addAdminTicketMessage(
      ticket_id,
      admin,
      description
    );
    findTicket.updatedAt =  new Date()
    await findTicket.save();
    return transforms.successRespond(res, result, "تیکت با موفقیت پاسخ داده شد");
  }

  async changeStatusTicket(req, res) {
    const { ticket_id } = await req.params;
    const { status } = await req.body;
    const findTicket = await ticketRepositories.findByid(ticket_id);
    if (!findTicket) {
      return await transforms.notFoundRespond(res, "تیکت یافت نشد");
    }
    findTicket.status = await status;
    await findTicket.save();
    return await transforms.successRespond(
      res,
      findTicket,
      "وضعیت تیکت با موفقیت تغییر یافت"
    );
  }
  async deleteTicketList(req,res){
    const {tickets} =await  req.body
    if (!tickets || !Array.isArray(tickets)) {
      return transforms.BadRequest(res,"آیدی تیکت ها را به صورت صحیح ارسال کنید ","id's must be sent in array ");
    }
    const result = await ticketRepositories.deletelist(tickets)

    return transforms.successRespond(res,"تیکت ها با موفقیت حذف شد ","tickets deleted successfully. ")

  }
 
  
})();
