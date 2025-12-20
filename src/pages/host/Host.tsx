import { PiClockCountdownFill } from "react-icons/pi";

const Host = () => {
  return (
    <div className='h-screen w-full flex flex-col justify-center items-center gap-4 pb-30'>
      <PiClockCountdownFill className='text-text-muted/35' size={300}/>
      <h1 className='text-xxxl font-semibold text-text-muted/35'>Coming soon</h1>
      <p className='text-text-muted/35 text-xl text-center font-bold'>You will be soon able to host your own events</p>
    </div>
  )
}

export default Host

