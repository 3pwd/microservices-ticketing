import { Router, Response, Request } from 'express'
import {
  NotFoundError,
  requireAuth,
  validateRequest,
  ForbiddenError
} from '@r1ogatix/common'
import { param } from 'express-validator'

import { Order } from '../models'

const router = Router()

router.get(
  '/api/orders/:orderId',
  requireAuth,
  [
    param('orderId')
      .isMongoId()
      .withMessage('Incorrectly formatted orderId (must be Mongo Object ID')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const orderId: string = req.params.orderId
    const order = await Order.findById(orderId).populate('ticket')

    if (!order) throw new NotFoundError()
    if (order.userId !== req.currentUser!.id)
      throw new ForbiddenError('You are not the owner of this order')
    return res.status(200).send(order)
  }
)

export { router as showOneOrderRouter }
