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

export const SERVICES = [
  {
    name: 'The Regular Exterior Wash',
    shortForm: 'Reg Ext Wash',
    price: 12.39,
    includes: [VACUUM],
    addOns: ALL_ADD_ONS,
  },
  {
    name: 'The Royal Hand Spray & Wash',
    price: 29.99,
    includes: [VACUUM],
    addOns: ALL_ADD_ONS,
  },
  {
    name: 'The Royal Regular Wash',
    price: 23.99,
    includes: [VACUUM],
    addOns: ALL_ADD_ONS,
  },
  {
    name: 'The Royal Super Wash',
    price: 26.54,
    includes: [VACUUM],
    addOns: ALL_ADD_ONS,
  },
  {
    name: 'The Royal Wipe & Wash',
    price: 37.17,
    includes: [VACUUM],
    addOns: ALL_ADD_ONS,
  },
  {
    name: 'The Royal Lux Wipe & Shine',
    price: 59.99,
    includes: [TIRE_WASH],
    addOns: ALL_ADD_ONS,
  },
];
