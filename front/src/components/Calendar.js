import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import classes from './Calendar.module.css';
export default function Calendar(props) {
  const [dateInfo, setDateInfo] = useState();

  const handleDateClick = (e) => {
    setDateInfo(e);
  };

  return (
    <div className={classes.mainDiv}>
      <div>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          dateClick={handleDateClick}
        />
      </div>
      <div className={classes.dateInfo}>
        <p>{dateInfo && dateInfo.dateStr}</p>
        <img src="" />
      </div>
    </div>
  );
}
