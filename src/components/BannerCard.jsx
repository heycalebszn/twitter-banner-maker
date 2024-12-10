import { Github, Twitter } from "lucide-react"
import { toPng } from "html-to-image"


const BannerCard = ({ formData, selectedLanguages, availableLanguages, }) => {
    const { name, field, twitter, github } = formData;
    console.log(formData)

    const downloadBanner = () => {
        const bannerNode = document.getElementById("banner");
        
        toPng(bannerNode)
        .then((dataUrl) => {
            const link = document.createElement("a");
            link.download = "custom-banner.png";
            link.href = dataUrl;
            link.click()
        })
        .catch((err) => {
            console.error("Could not generate image", err);
        })
    }
    return(
        <section className="flex flex-col">
           <h1 className="flex pb-[30px]">Preview</h1>
        <div id="banner" className={`bg-gradient-to-r from-[rgb(41,41,41)] from-60% via-gray-900 to-[#494949] w-full h-fit px-[100px] py-[50px] text-white flex-col overflow-hidden  md:w-full`}>
            <div>
                <h1 className="pt-[30px] text-[80px] font-md pl-[20px]">{name}</h1>
                <p className="text-[40px] pl-[20px]">{field}_</p>
                <div className="flex mt-[35px] gap-[5px]">
                <div className="flex">
                    <Twitter className="w-[70px]" />
                    <p className="text-[20px]">{twitter} </p>
                    <span className="w-[1px] h-[25px] bg-white"></span>
                </div>
                <div className="flex gap-2">
                    <Github className="w-[70px]" />
                    <p className="text-[20px]">{github}</p>
                </div>
                </div>
            </div>
            <div className="flex items-end justify-end mt-[150px]">
                <h1 className="font-bold text-[25px] pr-[30px]">Stack:</h1>
                <div className="flex gap-2">
                    {selectedLanguages.map((lang) => {
                        const langObj = availableLanguages.find((l) => l.name == lang);
                        return langObj ? (
                            <img
                             key={lang.name}
                             src={langObj.icon}
                             alt={lang.name}
                             className="w-[50px]"
                            />
                        ) : null;
                    })}
                </div>
            </div>
            
        </div>
        <button onClick={downloadBanner} className="bg-white text-purple-700 text-[18px] mt-[50px] p-[8px] rounded-[15px] font-semibold w-full">Download Banner</button>
        </section>
    )
}

export default BannerCard;