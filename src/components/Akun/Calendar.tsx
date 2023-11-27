import { useState } from "react";

function Calendar({ transaction, colorPrimary }: any) {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handlePrevMonth = () => {
        setSelectedDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setSelectedDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
    };

    const renderDaysOfWeek = () => {
        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return daysOfWeek.map((day) => (
            <div key={day} className="flex-1 text-center py-2">
                {day}
            </div>
        ));
    };

    const renderDaysOfMonth = () => {
        const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
        const lastDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
        const daysInMonth = lastDayOfMonth.getDate();
        const days = [];

        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i));
        }

        const daysBeforeMonth = [];
        for (let i = firstDayOfMonth.getDay(); i > 0; i--) {
            daysBeforeMonth.push(
                <div key={`before-${i}`} className="flex-1 text-center py-2 text-gray-400">
                    {new Date(selectedDate.getFullYear(), selectedDate.getMonth(), -i + 1).getDate()}
                </div>
            );
        }

        const daysAfterMonth = [];
        for (let i = 1; i <= 6 - lastDayOfMonth.getDay(); i++) {
            daysAfterMonth.push(
                <div key={`after-${i}`} className="flex-1 text-center py-2 text-gray-400">
                    {new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, i).getDate()}
                </div>
            );
        }

        return [...daysBeforeMonth, ...days.map((day) => renderDay(day)), ...daysAfterMonth];
    };

    const renderDay = (day: any) => {
        const isToday = day.toDateString() === new Date().toDateString();
        const events = transaction.filter(
            (event: any) => new Date(event.create_date).toDateString() === day.toDateString()
        );
        const isSelected = events.length > 0 && day.toDateString() === selectedDate.toDateString();

        return (
            <div
                key={day}
                className={`flex-1 text-center py-2 cursor-pointer ${isToday ? "bg-["+colorPrimary+"]" : ""}`}
                onClick={() => setSelectedDate(day)}
                style={{ backgroundColor: events.length > 0 ? "lightgreen" : "" }}
            >
                <div>{day.getDate()}</div>
            </div>
        );
    };


    return (
        <div className="max-w-md mx-auto bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-6 py-4">
                <div className="flex justify-between">
                    <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        onClick={handlePrevMonth}
                    >
                        &lt;
                    </button>
                    <div className="text-lg font-medium text-gray-900 flex-1 text-center">
                        {selectedDate.toLocaleString("default", { month: "long", year: "numeric" })}
                    </div>
                    <button
                        type="button"
                        className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        onClick={handleNextMonth}
                    >
                        &gt;
                    </button>
                </div>

                <div>
                    <div className="mt-4 grid grid-cols-7 gap-1">
                        {renderDaysOfWeek()}
                        {renderDaysOfMonth()}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Calendar;
