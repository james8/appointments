<!-- CheckboxField Component
    @Prop() id: string	            -> Id used for checkbox
    @Prop() label: string           -> Label used for checkbox
    @Prop() isDisabled: boolean     -> Boolean if element is disabled

    @Output() SelectCheckbox	    -> Returns if checkbox has been checked/unchecked
-->

<template>
    <div id="checkbox-field" @click="SelectCheckbox()" v-bind:class="{ disabled: isDisabled }">
        <span :id="id" class="fa-stack">
            <i class="fas fa-square fa-stack-2x"></i>
            <i class="far fa-square fa-stack-2x"></i>
            <i class="fas fa-check fa-stack-1x" v-bind:class="{ isChecked: status }"></i>
        </span>
        <label :for="id" v-if="this.label !== ''">{{ label }}</label>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Watch } from "vue-property-decorator";

    @Component
    export default class CheckboxField extends Vue {
        @Prop({ type: String, required: true }) id!: string;
        @Prop({ type: String, required: true }) label!: string;
        @Prop({ type: Boolean }) isDisabled!: boolean;
        @Prop({ type: Boolean }) checked!: boolean;

        status: boolean = this.checked;

        created(): void {
            // pass back to Parent that checkbox was checked by default
            if (this.checked) this.$emit('checkboxStatus', { id: this.id.substr(-1), status: this.status });
        }

        SelectCheckbox(): void {
            if (!this.isDisabled) {
                this.status = !this.status;
                this.$emit('checkboxStatus', { id: this.id.substr(-1), status: this.status });
            }
        }

        @Watch('checked')
        ResetCheckbox(): void {
            this.status = this.checked;
        }
    };
</script>

<style scoped>
    #checkbox-field {
        cursor: pointer;
        padding: 5px;
    }

    #checkbox-field .fas.fa-square {
        color: #fff;
    }

    #checkbox-field:hover .fas.fa-square {
        color: rgba(1, 89, 162, 0.25);
    }

    #checkbox-field:hover .far.fa-square {
        color: #0159a2;
    }


    #checkbox-field .fa-check {
        display: none;
    }

    #checkbox-field .isChecked {
        display: initial !important;
    }
    
    #checkbox-field label {
        cursor: pointer;
        padding-left: 10px;
    }
    
    #checkbox-field.disabled, #checkbox-field.disabled label {
        cursor: default;
    }

    #checkbox-field.disabled .fas.fa-square {
        color: #ebebe4;
    }

    #checkbox-field.disabled .far.fa-square {
        color: #c2c2c1;
    }
</style>

