const ticketMessagesModel = require("../models/ticket-messages.model");
const ticketModel = require("../models/ticket.model");

module.exports = new (class TicketRepository {
  async addUserTicketMessage(ticket_id, user_id, description) {
    return await ticketMessagesModel.create({
      ticket_id,
      sender: {
        user_id: user_id,
      },
      description,
    });
  }

  async addAdminTicketMessage(ticket_id, admin_id, description) {
    return await ticketMessagesModel.create({
      ticket_id,
      sender: {
        admin_id: admin_id,
      },
      description,
    });
  }
  async userCreateTicket(ticket_detail) {
    const { subject, user } = await ticket_detail;
    return await ticketModel.create({
      subject,
      creator: {
        user_id: user,
      },
    });
  }
  async adminCreateTicket(ticket_detail) {
    const { subject, admin, travel_id } = await ticket_detail;
    return await ticketModel.create({
      subject,
      creator: {
        admin_id: admin,
      },
      travel_id
    });
  }

  async findByid(id) {
    return await ticketModel.findById(id);
  }

  async find(condition) {
    return await ticketModel.find(condition).sort({ createdAt: -1 });
  }
  async findAllTicketAdmin(condition) {
    return await ticketModel.find(condition).populate([
      { path: "creator.user_id", select: "_id userName mobile" },
    ]).sort({createdAt: -1})
  }

  async findOne(condition) {
    return await ticketModel.findOne(condition);
  }

  async findMessages(condition) {
    return await ticketMessagesModel.find(condition).populate([
      { path: "sender.admin_id", select: "_id userName" },
      { path: "sender.user_id", select: "_id userName mobile" },
    ]);
  }
   async paginate(query,options){
          return await ticketModel.paginate(query,{
              ...options,
              populate: [
                { path: "creator.user_id", select: "_id userName mobile" },
              ],
              sort: { createdAt: -1 }
          })
        }
  async deletelist(condition){
    return await ticketModel.updateMany({_id:{$in:condition} },{ $set: { isDeleted: true }})
  }
})();
