<!-- Reports View -->

<template>
    <div id="view-reports">
        <div class="header">
            <span id="today" class="fa-stack fa-1x" tabindex="0" @click="SetTodaysDate();">
                <i class="far fa-calendar fa-stack-2x"></i>
                <strong class="fa-stack-1x date">{{ today }}</strong>
            </span>
            <h1 id="date-l" @click="ToggleCalendar(true);" tabindex="0">{{ selectedDateL }}</h1>
            <h1 id="date-s" @click="ToggleCalendar(true);" tabindex="0">{{ selectedDateS }}</h1>
        </div>

        <div id="reports">
            <div id="sales-averages">
                <div id="report-header">
                    <span class="reportTitle">Sales & Averages</span>
                    <i class="fas fa-check-circle" @click="SubmitSales();"></i>
                </div>
                <div class="section">
                    <span></span>
                    <input-field
                        :id="'credit-card-sales'"
                        :label="'Credit Card Sales'"
                        :value="''"
                        isRequired
                    >
                    </input-field>
                </div>
                <div class="section">
                    <span>-</span>
                    <input-field
                        :id="'credit-card-tips'"
                        :label="'Credit Card Tips'"
                        :value="''"
                        isRequired
                    >
                    </input-field>
                </div>
                <div class="section">
                    <span>+</span>
                    <input-field
                        :id="'cash'"
                        :label="'Cash'"
                        :value="''"
                        isRequired
                    >
                    </input-field>
                </div>
                <div class="section">
                    <span>=</span>
                    <input-field
                        :id="'dollar-accounted'"
                        :label="'$ Accounted For'"
                        :value="''"
                        isDisabled
                    >
                    </input-field>
                </div>
                <div class="section">
                    <span>-</span>
                    <input-field
                        :id="'actual-sales'"
                        :label="'Actual Sales'"
                        :value="''"
                    >
                    </input-field>
                </div>
                <div class="section">
                    <span>=</span>
                    <input-field
                        :id="'plus-minus'"
                        :label="'+/-'"
                        :value="''"
                        isDisabled
                    >
                    </input-field>
                </div>
                <div class="divider">
                    <div></div>
                </div>
                <div class="section">
                    <span>$</span>
                    <input-field
                        :id="'monthly-average'"
                        :label="'Monthly Average to Date'"
                        :value="''"
                        isDisabled
                    >
                    </input-field>
                </div>
            </div>
            <div id="tips">
                <div id="report-header">
                    <span class="reportTitle">Tips</span>
                    <i class="fas fa-check-circle" @click="SubmitTips();"></i>
                </div>
                <div class="section" v-for="(tip, index) in tips" :key="`tip${index}`">
                    <span class="reportName">{{ tip.name }}</span>
                    <span class="reportSign">$</span>
                    <span class="reportTips">{{ tip.tips }}</span>
                    <checkbox-field
                        :id="`tip${tip.empId}`" :label="''"
                        :checked="tip.payed" @checkboxStatus="CheckboxToggled($event);">
                    </checkbox-field>
                    <span class="reportWorked">Worked @ {{ tip.in }} to {{ tip.out }}</span>
                </div>
            </div>
        </div>

        <date-picker v-if="showCalendar" @selectedDate="ReturnedSelectedDate($event);"></date-picker>
        <backdrop v-if="showCalendar" @click.native="ToggleCalendar(false);"></backdrop>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";

    import { Appointment } from "@/apis/Appointment.ts";
    import { Clock } from "@/apis/Clock.ts";
    import { Employee } from "@/apis/Employee.ts";
    import { Tip } from "@/apis/Tip.ts";

    import Backdrop from "@/components/Backdrop.vue";
    import CheckboxField from "@/components/CheckboxField.vue";
    import DatePicker from "@/components/DatePicker.vue";
    import InputField from "@/components/InputField.vue";

    interface ITipData {
        empId: number,
        name: string,
        tips: number
        in: string,
        out: string,
        payed: boolean
    };

    @Component({
        components: {
            Backdrop,
            CheckboxField,
            DatePicker,
            InputField
        }
    })
    export default class v_Reports extends Vue {
        showCalendar: boolean = false;
        dateOptionsL: Object = {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        };
        dateOptionsS: Object = {
            weekday: 'short',
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
        };
        today: number = 1;
        selectedDateL: string = "";
        selectedDateS: string = "";

        tips: Array<ITipData> = [];
        payed: Array<number> = [];

        created(): void {
            const todaysDate: Date = new Date();
            this.today = todaysDate.getDate();
            this.selectedDateL = todaysDate.toLocaleString('en-US', this.dateOptionsL);
            this.selectedDateS = todaysDate.toLocaleString('en-US', this.dateOptionsS);

            Promise.all([Appointment.GetAppointments(), Clock.GetClocks(), Employee.GetEmployees(), Tip.GetSubmittedTips()]) 
                .then(results => {
                    this.PopulateTipList(results[1], results[2]);
                    this.AddTips(results[0]);
                    this.AddSubmittedTips(results[3]);
                    console.log(this.tips);
                })
                .catch((error: Error) => console.log(`Error: ${ error }`));
        }

        PopulateTipList(clocks: Array<Clock>, employees: Array<Employee>): void {
            clocks.forEach((clock: Clock) => {
                const me: Employee = (employees.find((employee: Employee) => (employee.id === clock.empId)) as Employee);
                const cIn: Date = clock.cIn as Date;
                const cOut: Date = clock.cOut as Date;

                this.tips.push({
                    empId: clock.empId,
                    name: `${ me.firstName } ${ me.lastName }`,
                    tips: 0,
                    in: `${ cIn.getHours() }:${ cIn.getMinutes() }`,
                    out: `${ cOut.getHours() }:${ cOut.getMinutes() }`,
                    payed: false
                });
            });
        }

        AddTips(appts: Array<Appointment>): void {
            appts.forEach((appt: Appointment) => {
                if (appt.tips !== "") {
                    const i: number = this.tips.findIndex((tip: ITipData) => (tip.empId === appt.employee));
                    this.tips[i].tips += parseFloat(appt.tips);
                }
            });
        }

        AddSubmittedTips(submittedTips: Array<Tip>): void {
            this.tips.forEach((tip: ITipData) => {
                if (submittedTips.includes(tip.empId)) tip.payed = true;
            })
        }

        IsValidCurrency(id: string, value: string): boolean {
            const isValid = (Number.parseFloat(value).toFixed(2) !== 'NaN');
            const elem = (document.getElementById(id) as HTMLInputElement);
            
            (elem.nextSibling as HTMLSpanElement).innerHTML = (isValid ? '' : 'invalid currency');
            return isValid;
        }

        CheckboxToggled(event: any): void {
            const empId: number = parseInt(event.id, 10);
            const index: number = this.payed.findIndex((x: number) => (x === empId));

            if (!event.status) this.payed.splice(index, 1);
            else this.payed.push(empId);
        }

        SubmitSales(): void {
            const keys: Array<string> = [ 'credit-card-sales', 'credit-card-tips', 'cash', 'actual-sales' ]; 
            const vals: Array<string> = [];

            keys.forEach((key: string) => vals.push((document.getElementById(key) as HTMLInputElement).value));

            if (!vals.includes("")) {
                let isValidCurrency: boolean = true;
                keys.forEach((key: string, index: number) => {
                    if (!this.IsValidCurrency(key, vals[index])) isValidCurrency = false;
                });

                if (isValidCurrency) {
                    // save code
                    console.log('saved');
                }
            }
            else alert("Please provide information for ALL required fields.");
        }

        SubmitTips(): void {
            console.log(this.payed);
        }

        // state: 0 - closed; 1 - open;
        ToggleCalendar(state: boolean): void {
            this.showCalendar = state;
        }

        SetTodaysDate(): void {
            const date: Date = new Date();
            this.selectedDateL = date.toLocaleString('en-US', this.dateOptionsL);
            this.selectedDateS = date.toLocaleString('en-US', this.dateOptionsS);
        }

        ReturnedSelectedDate(event: any): void {
            const date: Date = new Date(event);
            this.selectedDateL = date.toLocaleString('en-US', this.dateOptionsL);
            this.selectedDateS = date.toLocaleString('en-US', this.dateOptionsS);
            this.showCalendar = false;
        }
    };
</script>

<style scoped>
    #view-reports {
        height: calc(100vh - 49px);
        overflow: auto;
    }

    #today {
        margin-right: 10px;
    }

    #today .date {
        margin-top: 3px;
    }

    .header {
        background-color: #ececec;
        height: 78px;
        margin: 0px;
        width: 97%;
        /* width: 100%; */
        padding-left: 3%;
        position: fixed;
        /* right: 16px; */
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #date-s {
        display: none;
    }

    @media screen and (max-width: 500px) {
        #date-l {
            display: none;
        }

        #date-s {
            display: block;
        }
    }

    #today:hover, #today:focus,
    h1:hover, h1:focus {
        color: #0159a2;
        cursor: pointer;
        text-decoration: underline;
    }

    #reports {
        margin-top: 75px;
        display: flex;
    }

    @media screen and (max-width: 650px) {
        #reports {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }

    #report-header {
        background: linear-gradient(#166f94, #10536f);
        color: #fff;
        font-size: 22px;
        font-weight: bold;
        padding: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    #report-header i {
        cursor: pointer;
        font-size: 30px;
    }

    #report-header .reportTitle {
        padding: 5px;
    }

    #report-header .fas:hover {
        color: #66bb6a;
    }

    #sales-averages, #tips {
        border: 1px solid #000;
        margin: 20px;
        max-width: 350px;
    }

    #sales-averages .section {
        align-items: flex-end;
        display: grid;
        grid-template-columns: 25px auto;
    }

    #sales-averages .section span {
        padding-bottom: 23px;
        text-align: right;
    }

    #sales-averages .section:nth-child(n+3) #input_field {
        padding-top: 0px;
    }

    #sales-averages .section:last-child #input_field {
        padding-top: 10px;
    }

    #sales-averages .divider {
        display: flex;
        justify-content: center;
    }

    #sales-averages .divider div {
        border-top: 1px solid #000;
        width: 96%;
    }

    #tips .section {
        border-bottom: 1px solid #c1c1c1;
        padding: 10px 0px;
        display: grid;
        grid-template-columns: 25px auto 55px;
    }

    #tips span {
        padding: 5px;
    }

    #tips .reportName {
        grid-column: 2;
        grid-row: 1;
        font-weight: bold;
        text-align: left;
    }

    #tips .reportSign {
        grid-column: 1;
        grid-row: 2;
    }

    #tips .reportTips {
        border-bottom: 1px dashed #000;
        text-align: left;
        grid-column: 2;
        grid-row: 2;
    }

    #tips #checkbox-field {
        display: flex;
        justify-content: center;
        align-items: center;
        grid-column: 3;
        grid-row: 2/4;
    }

    #tips .reportWorked {
        font-size: 14px;
        font-style: italic;
        grid-column: 2;
        grid-row: 3;
    }

    #date-picker {
        position: fixed;
        top: 10%;
        left: 10%;
        z-index: 50;
    }
</style>

