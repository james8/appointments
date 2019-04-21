<!-- Employees view

-->

<template>
    <div id="view_employees">
        <h1>{{ title }}</h1>

        <table id="employees_results" cellspacing="0" class="dataResults">
            <thead>
                <th>
                    {{ title }}
                    <i class="fas fa-plus" title="Create New Employee" @click="BtnCreate();"></i>
                </th>
            </thead>
            <tbody>
                <tr v-for="(employee, index) in employees" :key="`employee${ index }`">
                    <td @click="SelectEmployee(index);">
                        <span v-if="employee.isAdmin" class="isAdmin">*</span>
                        {{ employee.firstName }} {{ employee.lastName }}
                    </td>
                </tr>
            </tbody>
        </table>

        <div v-if="showForm">
            <form id="employee_form" class="form dataForm">
                <div class="header">
                    {{ formTitle }}
                    <i class="fas fa-trash-alt" v-if="(employeeNew.id > -1) && !editing" :title="deleteTitle" @click="BtnDelete();"></i>
                </div>
                <div class="body">
                    <input-field
                        :id="'employee_first_name'"
                        :label="'First Name'"
                        :value="employeeNew.firstName"
                        isRequired
                        :isDisabled="!canEdit"
                        @inputChange="UpdateEmployeeForm(formFields[0], $event);">
                    </input-field>
                    <input-field
                        :id="'employee_last_name'"
                        :label="'Last Name'"
                        :value="employeeNew.lastName"
                        isRequired
                        :isDisabled="!canEdit"
                        @inputChange="UpdateEmployeeForm(formFields[1], $event);">
                    </input-field>
                    <input-field v-bind:class="{ 'hideInput': !showPhoneEdit }"
                        :id="'employee_phone'"
                        :type="'phone'"
                        :label="'Phone #'"
                        :value="employeeNew.phone"
                        isRequired
                        :isDisabled="!canEdit"
                        @inputChange="UpdateEmployeeForm(formFields[2], $event);">
                    </input-field>
                    <input-field v-bind:class="{ 'hideInput': showPhoneEdit }"
                        :id="'employee_phone_disabled'"
                        :label="'Phone #'"
                        :value="employeeNew.phone | FPhoneNumber"
                        isRequired
                        :isDisabled="true">
                    </input-field>
                    <input-field
                        :id="'employee_email'"
                        :label="'Email'"
                        :value="employeeNew.email"
                        isRequired
                        :isDisabled="!canEdit"
                        @inputChange="UpdateEmployeeForm(formFields[3], $event);">
                    </input-field>
                    <toggle-field
                        :labels="[ 'Not Admin', 'Admin' ]"
                        :value="employeeNew.isAdmin"
                        :isDisabled="!canEdit"
                        @toggled="UpdateAdminToggled($event);">
                    </toggle-field>

                    <div class="buttons" v-if="employeeNew.id === -1">
                        <button type="button" :disabled="!canSave"
                            class="btn btnSuccess" v-bind:class="{ 'btnDisabled': !canSave }"
                            @click="BtnSaveCreate();">Create</button>
                        <button type="button" class="btn btnError" @click="BtnCancel();">Cancel</button>
                    </div>
                    <div class="buttons" v-else-if="editing">
                        <button type="button" :disabled="!canSave"
                            class="btn btnSuccess" v-bind:class="{ 'btnDisabled': !canSave }"
                            @click="BtnSave();">Save</button>
                        <button type="button" class="btn btnError" @click="BtnCancelEdit();">Cancel</button>
                    </div>
                    <div class="buttons" v-else>
                        <button type="button" class="btn btnNormal" @click="BtnEdit();">Edit</button>
                        <button type="button" class="btn btnError" @click="BtnClose();">Close</button>
                    </div>
                </div>
            </form>
            <backdrop></backdrop>
        </div>

        <toast v-if="showToast"
            :type="toastType"
            :msg="toastMsg"
            @closeToast="showToast = $event">
        </toast>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";

    import { Employee } from "@/apis/Employee.ts";

    import Backdrop from "@/components/Backdrop.vue";
    import InputField from "@/components/InputField.vue";
    import Toast from "@/components/Toast.vue";
    import ToggleField from "@/components/ToggleField.vue";
    
    import FPhoneNumber from "@/filters/PhoneNumber.ts";

    @Component({
        components: {
            Backdrop,
            InputField,
            Toast,
            ToggleField
        },
        filters: {
            'FPhoneNumber': FPhoneNumber
        }
    })
    export default class v_Employees extends Vue {
        title: string = 'Employees';

        employees: Array<Employee> = [];

        formFields: Array<string> = [ 'firstName', 'lastName', 'phone', 'email', 'isAdmin' ]
        showForm: boolean = false;
        showPhoneEdit: boolean = false;
        canSave: boolean = false;
        canEdit: boolean = false;
        editing: boolean = false;

        formTitle: string = '';
        deleteTitle: string = '';
        employeeOld: Employee = new Employee();
        employeeNew: Employee = new Employee();

        showToast: boolean = false;
        toastType: string = '';
        toastMsg: string = '';

        created(): void {
            Employee.GetEmployees()
                .then((employees: Array<Employee>) => (this.employees = employees))
                .catch(error => console.log(`Error => Employee => GetEmployees(): ${ error }`));
        }

        SelectEmployee(index: number): void {
            const me: Employee = this.employees[index];
            this.employeeOld = new Employee(me.id, me.firstName, me.lastName, me.phone, me.email, me.isAdmin);
            this.employeeNew = new Employee(me.id, me.firstName, me.lastName, me.phone, me.email, me.isAdmin);

            const fn: string = this.employeeNew.firstName;
            const ln: string = this.employeeNew.lastName;
            this.formTitle = `${ fn } ${ ln.substr(0, 1) }.`;
            this.deleteTitle = `Delete Employee '${ fn } ${ ln }'`;

            this.showForm = true;
        }

        // input-field value changed
        UpdateEmployeeForm(field: string, value: string): void {
            switch(field) {
                case 'firstName': {
                    this.employeeNew.firstName = value;
                    break;
                }
                case 'lastName': {
                    this.employeeNew.lastName = value;
                    break;
                }
                case 'phone': {
                    this.employeeNew.phone = value;
                    break;
                }
                case 'email': {
                    this.employeeNew.email = value;
                    break;
                }
            }

            // need a slight delay for type 'phone'
            setTimeout(() => {
                this.canSave = this.CanSave();
            }, 50);
        }

        // toggle value changed
        UpdateAdminToggled(event: any): void {
            this.employeeNew.isAdmin = event;
            this.canSave = this.CanSave();
        }

        BtnCreate(): void {
            this.employeeOld = new Employee();
            this.employeeNew = new Employee();

            this.formTitle = 'New Employee';
            
            this.showForm = true;
            this.showPhoneEdit = true;
            this.canSave = false;
            this.canEdit = true;
        }

        BtnDelete(): void {
            const name: string = `${ this.employeeNew.firstName } ${ this.employeeNew.lastName }`;
            const warning: string = `Are you sure you want to permanently delete employee '${ name }'?`;

            if (confirm(warning)) {
                this.toastType = 'success';
                this.toastMsg = `Employee '${ name }' has been successfully deleted!`;
                this.showToast = true;
                this.showForm = false;
            }
        }

        BtnSaveCreate(): void {
            
        }

        BtnCancel(): void {
            const isDirty: boolean = this.IsDirty(this.employeeOld, this.employeeNew);
            const warning: string = 'Are you sure you want to cancel employee creation?';

            if (!isDirty || (isDirty && confirm(warning))) {
                this.showForm = false;
                this.showPhoneEdit = false;
                this.canSave = false;
                this.canEdit = false;
                this.employeeNew = new Employee();
            }
        }

        BtnSave(): void {

        }

        BtnCancelEdit(): void {
            const _old: Employee = this.employeeOld;
            const _new: Employee = this.employeeNew;
            const isDirty: boolean = this.IsDirty(_old, _new);
            const warning: string = 'Are you sure you want to cancel employee edit? All changes will be lost.';

            if (!isDirty || (isDirty && confirm(warning))) {
                _new.firstName = _old.firstName;
                _new.lastName = _old.lastName;
                _new.phone = _old.phone;
                _new.email = _old.email;
                _new.isAdmin = _old.isAdmin;

                this.showPhoneEdit = false;
                this.canSave = false;
                this.canEdit = false;
                this.editing = false;
            }
        }

        BtnEdit(): void {
            this.showPhoneEdit = true;
            this.editing = true;
            this.canEdit = true;
        }

        BtnClose(): void {
            this.showForm = false;
            this.employeeNew = new Employee();
        }

        IsDirty(_old: Employee, _new: Employee): boolean {
            console.log(`old: ${_old.phone}`, `new: ${_new.phone}`, `test: ${_old.phone !== _new.phone}`)
            if (_old.firstName !== _new.firstName) return true;
            if (_old.lastName !== _new.lastName) return true;
            if (_old.phone !== _new.phone) return true;
            if (_old.email !== _new.email) return true;
            if (_old.isAdmin !== _new.isAdmin) return true;
            return false;
        }

        CanSave(): boolean {
            const form = (document.getElementById('employee_form') as HTMLFormElement);
            const isValid = form.checkValidity();
            const isDirty = this.IsDirty(this.employeeOld, this.employeeNew);
            return (isValid && isDirty);
        }
    };
</script>

<style scoped>
    .hideInput {
        display: none !important;
    }

    .isAdmin {
        padding-right: 5px;
    }
</style>