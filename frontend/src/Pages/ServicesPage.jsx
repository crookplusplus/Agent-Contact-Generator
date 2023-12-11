import React from 'react'
import Card from '../Components/Card';

const ServicesPage = () => {
  return (
    <Card>
      <div className='flex flex-col text-center'>
        <h1 className="sm:text-4xl text-2xl font-extrabold italic title-font mx-2 my-4 font-sil text-color4">
          Affordable Data Solutions, So You can Focus on Closing Deals.
        </h1>
        <p className="lg:w-3/4 w-4/5 font-[Menlo] text-white mx-auto leading-relaxed text-lg font-medium mb-4">
        Flexible Pricing Built for Your Business Growth
        </p>
      </div>
      <ul className='flex items-start justify-between px-4 py-4 gap-8 mt-10 md:flex-row flex-col'>
        <li className='w-full lg:w-[32%] px-10 pt-16 pb-8 bg-color3 bg-opacity-60 rounded-lg self-stretch hover:scale-105 hover:shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.1)] transition-all duration-150 ease-in'>
          <h2 className='text-center text-black font-semibold text-lg tracking-wider mb-5 drop-shadow-[3px_3px_5px_rgba(91,91,91,0.58)]'>
            First Option
          </h2>
          <p className="text-center tracking-tighter block mb-14">
            <span className="text-4xl font-bold">$100</span>
            <span className="text-black/40 text-center">/mo</span>
          </p>
          <button class="w-full p-2 bg-color2 text-color4 rounded-md font-semibold hover:bg-color5 hover:text-color2 transition-all duration-150 ease-in mb-8 border-[#13181f]">
            add to cart
          </button>
          <ol className="list-disc text-color4 w-[80%] mx-auto">
            <li><span class="text-black text-xs font-semibold">439,000 Est. Impressions</span></li>
            <li><span class="text-black text-xs font-semibold">180 x 150</span></li>
            <li><span class="text-black text-xs font-semibold">Middle Right</span></li>
          </ol>
        </li>
        <li class="w-full lg:w-[32%] px-10 pt-16 pb-8 bg-color3 bg-opacity-60 rounded-lg self-stretch hover:scale-105 hover:shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.1)] transition-all duration-150 ease-in relative group">
          <div class="absolute top-0 left-1/2 -translate-x-1/2 rounded-br-xl rounded-bl-xl text-color1 px-8 py-2 bg-color4 transition-all duration-150 ease-in group-hover:shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.1)]">
            Hot take!
          </div>
          <h2 class="text-center font-semibold text-lg tracking-wider mb-3 drop-shadow-[3px_3px_5px_rgba(91,91,91,0.58)]">
            Sidebar Block
          </h2>
          <p class="text-center tracking-tighter block mb-14">
            <span class="text-4xl font-bold">$400</span>
            <span class="text-black/40 text-center">/mo</span>
          </p>
          <button class="w-full p-2 bg-color2 text-color4 rounded-md font-semibold hover:bg-color5 hover:text-color2 transition-all duration-150 ease-in mb-8 border-[#13181f]">
            add to cart
          </button>
          <ol class="list-disc text-color4 w-[80%] mx-auto">
            <li><span class="text-black text-xs font-semibold">439,000 Est. Impressions</span></li>
            <li><span class="text-black text-xs font-semibold">300 x 250</span></li>
            <li><span class="text-black text-xs font-semibold">Middle Right</span></li>
          </ol>
        </li>
        <li class="w-full lg:w-[32%] px-10 pt-16 pb-8 bg-color3 bg-opacity-60 rounded-lg self-stretch hover:scale-105 hover:shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.1)] transition-all duration-150 ease-in relative group">
          <div class="absolute top-0 left-1/2 -translate-x-1/2 rounded-br-xl rounded-bl-xl bg-color5 text-color1 px-8 py-2 group-hover:bg-red-800 group-hover:text-white transition-all duration-150 ease-in group-hover:shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.1)]">
            Sold Out
          </div>
          <h2 class="text-center font-semibold text-lg tracking-wider mb-3 drop-shadow-[3px_3px_5px_rgba(91,91,91,0.58)]">
            Premium Sidebar
          </h2>
          <p class="text-center tracking-tighter block mb-14">
            <span class="text-4xl font-bold">$2,600</span>
            <span class="text-black/40 text-center">/mo</span>
          </p>
          <button class="w-full p-2 bg-color2 text-color4 rounded-md font-semibold hover:bg-color5 hover:text-color2 transition-all duration-150 ease-in mb-8 border-[#13181f]">
            get on the waiting list
          </button>
          <ol class="list-disc text-color4 w-[80%] mx-auto">
              <li><span class="text-black text-xs font-semibold">2,000,000 Est. Impressions</span></li>
              <li><span class="text-black text-xs font-semibold">300 x 250</span></li>
              <li><span class="text-black text-xs font-semibold">Top Right</span></li>
          </ol>
        </li>
      </ul>
    </Card>
  );
}

export default ServicesPage
