import { Github, Twitter } from "lucide-react"
import { toPng } from "html-to-image"


const BannerCard = ({ formData, selectedLanguages, availableLanguages }) => {
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
        <div id="banner" className={`bg-gradient-to-r from-[#292929] from-60% via-gray-900 to-[#494949] w-full h-[600px] px-[100px] py-[50px] text-white flex-col mt-[100px]`}>
            <div>
                <h1 className="pt-[30px] text-[80px] font-md">{name}</h1>
                <p className="text-[40px]">{field}_</p>
                <div className="flex mt-[35px] gap-2">
                <div className="flex">
                    <Twitter className="w-[40px]" />
                    <p className="text-[20px]">{twitter} |</p>
                </div>
                <div className="flex gap-2">
                    <Github className="w-[40px]" />
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
                             className="w-10 h-10"
                            />
                        ) : null;
                    })}
                </div>
            </div>
            <button onClick={downloadBanner} className="bg-white text-purple-700 text-[18px] mt-[50px] p-[8px] rounded-[15px] font-semibold w-full">Download Banner</button>
        </div>
    )
}

export default BannerCard;