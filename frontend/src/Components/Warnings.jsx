import React from 'react'

const Warnings = () => {
  return (
    <div className="flex flex-col items-center justify-center">
        <p className="flex flex-col text-white justify-center text-sm m-6">
          <span className="italic">* Realtor information is subject to change.</span>
          <span className="italic">
            * Realtors Number of Transactions is based off of the number of homes sold in
            the last 18 months.
          </span>
          <span className="italic">* Realtors may overlap in neighboring zip codes.</span>
        </p>
      </div>
  )
}

export default Warnings
