import { differenceInCalendarDays } from "date-fns";
import { FC, SetStateAction } from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface CalendarProps {
  dateRange: Range;
  disabledDates: Date[];
  onChange: (value: RangeKeyDict) => void;
}

const Calendar: FC<CalendarProps> = ({
  dateRange,
  disabledDates,
  onChange,
}) => {
  return (
    <DateRange
      rangeColors={["#262626"]}
      ranges={[dateRange]}
      onChange={onChange}
      direction={"vertical"}
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disabledDates}
    />
  );
};

export default Calendar;
