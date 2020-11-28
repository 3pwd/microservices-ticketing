import { Router, Request, Response } from 'express'
import { NotFoundError } from '@r1ogatix/common'

import { Ticket } from '../models'

const router = Router()

router.get('/api/tickets/:id', async ({ params: { id } }, res) => {
  const ticket = await Ticket.findById(id)

  if (!ticket) throw new NotFoundError()
  return res.status(200).send(ticket)
})

export { router as showTicketRouter }
