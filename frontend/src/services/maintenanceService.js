// Mock maintenance events data
const maintenanceEvents = [
  {
    id: 1,
    title: 'Preventive Maintenance for Pump A',
    start: new Date(2025, 11, 5, 10, 0, 0),
    end: new Date(2025, 11, 5, 11, 0, 0),
  },
  {
    id: 2,
    title: 'Inspect Conveyor Belt',
    start: new Date(2025, 11, 12, 14, 0, 0),
    end: new Date(2025, 11, 12, 15, 0, 0),
  },
  {
    id: 3,
    title: 'Service Generator',
    start: new Date(2025, 11, 20, 9, 0, 0),
    end: new Date(2025, 11, 20, 10, 30, 0),
  },
];

export const getMaintenanceEvents = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(maintenanceEvents);
    }, 500);
  });
};
