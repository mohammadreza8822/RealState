const pexels = (id) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop`;

const IMG = {
  apartment: pexels(1571460),
  villa: pexels(106399),
  store: pexels(264507),
  office: pexels(37347),
  apartment2: pexels(271743),
  villa2: pexels(3288102),
  store2: pexels(1267322),
  office2: pexels(1181406),
  apartmentLux: pexels(1396132),
  villaWater: pexels(1438832),
};

export const MOCK_USER_IDS = {
  demo: "674a00000000000000000001",
  admin: "674a00000000000000000002",
  superadmin: "674a00000000000000000003",
};

export const MOCK_PROFILE_IDS = [
  "674b00000000000000000001",
  "674b00000000000000000002",
  "674b00000000000000000003",
  "674b00000000000000000004",
  "674b00000000000000000005",
  "674b00000000000000000006",
  "674b00000000000000000007",
  "674b00000000000000000008",
  "674b00000000000000000009",
  "674b0000000000000000000a",
];

const AMENITIES = {
  apartment: ["Parking", "In-unit laundry", "Gym", "Concierge", "Balcony"],
  villa: ["Swimming pool", "Double garage", "Backyard", "Central A/C", "Smart home"],
  store: ["Street frontage", "Storage room", "High foot traffic", "Loading dock"],
  office: ["Reception area", "Meeting rooms", "Fiber internet", "24/7 access"],
};

const RULES = {
  residential: ["No smoking indoors", "Pets allowed with deposit", "12-month lease minimum"],
  commercial: ["Commercial use only", "Tenant insurance required", "No exterior signage without approval"],
};

export function createSeedProfiles() {
  const now = new Date();
  const items = [
    {
      title: "Modern 2-Bed Condo in Yorkville",
      category: "apartment",
      location: "Toronto, ON — Yorkville",
      price: 875000,
      size: 95,
      image: IMG.apartment2,
      realState: "Maple Ridge Realty",
      description:
        "Bright corner unit with floor-to-ceiling windows, open kitchen, and walk score of 98. Steps from the subway, cafes, and Queen's Park.",
    },
    {
      title: "Luxury Estate with Pool in West Vancouver",
      category: "villa",
      location: "West Vancouver, BC — British Properties",
      price: 3200000,
      size: 340,
      image: IMG.villa,
      realState: "Pacific Coast Homes",
      description:
        "Panoramic ocean and mountain views, chef's kitchen, home theatre, and heated infinity pool. Quiet cul-de-sac minutes from Ambleside Beach.",
    },
    {
      title: "Retail Space on Queen Street West",
      category: "store",
      location: "Toronto, ON — Queen West",
      price: 1250000,
      size: 110,
      image: IMG.store,
      realState: "Urban Commercial Group",
      description:
        "Prime retail frontage in a high-traffic arts district. Ideal for boutique, café, or showroom. Recently updated HVAC and storefront.",
    },
    {
      title: "Downtown Office Suite — Financial District",
      category: "office",
      location: "New York, NY — Financial District",
      price: 2100000,
      size: 185,
      image: IMG.office,
      realState: "Manhattan Workspace Partners",
      description:
        "Corner office floor with city views, conference rooms, and building amenities including fitness center and rooftop terrace.",
    },
    {
      title: "Sunny 1-Bed Apartment in Kitsilano",
      category: "apartment",
      location: "Vancouver, BC — Kitsilano",
      price: 649000,
      size: 72,
      image: IMG.apartment,
      realState: "West Coast Living Realty",
      description:
        "South-facing unit with hardwood floors, in-suite laundry, and a private patio. Short walk to Kits Beach and West 4th shops.",
    },
    {
      title: "Craftsman Home with Large Yard in Austin",
      category: "villa",
      location: "Austin, TX — Zilker",
      price: 1450000,
      size: 280,
      image: IMG.villa2,
      realState: "Lone Star Property Co.",
      description:
        "Renovated 4-bedroom home with original character, updated kitchen, covered patio, and mature trees. Near Barton Springs Pool.",
    },
    {
      title: "Corner Retail Unit in Old Montreal",
      category: "store",
      location: "Montreal, QC — Old Montreal",
      price: 890000,
      size: 85,
      image: IMG.store2,
      realState: "Quebec Commerce Realty",
      description:
        "Historic stone building with exposed brick interior. Excellent visibility on a cobblestone street popular with tourists and locals.",
    },
    {
      title: "Creative Office Loft in Arts District",
      category: "office",
      location: "Los Angeles, CA — Arts District",
      price: 1680000,
      size: 240,
      image: IMG.office2,
      realState: "SoCal Commercial Brokers",
      description:
        "Open-plan loft with 14-ft ceilings, polished concrete floors, and private parking. Perfect for design studio or tech startup.",
    },
    {
      title: "Penthouse with Skyline Views in Chicago",
      category: "apartment",
      location: "Chicago, IL — River North",
      price: 1950000,
      size: 165,
      image: IMG.apartmentLux,
      realState: "Windy City Estates",
      description:
        "Top-floor penthouse featuring wraparound terrace, fireplace, and premium finishes. Full-service building with pool and valet.",
    },
    {
      title: "Waterfront Villa in Miami Beach",
      category: "villa",
      location: "Miami Beach, FL — Sunset Islands",
      price: 4750000,
      size: 420,
      image: IMG.villaWater,
      realState: "Atlantic Shore Realty",
      description:
        "Private dock, resort-style pool, and indoor-outdoor living spaces. Direct bay access with sunset views year-round.",
    },
  ];

  return items.map((item, i) => {
    const isCommercial = item.category === "store" || item.category === "office";
    return {
      _id: MOCK_PROFILE_IDS[i],
      title: item.title,
      image: item.image,
      description: item.description,
      location: item.location,
      phone: "+1 (416) 555-0142",
      realState: item.realState,
      price: item.price,
      size: item.size,
      constructionDate: new Date(2018 + (i % 5), i % 12, 1),
      category: item.category,
      amenities: AMENITIES[item.category],
      rules: isCommercial ? RULES.commercial : RULES.residential,
      userId: MOCK_USER_IDS.demo,
      published: i < 9,
      visitAvailability: [],
      createdAt: new Date(now.getTime() - i * 86400000),
      updatedAt: now,
    };
  });
}

export const DEMO_ACCOUNTS = [
  {
    _id: MOCK_USER_IDS.demo,
    email: "demo@demo.com",
    password: "demo123",
    role: "USER",
    agentStatus: "none",
    favorites: [MOCK_PROFILE_IDS[0], MOCK_PROFILE_IDS[2]],
  },
  {
    _id: MOCK_USER_IDS.admin,
    email: "admin@demo.com",
    password: "admin123",
    role: "ADMIN",
    agentStatus: "approved",
    favorites: [],
  },
  {
    _id: MOCK_USER_IDS.superadmin,
    email: "super@demo.com",
    password: "super123",
    role: "SUPERADMIN",
    agentStatus: "approved",
    favorites: [],
  },
];
