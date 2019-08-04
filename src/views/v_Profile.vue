<!-- Profile View -->

<template>
    <div id="view-profile">
        <div id="jumbotron">
            <div class="greeting">
                <span>HELLO,</span>
                <span>{{ me }}</span>
            </div>
            <div class="checkins">
                <button v-if="cIn === ''" type="button" id="checkin" class="btn btnNormal" @click="Checkin();">
                    <i class="far fa-clock"></i>
                    CHECK IN 
                </button>
                <div v-else class="clockTime">
                    <span>Clocked In:</span>
                    <span>{{ cIn }}</span>
                </div>
                <button v-if="cOut === ''" type="button" id="checkout" class="btn btnError" v-bind:class="{ btnDisabled: !canCheckOut }" :disabled="!canCheckOut" @click="Checkout();">
                    <i class="far fa-clock"></i>
                    CHECK OUT
                </button>
                <div v-else class="clockTime">
                    <span>Clocked Out:</span>
                    <span>{{ cOut }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";

    import { Clock } from "@/apis/Clock.ts";
    import { Employee } from "@/apis/Employee.ts";

    @Component({
        
    })
    export default class v_Profile extends Vue {
        me: string = "";
        cIn: string = "";
        cOut: string = "";
        canCheckOut: boolean = false;

        created(): void {
            let me: Employee = new Employee();

            Promise.all([Employee.GetEmployees(), Clock.GetClocks()])
                .then(results => {
                    me = results[0].filter((employee: Employee) => (employee.id.toString() === sessionStorage.getItem("empId")))[0];

                    this.me = ((me !== undefined) ? `${ me.firstName } ${ me.lastName }` : 'Bob the Minion');

                    this.cIn = this.GetTime((results[1] as Clock).cIn);
                    this.cOut = this.GetTime((results[1] as Clock).cOut);
                })
                .catch((error: Error) => console.log(`Error: ${ error }`));
        }

        GetTime(date: Date | null): string {
            let fDate: string = "";
            if (date !== null) {
                const h: number = date.getHours();
                let m: string = date.getMinutes().toString();

                if (m.length < 2) m = `0${ m }`;

                if (h === 0) fDate = `12:${ m } AM`;
                else if ((h > 0) && (h < 12)) fDate = `${ h }:${ m } AM`;
                else if (h === 12) fDate = `12:${ m } PM`;
                else fDate = `${ h - 12 }:${ m } PM`;
            }

            return fDate;
        }

        Checkin(): void {
            this.cIn = this.GetTime(new Date());
            this.canCheckOut = true;
            console.log('update DB');
        }

        Checkout(): void {
            this.cOut = this.GetTime(new Date());
            console.log('update DB');
        }
    }
</script>

<style scoped>
    #jumbotron {
        background-color: #dcdcdc;
        border-top: none;
        border-radius: 5px;
        box-shadow: 2px 2px 3px grey;
        margin: 25px 5%;
        max-width: 500px;
    }

    .greeting {
        background-color: #ffaa45;
        border-radius: 5px 5px 0px 0px;
        color: white;
        font-size: 28px;
        font-weight: bold;
        padding: 25px 10px;
        text-shadow:
            -1px -1px 0 #3c3c3c,  
             1px -1px 0 #3c3c3c,
            -1px  1px 0 #3c3c3c,
             1px  1px 0 #3c3c3c;
        display: flex;
        flex-direction: column;
    }

    .greeting span:last-of-type {
        font-size: 24px;
    }

    .checkins {
        background-color: #fff;
        border: 10px solid #ffaa45;
        border-top: 0px;
        border-radius: 0px 0px 5px 5px;
        padding: 10px;
        display: flex;
        flex-direction: column;
    }

    #checkin {
        padding: 15px 30px 15px 15px;
    }

    #checkout {
        margin-top: 15px;
        padding: 15px;
    }

    .clockTime {
        padding: 10px;
        display: grid;
        grid-template-columns: repeat(2, 50%);
    }

    .clockTime span:first-of-type {
        padding-right: 10px;
        text-align: right;
    }

    .clockTime span:last-of-type {
        padding-left: 10px;
        text-align: left;
    }
</style>
