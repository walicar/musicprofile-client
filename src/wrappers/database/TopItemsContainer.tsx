import { useState } from "react"
const Services = {
    SPOTIFY: "spotify",
    LASTFM: "lastfm",
}
const TopItemsContainer: React.FC = () => {
    const [service, setService] = useState(Services.SPOTIFY);


    return (
        <div className="flex bg-white">
            
        </div>

    )

}

export default TopItemsContainer