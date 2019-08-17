import Bowling from 'mdi-material-ui/Bowling'
import Bike from 'mdi-material-ui/Bike'
import HumanHandsup from 'mdi-material-ui/HumanHandsup'

export const calculators = [
    {
        sport: "Bowling",
        icon: <Bowling fontSize="large"/>,
        calculators: [
            {
                title: "Bowling Score Calculator",
                href: "bowling-score-calculator",
                description: "Lorem Ipsum"        
            },
            {
                title: "Bowling Handicap Calculator",
                href: "bowling-handicap-calculator",
                description: "Lorem Ipsum"        
            },
        ]
    },
    {
        sport: "Cycling",
        icon: <Bike  fontSize="large"/>,
        calculators: [
            {
                title: "Cycling Speed Calculator",
                href: "cycling-speed-calculator",
                description: "Lorem Ipsum",        
            }
        ]
    },
    {
        sport: "Other",
        icon: <HumanHandsup  fontSize="large"/>,
        calculators: [
            {
                title: "Triathlon Calculator",
                href: "triathlon-calculator",
                description: "Lorem Ipsum",        
            }
        ]
    },

];
  
  export default { calculators };
  