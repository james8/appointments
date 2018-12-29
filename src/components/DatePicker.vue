<!-- DatePicker Component

    @Output SelectedDate()      -> Passes selected date back to Parent Component
-->

<template>
    <div id="date-picker">
        <div id="today">
            <span @click="SelectToday();">Today</span>
        </div>
        <p id="selectedDate">
            {{ selectedDay }}
            <br/>
            {{ selectedDate }}
        </p>
        <hr />
        <div class="header">
            <p>{{ month.Key }} {{ year.Key }}</p>
            <div id="month-toggles">
                <button type="button" @click="ChangeMonth(0);" class="fas fa-angle-up"></button>
                <button type="button" @click="ChangeMonth(1);" class="fas fa-angle-down"></button>
            </div>
        </div>

        <div id="calendar">
            <div class="dayOfWeek" v-for="(dayOfWeek, index) in daysOfWeek" :key="`dayOfWeek${ index }`">{{ dayOfWeek.Value }}</div>
            <div v-for="(d, index) in days" :key="`day${ index }`">
                <span v-if="d === -1"></span>
                <span v-else class="day" v-bind:class="{ today: IsToday(d), selectedDay: IsSelectedDay(d) }" @click="SelectDay(d - 1);">{{ d }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";

    class DateInfo {
        private _key: string;
        private _value: number;

        constructor() {
            this._key = "";
            this._value = -1;
        }

        get Key(): string { return this._key };
        set Key(key: string) { this._key = key };
        get Value(): number { return this._value };
        set Value(value: number) { this._value = value };
    }

    class DayInfo {
        private _key: number;
        private _value: string;

        constructor(key: number, value: string) {
            if ((key === undefined) || (value === undefined)) {
                this._key = -1;
                this._value = "";
            }
            else {
                this._key = key;
                this._value = value;
            }
        }

        get Key(): number { return this._key };
        set Key(key: number) { this._key = key };
        get Value(): string { return this._value };
        set Value(value: string) { this._value = value };
    }

    @Component
    export default class DatePicker extends Vue {
        selectedDayOptions: Object = {};
        selectedDateOptions: Object = {};
        todaysDate: string = "";
        selectedDay: string = "";
        selectedDate: string = "";
        day: number = -1;
        month: DateInfo = new DateInfo();
        year: DateInfo = new DateInfo();
        daysOfWeek: Array<DayInfo> = [];
        days: Array<number> = [];

        created() {
            this.selectedDateOptions = {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            };
            this.selectedDayOptions = {
                weekday: 'long'
            };

            // initialize today & selected dates
            const date = new Date();
            this.todaysDate = date.toLocaleString('en-US', this.selectedDateOptions);
            this.selectedDay = date.toLocaleString('en-US', this.selectedDayOptions);
            this.selectedDate = date.toLocaleString('en-US', this.selectedDateOptions);

            // initialize month's view
            this.day = date.getDate();
            this.month.Key = date.toLocaleString('en-US', { month: 'long' });
            this.month.Value = date.getMonth();
            this.year.Key = date.toLocaleString('en-US', { year: 'numeric' });
            this.year.Value = date.getFullYear();

            // initialize days of the week
            this.daysOfWeek.push(new DayInfo(0, 'Su'));
            this.daysOfWeek.push(new DayInfo(1, 'Mo'));
            this.daysOfWeek.push(new DayInfo(2, 'Tu'));
            this.daysOfWeek.push(new DayInfo(3, 'We'));
            this.daysOfWeek.push(new DayInfo(4, 'Th'));
            this.daysOfWeek.push(new DayInfo(5, 'Fr'));
            this.daysOfWeek.push(new DayInfo(6, 'Sa'));

            // initialize calendar
            this.InitializeCalendar(this.month.Value, this.year.Value); 
        }

        InitializeCalendar(month: number, year: number): void {
            const numOfDays: number = (32 - new Date(year, month, 32).getDate());
            const startOfMonth: number = this.daysOfWeek.findIndex((day: DayInfo) => day.Key === new Date(year, month).getDay());

            // add prior excess days
            this.days = []; 
            for (let i: number = startOfMonth; i > 0; i--) this.days.push(-1);
            // add dates            
            for (let i: number = 0; i < numOfDays; i++) this.days.push(i + 1);
        }

        ChangeMonth(type: boolean): void {
            const date: Date = new Date(this.year.Value, this.month.Value);
            !type ? date.setMonth(date.getMonth() - 1) : date.setMonth(date.getMonth() + 1);

            this.SetMonth(date);
            this.SetYear(date);
            this.InitializeCalendar(this.month.Value, this.year.Value);
        }

        SelectToday(): void {
            const date = new Date();
            this.day = date.getDate();

            this.SetMonth(date);
            this.SetYear(date);
            this.InitializeCalendar(this.month.Value, this.year.Value);
            this.SelectDay(date.getDate() - 1);
        }

        SelectDay(day: number): void {
            const date = new Date(this.year.Value, this.month.Value, (day + 1));
            this.day = date.getDate();
            this.selectedDay = date.toLocaleString('en-US', this.selectedDayOptions);
            this.selectedDate = date.toLocaleString('en-US', this.selectedDateOptions);

            this.SelectedDate();
        }

        SetMonth(date: Date): void {
            this.month.Key = date.toLocaleString('en-US', { month: 'long' });
            this.month.Value = date.getMonth();
        }

        SetYear(date: Date): void {
            this.year.Key = date.toLocaleString('en-US', { year: 'numeric' });
            this.year.Value = date.getFullYear();
        }

        IsToday(day: number): boolean {
            const today: Date = new Date(this.todaysDate);
            return ((day === today.getDate()) && (this.month.Value === today.getMonth()) && (this.year.Value === today.getFullYear()));
        }

        IsSelectedDay(day: number): boolean {
            const selected: Date = new Date(this.selectedDate);
            return ((day === selected.getDate()) && (this.month.Value === selected.getMonth()) && (this.year.Value === selected.getFullYear()));
        }

        SelectedDate(): void {
            this.$emit('selectedDate', this.selectedDate);
        }
    };
</script>

<style scoped>
    #date-picker {
        border: 1px solid #000;
        max-width: 302px;
        padding: 10px;
    }

    #today {
        text-align: right;
    }
    
    #today span {
        padding: 10px;
        display: inline-block;
    }

    #today span:hover {
        background-color: #1e88e5;
        border-radius: 2px;
        color: #fff;
        cursor: pointer;
    }

    #selectedDate {
        font-size: 26px;
        font-weight: bold;
        margin-top: 0px;
    }

    .header {
        font-weight: bold;
        padding-left: 10px;
        display: flex;
        justify-content: space-between;
    }

    #month-toggles button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        font-size: 25px;
        height: 50px;
        padding: 0px;
        width: 50px;
    }

    #month-toggles button:hover, #month-toggles button:focus {
        background-color: rgba(0, 0, 0, 0.25);
    }

    #calendar {
        display: grid;
        grid-template-columns: repeat(7, 40px);
        grid-template-rows: repeat(6, 40px);
    }

    #calendar div, .day {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .dayOfWeek {
        background-color: #e4e4e4;
        font-weight: bold;
    }

    .day {
        color: #000;
        cursor: pointer;
        height: 35px;
        width: 35px;
    }

    .day:hover, .selectedDay {
        background-color: #9fa8da;
        border-radius: 50px;
    }

    .selectedDay:hover {
        cursor: default;
    }

    .today, .today:hover {
        background-color: #1e88e5;
        border-radius: 50px;
        color: #fff;
        cursor: default;
    }
</style>
