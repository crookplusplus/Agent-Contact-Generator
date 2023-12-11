import React from 'react'
import Card from '../Components/Card';

const AboutPage = () => {
  return (
    <Card>
      <div className='flex flex-col text-center'>
        <h1 className="sm:text-4xl text-4xl font-extrabold font-sil italic title-font mx-2 my-4 text-color4 drop-shadow-[3px_3px_5px_rgba(91,91,91,0.58)]">
          About Acquaint
        </h1>
        <p className="lg:w-3/4 w-4/5 mx-auto leading-relaxed text-color3 text-lg font-medium mb-4">
          Acquaint is a startup company that is looking to help Loan Officers build working relationships with Top-Selling Real
          Estate Agents in their area. With the number of real estate transactions steadily decreasing, it has become increasingly more important
          for a Loan Officer to expand their network to make a living. Acquaint is here to provide the contact information of the Top-Selling 
          Real Estate Agents to help the Loan Officer spend less time on Researching Real Estate Agents and spend more time making valuable
          connections.
        </p>
      </div>
    </Card>
  );
}

export default AboutPage
