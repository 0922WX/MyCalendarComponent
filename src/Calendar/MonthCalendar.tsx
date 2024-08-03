import { Dayjs } from "dayjs"
import { CalendarProps } from "."
import { c } from "vite/dist/node/types.d-aGj9QkWt"

interface MonthCalendarProps extends CalendarProps {

}

function getAllDays(date: Dayjs) {

    const startDate = date.startOf('month')//获取指定月份的第一天
    const day = startDate.day()//获取指定月份的第一天是星期几
    const daysInfo:Array<{date:Dayjs,currentMonth:boolean}> = new Array(6 * 7)

    // 前一个月的部分天数
    for (let i = 0; i < day; i++) {
        daysInfo[i] = {
            date: startDate.subtract(day - i, 'day'),
            currentMonth:false
        }
    }

    // 当前月份的天数
    for(let i = day ; i < daysInfo.length; i++) {
        const calcDate = startDate.add(i - day, 'day')
        daysInfo[i] = {
            date: calcDate,
            currentMonth:calcDate.month() === date.month()
        }
    }
   return daysInfo;
}
//渲染日历
function renderDays(days: Array<{ date: Dayjs, currentMonth: boolean}>) {
    const rows = [];
    for(let i = 0; i < 6; i++ ) {
        const row = [];
        for(let j = 0; j < 7; j++) {
            const item = days[i * 7 + j];
            row[j] = <div className={
                "calendar-month-body-cell " + (item.currentMonth ? 'calendar-month-body-cell-current' : '')
            }>{item.date.date()}</div>
        }
        rows.push(row);
    }
    return rows.map(row => <div className="calendar-month-body-row">{row}</div>)
}

function MonthCalendar(props: MonthCalendarProps) {

    const weekList = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

    const allDays = getAllDays(props.value)
    return (
        <div className="calendar-month">
            <div className="calendar-month-week-list">
                {weekList.map((week) => (
                    <div className="calendar-month-week-list-item">
                        {week}
                    </div>
                ))}
            </div>

            <div className="calendar-month-boay">
                {
                    renderDays(allDays)
                }
            </div>
        </div>
    )
}

export default MonthCalendar