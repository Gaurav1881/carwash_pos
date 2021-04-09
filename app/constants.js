export const COMPANY_NAME = 'The Royal Carwash';

export const HST = 0.13;

export const TIRE_WASH = {
  name: 'Tire Wash',
  price: 2.99,
};

export const VACUUM = {
  name: 'Full Vacuum',
  price: 3.99,
};

export const RIM_WIPE = {
  name: 'Rim Wipe',
  price: 4.0,
};

export const MATT_WIPE = {
  name: 'Matt Wipe',
  price: 4.0,
};

export const TRUNK_VACUUM = {
  name: 'Trunk Vacuum',
  price: 3.0,
};

export const TRUNK_AND_MATT = {
  name: 'Trunk Matt Wash',
  price: 2.0,
};

export const TIRE_SHINE = {
  name: 'Tire Shine',
  price: 3.0,
};

export const DETAIL_VACUUM = {
  name: 'Detail Vacuum',
  price: 10.0,
};

// add quantity
export const FLOOR_MATT_SHAMPOO = {
  name: 'Floor Matt Shampoo',
  price: 5.0,
};

export const DASH_SHINE = {
  name: 'Dashboard Shine',
  price: 7.0,
};

export const DOOR_WIPE = {
  name: 'Door Wipe',
  price: 10.0,
};

export const CONSOLE_DETAILING = {
  name: 'Console Detailing',
  price: 10.0,
};

export const SEAT_WIPE = {
  name: 'Seat Wipe',
  price: 10.0,
};

export const RIM_DETAILING = {
  name: 'Rim Detailing',
  price: 15.0,
};

export const TRUNK_SHAMPOO = {
  name: 'Rim Detailing',
  price: 20.0,
};

export const ODOOR_ELIMINATOR = {
  name: 'Odoor Eliminator',
  price: 25.0,
};

export const ALL_ADD_ONS = [
  MATT_WIPE,
  RIM_WIPE,
  TRUNK_AND_MATT,
  TRUNK_SHAMPOO,
  TRUNK_VACUUM,
  TIRE_SHINE,
  TIRE_WASH,
  DETAIL_VACUUM,
  FLOOR_MATT_SHAMPOO,
  DASH_SHINE,
  DOOR_WIPE,
  ODOOR_ELIMINATOR,
  CONSOLE_DETAILING,
  SEAT_WIPE,
  RIM_DETAILING,
];

export const NON_WAX_REMOVAL_SOAP = {
  name: 'Wax and Soap Wash',
  price: 0.0,
};

export const POWER_DRY_AND_TOWEL = {
  name: 'Power Dry & Hand Towel Wiped',
  price: 0.0,
};

export const QUICK_RIM_WASH_NO_WIPE = {
  name: 'Quick Rim Wash (No Wipe)',
  price: 0.0,
};

export const VACUUM_INTERIOR_NO_TRUNK = {
  name: 'Vacuum Interior (No Trunk)',
  price: 0.0,
};

export const QUICK_DASHBOARD_AND_CONSOLE_WIPE = {
  name: 'Quick Dash & Console Wipe',
  price: 0.0,
};

export const CLEAN_ALL_WINDOWS = {
  name: 'Clear All Windows',
  price: 0.0,
};

export const WASH_FOUR_MATS = {
  name: 'Wash 4 Rubber Mats',
  price: 0.0,
};

export const VACUUM_INTERIOR = {
  name: 'Vacuum Interior',
  price: 0.0,
};

export const TRIPLE_FOAM_WAX = {
  name: 'Triple Foam Wax',
  price: 0.0,
};

export const POWER_DRY_AND_HAND_TOWEL = {
  name: 'Power Dry & Hand Dry',
  price: 0.0,
};

export const QUICK_HAND_SPRAY_WAX_DOOR_WIPE = {
  name: 'Quick Hand Spray Wax or Door Wipe',
  price: 0.0,
};
export const QUICK_HAND_SPRAY_WAX = {
  name: 'Quick Hand Spray Wax',
  price: 0.0,
};


export const WASH_RUBBER_MATS = {
  name: 'Wash Rubber Mats',
  price: 0.0,
};

export const CLEAN_VINYL = {
  name: 'Quick Clean All Vinyl',
  price: 0.0,
};

export const POLISH_LEATHER_SEATS = {
  name: 'Polish Leather Seats',
  price: 0.0,
};

export const RIM_CLEAN_TIRE_SHINE = {
  name: 'Rim Clean & Tire Shine',
  price: 0.0,
};

export const RIM_CLEAN_AND_WIPE= {
  name: 'Rim Clean & Wipe',
  price: 0.0,
};

export const FREE_AIR_FRESHENER = {
  name: 'Free Air Freshener',
  price: 0.0,
};

export const SERVICES = [
  {
    name: 'The Regular Exterior Wash',
    shortForm: 'Reg Ext Wash',
    price: 12.39,
    includes: [
      NON_WAX_REMOVAL_SOAP,
      POWER_DRY_AND_TOWEL,
      QUICK_RIM_WASH_NO_WIPE,
      TIRE_SHINE,
    ],
    addOns: ALL_ADD_ONS,
  },
  {
    name: 'The Royal Hand Spray & Wash',
    price: 29.99,
    includes: [
      NON_WAX_REMOVAL_SOAP,
      POWER_DRY_AND_HAND_TOWEL,
      TIRE_SHINE,
      QUICK_HAND_SPRAY_WAX,
      RIM_CLEAN_AND_WIPE,
      TRIPLE_FOAM_WAX
    ],
    addOns: ALL_ADD_ONS,
  },
  {
    name: 'The Royal Regular Wash',
    price: 23.99,
    includes: [
      VACUUM_INTERIOR_NO_TRUNK,
      WASH_FOUR_MATS,
      NON_WAX_REMOVAL_SOAP,
      QUICK_DASHBOARD_AND_CONSOLE_WIPE,
      CLEAN_ALL_WINDOWS
    ],
    addOns: ALL_ADD_ONS,
  },
  {
    name: 'The Royal Super Wash',
    price: 26.54,
    includes: [
      VACUUM_INTERIOR_NO_TRUNK,
      WASH_FOUR_MATS,
      NON_WAX_REMOVAL_SOAP,
      QUICK_DASHBOARD_AND_CONSOLE_WIPE,
      CLEAN_ALL_WINDOWS,
      TRIPLE_FOAM_WAX,
      POWER_DRY_AND_HAND_TOWEL,
      QUICK_RIM_WASH_NO_WIPE,
      TIRE_SHINE,
    ],
    addOns: ALL_ADD_ONS,
  },
  {
    name: 'The Royal Wipe & Wash',
    price: 37.17,
    includes: [
      VACUUM_INTERIOR,
      WASH_FOUR_MATS,
      NON_WAX_REMOVAL_SOAP,
      QUICK_DASHBOARD_AND_CONSOLE_WIPE,
      TRIPLE_FOAM_WAX,
      POWER_DRY_AND_HAND_TOWEL,
      TIRE_SHINE,
      CLEAN_ALL_WINDOWS,
      QUICK_HAND_SPRAY_WAX_DOOR_WIPE,
    ],
    addOns: ALL_ADD_ONS,
  },
  {
    name: 'The Royal Lux Wipe & Shine',
    price: 59.99,
    includes: [
      VACUUM_INTERIOR,
      WASH_RUBBER_MATS,
      NON_WAX_REMOVAL_SOAP,
      CLEAN_VINYL,
      CLEAN_ALL_WINDOWS,
      POLISH_LEATHER_SEATS,
      TRIPLE_FOAM_WAX,
      POWER_DRY_AND_HAND_TOWEL,
      RIM_CLEAN_TIRE_SHINE,
      FREE_AIR_FRESHENER
    ],
    addOns: ALL_ADD_ONS,
  },
];
