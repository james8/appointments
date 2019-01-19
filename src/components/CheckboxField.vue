<!-- CheckboxField Component
    @Prop() id: string	            -> Id used for checkbox
    @Prop() label: string           -> Label used for checkbox

    @Output() SelectCheckbox	    -> Returns if checkbox has been checked/unchecked
-->

<template>
    <div id="checkbox-field" @click="SelectCheckbox()">
        <span :id="id" class="fa-stack">
            <i class="fas fa-square fa-stack-2x"></i>
            <i class="far fa-square fa-stack-2x"></i>
            <i class="fas fa-check fa-stack-1x" v-bind:class="{ isChecked: status }"></i>
        </span>
        <label :for="id">{{ label }}</label>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";

    @Component
    export default class CheckboxField extends Vue {
        @Prop({ type: String, required: true }) id!: string;
        @Prop({ type: String, required: true }) label!: string;
        @Prop({ type: Boolean }) checked!: boolean;

        status: boolean = this.checked;

        SelectCheckbox(): void {
            this.status = !this.status;
            this.$emit('checkboxStatus', { id: this.id.substr(-1), status: this.status });
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
        padding-left: 10px;
    }
</style>

