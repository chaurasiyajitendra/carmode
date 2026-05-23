// ─── Category-specific mod trees ─────────────────────────────────────────────

export const MOD_TREES = {
  Supercar: [
    {
      id: "sc_engine", label: "ENGINE", icon: "⚡",
      mods: [
        { id: "sc_turbo",   name: "Twin Turbo Upgrade",     tier: "S2", desc: "High-flow turbos with upgraded intercoolers for brutal power gains over stock.", cost: 9200,  fx: { hp: +220, torque: +260, topSpeed: +28, handling: +2,  comfort: -3  } },
        { id: "sc_ecu",     name: "Race ECU Full Remap",    tier: "S3", desc: "Unlocks hidden horsepower buried deep in the factory ECU — fuel, boost, ignition.", cost: 2800,  fx: { hp: +110, torque: +90,  topSpeed: +15, handling: 0,   comfort: -2  } },
        { id: "sc_exhaust", name: "Titanium Race Exhaust",  tier: "S2", desc: "Full titanium cat-back — drops 16 kg and amplifies the soundtrack considerably.", cost: 5200,  fx: { hp: +55,  torque: +48,  topSpeed: +10, handling: +1,  comfort: -4  } },
        { id: "sc_intake",  name: "Carbon Ram-Air Intake",  tier: "S1", desc: "Ram-air carbon airbox with heat shielding — cooler, denser charge air on entry.", cost: 1400,  fx: { hp: +35,  torque: +28,  topSpeed: +6,  handling: 0,   comfort: 0   } },
      ],
    },
    {
      id: "sc_aero", label: "AERODYNAMICS", icon: "🏎",
      mods: [
        { id: "sc_wing",     name: "Active GT Carbon Wing",    tier: "S3", desc: "Adjustable active rear wing delivering 220 kg downforce at 300 km/h.", cost: 6800, fx: { hp: 0, torque: 0, topSpeed: -10, handling: +14, comfort: -2 } },
        { id: "sc_splitter", name: "Full Carbon Splitter Kit", tier: "S2", desc: "Front splitter + dive planes + rear diffuser for balanced aero load.", cost: 3400, fx: { hp: 0, torque: 0, topSpeed: +5,  handling: +9,  comfort: -1 } },
        { id: "sc_hood",     name: "Vented Carbon Bonnet",     tier: "S1", desc: "Heat extraction vents drop underbonnet temps by 18°C and save 8 kg.", cost: 2100, fx: { hp: +18, torque: +12, topSpeed: +4, handling: +1, comfort: 0  } },
      ],
    },
    {
      id: "sc_chassis", label: "CHASSIS & BRAKES", icon: "🔧",
      mods: [
        { id: "sc_coil", name: "3-Way Adjustable Coilovers", tier: "S3", desc: "Motorsport dampers with rebound, compression, and ride height adjustment.", cost: 5500, fx: { hp: 0, torque: 0, topSpeed: +8, handling: +16, comfort: -9  } },
        { id: "sc_bbk",  name: "Carbon Ceramic 6-Pot BBK",   tier: "S3", desc: "380mm carbon-ceramic rotors with 6-piston Brembo calipers — fade free.", cost: 7200, fx: { hp: 0, torque: 0, topSpeed: +5, handling: +7,  comfort: 0   } },
        { id: "sc_sway", name: "Solid-Mount Sway Bars",      tier: "S1", desc: "Stiffer front and rear anti-roll bars eliminate body roll and understeer.", cost: 1800, fx: { hp: 0, torque: 0, topSpeed: +3, handling: +8,  comfort: -5  } },
      ],
    },
    {
      id: "sc_cockpit", label: "COCKPIT", icon: "🎛",
      mods: [
        { id: "sc_cage",   name: "FIA Chromoly Roll Cage",       tier: "S3", desc: "Full FIA-spec cage stiffens the chassis by 40%. Mandatory for track days.", cost: 8500, fx: { hp: 0, torque: 0, topSpeed: +4, handling: +9,  comfort: -16 } },
        { id: "sc_bucket", name: "Carbon Bucket Seats",          tier: "S2", desc: "HANS-compatible carbon shell seats save 28 kg over the OEM chairs.", cost: 3200, fx: { hp: 0, torque: 0, topSpeed: +2, handling: +4,  comfort: -10 } },
        { id: "sc_wheel",  name: "Motorsport Steering Wheel",    tier: "S1", desc: "Flat-bottom quick-release carbon wheel with integrated mode switches.", cost: 950,  fx: { hp: 0, torque: 0, topSpeed: 0,  handling: +3,  comfort: -2  } },
      ],
    },
  ],

  Drift: [
    {
      id: "dr_engine", label: "ENGINE", icon: "⚡",
      mods: [
        { id: "dr_turbo",   name: "Single Large Turbo Kit",   tier: "S3", desc: "Massive single turbo swap with external wastegate — torque swell for sustained angle.", cost: 7800, fx: { hp: +250, torque: +320, topSpeed: +20, handling: +3,  comfort: -5  } },
        { id: "dr_ecu",     name: "Drift ECU Tune",           tier: "S2", desc: "Anti-lag, overboost, launch control, and throttle blip maps tuned for the pad.", cost: 1900, fx: { hp: +80,  torque: +95,  topSpeed: +8,  handling: +2,  comfort: -1  } },
        { id: "dr_exhaust", name: "Full Decat Straight Pipe", tier: "S2", desc: "All cats removed, straight-through open pipe — max crackle, full theatre.", cost: 2800, fx: { hp: +60,  torque: +50,  topSpeed: +10, handling: 0,   comfort: -8  } },
        { id: "dr_lsd",     name: "Mechanical 2-Way LSD",     tier: "S2", desc: "Replaces OEM limited-slip — essential for initiating and holding sideways angle.", cost: 3500, fx: { hp: 0,    torque: 0,    topSpeed: +2,  handling: +18, comfort: -3  } },
      ],
    },
    {
      id: "dr_suspension", label: "SUSPENSION & ANGLE", icon: "🌀",
      mods: [
        { id: "dr_coil",    name: "Drift Coilovers",             tier: "S2", desc: "Stiff front / soft rear tuning transfers weight rearward — oversteer on demand.", cost: 3800, fx: { hp: 0, torque: 0, topSpeed: +4,  handling: +14, comfort: -13 } },
        { id: "dr_knuckle", name: "High-Angle Steering Knuckles",tier: "S3", desc: "Extend to 60°+ steering angle — full lock without wheel-arch scrub.", cost: 4200, fx: { hp: 0, torque: 0, topSpeed: 0,   handling: +22, comfort: -6  } },
        { id: "dr_camber",  name: "Extreme Camber Kit",          tier: "S1", desc: "-5° to -8° front camber — aggressive stance, max tyre contact mid-rotation.", cost: 980,  fx: { hp: 0, torque: 0, topSpeed: -3,  handling: +10, comfort: -8  } },
      ],
    },
    {
      id: "dr_brakes", label: "BRAKES & HYDRAULICS", icon: "🛑",
      mods: [
        { id: "dr_handbrake", name: "Hydraulic Handbrake",    tier: "S1", desc: "Dedicated hydraulic e-brake circuit for precise, instant entry initiation.", cost: 850,  fx: { hp: 0, torque: 0, topSpeed: 0, handling: +12, comfort: 0 } },
        { id: "dr_bias",      name: "Brake Bias Adjuster",    tier: "S2", desc: "In-cabin front/rear bias knob — tune balance on the fly between runs.", cost: 1400, fx: { hp: 0, torque: 0, topSpeed: 0, handling: +8,  comfort: 0 } },
        { id: "dr_pads",      name: "Motorsport Brake Pads",  tier: "S1", desc: "High-temp compound stays consistent through repeated heavy threshold stops.", cost: 750,  fx: { hp: 0, torque: 0, topSpeed: +1, handling: +4,  comfort: 0 } },
      ],
    },
    {
      id: "dr_exterior", label: "EXTERIOR & VISUAL", icon: "🎨",
      mods: [
        { id: "dr_widebody", name: "Widebody Fender Kit",      tier: "S3", desc: "+60 mm per side — accommodates stretched tyres and aggressive stance fitment.", cost: 5500, fx: { hp: 0, torque: 0, topSpeed: -5, handling: +6, comfort: 0  } },
        { id: "dr_livery",   name: "Custom Race Livery Wrap",  tier: "S1", desc: "3M 1080 premium vinyl full wrap — custom design process included.", cost: 1800, fx: { hp: 0, torque: 0, topSpeed: 0,  handling: 0,  comfort: +5 } },
        { id: "dr_splitter", name: "Aggressive Front Splitter",tier: "S2", desc: "Carbon splitter for visual aggression plus mild front aerodynamic load.", cost: 1600, fx: { hp: 0, torque: 0, topSpeed: +2, handling: +4, comfort: 0  } },
      ],
    },
  ],

  Luxury: [
    {
      id: "lx_performance", label: "PERFORMANCE", icon: "⚡",
      mods: [
        { id: "lx_ecu",     name: "Bespoke ECU Tune",          tier: "S2", desc: "Conservative power mapped for smooth, imperceptible delivery in every gear.", cost: 2200, fx: { hp: +65, torque: +75, topSpeed: +15, handling: +2, comfort: +4  } },
        { id: "lx_exhaust", name: "Active Variable Exhaust",   tier: "S2", desc: "Active valves offer silence for the city or theatre on demand — your choice.", cost: 4800, fx: { hp: +30, torque: +25, topSpeed: +5,  handling: 0,  comfort: +8  } },
        { id: "lx_air",     name: "Sport Air Suspension Tune", tier: "S1", desc: "Recalibrated spring curves drop 25mm in Sport mode with no comfort sacrifice.", cost: 1800, fx: { hp: 0,   torque: 0,   topSpeed: +3,  handling: +6, comfort: +5  } },
      ],
    },
    {
      id: "lx_interior", label: "INTERIOR", icon: "💎",
      mods: [
        { id: "lx_leather",    name: "Full Bespoke Leather Restyle",tier: "S3", desc: "Hand-stitched Nappa leather — over 400 hours of craftwork on every surface.", cost: 12000, fx: { hp: 0, torque: 0, topSpeed: 0, handling: 0, comfort: +20 } },
        { id: "lx_audio",      name: "Bespoke Reference Audio",     tier: "S2", desc: "Custom-tuned 26-speaker audiophile system with active noise cancellation.", cost: 8500,  fx: { hp: 0, torque: 0, topSpeed: 0, handling: 0, comfort: +15 } },
        { id: "lx_massager",   name: "Heated Massage Seat Upgrade", tier: "S1", desc: "16-way massage front seats with lumbar heat and active ventilation cooling.", cost: 3200,  fx: { hp: 0, torque: 0, topSpeed: 0, handling: 0, comfort: +12 } },
        { id: "lx_starlight",  name: "Starlight Headliner",         tier: "S2", desc: "1,340 fibre-optic LEDs hand-woven through alcantara — inspired by Rolls-Royce.", cost: 6500, fx: { hp: 0, torque: 0, topSpeed: 0, handling: 0, comfort: +10 } },
      ],
    },
    {
      id: "lx_exterior", label: "EXTERIOR", icon: "✨",
      mods: [
        { id: "lx_paint",  name: "Two-Tone Bespoke Paint",  tier: "S3", desc: "Hand-applied dual-tone scheme with 10-coat lacquer finish — a 3-week process.", cost: 15000, fx: { hp: 0, torque: 0, topSpeed: 0,  handling: 0,  comfort: +15 } },
        { id: "lx_wheels", name: "Forged Alloys 22\"",      tier: "S2", desc: "Bespoke 22-inch forged monoblock alloys — 12 kg lighter than OEM cast wheels.", cost: 7200,  fx: { hp: +8, torque: 0, topSpeed: +4, handling: +4, comfort: +5  } },
        { id: "lx_lights", name: "Crystal LED Light Pack",  tier: "S1", desc: "Matrix LED headlights with sequential crystal taillamps — night-time theatre.", cost: 3800,  fx: { hp: 0, torque: 0, topSpeed: 0,  handling: 0,  comfort: +5  } },
      ],
    },
    {
      id: "lx_tech", label: "TECHNOLOGY", icon: "🖥",
      mods: [
        { id: "lx_hud",          name: "Augmented Reality HUD",     tier: "S2", desc: "Full-windscreen AR navigation, speed, and ADAS overlaid directly on the road.", cost: 5500,  fx: { hp: 0, torque: 0, topSpeed: 0,  handling: +2,  comfort: +8  } },
        { id: "lx_ai_susp",      name: "AI Predictive Suspension",  tier: "S3", desc: "Camera reads road 60m ahead and pre-adjusts each corner independently.", cost: 9800,  fx: { hp: 0, torque: 0, topSpeed: +2, handling: +10, comfort: +18 } },
        { id: "lx_ambient",      name: "64-Zone Ambient Lighting",  tier: "S1", desc: "Programmable mood lighting across the full cabin — 16M colour options.", cost: 2200,  fx: { hp: 0, torque: 0, topSpeed: 0,  handling: 0,   comfort: +6  } },
      ],
    },
  ],

  "Off-Road": [
    {
      id: "or_engine", label: "ENGINE & DRIVETRAIN", icon: "⚡",
      mods: [
        { id: "or_remap",   name: "Diesel/Petrol ECU Remap",         tier: "S2", desc: "Low-end torque optimised for rock crawling — massive pull from idle.", cost: 1800, fx: { hp: +45, torque: +80, topSpeed: +8,  handling: +2,  durability: +5  } },
        { id: "or_exhaust", name: "Heavy-Duty Off-Road Exhaust",     tier: "S1", desc: "Mandrel-bent stainless with high ground-clearance routing for trail use.", cost: 2200, fx: { hp: +25, torque: +35, topSpeed: +5,  handling: 0,   durability: +3  } },
        { id: "or_lockers", name: "Electronic Diff Lockers (F&R)",   tier: "S3", desc: "ARB air lockers front and rear — true mechanical diff lock on both axles.", cost: 5500, fx: { hp: 0,   torque: 0,   topSpeed: -5,  handling: +5,  durability: +10 } },
        { id: "or_gearing", name: "Low-Range Gearing Kit",           tier: "S2", desc: "Extends low-range crawl ratio to 5.0:1 — climbs almost any obstacle.", cost: 3800, fx: { hp: 0,   torque: +20, topSpeed: -8,  handling: +8,  durability: +8  } },
      ],
    },
    {
      id: "or_suspension", label: "SUSPENSION & LIFT", icon: "🏔",
      mods: [
        { id: "or_lift3",   name: "3-Inch Suspension Lift",         tier: "S1", desc: "Full 3\" lift with extended brake lines and corrected castor — 33\" tyre clearance.", cost: 2800, fx: { hp: 0, torque: 0, topSpeed: -5,  handling: +6,  durability: +5  } },
        { id: "or_lift6",   name: "6-Inch Long-Travel Lift",        tier: "S3", desc: "Long-travel arms with Bilstein 5100 coilovers. Built for desert running.", cost: 7200, fx: { hp: 0, torque: 0, topSpeed: -10, handling: +14, durability: +8  } },
        { id: "or_coil",    name: "Heavy-Duty Progressive Coils",   tier: "S2", desc: "Progressive-rate springs handle max load and articulation simultaneously.", cost: 1900, fx: { hp: 0, torque: 0, topSpeed: 0,   handling: +8,  durability: +12 } },
        { id: "or_cv",      name: "Heavy-Duty Chromoly CV Axles",   tier: "S2", desc: "Chromoly CV shafts — survive full-lock flex that destroys OEM parts.", cost: 2400, fx: { hp: 0, torque: 0, topSpeed: 0,   handling: +4,  durability: +15 } },
      ],
    },
    {
      id: "or_armour", label: "PROTECTION & ARMOUR", icon: "🛡",
      mods: [
        { id: "or_skid",     name: "Full Underbody Skid Plates",   tier: "S2", desc: "6mm steel plates protect engine, transfer case, and fuel tank from rocks.", cost: 3200, fx: { hp: 0,   torque: 0,   topSpeed: -2,  handling: 0,   durability: +20 } },
        { id: "or_bumper",   name: "Steel Winch Bumper + Warn",    tier: "S2", desc: "Winch-ready front bumper with 9,500 lb Warn winch fully included.", cost: 4500, fx: { hp: 0,   torque: -5,  topSpeed: -4,  handling: -2,  durability: +18 } },
        { id: "or_sliders",  name: "Rock Sliders & Side Steps",    tier: "S1", desc: "Heavy-duty sliders protect sills from boulder damage on technical trails.", cost: 1600, fx: { hp: 0,   torque: 0,   topSpeed: -1,  handling: 0,   durability: +10 } },
        { id: "or_snorkel",  name: "Safari Snorkel & Air Intake",  tier: "S1", desc: "Raises intake to roof level — fords 1m water without hydrolocking.", cost: 1100, fx: { hp: +8,  torque: +5,  topSpeed: 0,   handling: 0,   durability: +8  } },
      ],
    },
    {
      id: "or_tyres", label: "TYRES & WHEELS", icon: "🔄",
      mods: [
        { id: "or_mt",       name: "35\" Mud Terrain Tyres",         tier: "S2", desc: "Aggressive MT tread pattern — bites mud, rock, and loose sand equally.", cost: 3600, fx: { hp: 0, torque: 0, topSpeed: -8, handling: +10, durability: +8  } },
        { id: "or_beadlock", name: "Beadlock Wheels 17\"",           tier: "S2", desc: "Ring-lock wheels allow safe airing down to 8 PSI on rock sections.", cost: 4800, fx: { hp: 0, torque: 0, topSpeed: -3, handling: +12, durability: +6  } },
        { id: "or_ctis",     name: "Central Tyre Inflation System",  tier: "S3", desc: "Air up or down all four tyres from the cab — without stopping.", cost: 3900, fx: { hp: 0, torque: 0, topSpeed: 0,  handling: +8,  durability: +5  } },
      ],
    },
  ],
};

export const FALLBACK_MODS = [
  {
    id: "gen_engine", label: "ENGINE", icon: "⚡",
    mods: [
      { id: "gen_tune",    name: "Performance ECU Tune",   tier: "S1", desc: "Remapped fuel and ignition maps for extra power and improved throttle response.", cost: 1500, fx: { hp: +40, torque: +50, topSpeed: +8, handling: 0,   comfort: -1 } },
      { id: "gen_exhaust", name: "Performance Exhaust",    tier: "S2", desc: "Stainless cat-back with a deeper, more aggressive tone and minor power gains.", cost: 2800, fx: { hp: +35, torque: +30, topSpeed: +6, handling: 0,   comfort: -3 } },
      { id: "gen_intake",  name: "Cold Air Intake",        tier: "S1", desc: "Short-ram intake draws cooler, denser air for better combustion efficiency.", cost: 900,  fx: { hp: +20, torque: +18, topSpeed: +4, handling: 0,   comfort: 0  } },
      { id: "gen_pulley",  name: "Underdrive Pulley Set",  tier: "S1", desc: "Lightened crank and alt pulleys free up 8–12 hp by reducing parasitic drag.", cost: 750,  fx: { hp: +10, torque: +8,  topSpeed: +2, handling: 0,   comfort: 0  } },
    ],
  },
  {
    id: "gen_chassis", label: "CHASSIS & BRAKES", icon: "🔧",
    mods: [
      { id: "gen_coil",   name: "Performance Coilovers",  tier: "S2", desc: "Adjustable coilovers sharpen cornering while keeping the ride livable.", cost: 3200, fx: { hp: 0, torque: 0, topSpeed: +5, handling: +10, comfort: -5 } },
      { id: "gen_brakes", name: "Big Brake Upgrade",      tier: "S2", desc: "Larger rotors and multi-piston calipers for improved stopping confidence.", cost: 4200, fx: { hp: 0, torque: 0, topSpeed: +3, handling: +5,  comfort: 0  } },
      { id: "gen_sway",   name: "Sway Bar Set",           tier: "S1", desc: "Stiffer bars reduce body roll for a flatter, more planted feel.", cost: 1100, fx: { hp: 0, torque: 0, topSpeed: +2, handling: +7,  comfort: -3 } },
    ],
  },
  {
    id: "gen_aero", label: "AERO & EXTERIOR", icon: "🎨",
    mods: [
      { id: "gen_splitter", name: "Front Splitter",        tier: "S1", desc: "Modest front splitter reduces front lift for a more planted motorway feel.", cost: 1400, fx: { hp: 0, torque: 0, topSpeed: +3, handling: +4, comfort: 0 } },
      { id: "gen_wrap",     name: "Full Colour Wrap",      tier: "S1", desc: "3M premium vinyl — full colour change with paint-protection benefits.", cost: 1800, fx: { hp: 0, torque: 0, topSpeed: 0,  handling: 0,  comfort: +3 } },
    ],
  },
];

export const TIER_META = {
  S1: { label: "STAGE 1", bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30" },
  S2: { label: "STAGE 2", bg: "bg-amber-500/10",   text: "text-amber-400",   border: "border-amber-500/30"   },
  S3: { label: "STAGE 3", bg: "bg-red-500/10",     text: "text-red-400",     border: "border-red-500/30"     },
};
