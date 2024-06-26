import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex justify-center flex-col gap-4 text-white  items-center h-[44vh] px-5 md:px-0 text-xs md:text-base">
        <div className="font-bold text-xl md:text-4xl flex justify-center items-center gap-3">
          Buy me a coffee
          <span><Image width={44} height={44} src="/coffee.gif" alt="" /></span>
        </div>
        <p className="text-center md:text-left">
          A crowdfunding platform for creators. Get funded by your fans and followers.
        </p>
        <div>
          <Link href={"/login"}>
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Now</button>
          </Link>
          <Link href={"/about"}>
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button>
          </Link>
        </div>
      </div>
      <div className="bg-white h-1 opacity-10"></div>
      <div className="text-white container mx-auto py-6 px-10 md:px-0">
        <h2 className="text-xl font-bold text-center my-6">Your Fans can buy you a coffee</h2>
        <div className="flex gap-5 justify-around">
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <Image className="bg-slate-400 rounded-full p-2 text-black" width={88} height={88} src="/vlogger.gif" alt="" />
            <p className="font-bold text-center">Your Fans want to help</p>
            <p className="text-center">Your fans are awailable for you to help you</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <Image className="bg-slate-400 rounded-full p-2 text-black" width={88} height={88} src="/dollar.gif" alt="" />
            <p className="font-bold text-center">Your Fans want to help</p>
            <p className="text-center">Your fans are awailable for you to help you</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <Image className="bg-slate-400 rounded-full p-2 text-black" width={88} height={88} src="/team.gif" alt="" />
            <p className="font-bold text-center">Your Fans want to help</p>
            <p className="text-center">Your fans are awailable for you to help you</p>
          </div>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10 my-6"></div>

      <div className="text-white container mx-auto py-6 flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold text-center my-6">Learn more about us</h2>
        {/* Responsive Youtube embed */}
        <div className="w-[90%] h-[35vh] md:w-[40%] md:h-[45vh]">
          <iframe className="w-full h-full"
            src="https://www.youtube.com/embed/hHuG7FIKgtc?si=RV-DzPuhzwYvOH9v"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
        {/* <iframe src="https://www.youtube.com/embed/hHuG7FIKgtc?si=RV-DzPuhzwYvOH9v" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}

      </div>
    </>
  );
}
