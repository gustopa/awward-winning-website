import { useRef } from "react"
import { useState } from "react"
import Button from "./Button"
import { TiLocationArrow } from "react-icons/ti"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useEffect } from "react"
import { ScrollTrigger } from "gsap/all"

gsap.registerPlugin(ScrollTrigger)

function Hero() {
    const [currentIndex, setCurrentIndex] = useState(1)
    const [hasCLick,setHashClick] = useState(false)
    const [isLoading,setIsLoading] = useState(true)
    const [loadedVideo,setLoadedVideos] = useState(0)

    const totalVideos = 4
    const nextVideoRef = useRef(null)

    // const upcomingVideoIndex = (currentIndex % totalVideos) + 1

    const handleVideoLoad = () => {
        setLoadedVideos(prev => prev + 1)
    }


    const handleMiniVideoClick = () => {
        setHashClick(true)
        setCurrentIndex(prev => (prev % totalVideos) + 1)
    }

    useEffect(()=>{
        
        if(loadedVideo == totalVideos - 1){
            setIsLoading(false)
        }
    },[loadedVideo])

    useGSAP(()=>{
        if(hasCLick){
            gsap.set('#next-video',{visibility : 'visible'})

            

            gsap.from('#current-video' ,{
                transformOrigin : 'center center',
                scale : 0,
                duration : 1.5,
                ease : 'power1.inOut'
            })

            gsap.to('#next-video', {
                transformOrigin : 'center center',
                scale : 1,
                width : '100%',
                height : '100%',
                duration : 1,
                ease : 'power1.inOut',
                onStart : ()=> nextVideoRef.current.play()
            })
        }
    },{dependencies : [currentIndex],revertOnUpdate : true})

    useGSAP(()=>{
        gsap.set('#video-frame',{
            clipPath : 'polygon(20% 0%, 80% 0%, 93% 91%, 6% 100%)',
            borderRadius: "0% 0% 10% 20%",

        })
        gsap.from('#video-frame',{
            clipPath : 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            borderRadius : '0% 0% 0% 0%',
            ease : 'power1.inOut',
            scrollTrigger : {
                trigger : '#video-frame',
                start : 'center center',
                end : 'bottom center',
                scrub : true
            }
        })
    })
    const getVideoSrc = (index) => `videos/hero-${index}.mp4`
    // console.log(currentIndex);
    
    return (
      <div className="relative h-dvh w-screen overflow-x-hidden">

        {isLoading && (
            <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
                <div className="three-body">
                    <div className="three-body__dot"></div>
                    <div className="three-body__dot"></div>
                    <div className="three-body__dot"></div>
                </div>
            </div>
        )}
        <div id="video-frame" className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75">
            <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
                <div onClick={handleMiniVideoClick} className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100">
                    <video ref={nextVideoRef} src={getVideoSrc((currentIndex % totalVideos) + 1)} onLoadedData={handleVideoLoad} loop muted id="current-video" className="size-64 origin-center scale-150 object-cover object-center">
                    </video>
                </div>
            </div>
            <video ref={nextVideoRef} src={getVideoSrc(currentIndex)} onLoadedData={handleVideoLoad} loop muted id="next-video" className="absolute-center invisible absolute z-20 size-64 object-cover object-center"/>
            <video src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)} autoPlay loop muted className="absolute left-0 top-0 size-full object-cover object-center" onLoadedData={handleVideoLoad}></video>
            <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">G<b>A</b>MING</h1>
        </div>


        <div className="absolute left-0 top-0 z-40">
            <div className="mt-24 px-5 sm:px-10">
                <h1 className="special-font hero-heading text-blue-100">Redefi<b>n</b>e</h1>
                <p className="mb-5 max-w-64 font-robert-reguler text-blue-100">Enter the Metagame Layer <br/> Unleash the play Economy</p>
                <Button id="watch-trailer" title="Watch Trailer" containerClass="!bg-yellow-300 flex-center gap-1" leftIcon={<TiLocationArrow/>}/>
            </div>
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black" >G<b>A</b>MING</h1>

      </div>
    )
  }
  
  export default Hero
  