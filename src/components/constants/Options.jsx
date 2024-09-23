export const SelectBudgetOptions = [
    {
        id:1,
        icon: "🪙",
        title:"Cheap",
        desc: "Smart spending, big savings"
    },
    {
        id: 2,
        icon: "💶",
        title:"Balanced",
        desc: "Quality within reason"
    },
    {
        id:3,
        icon: "💎",
        title:"Luxury",
        desc: "Uncompromising excellence"
    },
]

export const SelectNoOfPersons = [
    {
        id:1,
        icon: "🚶",
        title: "Single",
        no: "1 Person"
    },
    {
        id:2,
        icon: "👫",
        title: "Couple",
        no: "2 People"
    },
    {
        id:3,
        icon: "👨‍👩‍👧‍👦",
        title: "Family",
        no: "3-5 People"
    },
    {
        id:4,
        icon: "🤝",
        title: "Friends",
        no: "5-10 People"
    },
]



export const PROMPT = "Create an optimal trip itinerary based on the specified location, duration, budget, and number of persons. Generate Travel Plan for Location: {location} for no of days: {noOfDays} Days with no of People or group: {People} with Budget: {Budget}; give me list of hotels with hotel name, description, address, rating, price, location in map, coordinates, image url; also for the same create the itinerary for {noOfDays} days, suggest places, give name, details, pricing, timings, place images urls, location (coordinate or in map); Remember all have to cover in the {Budget} level budget. Important: give the result in JSON Format"