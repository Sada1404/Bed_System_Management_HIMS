'use client'

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus, Clock, X, Bell } from 'lucide-react';

// Main Calendar Component
const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'General Checkup',
      startDate: '2025-07-31',
      endDate: '2025-07-31',
      time: '09:00',
      color: 'consultation',
      type: 'consultation',
    },
    {
      id: 2,
      title: 'Team Meeting',
      startDate: '2025-07-31',
      endDate: '2025-07-31',
      time: '14:00',
      color: 'meeting',
      type: 'meeting',
    },
    {
      id: 3,
      title: 'Emergency Surgery',
      startDate: '2025-08-01',
      endDate: '2025-08-01',
      time: '10:30',
      color: 'surgery',
      type: 'surgery',
    },
    {
      id: 4,
      title: 'Follow-up Consultation',
      startDate: '2025-08-02',
      endDate: '2025-08-02',
      time: '11:00',
      color: 'consultation',
      type: 'consultation',
    },
  ]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [view, setView] = useState('Month');
  const [previousView, setPreviousView] = useState('Month');
  const [alertFilter, setAlertFilter] = useState('week');

  // Get upcoming events for alerts with filter
  const getUpcomingEvents = () => {
    const now = new Date();
    const futureDate = new Date(now);
    
    switch(alertFilter) {
      case 'week':
        futureDate.setDate(now.getDate() + 7);
        break;
      case 'month':
        futureDate.setMonth(now.getMonth() + 1);
        break;
      case 'quarter':
        futureDate.setMonth(now.getMonth() + 3);
        break;
      case 'half':
        futureDate.setMonth(now.getMonth() + 6);
        break;
      case 'yearly':
        futureDate.setFullYear(now.getFullYear() + 1);
        break;
      default:
        futureDate.setDate(now.getDate() + 7);
    }

    return events.filter((event) => {
      const eventDate = new Date(event.startDate);
      return eventDate >= now && eventDate <= futureDate;
    }).sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  };

  // Generate calendar days based on view
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const today = new Date();

    if (view === 'Month') {
      const firstDayOfWeek = firstDayOfMonth.getDay();
      const daysInMonth = lastDayOfMonth.getDate();
      const days = [];

      // Previous month days
      for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        const date = new Date(year, month, -i);
        days.push({
          date: date.getDate(),
          fullDate: date.toISOString().split('T')[0],
          isCurrentMonth: false,
          isToday: date.toDateString() === today.toDateString(),
          dateObj: date,
        });
      }

      // Current month days
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        days.push({
          date: day,
          fullDate: date.toISOString().split('T')[0],
          isCurrentMonth: true,
          isToday: date.toDateString() === today.toDateString(),
          dateObj: date,
        });
      }

      // Next month days
      const remainingDays = 42 - days.length;
      for (let day = 1; day <= remainingDays; day++) {
        const date = new Date(year, month + 1, day);
        days.push({
          date: day,
          fullDate: date.toISOString().split('T')[0],
          isCurrentMonth: false,
          isToday: date.toDateString() === today.toDateString(),
          dateObj: date,
        });
      }

      return days;
    } else if (view === 'Week') {
      const firstDayOfWeek = new Date(currentDate);
      firstDayOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      const days = [];

      for (let i = 0; i < 7; i++) {
        const date = new Date(firstDayOfWeek);
        date.setDate(firstDayOfWeek.getDate() + i);
        days.push({
          date: date.getDate(),
          fullDate: date.toISOString().split('T')[0],
          isCurrentMonth: date.getMonth() === month,
          isToday: date.toDateString() === today.toDateString(),
          dateObj: date,
        });
      }
      return days;
    } else if (view === 'Day') {
      return [
        {
          date: currentDate.getDate(),
          fullDate: currentDate.toISOString().split('T')[0],
          isCurrentMonth: true,
          isToday: currentDate.toDateString() === today.toDateString(),
          dateObj: currentDate,
        },
      ];
    }
    return [];
  };

  const calendarDays = generateCalendarDays();

  // Get events for a specific date or range
  const getEventsForDate = (date) => {
    return events.filter((event) => {
      const start = new Date(event.startDate);
      const end = new Date(event.endDate);
      const target = new Date(date);
      return start <= target && target <= end;
    });
  };

  // Healthcare-specific color mapping
  const colorClasses = {
    consultation: 'bg-green-500',
    meeting: 'bg-blue-500',
    surgery: 'bg-red-500',
    appointment: 'bg-indigo-500',
    emergency: 'bg-orange-500',
    vaccination: 'bg-purple-500',
    lab: 'bg-teal-500',
    followup: 'bg-cyan-500',
  };

  const textColorClasses = {
    consultation: 'text-green-700',
    meeting: 'text-blue-700',
    surgery: 'text-red-700',
    appointment: 'text-indigo-700',
    emergency: 'text-orange-700',
    vaccination: 'text-purple-700',
    lab: 'text-teal-700',
    followup: 'text-cyan-700',
  };

  const backgroundColorClasses = {
    consultation: 'bg-green-50 border-green-200',
    meeting: 'bg-blue-50 border-blue-200',
    surgery: 'bg-red-50 border-red-200',
    appointment: 'bg-indigo-50 border-indigo-200',
    emergency: 'bg-orange-50 border-orange-200',
    vaccination: 'bg-purple-50 border-purple-200',
    lab: 'bg-teal-50 border-teal-200',
    followup: 'bg-cyan-50 border-cyan-200',
  };

  // Navigation
  const navigate = (direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (view === 'Month') {
        newDate.setMonth(prev.getMonth() + direction);
      } else if (view === 'Week') {
        newDate.setDate(prev.getDate() + direction * 7);
      } else if (view === 'Day') {
        newDate.setDate(prev.getDate() + direction);
      }
      return newDate;
    });
  };

  const handleDateClick = (day) => {
    setSelectedDate(day.fullDate);
    setPreviousView(view);
    if (view !== 'Day') {
      setCurrentDate(new Date(day.fullDate));
      setView('Day');
    }
    setShowEventDetails(true);
  };

  const handleCreateEvent = (eventData) => {
    if (selectedEvent) {
      // Update existing event
      setEvents((prev) =>
        prev.map((event) =>
          event.id === selectedEvent.id ? { ...event, ...eventData } : event
        )
      );
    } else {
      // Create new event
      const newEvent = {
        id: Date.now(),
        ...eventData,
      };
      setEvents((prev) => [...prev, newEvent]);
    }
    setShowEventModal(false);
    setSelectedEvent(null);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const handleDeleteEvent = (eventId) => {
    setEvents((prev) => prev.filter((event) => event.id !== eventId));
    setShowEventDetails(false);
  };

  const handleCloseEventDetails = () => {
    setShowEventDetails(false);
    if (previousView && previousView !== view) {
      setView(previousView);
    }
  };

  // Render events for a day with multi-day event support
  const renderEventsForDay = (day) => {
    const dayEvents = getEventsForDate(day.fullDate);
    const maxEventsPerDay = view === 'Day' ? 15 : view === 'Week' ? 4 : 3;

    return (
      <div className="space-y-1">
        {dayEvents.slice(0, maxEventsPerDay).map((event) => {
          const start = new Date(event.startDate);
          const end = new Date(event.endDate);
          const current = new Date(day.fullDate);
          const isStart = start.toISOString().split('T')[0] === day.fullDate;
          const isEnd = end.toISOString().split('T')[0] === day.fullDate;
          const isMiddle = start < current && current < end;

          return (
            <div
              key={event.id}
              className="flex items-center space-x-1 group cursor-pointer hover:opacity-80 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                handleEditEvent(event);
              }}
            >
              <div className={`w-2 h-2 rounded-full ${colorClasses[event.color]} flex-shrink-0`} />
              <div className={`text-xs truncate ${textColorClasses[event.color]} font-medium`}>
                {(isStart || view === 'Day') && event.time && (
                  <span className="text-gray-500 mr-1 text-xs">{event.time}</span>
                )}
                <span className="truncate">
                  {(isStart || view === 'Day') && event.title}
                  {isMiddle && <span className="text-gray-500">...</span>}
                  {isEnd && !isStart && event.title}
                </span>
              </div>
            </div>
          );
        })}
        {dayEvents.length > maxEventsPerDay && (
          <div className="text-xs text-gray-500 font-medium">
            +{dayEvents.length - maxEventsPerDay} more
          </div>
        )}
      </div>
    );
  };

  // Render the calendar grid based on view
  const renderCalendarGrid = () => {
    if (view === 'Month') {
      return (
        <div className="grid grid-cols-7 gap-0">
          {calendarDays.map((day, index) => (
            <div
              key={index}
              onClick={() => handleDateClick(day)}
              className={`min-h-20 sm:min-h-24 md:min-h-28 p-1 sm:p-2 border-r border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                !day.isCurrentMonth ? 'bg-gray-50 text-gray-400' : ''
              } ${day.isToday ? 'bg-blue-100 border-blue-300 ring-2 ring-blue-200' : ''}`}
            >
              <div
                className={`text-xs sm:text-sm font-medium mb-1 ${
                  day.isToday
                    ? 'text-blue-700 font-bold bg-blue-200 rounded-full w-6 h-6 flex items-center justify-center'
                    : day.isCurrentMonth
                    ? 'text-gray-900'
                    : 'text-gray-400'
                }`}
              >
                {day.date}
              </div>
              {renderEventsForDay(day)}
            </div>
          ))}
        </div>
      );
    } else if (view === 'Week') {
      return (
        <div className="grid grid-cols-7 gap-0">
          {calendarDays.map((day, index) => (
            <div
              key={index}
              onClick={() => handleDateClick(day)}
              className={`min-h-32 sm:min-h-40 p-1 sm:p-2 border-r border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                !day.isCurrentMonth ? 'bg-gray-50 text-gray-400' : ''
              } ${day.isToday ? 'bg-blue-100 border-blue-300 ring-2 ring-blue-200' : ''}`}
            >
              <div
                className={`text-sm font-medium mb-2 ${
                  day.isToday
                    ? 'text-blue-700 font-bold bg-blue-200 rounded-full w-6 h-6 flex items-center justify-center'
                    : day.isCurrentMonth
                    ? 'text-gray-900'
                    : 'text-gray-400'
                }`}
              >
                {day.date}
              </div>
              {renderEventsForDay(day)}
            </div>
          ))}
        </div>
      );
    } else if (view === 'Day') {
      const day = calendarDays[0];
      return (
        <div className="p-2 sm:p-4">
          <div
            className={`text-lg font-medium mb-4 ${
              day.isToday ? 'text-blue-700 font-bold' : 'text-gray-900'
            }`}
          >
            {new Date(day.fullDate).toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </div>
          <div className="space-y-2">
            {renderEventsForDay(day)}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    
    <div className="w-full max-w-7xl mx-auto p-2 sm:p-4 lg:p-6 bg-white rounded-lg shadow-lg">
      {/* Alert Banner */}
      <AlertBanner upcomingEvents={getUpcomingEvents()} alertFilter={alertFilter} setAlertFilter={setAlertFilter} />

      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            {currentDate.toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric',
            })}
          </h1>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={() => navigate(-1)}
              className="p-1 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={() => navigate(1)}
              className="p-1 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {['Month', 'Week', 'Day'].map((viewType) => (
              <button
                key={viewType}
                onClick={() => setView(viewType)}
                className={`px-2 sm:px-4 py-1 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors flex-1 sm:flex-none ${
                  view === viewType
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {viewType}
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              setSelectedEvent(null);
              setSelectedDate(new Date().toISOString().split('T')[0]);
              setShowEventModal(true);
            }}
            className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
          >
            <Plus className="w-4 h-4" />
            <span>Add Event</span>
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Day Headers */}
        {view !== 'Day' && (
          <div className="grid grid-cols-7 border-b border-gray-200">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div
                key={day}
                className="p-2 sm:p-4 text-center text-xs sm:text-sm font-medium text-gray-500 bg-gray-50"
              >
                {day}
              </div>
            ))}
          </div>
        )}

        {/* Calendar Days */}
        {renderCalendarGrid()}
      </div>

      {/* Event Modal */}
      {showEventModal && (
        <EventModal
          onClose={() => {
            setShowEventModal(false);
            setSelectedEvent(null);
          }}
          onSubmit={handleCreateEvent}
          selectedDate={selectedDate}
          event={selectedEvent}
        />
      )}

      {/* Event Details Modal */}
      {showEventDetails && (
        <EventDetailsModal
          date={selectedDate}
          events={getEventsForDate(selectedDate)}
          onClose={() => handleCloseEventDetails()}
          onDelete={handleDeleteEvent}
          onEdit={handleEditEvent}
          colorClasses={colorClasses}
          backgroundColorClasses={backgroundColorClasses}
        />
      )}
    </div>

  );
};

// Alert Banner Component
const AlertBanner = ({ upcomingEvents, alertFilter, setAlertFilter }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getTimeUntilEvent = (eventDate, eventTime) => {
    const now = new Date();
    const event = new Date(eventDate);

    if (eventTime) {
      const [hours, minutes] = eventTime.split(':');
      event.setHours(parseInt(hours), parseInt(minutes));
    }

    const diff = event.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours < 0) return null;
    if (hours === 0) return `${minutes}m`;
    if (hours < 24) return `${hours}h ${minutes}m`;

    const days = Math.floor(hours / 24);
    return `${days}d ${hours % 24}h`;
  };

  const getFilterLabel = () => {
    switch(alertFilter) {
      case 'week': return 'This Week';
      case 'month': return 'This Month';
      case 'quarter': return 'This Quarter';
      case 'half': return 'Next 6 Months';
      case 'yearly': return 'This Year';
      default: return 'This Week';
    }
  };

  return (
    <div className="mb-4 sm:mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-3 sm:p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
        <div className="flex items-center space-x-2 mb-2 sm:mb-0">
          <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
          <h3 className="text-sm font-semibold text-blue-900">Upcoming Events</h3>
          <span className="text-xs text-blue-600">({getFilterLabel()})</span>
        </div>
        <div className="flex space-x-1">
          {[
            { key: 'week', label: 'Week' },
            { key: 'month', label: 'Month' },
            { key: 'quarter', label: 'Quarter' },
            { key: 'half', label: '6 Months' },
            { key: 'yearly', label: 'Year' }
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setAlertFilter(filter.key)}
              className={`px-2 py-1 text-xs rounded-md transition-colors ${
                alertFilter === filter.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-blue-600 hover:bg-blue-100'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        {upcomingEvents.length === 0 ? (
          <p className="text-blue-700 text-sm">No upcoming events in {getFilterLabel().toLowerCase()}</p>
        ) : (
          upcomingEvents.slice(0, 5).map((event) => {
            const timeUntil = getTimeUntilEvent(event.startDate, event.time);
            const eventDate = new Date(event.startDate);
            const isToday = eventDate.toDateString() === currentTime.toDateString();
            const isTomorrow = eventDate.toDateString() === new Date(currentTime.getTime() + 24 * 60 * 60 * 1000).toDateString();

            return (
              <div key={event.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm space-y-1 sm:space-y-0">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    event.color === 'consultation' ? 'bg-green-500' :
                    event.color === 'meeting' ? 'bg-blue-500' :
                    event.color === 'surgery' ? 'bg-red-500' :
                    event.color === 'appointment' ? 'bg-indigo-500' :
                    event.color === 'emergency' ? 'bg-orange-500' :
                    event.color === 'vaccination' ? 'bg-purple-500' :
                    event.color === 'lab' ? 'bg-teal-500' : 'bg-cyan-500'
                  }`} />
                  <span className="font-medium text-gray-900">{event.title}</span>
                  {event.time && (
                    <span className="text-gray-600 text-xs sm:text-sm">
                      {isToday
                        ? 'today'
                        : isTomorrow
                        ? 'tomorrow'
                        : eventDate.toLocaleDateString()} at {event.time}
                    </span>
                  )}
                </div>
                {timeUntil && (
                  <div className="flex items-center space-x-1 text-blue-600 font-medium ml-4 sm:ml-0">
                    <Clock className="w-3 h-3" />
                    <span className="text-xs sm:text-sm">{timeUntil}</span>
                  </div>
                )}
              </div>
            );
          })
        )}
        {upcomingEvents.length > 5 && (
          <p className="text-xs text-blue-600">+{upcomingEvents.length - 5} more events</p>
        )}
      </div>
    </div>
  );
};

// Event Modal Component
const EventModal = ({ onClose, onSubmit, selectedDate, event }) => {
  const [formData, setFormData] = useState(
    event || {
      title: '',
      startDate: selectedDate || new Date().toISOString().split('T')[0],
      endDate: selectedDate || new Date().toISOString().split('T')[0],
      time: '',
      color: 'meeting',
      type: 'meeting',
    }
  );

  const handleSubmit = () => {
    if (!formData.title.trim()) return;
    onSubmit({
      title: formData.title,
      startDate: formData.startDate,
      endDate: formData.endDate,
      time: formData.time || null,
      color: formData.type, // Use type as color for healthcare system
      type: formData.type,
    });
  };

  return (
    <div className="fixed inset-0  bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md mx-auto shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            {event ? 'Edit Event' : 'Add New Event'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Enter event title"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData((prev) => ({ ...prev, startDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                required
                value={formData.endDate}
                onChange={(e) => setFormData((prev) => ({ ...prev, endDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time (Optional)
            </label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData((prev) => ({ ...prev, time: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value, color: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="consultation">Consultation (Green)</option>
              <option value="meeting">Meeting (Blue)</option>
              <option value="surgery">Surgery (Red)</option>
              <option value="appointment">Appointment (Indigo)</option>
              <option value="emergency">Emergency (Orange)</option>
              <option value="vaccination">Vaccination (Purple)</option>
              <option value="lab">Lab Test (Teal)</option>
              <option value="followup">Follow-up (Cyan)</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base"
          >
            {event ? 'Update Event' : 'Create Event'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Event Details Modal Component
const EventDetailsModal = ({ date, events, onClose, onDelete, onEdit, colorClasses, backgroundColorClasses }) => {
  return (
    <div className="fixed inset-0 bg-opacity-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md mx-auto shadow-xl max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            Events for {new Date(date).toLocaleDateString()}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {events.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No events scheduled for this date</p>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                className={`flex items-center justify-between p-3 border rounded-lg ${backgroundColorClasses[event.color]}`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${colorClasses[event.color]} flex-shrink-0`} />
                  <div>
                    <div className="font-medium text-gray-900">{event.title}</div>
                    {event.time && (
                      <div className="text-sm text-gray-500">{event.time}</div>
                    )}
                    {event.startDate !== event.endDate && (
                      <div className="text-sm text-gray-500">
                        {new Date(event.startDate).toLocaleDateString()} -{' '}
                        {new Date(event.endDate).toLocaleDateString()}
                      </div>
                    )}
                    <div className="text-xs text-gray-500 capitalize mt-1">
                      {event.type}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(event)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(event.id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;