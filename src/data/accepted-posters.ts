// Kabul ve şartlı kabul edilen posterler. Yazar adları maskelidir; gerçek isim, kurum ve özet burada tutulmaz.
export interface AcceptedPoster { no: string; title: string; author: string }
export interface PosterGroup { id: string; name: string; posters: AcceptedPoster[] }

export const posterGroups: PosterGroup[] = [
  {
    id: "P1",
    name: "Elektrolitik Hidrojen Üretimi",
    posters: [
      { no: "P01", title: "Electrolysis of Aqueous Solutions of Potassium Hydroxide at Near-Critical and Supercritical Conditions of Water for Green Hydrogen Production", author: "Ca** Er***" },
      { no: "P02", title: "Design, Additive Manufacturing, and Performance Evaluation of a Titanium Alloy Lattice-Structured PTL Integrated into the Flow Field of a PEM Electrolyzer", author: "Ka**** Da*****" },
      { no: "P03", title: "Development of a Domestic Mineral-Filled Membrane for Alkaline Electrolyzers", author: "Se**** Al***" },
      { no: "P04", title: "Numerical Investigation of the Effect of Anode Catalysts and Support Materials on Performance in PEM Electrolyzers", author: "Şu** Çe***" },
      { no: "P05", title: "Machine Learning Surrogate Modelling of a PV-PCM Assisted Alkaline Hydrogen Production System", author: "Ta**** Ta****" },
      { no: "P06", title: "Influence of TMD Particle Size on Electrocatalytic Nitrogen Reduction for Ammonia Production", author: "Yi*** Os*** Ak******" },
      { no: "P07", title: "Experimental Performance Assessment of a Modular Hydrogen Generation System under Independent TÜV Austria Witness Testing", author: "Yu*** Fu**** Er***" },
    ],
  },
  {
    id: "P2",
    name: "Fotokatalitik, Kimyasal ve Biyolojik Hidrojen Üretimi",
    posters: [
      { no: "P08", title: "Biohydrogen Production by Rhodoplanes piscinae 51ATA Using Molasses in the Presence of an Anthraquinone Dye", author: "El** Yü***** Ca******" },
      { no: "P09", title: "Effects of Operating Parameters on the Performance of Methane Pyrolysis: A Numerical Study", author: "Fu** Ka**" },
      { no: "P10", title: "Effect of H₂SO₄ Modification on Rosehip Seed-Based Adsorbents for Hydrogen Generation via NaBH₄ Methanolysis", author: "Hu**** Ce*** Ku****" },
      { no: "P11", title: "Hidrojen Destekli Modüler Piroliz ve Kaynak Geri Kazanım Projesi", author: "Me**** Ok*******" },
      { no: "P12", title: "Effect of Ultrasonic Treatment on the Catalytic Performance of Co–Fe Oxide Nanoparticles in Potassium Borohydride Hydrolysis", author: "Mu****** Ta*** Du****" },
      { no: "P13", title: "Literature-Based Pre-Sizing and Numerical Consistency Assessment of a Laboratory-Scale Photocatalytic Water Splitting Panel", author: "Ne**** İl*** Be*****" },
      { no: "P14", title: "Green synthesis of Ag2S nanoparticles using Cornus mas extract on MXene for enhanced photocatalytic H2 production", author: "Nu*** Gü**" },
      { no: "P15", title: "Nitrogen-Doped Hydrochars from Olive Pits as Metal-Free Catalysts for Hydrogen Generation via NaBH₄ Hydrolysis", author: "Se*** Ke*** As***" },
      { no: "P16", title: "Impact of Piezoelectric Materials on Photoelectrochemical Hydrogen Production: ZnO versus BTO under Different Mechanical Activation Modes", author: "Sü***** Ay**" },
      { no: "P17", title: "Surface-Engineered Spinel-Based Photocatalysts for Efficient Dye-Sensitized Hydrogen Production", author: "Ta*** Ku**" },
      { no: "P18", title: "HYDROGEN RECOVERY FROM BIOMASS", author: "Ye*** Al******" },
    ],
  },
  {
    id: "P3",
    name: "Hidrojen Depolama ve Taşıma",
    posters: [
      { no: "P19", title: "Performance Analysis of PEM Fuel Cells Utilizing Hydrogen Storage in Metal Hydrides with Varying Flow Rates", author: "Ad*** Gö*****" },
      { no: "P20", title: "Optimization of Assembly Torque and Lubrication Amount for Hydrogen Tank Valves", author: "Ah*** Al** Ça****" },
      { no: "P21", title: "Hydrogen Storage Potential of Liquid-Phase-Exfoliated MoS₂/WS₂ Composites", author: "Al** Al*******" },
      { no: "P22", title: "Flow Rate Optimization and Design Improvement of TPRD for High-Pressure Hydrogen Tank Valves (HTV)", author: "Bu*** Me******" },
      { no: "P23", title: "Investigation and Mitigation of Thermal Pressure Relief Device Activation-Time Deviation in Hydrogen Tank Valve Certification", author: "Ce**** Öt**" },
      { no: "P24", title: "Comparative Hydriding Performance of LaNi₅ and LaNi₄.₇₅Al₀.₂₅ in Heat-Pipe Integrated Metal Hydride Tanks", author: "Mu****** Ka*****" },
      { no: "P25", title: "Computational Investigation of Two-Dimensional Ultralight Li2N for Reversible Hydrogen Storage", author: "Si*** Du*****" },
      { no: "P26", title: "METAL HYDRIDE STORAGE CONCEPT FOR OFFSHORE WIND-DERIVED HYDROGEN", author: "Tu*** Ak*** Bo*******" },
    ],
  },
  {
    id: "P4",
    name: "Yakıt Hücreleri",
    posters: [
      { no: "P27", title: "Strategies to Stabilize the Infiltrated Nickel – Yttria Stabilized Zirconia Hydrogen Electrode Microstructure", author: "Al**** Bü********" },
      { no: "P28", title: "1 kW'lık PEM Yakıt Hücresi Sistemi ve Kontrolcüsünün Geliştirilmesi", author: "Ar** Al*******" },
      { no: "P29", title: "Natural MgCO3 Mineral as an Untreated Electrocatalyst for H2O2 Electrooxidation in Fuel Cells", author: "Be*** Al*****" },
      { no: "P30", title: "Platinum Aerogels: An Emerging Class of Carbon Free Electrocatalysts for PEM Fuel Cells", author: "Ca** Er***" },
      { no: "P31", title: "Non-Metallic Fiber-Reinforced Glass-Ceramic Sealants for Solid Oxide Fuel Cells", author: "De*** Al***" },
      { no: "P32", title: "Effect of adding bypass channels on thermal and hydraulic performance of serpentine cooling plates in PEM fuel cells", author: "Ma**** Ca*** Ac**" },
      { no: "P33", title: "Reduced-Order One-Dimensional Thermal and Polarization Analysis of a Proton Exchange Membrane Fuel Cell", author: "Mo****** Al*****" },
      { no: "P34", title: "CFD Flow Field Characterization of a Serpentine PEMFC as a Basis for Assessing Anode Humidification", author: "Os*** Gi*** Oğ*****" },
      { no: "P35", title: "Performance Investigation of a Solid Oxide Fuel Cell By Computational Fluid Dynamics Modeling", author: "Sa**** Nu** Öz*****" },
      { no: "P36", title: "Effects of Operating Temperature, Relative Humidity and Membrane Thickness on PEM Fuel Cell Performance: A Modelling Study", author: "Ya*** Da********" },
    ],
  },
  {
    id: "P5",
    name: "Mobilite ve Ulaşım Uygulamaları",
    posters: [
      { no: "P37", title: "Hidrojen Enerjili Hava Platformları için Yer İstasyonu Dolum Sisteminin Tasarımı ve Performans Analizi", author: "Ab****** Şa***" },
      { no: "P38", title: "Feasibility Assessment of an On-Board Electrolytic Hydrogen Generation System for Hydrogen Internal Combustion Engine Vehicles", author: "Al***** Mi**" },
      { no: "P39", title: "Systematic Root Cause Analysis and Mitigation of Post-Welding Leakage in a Hydrogen Direct Injector", author: "Ha**** Gö******" },
      { no: "P40", title: "Comparative Performance Analysis Using 1-D Modelling of a Hydrogen and Diesel-Fuelled Range-Extender Recuperator Micro Gas Turbine", author: "Ha*** Gü***" },
      { no: "P41", title: "Development of an Advanced Vibration Validation Methodology for Hydrogen Fuel Injector Rail Assemblies", author: "Ön*** Se*** Öm**" },
      { no: "P42", title: "Development of an Optimized Laser Welding Process for Hydrogen Injectors in 100% Hydrogen Internal Combustion Engines", author: "On** Sa*** Go****" },
      { no: "P43", title: "Hydrogen Injector Magnetic Circuit Simulations", author: "Ve*** Al** Öz***" },
    ],
  },
  {
    id: "P6",
    name: "Enerji Sistemleri Entegrasyonu, Karbon Azaltımı ve Power-to-X",
    posters: [
      { no: "P44", title: "Compressed CO2 Storage Integrated with a Hydrogen-Based Allam Cycle: A Techno-Economic Evaluation", author: "Ah*** De*** Yı*******" },
      { no: "P45", title: "Comparative Assessment of Sustainable CO2 Conversion to Value-Added Products Using Thermodynamic and LCA Approaches", author: "Aj** Gu***" },
      { no: "P46", title: "Design and Mass–Volume Optimization of a Hydrogen-Based Hybrid Power System for a MALE-Class Unmanned Aerial Vehicle", author: "Do***** Bı***" },
      { no: "P47", title: "Use of Hydrogen in Stone Wool Manufacturing for Cleaner Operation", author: "En** Se**** Al******" },
      { no: "P48", title: "Comparative assessment of three CO2 conversion processes to methanol production", author: "I.** Kh**" },
      { no: "P49", title: "Higly efficient cathodic catalyst for electrochemical nitrate reduction for ammonia production", author: "Se** Şa***" },
      { no: "P50", title: "An Assessment of Green Hydrogen-Based Ethanol Production with Direct Air Capture and Waste Heat Recovery", author: "Şe*** Kı** Ac**" },
    ],
  },
  {
    id: "P7",
    name: "Hidrojen Ekonomisi, Politika, Güvenlik ve Endüstriyel Uygulamalar",
    posters: [
      { no: "P51", title: "Sanayide Yeşil Hidrojen: ETS, SKDM ve Karbon Maliyeti Perspektifi", author: "Ab******** Be****" },
      { no: "P52", title: "Operationalizing a Lifecycle-Dependent Hydrogen Digital Product Passport against the 2026 European Digital Product Passport Standards", author: "Bi**** Ku**" },
      { no: "P53", title: "Yenilenebilir Enerji Kaynaklı Arz Fazlası Enerjiden Yeşil Hidrojen ve Sürdürülebilir Havacılık Yakıtı Üretimi", author: "De*** On****" },
      { no: "P54", title: "Comparative Analysis of Solar- and Wind-Energy-Based Green Hydrogen Production Costs across Türkiye’s 81 Provinces", author: "Ma***** Es** Sı***" },
      { no: "P55", title: "Beyond Human Error in Hydrogen Incidents: Co-occurrence, Adverse Outcomes and Safety Pathways in H2Tools", author: "Ra*** Ba***" },
    ],
  },
];
