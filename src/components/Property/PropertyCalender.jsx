import React from 'react';
import moment from 'moment';
import { DayPickerRangeController } from 'react-dates';
import 'react-dates/initialize';
import 'moment/locale/ko';
import 'react-dates/lib/css/_datepicker.css';
import styled from 'styled-components';

const PropertyCalender = ({
  setFocusedInput,
  focusedInput,
  endDate,
  startDate,
  handleOnDateChange,
}) => {
  return (
    <>
      <CalenderBox>
        <DayPickerRangeController
          daySize={50}
          numberOfMonths={window.innerWidth < 800 ? 1 : 2}
          startDate={startDate}
          endDate={endDate}
          onDatesChange={handleOnDateChange}
          focusedInput={focusedInput}
          onFocusChange={(focusedInput) =>
            setFocusedInput(focusedInput || 'startDate')
          }
          minimumNights={1}
          noBorder={true}
          hideKeyboardShortcutsPanel={true}
          initialVisibleMonth={() => moment().add(2, 'M')}
          showClearDates={true}
        />
      </CalenderBox>
    </>
  );
};
export default PropertyCalender;

const CalenderBox = styled.div`
  margin-top: 30px;

  .DayPicker {
    margin: 0;
  }

  .DayPickerNavigation_button {
    border: none;
    outline: none;
  }

  .CalendarDay {
    padding: 17px;
    border: none;
  }
  
  .CalendarDay__selected_span {
    background: #ebebeb; //background
    color: black; //text
  }

  .CalendarDay__selected {
    background-color: #575757;
    border-radius: 50%;
    color: white;
  }

  .CalendarDay__selected:hover {
    border-radius: 50%;
    color: white;
  }

  .CalendarDay__hovered_span:hover,
  .CalendarDay__hovered_span {
    background-color: #ebebeb;
    border-radius: 50%;
    color: #575757;
  }
`;
