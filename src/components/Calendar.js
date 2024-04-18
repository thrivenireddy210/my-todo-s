import React, { useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import AddLeavePopup from '../Popups/AddLeave';
import AddEventPopup from '../Popups/AddEventPopup';
import { Trash, Pencil, Plus } from 'react-bootstrap-icons';
import EditSubEventPopup from '../Popups/EditSubEventPopup';
import AddSubEventPopup from '../Popups/AddSubEventPopup';
import CustomHeader from './CustomHeader';
// import CustomHeader from './customHeader';

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(BigCalendar);

const MyToDos = () => {
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Event 1',
      start: new Date(),
      end: new Date(new Date().setHours(new Date().getHours() + 1)),
      priority: 'medium',
      subEvents: [
        { id: '1a', title: 'Sub Event 1a' },
        { id: '1b', title: 'Sub Event 1b' },
      ],
    },
    {
      id: '2',
      title: 'Event 2',
      start: new Date(),
      end: new Date(new Date().setHours(new Date().getHours() + 2)),
      priority: 'low',
      subEvents: [
        { id: '2a', title: 'Sub Event 2a' },
        { id: '2b', title: 'Sub Event 2b' },
      ],
    },
    {
      id: '3',
      title: 'Event 3',
      start: new Date(new Date().setDate(new Date().getDate() + 1)),
      end: new Date(new Date().setDate(new Date().getDate() + 1)),
      priority: 'medium',
      subEvents: [
        { id: '3a', title: 'Sub Event 3a' },
        { id: '3b', title: 'Sub Event 3b' },
      ],
    },
    {
      id: '4',
      title: 'Event 4',
      start: new Date(new Date().setDate(new Date().getDate() + 2)),
      end: new Date(new Date().setDate(new Date().getDate() + 2)),
      priority: 'high',
      subEvents: [
        { id: '4a', title: 'Sub Event 4a' },
        { id: '4b', title: 'Sub Event 4b' },
      ],
    },
    {
      id: '5',
      title: 'Event 5',
      start: new Date(new Date().setDate(new Date().getDate() + 3)),
      end: new Date(new Date().setDate(new Date().getDate() + 3)),
      priority: 'medium',
      subEvents: [
        { id: '5a', title: 'Sub Event 5a' },
        { id: '5b', title: 'Sub Event 5b' },
      ],
    },
  ]);
  
  
  const getEventCardClassName = (priority) => {
    switch (priority) {
      case 'low':
        return 'event-card low-priority';
      case 'medium':
        return 'event-card medium-priority';
      case 'high':
        return 'event-card high-priority';
      default:
        return 'event-card';
    }
  };
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: null,
    end: null,
  });

  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const onEventDrop = ({ event, start, end }) => {
    if (!event) return;

    const updatedEvents = events.map((ev) =>
      ev.id === event.id ? { ...ev, start, end } : ev
    );
    setEvents(updatedEvents);
  };

  
  const [showAddSubEventPopup, setShowAddSubEventPopup] = useState(false);
  const [showEditSubEventPopup, setShowEditSubEventPopup] = useState(false);
  const [selectedSubEvent, setSelectedSubEvent] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [menuOpen, setMenuOpen] = useState(null); 

  const handleMenuToggle = (e, eventId) => {
    if (menuOpen === eventId) {
      setMenuOpen(null);
    } else {
      setMenuOpen(eventId);
    }
  };

  const handleEditEvent = (event) => {
   
  };

  const handleDeleteEvent = (eventId) => {
   
  };
  const handleOpenAddSubEventPopup = (event) => {
    setSelectedEvent(event);
    setShowAddSubEventPopup(true);
  };
  const handleCloseAddSubEventPopup = () => {
    setShowAddSubEventPopup(false);
  };

  const handleOpenEditSubEventPopup = (event, subEvent) => {
    setSelectedSubEvent({ event: event, subEvent: subEvent });
    setShowEditSubEventPopup(true);
  };

  const handleCloseEditSubEventPopup = () => {
    setShowEditSubEventPopup(false);
  };
  const renderSubEvents = (event) => {
    const subEventsCount = event.subEvents.length;
    return event.subEvents.map((subEvent, index) => (
      <li key={subEvent.id} className="list-group-item d-flex justify-content-between align-items-center">
        <span>{subEvent.title}</span>
        <div className='cursor-pointer'  style={{ cursor: 'pointer' }}>
          {index === subEventsCount - 1 && ( 
            <Plus className=" me-2 cursor-pointer" onClick={() => handleOpenAddSubEventPopup(event)} />
          )}
          <Trash className=" me-2 cursor-pointer" onClick={() => handleDeleteSubEvent(event.id, subEvent.id)} />
          <Pencil className=" me-2 cursor-pointer" onClick={() => handleOpenEditSubEventPopup(event, subEvent)} />
        </div>
      </li>
    ));
  };
  
  const handleSubmitNewSubEvent = (subEventTitle) => {
    const newSubEvent = {
      id: Math.random().toString(36).substring(7),
      title: subEventTitle,
    };
  
    const updatedEvents = events.map((event) =>
      event.id === selectedEvent.id
        ? { ...event, subEvents: [...event.subEvents, newSubEvent] }
        : event
    );
    setEvents(updatedEvents);
    setShowAddSubEventPopup(false);
  };
  const handleDeleteSubEvent = (eventId, subEventId) => {
    const updatedEvents = events.map((event) => {
      if (event.id === eventId) {
        return {
          ...event,
          subEvents: event.subEvents.filter((subEvent) => subEvent.id !== subEventId),
        };
      }
      return event;
    });
    setEvents(updatedEvents);
    handleCloseEditSubEventPopup();
  };


  const handleSubmitEditedSubEvent = (subEventId, editedSubEventTitle) => {
    const updatedEvents = events.map((event) => {
      if (event.id === selectedSubEvent.event.id) {
        return {
          ...event,
          subEvents: event.subEvents.map((subEvent) => {
            if (subEvent.id === subEventId) {
              return {
                ...subEvent,
                title: editedSubEventTitle,
              };
            }
            return subEvent;
          }),
        };
      }
      return event;
    });
    setEvents(updatedEvents);
    handleCloseEditSubEventPopup();
  };

  const deleteEvent = (id) => {
    const filteredEvents = events.filter((event) => event.id !== id);
    setEvents(filteredEvents);
  };

  const [showLeavePopup, setShowLeavePopup] = useState(false);
  const [showEventPopup, setShowEventPopup] = useState(false);

  const handleOpenLeavePopup = () => {
    setShowLeavePopup(true);
  };

  const handleCloseLeavePopup = () => {
    setShowLeavePopup(false);
  };

  const handleOpenEventPopup = () => {
    setShowEventPopup(true);
  };

  const handleCloseEventPopup = () => {
    setShowEventPopup(false);
  };

  const handleSubmitEvent = (eventData) => {
    const newEvent = {
      ...eventData,
      id: events.length + 1,
      start: new Date(eventData.start),
      end: new Date(eventData.end),
      subEvents: eventData.subEvents.map((subEventTitle, index) => ({
        id: `${eventData.id}-sub${index + 1}`,
        title: subEventTitle,
      })),
    };

    setEvents((prevEvents) => [...prevEvents, newEvent]);
    setShowEventPopup(false);
  };

  const handleSubmitLeave = (leaveData) => {
    console.log('Submitted leave:', leaveData);
    setShowLeavePopup(false);
  };

  const DraggableEvent = ({ event }) => {
    const [{ isDragging }, drag] = useDrag({
      type: ItemTypes.EVENT,
      item: () => ({ id: event.id }),
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    return (
      <div
        ref={drag}
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: 'move',
          // borderBottom: '1px solid #ccc',
          position: 'relative',
        }}
      >
        <span style={{ marginRight: '24px' }}>{event.title}</span>
        <span
          style={{ position: 'absolute', top: '0', right: '0', cursor: 'pointer' }}
          onClick={() => deleteEvent(event.id)}
        >
          <Trash />
        </span>
      </div>
    );
  };
  const getEventStyle = (event, start, end, isSelected) => {
    let backgroundColor = '#3174ad'; 

    switch (event.priority) {
      case 'low':
        backgroundColor = 'rgb(114, 210, 114)'; 
        break;
      case 'high':
        backgroundColor = '#dc3545';
        break;
        case 'medium':
          backgroundColor = 'orange';
      default:
        break;
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '5px',
        border: 'none',
        color: '#fff',
        padding: '5px',
        display: 'block',
      },
    };
  };

  return (
    <div className="container ">
      <div className="row mt-5">
      <h2 className="text-start fs-4 ">MyToDos</h2>

        {/* <div className="col-md-6 mt-4">
        </div>
        <div className="col-md-6">
         
        </div> */}
      </div>
      <div className="row mt-3">
        <div className="col-md-8">
          <DragAndDropCalendar
            localizer={localizer}
            selectable
            events={events}
            onEventDrop={onEventDrop}
            resizable
            startAccessor="start"
            endAccessor="end"
            style={{ height: 620 }}
            defaultDate={new Date()}
            defaultView="month"
            components={{
              event: DraggableEvent,
               toolbar: CustomHeader,
            }}            eventPropGetter={getEventStyle} 

          />
        </div>

        <div className="col-md-4">
        <div className="d-flex justify-content-end align-items-center mb-3">
    <button className="btn btn-outline-primary me-2" onClick={handleOpenEventPopup}>
      <i className="fas fa-list mr-1"></i> Add Checklist
    </button>
    <button className="btn btn-outline-success me-2" onClick={handleOpenLeavePopup}>
      <i className="fas fa-calendar-plus mr-1"></i> Add Leave
    </button>
    <button className="btn btn-outline-danger" onClick={() => setEvents([])}>
      <i className="fas fa-trash-alt mr-1"></i> Clear All
    </button>
  </div>
  <div className='events-scroll'>
  <div className="event-list">
  {events.map((event) => (
  <div key={event.id} className={`event-card ${getEventCardClassName(event.priority)}`}>
    <div className="card-header">
      <h5 className="card-title d-inline">{event.title}</h5>
      <div className="menu-icon">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
        <div className="menu-options">
          <span onClick={() => handleEditEvent(event)}>Edit</span>
          <span onClick={() => handleDeleteEvent(event.id)}>Delete</span>
        </div>
      </div>
    </div>
    <div className="card-body">
      <ul className="list-group list-group-flush">
        {renderSubEvents(event)}
      </ul>
    </div>
  </div>
))}

</div>
  </div>
  
</div>

    </div>
    <AddLeavePopup show={showLeavePopup} onClose={handleCloseLeavePopup} onSubmit={handleSubmitLeave} />
    <AddEventPopup show={showEventPopup} onClose={handleCloseEventPopup} onSubmit={handleSubmitEvent} />
    <AddSubEventPopup
      show={showAddSubEventPopup}
      onClose={handleCloseAddSubEventPopup}
      onSubmit={handleSubmitNewSubEvent}
    />
    {selectedSubEvent && (
      <EditSubEventPopup
        show={showEditSubEventPopup}
        onClose={handleCloseEditSubEventPopup}
        subEvent={selectedSubEvent.subEvent}
        onSubmit={handleSubmitEditedSubEvent}
      />
    )}
  </div>
  );
};

const MyToDosWithDndProvider = () => (
  <DndProvider backend={HTML5Backend}>
    <MyToDos />
  </DndProvider>
);

export default MyToDosWithDndProvider;

