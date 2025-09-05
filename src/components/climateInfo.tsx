

export default function ClimateInfo({ city, data }: { city: string; data: any }) {
    const times = [{
        text: "Today", id: "today", temp: "n", desc: "n", image: "n"
    }, {
        text: "Tomorrow", id: "tomorrow", temp: "n", desc: "n", image: "n"
    }, {
        text: "Day After Tomorrow", id: "day-after-tomorrow", temp: "n", desc: "n", image: "n"
    }];
    return (
        <>
        <div id="clima-info">
            {times.map((time) => (
               <div className="weather-card" id={time.id} key={time.id}>
                   <h3>{time.text}</h3>
                   <p>{city}</p>
                   
               </div>
            ))}
        </div>
        </>
    );
}
