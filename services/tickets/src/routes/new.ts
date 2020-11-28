import { Router, Request, Response } from 'express'
import { body } from 'express-validator'
import { requireAuth, validateRequest } from '@r1ogatix/common'

import { Ticket } from '../models'

const router = Router()

router.post(
  '/api/tickets',
  requireAuth,
  [
    body('title')
      .notEmpty()
      .isString()
      .withMessage('Valid title required (not empty string)'),
    body('price').isFloat({ min: 0 }).withMessage('Valid price required (> 0)')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const {
      currentUser,
      body: { title, price }
    } = req

    // Add ticket to DB
    // Sure that currentUser is not undefined due to requireAuth middleware
    const ticket = Ticket.build({ title, price, userId: currentUser!.id })
    await ticket.save()
    return res.status(201).send(ticket)
  }
)

export { router as createTicketRouter }
