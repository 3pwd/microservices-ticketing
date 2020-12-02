import { useState } from 'react'

const TicketForm = () => {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')

  const onBlur = () => {
    // round
    const value = parseFloat(price)
    if (isNaN(value)) return
    setPrice(value.toFixed(2))
  }
  return (
    <div>
      <h1>Create a ticket</h1>
      <form action=''>
        <div className='form-group'>
          <label>Title</label>
          <input
            className='form-control'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label>Price</label>
          <input
            type='number'
            step='0.01'
            onBlur={onBlur}
            className='form-control'
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
        </div>
        <button className='btn btn-primary'>Submit</button>
      </form>
    </div>
  )
}

export default TicketForm
