import React from 'react'

const Card = (props) => {
  return (
    <section className='container mx-auto font-[Menlo]'>
        <div className='flex flex-col mx-auto rounded-lg bg-transparent ring-2 ring-color5'>
            {props.children}
        </div>
    </section>
  )
}

export default Card
