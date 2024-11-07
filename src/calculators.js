import Bowling from 'mdi-material-ui/Bowling'
import Bike from 'mdi-material-ui/Bike'
import HumanHandsup from 'mdi-material-ui/HumanHandsup'
import Run from 'mdi-material-ui/Run'

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
            {
                title: "Duckpin Score Calculator",
                href: "duckpin-bowling-score-calculator",
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
            },
            {
                title: "Cycling Cadence Calculator",
                href: "cycling-cadence-calculator",
                description: "Lorem Ipsum",        
            }
        ]
    },
    {
        sport: "Running",
        icon: <Run  fontSize="large"/>,
        calculators: [
            {
                title: "Marathon Calculator",
                href: "marathon-calculator",
                description: "Lorem Ipsum",        
            },
            {
                title: "Race Time Calculator",
                href: "race-time-calculator",
                description: "Lorem Ipsum",        
            },
            {
                title: "Running Speed Calculator",
                href: "running-speed-calculator",
                description: "Lorem Ipsum",        
            },
            {
                title: "Running Speed Converter",
                href: "running-speed-converter",
                description: "Lorem Ipsum",        
            },
            {
                title: "Running Pace Planner",
                href: "running-pace-planner",
                description: "Lorem Ipsum",
            },
        ]
    },
    {
        sport: "Other",
        icon: <HumanHandsup  fontSize="large"/>,
        calculators: [
            {
                title: "Decathlon Calculator",
                href: "decathlon-calculator",
                description: "Lorem Ipsum",        
            },
            {
                title: "Heptathlon Calculator",
                href: "heptathlon-calculator",
                description: "Lorem Ipsum",        
            },
            {
                title: "Triathlon Calculator",
                href: "triathlon-calculator",
                description: "Lorem Ipsum",        
            },
            {
                title: "BMI Calculator",
                href: "bmi-calculator",
                description: "Lorem Ipsum",        
            },
        ]
    },

];
  
  export default { calculators };
  