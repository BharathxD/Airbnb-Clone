import { FC, SetStateAction } from "react";
import { Range } from "react-date-range";

type onChangeDateArgs = {
  selection: SetStateAction<{ startDate: Date; endDate: Date; key: string }>;
};

interface CalendarProps {
  value: Range;
  disabledDates: Date[];
  onChange: (value: onChangeDateArgs) => void;
}

const Calendar: FC<CalendarProps> = ({ value, disabledDates, onChange }) => {
  return <div>
    Calendar
  </div>;
};

export default Calendar;
