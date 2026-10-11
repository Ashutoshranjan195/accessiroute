const PLACES = [
  "Ameerpet Metro Station",
  "Hitech City (Cyber Towers)",
  "Secunderabad Railway Station",
  "Koti Bus Terminal",
  "Dilsukhnagar Bus Depot",
  "Rajiv Gandhi International Airport (RGIA)",
  "Miyapur Metro Station",
  "Charminar (Old City)"
];

const ROUTES = [
  {
    id: "route-1",
    from: "Ameerpet Metro Station",
    to: "Hitech City (Cyber Towers)",
    mode: "Hyderabad Metro (Blue Line)",
    time: "24 mins",
    cost: "₹35",
    stepFree: true,
    elevator: true,
    tactile: true,
    lowFloor: true,
    gates: [
      { name: "Ameerpet Gate B", ramp: true, lift: true, tactilePath: true, status: "Operational" },
      { name: "Hitech City Gate A", ramp: true, lift: true, tactilePath: true, status: "Direct skywalk" }
    ],
    notes: "Direct metro line. Dedicated wheelchair spaces in all coaches, audible arrival announcements, and level platform boarding."
  },
  {
    id: "route-2",
    from: "Ameerpet Metro Station",
    to: "Hitech City (Cyber Towers)",
    mode: "TSRTC City Bus (Route 10H)",
    time: "55 mins",
    cost: "₹25",
    stepFree: false,
    elevator: false,
    tactile: false,
    lowFloor: false,
    gates: [
      { name: "Ameerpet Main Bus Shelter", ramp: false, lift: false, tactilePath: false, status: "High curb, no ramp" },
      { name: "Cyber Towers Bus Stop", ramp: false, lift: false, tactilePath: false, status: "Roadside drop" }
    ],
    notes: "High 3-step footboard entry. Not suitable for wheelchairs. No tactile guidance at bus shelters."
  },
  {
    id: "route-3",
    from: "Secunderabad Railway Station",
    to: "Hitech City (Cyber Towers)",
    mode: "MMTS Suburban Local Train",
    time: "42 mins",
    cost: "₹10",
    stepFree: false,
    elevator: false,
    tactile: false,
    lowFloor: false,
    gates: [
      { name: "Platform 1 FOB Ramp", ramp: true, lift: false, tactilePath: false, status: "Steep gradient" },
      { name: "Hitech MMTS Exit", ramp: false, lift: false, tactilePath: false, status: "Staircase only" }
    ],
    notes: "Large gap between platform and train coach floor (approx 8-10 inches). High physical exertion required."
  },
  {
    id: "route-4",
    from: "Secunderabad Railway Station",
    to: "Rajiv Gandhi International Airport (RGIA)",
    mode: "Pushpak Airport Liner (AC Low-Floor)",
    time: "65 mins",
    cost: "₹260",
    stepFree: true,
    elevator: false,
    tactile: false,
    lowFloor: true,
    gates: [
      { name: "Secunderabad Station Exit 3", ramp: true, lift: false, tactilePath: false, status: "Level concourse" },
      { name: "RGIA Terminal Arrivals", ramp: true, lift: true, tactilePath: true, status: "Full airport access" }
    ],
    notes: "Kneeling air-suspension low-floor bus with manual folding ramp at bus front. Excellent for senior citizens."
  },
  {
    id: "route-5",
    from: "Miyapur Metro Station",
    to: "Ameerpet Metro Station",
    mode: "Hyderabad Metro (Red Line)",
    time: "22 mins",
    cost: "₹30",
    stepFree: true,
    elevator: true,
    tactile: true,
    lowFloor: true,
    gates: [
      { name: "Miyapur Concourse Gate 1", ramp: true, lift: true, tactilePath: true, status: "Fully functional" },
      { name: "Ameerpet Interchange Gate C", ramp: true, lift: true, tactilePath: true, status: "Wide automatic flap gates" }
    ],
    notes: "Braille lift buttons, high-contrast floor paths, tactile warnings at platform edges, priority seating."
  },
  {
    id: "route-6",
    from: "Koti Bus Terminal",
    to: "Charminar (Old City)",
    mode: "TSRTC Ordinary Bus (Route 2)",
    time: "20 mins",
    cost: "₹15",
    stepFree: false,
    elevator: false,
    tactile: false,
    lowFloor: false,
    gates: [
      { name: "Koti Bay 4", ramp: false, lift: false, tactilePath: false, status: "Broken pavement" },
      { name: "Charminar Stand", ramp: false, lift: false, tactilePath: false, status: "Crowded street stop" }
    ],
    notes: "High footboard bus and broken street pedestrian infrastructure. Very difficult for mobility-impaired commuters."
  },
  {
    id: "route-7",
    from: "Dilsukhnagar Bus Depot",
    to: "Ameerpet Metro Station",
    mode: "Hyderabad Metro (Red Line via MGBS)",
    time: "28 mins",
    cost: "₹35",
    stepFree: true,
    elevator: true,
    tactile: true,
    lowFloor: true,
    gates: [
      { name: "Dilsukhnagar Gate 2", ramp: true, lift: true, tactilePath: true, status: "Street to concourse lift active" },
      { name: "Ameerpet Gate A", ramp: true, lift: true, tactilePath: true, status: "Operational" }
    ],
    notes: "Underground-to-elevated transit corridor with dual lifts on both platforms and station assist guards."
  }
];
