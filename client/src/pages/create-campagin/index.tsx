import { FaEthereum } from "react-icons/fa";
import { MdCampaign } from "react-icons/md";

export default function __createCampaign() {
  return (
    <div className=" p-6">
      <div className="flex items-center space-x-5">
        <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
          <MdCampaign />
        </div>
        <div className="block pl-2 font-semibold text-xl self-start text-white">
          <h2 className="leading-relaxed">Create an Campaign</h2>
          <p className="text-sm text-gray-300 font-normal leading-relaxed">Launch Your Next Big Campaign!</p>
        </div>
      </div>

      <div className=" flex text-white">
        {/* right-side */}
        <div className=" w-1/2 py-6 flex flex-col gap-4">
          <div className="flex flex-col text-white ">
            <label className="leading-loose">Campaign Title</label>
            <input type="text" className="px-4 py-4 border focus:ring-primary focus:border-primary w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-300 placeholder:text-gray-300 bg-background" placeholder="Campaign title" />
          </div>

          <div className="flex flex-col">
            <label className="leading-loose text-white">Min. Amount</label>
            <div className="relative focus-within:text-gray-300 text-gray-400">
              <input type="text" className="pr-4 pl-10 px-4 py-4 border focus:ring-primary focus:border-primary w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-300 placeholder:text-gray-300 bg-background" placeholder="0.001ETH" />
              <div className="absolute left-4 top-[16px]">
                <FaEthereum className=" text-gray-500 text-xl"/>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="leading-loose text-white">Goal</label>
            <div className="relative focus-within:text-gray-300 text-gray-400">
              <input type="text" className="pr-4 pl-10 px-4 py-4 border focus:ring-primary focus:border-primary w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-300 placeholder:text-gray-300 bg-background" placeholder="0.001ETH" />
              <div className="absolute left-4 top-[16px]">
                <FaEthereum className=" text-gray-500 text-xl"/>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex flex-col">
              <label className="leading-loose">Start</label>
              <div className="relative focus-within:text-gray-300 text-gray-400">
                <input type="text" className="pr-4 pl-10 px-4 py-4 border focus:ring-primary focus:border-primary w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-300 placeholder:text-gray-300 bg-background" placeholder="25/02/2020" />
                <div className="absolute left-2 top-[16px]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="leading-loose">End</label>
              <div className="relative focus-within:text-gray-300 text-gray-400">
              <input type="text" className="pr-4 pl-10 px-4 py-4 border focus:ring-primary focus:border-primary w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-300 placeholder:text-gray-300 bg-background" placeholder="26/02/2020" />
                <div className="absolute left-2 top-[16px]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --lefet side-- */}
        <div className=" w-1/2">

        </div>
      </div>
    </div>
  )
}
