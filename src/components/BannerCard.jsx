import { Facebook, Github, Linkedin, Twitter } from "lucide-react"
import { toPng } from "html-to-image"
import { useState } from "react";


const BannerCard = ({ formData, selectedLanguages, availableLanguages, }) => {
    const { name, field, twitter, github } = formData;
    const [isGenerating, setIsGenerating] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const siteLink = "https://bannerly.vercel.app";

    const shareToFacebook = () => {
        const facebookShareUrl = `https://facebook.com/sharer/sharer.php?u=${encodeURLComponent(imageUrl)}&text=${encodeURLComponent(
            `Check out my new customized banner! You can also get yours at ${siteLink}`
        )}`;
        window.open(facebookShareUrl, "_blank");
    }
    const shareToTwitter = () => {
        const twitterShareUrl = `https://x.com/intent/tweet?url=${encodeURLComponent(imageUrl)}&text=${encodeURLComponent(
            `Check out my new customized banner! You can also get yours at ${siteLink}`
        )}`;
        window.open(twitterShareUrl, "_blank");
    }
    const shareToLinkedIn = () => {}
    console.log(formData)

    const downloadBanner = () => {
        setIsGenerating(true); //Start the animation

        setTimeout(() => {
        const bannerNode = document.getElementById("banner");

        if(!bannerNode){
            setIsGenerating(false)
            return;
        }
        
        toPng(bannerNode)
        .then((dataUrl) => {
            const link = document.createElement("a");
            link.download = "customs.png";
            link.href = dataUrl;
            link.click();
            setImageUrl(dataUrl)
        })
        .catch((err) => {
            console.error("Could not generate image", err);
        })
        .finally(() => {
            setIsGenerating(false);
        })
    }, 3000);// 3 seconds delay
    }
    return(
        <section className="flex flex-col">
           <h1 className="flex pb-[30px] text-white text-[25px] underline">Preview</h1>

           {isGenerating && (
            <div className="flex items-center justify-center w-full h-full bg-black bg-opacity-50 z-50">
                <div className="text-white text-xl font-bold animate-pulse">
                    Generating...
                </div>
            </div>
           )}
        <div id="banner" className={`bg-gradient-to-r from-[rgb(41,41,41)] from-60% via-gray-900 to-[#494949] w-full h-fit md:px-[120px] py-[50px] text-white flex-col overflow-hidden  md:w-full px-[50px]`}>
            <div>
                <h1 className="pt-[30px] md:text-[80px] font-md md:pl-[20px] text-[35px] pl-[15px]">{name}</h1>
                <p className="md:text-[40px] md:pl-[20px] text-[20px] pl-[15px]">{field}_</p>
                <div className="flex mt-[35px]">
                <div className="flex">
                    <Twitter className="md:w-[70px] w-[50px]" />
                    <p className="md:text-[20px] text-[15px]">{twitter} </p>
                    <span className="w-[1px] h-[25px] bg-white ml-[15px]"></span>
                </div>
                <div className="flex">
                    <Github className="md:w-[70px] w-[50px]" />
                    <p className="md:text-[20px] text-[15px]">{github}</p>
                </div>
                </div>
            </div>
            <div className="flex items-end justify-end md:mt-[150px] mt-[100px]">
                <h1 className="font-bold md:text-[25px] pr-[30px] text-[20px]">Stack:</h1>
                <div className="flex gap-2">
                    {selectedLanguages.map((lang) => {
                        const langObj = availableLanguages.find((l) => l.name == lang);
                        return langObj ? (
                            <img
                             key={lang.name}
                             src={langObj.icon}
                             alt={lang.name}
                             className="md:w-[50px] w-[35px]"
                            />
                        ) : null;
                    })}
                </div>
            </div>
            
        </div>
        <button onClick={downloadBanner} className="bg-white text-purple-700 text-[18px] mt-[50px] p-[8px] rounded-[15px] font-semibold w-full" disabled={isGenerating}>{isGenerating ? "Generating..." : "Download Banner"}</button>

        {imageUrl && (
            <div className="flex flex-col items-center justify-center m-auto gap-2">
            <h1 className="text-white text-[20px] mt-[50px]">Share to:</h1>
            <div className="flex items-center justify-center m-auto gap-2">
            <div onClick={shareToTwitter} className="bg-transparent border border-gray-500 md:p-[10px] rounded-[10px] cursor-pointer p-[8px]">
                <Twitter className="md:w-[25px] text-white w-[20px]" />
            </div>
            <div onClick={shareToFacebook} className="bg-transparent border border-gray-500 md:p-[10px] rounded-[10px] cursor-pointer p-[8px]">
                <Facebook className="md:w-[25px] text-white w-[20px]" />
            </div>
            <div onClick={shareToLinkedIn} className="bg-transparent border border-gray-500 md:p-[10px] rounded-[10px] cursor-pointer p-[8px]">
                <Linkedin className="md:w-[25px] text-white w-[20px]" />
            </div>
            </div>
            </div>
            )}
        </section>
    )
}

export default BannerCard;