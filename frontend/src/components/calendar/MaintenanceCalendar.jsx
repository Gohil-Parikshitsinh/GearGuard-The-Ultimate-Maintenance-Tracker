import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';
import requestService from '../../services/requestService';
import api from '../../services/api';
import Modal from '../common/Modal';
import CreateRequestForm from '../requests/CreateRequestForm';

const localizer = momentLocalizer(moment);

const MaintenanceCalendar = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const fetchEvents = async () => {
    try {
      // Fetch specific calendar endpoint for preventive maintenance
      const response = await api.get('requests/calendar/'); // Ensure url matches backend views
      const data = response.data.data.map(item => ({
        id: item.id,
        title: item.title,
        start: new Date(item.start),
        end: new Date(item.start), // All day or same time for simplicity unless duration exists
        allDay: true,
        status: item.status
      }));
      setEvents(data);
    } catch (error) {
      console.error("Failed to fetch calendar events", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSelectSlot = (slotInfo) => {
    // Open modal to create request
    setSelectedDate(moment(slotInfo.start).format('YYYY-MM-DD'));
    setIsModalOpen(true);
  };

  const handleEventPropGetter = (event) => {
    let className = 'bg-blue-500';
    if (event.status === 'REPAIRED') className = 'bg-green-500';
    if (event.status === 'SCRAP') className = 'bg-red-500';

    return { className: `${className} text-white rounded px-2` };
  };

  // Customizing calendar styles via props or wrapper class
  return (
    <div className="h-[600px] bg-white p-4 rounded-lg shadow">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        selectable
        onSelectSlot={handleSelectSlot}
        eventPropGetter={handleEventPropGetter}
        views={['month', 'week', 'day']}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CreateRequestForm
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchEvents}
          initialDate={selectedDate}
        />
      </Modal>
    </div>
  );
};

export default MaintenanceCalendar;
