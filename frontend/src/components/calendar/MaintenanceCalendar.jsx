import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getMaintenanceEvents } from '../../services/maintenanceService';

const localizer = momentLocalizer(moment);

const MaintenanceCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      // Mocking service call if it fails or returns undefined
      try {
        const maintenanceEvents = await getMaintenanceEvents();
        if (maintenanceEvents) setEvents(maintenanceEvents);
      } catch (e) {
        console.warn("Failed to fetch events, using defaults");
        setEvents([
          { title: 'Excavator Maintenance', start: new Date(), end: new Date() },
        ]);
      }
    };
    fetchEvents();
  }, []);

  const handleSelectSlot = ({ start, end }) => {
    const title = window.prompt('New Maintenance Request');
    if (title) {
      const newEvent = {
        start,
        end,
        title,
      };
      setEvents([...events, newEvent]);
    }
  };

  // Customizing calendar styles via props or wrapper class
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
      <style>{`
        .rbc-calendar { font-family: 'Inter', sans-serif; }
        .rbc-toolbar button { color: #475569; border: 1px solid #e2e8f0; border-radius: 8px; }
        .rbc-toolbar button:hover { bg-color: #f1f5f9; }
        .rbc-toolbar button.rbc-active { background-color: #3b82f6; color: white; border-color: #3b82f6; }
        .rbc-header { padding: 10px; font-weight: 600; color: #64748b; }
        .rbc-month-view { border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; }
        .rbc-day-bg { border-left: 1px solid #e2e8f0; }
        .rbc-off-range-bg { background-color: #f8fafc; }
        /* Dark mode overrides ideally would use tailwind classes but for big-calendar css requires specific selectors */
      `}</style>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 650 }}
        selectable
        onSelectSlot={handleSelectSlot}
        className="text-slate-700 dark:text-slate-300"
      />
    </div>
  );
};

export default MaintenanceCalendar;
