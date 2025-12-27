import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';
import { getMaintenanceEvents } from '../../services/maintenanceService';

const localizer = momentLocalizer(moment);

const MaintenanceCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const maintenanceEvents = await getMaintenanceEvents();
      setEvents(maintenanceEvents);
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

  return (
    <div className="maintenance-calendar">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        selectable
        onSelectSlot={handleSelectSlot}
      />
    </div>
  );
};

export default MaintenanceCalendar;
