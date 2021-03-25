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

export const SERVICES = [
  {
    name: 'The Regular Exterior Wash',
    shortForm: 'Reg Ext Wash',
    price: 12.39,
    includes: [VACUUM],
    addOns: [VACUUM, TIRE_WASH],
  },
  {
    name: 'The Royal Hand Spray & Wash',
    price: 29.99,
    includes: [VACUUM],
    addOns: [VACUUM, TIRE_WASH],
  },
  {
    name: 'The Royal Regular Wash',
    price: 23.99,
    includes: [VACUUM],
    addOns: [VACUUM, TIRE_WASH],
  },
  {
    name: 'The Royal Super Wash',
    price: 26.54,
    includes: [VACUUM],
    addOns: [VACUUM, TIRE_WASH],
  },
  {
    name: 'The Royal Wipe & Wash',
    price: 37.17,
    includes: [VACUUM],
    addOns: [VACUUM, TIRE_WASH],
  },
  {
    name: 'The Royal Lux Wipe & Shine',
    price: 59.99,
    includes: [TIRE_WASH],
    addOns: [VACUUM, TIRE_WASH],
  },
];
