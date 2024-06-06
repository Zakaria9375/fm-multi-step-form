import {AddOn} from "./addOn.interface";

export const addOns: AddOn[] = [
  {
    id: 'online-service',
    title: 'online service',
    name: 'onlineService',
    priceMonthly: 1,
    priceYearly: 10,
    description: 'Access to multiplayer games',
  },
  {
    id: 'larger-storage',
    title: 'larger storage',
    name: 'largerStorage',
    priceMonthly: 2,
    priceYearly: 20,
    description: 'Extra 1TB of cloud save',
  },
  {
    id: 'customizable-profile',
    title: 'customizable profile',
    name: 'customizableProfile',
    priceMonthly: 2,
    priceYearly: 20,
    description: 'Custom theme on your profile',
  },
];
