<!--
    @Prop id: string                    -> ID given to input field
    @Prop type?: string                 -> Type of input field (optional)
    @Prop label?: string                -> Value for label (optional)
    @Prop value?: string                -> Value passed to input field (optional)
    @Prop placeHolder?: string          -> Value for input field place holder (optional)
    @Prop watchForChange? boolean       -> Flag if Parent wants to know when value changes (optional)
    @Prop isDisabled?: boolean          -> Flag if input field is disabled/enabled (optional)
    @Prop isRequired?: boolean          -> Flag if input field is required (optional)
    @Prop isSubmittable?: boolean       -> Flag if input field triggers form submit on 'Enter' key press
    @Prop errorId?: string              -> ID used to populate aria-describedby (optional)
    @Prop errorMsg?: string	            -> Error message to be displayed (optional)

    @Output VModelChanged()             -> Function called when vModel (input value) changes & watchForChange TRUE; Passes TRUE back to Parent Component
    @Output Changed(Event)              -> Function called whenever input field changes; Passes value of input field back to Parent Component
    @Output FormSubmit()                -> Function called when 'Enter' key is pressed; Passes true back to Parent Component if submittable
-->

<template>
    <div id="input-field">
        <label :for="id" v-if="label !== undefined">
            {{ label }}
            <span class="required" v-if="this.isRequired" aria-hidden="true">*</span>
        </label>
        <input :id="id" :placeholder="placeHolder" :disabled="isDisabled" v-model="vModel"
            :required="isRequired"
            :aria-describedby="errorId"
            @keyup="Changed($event)"
            @keydown.enter="FormSubmit($event);" />
        <span :id="errorId" class="inputError">{{ errorMsg }}</span>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Watch } from "vue-property-decorator";
    import FPhoneNumber from "@/filters/PhoneNumber.ts";

    @Component({
        components: {
            FPhoneNumber
        },
        filters: {
            'FPhoneNumber': FPhoneNumber
        }
    })
    export default class InputField extends Vue {
        @Prop({ type: String, required: true }) id!: string;
        @Prop({ type: String }) type!: string;
        @Prop({ type: String }) label!: string;
        @Prop({ type: String }) value!: string;
        @Prop({ type: String }) placeHolder!: string;
        @Prop({ type: Boolean }) watchForChange!: boolean;
        @Prop({ type: Boolean }) isDisabled!: boolean;
        @Prop({ type: Boolean }) isRequired!: boolean;
        @Prop({ type: Boolean }) isSubmittable!: boolean;
        @Prop({ type: String }) errorId!: string;
        @Prop({ type: String }) errorMsg!: string;

        vModel: string = "";

        created(): void {
            // Set Input value if provided
            if (this.value !== undefined) this.vModel = this.value;
            
            setTimeout(() => {
                const elems: NodeListOf<Element> = document.querySelectorAll(`#${ this.id }`);
                if (this.type === 'phone') {
                    // elems.forEach((elem: Element) => elem.setAttribute('pattern', '\\([0-9]{3}\\) [0-9]{3}-[0-9]{4}'));
                    elems.forEach((elem: Element) => elem.setAttribute('pattern', '[0-9]{10}'));
                }
            }, 500);
        }

        Changed(event: Event): void {
            switch(this.type) {
                case 'phone': {
                    // replace alpha & non-numeric characters
                    this.vModel = this.vModel.replace(/[A-z]|\W/g, "");

                    // restrict to max of 10
                    const length: number = this.vModel.length;
                    if (length > 10) this.vModel = this.vModel.substr(0, 10);
                    
                    this.$emit('inputChange', this.vModel);
                    break;
                }

                default: {
                    this.$emit('inputChange', this.vModel);
                    break;
                }
            }
        }

        // update vModel if provided prop 'value' changed
        @Watch('value')
        ValueChanged(newVal: string, oldVal: string): void {
            this.vModel = this.value;
        }
        
        // let Parent Component know that value changed
        @Watch('vModel')
        VModelChanged(newVal: string, oldVal: string): void {
            if (this.watchForChange) this.$emit('inputChanged', true);
        }

        FormSubmit(event: Event): void {
            if (this.isSubmittable) {
                event.preventDefault();
                this.$emit('formSubmit', true);
            }
        }
    }
</script>

<style scoped>
    #input-field {
        padding: 10px;
        text-align: left;
        display: flex;
        flex-direction: column;
    }

    label {
        font-weight: bold;
        padding: 5px;
    }

    input {
        padding: 5px;
    }

    .inputError {
        color: #ef5350;
        font-size: 14px;
        font-style: italic;
        font-weight: bold;
        padding-top: 5px;
    }
</style>
