import React from 'react';
import Header from '../components/common/Header';
import MaintenanceCalendar from '../components/calendar/MaintenanceCalendar';

const Calendar = () => {
  return (
    <div className="w-full h-full">
      <Header title="Maintenance Calendar" />
      <div className="p-6">
        <MaintenanceCalendar />
      </div>
    </div>
  );
};

export default Calendar;