const express = require("express");
const router = express.Router();

const userMiddleware = require("../../user/middleware/userValidation");
const TicketController = require("../controller/ticket.controller");
const TicketMiddleware = require("../middleware/ticket.middleware");
const adminMiddleware = require("../../admin/middleware/adminVlidation");

router.post(
  "/v1/add-ticket-user",
  userMiddleware.AuthenticationUser,
  TicketMiddleware.addTicket,
  TicketController.userCreateTicket
);


router.get(
  "/v1/get-my-ticket-list-user",
  userMiddleware.AuthenticationUser,
  TicketController.getTicketListUser
);

router.get(
  "/v1/get-my-ticket-list-user",
  userMiddleware.AuthenticationUser,
  TicketController.getTicketListUser
);

router.get(
  "/v1/get-ticket-messages-user/:id",
  userMiddleware.AuthenticationUser,
  TicketMiddleware.IdPrameterValidation,
  TicketController.getTicketMessagesUser
);

router.get(
  "/v1/get-my-ticket-list-admin",
  adminMiddleware.AuthenticationAdmin,
  TicketController.getMyTicketListAdmin
);

router.get(
  "/v1/get-ticket-messages-admin/:id",
  adminMiddleware.AuthenticationAdmin,
  TicketMiddleware.IdPrameterValidation,
  TicketController.getTicketMessagesAdmin
);

router.put(
  "/v1/user-answer-ticket",
  userMiddleware.AuthenticationUser,
  TicketMiddleware.answerTicket,
  TicketController.userAnswerTicket
);

router.put(
  "/v1/admin-answer-ticket",
  adminMiddleware.AuthenticationAdmin,
  TicketMiddleware.answerTicket,
  TicketController.adminAnswerTicket
);

router.delete(
  "/v1/admin--ticket-list-delete",
  adminMiddleware.AuthenticationAdmin,
  TicketController.deleteTicketList
);

module.exports = router;