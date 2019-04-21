<!-- ToggleField Component

    @Prop() labels: Array<string>           -> Labels for each toggle state
    @Prop() value: boolean	                -> Value of toggle field
    @Prop() isDisabled: boolean	            -> Flag if field is disabled or not
    
    @Output Toggle()                        -> Return toggle state
-->

<template>
    <div id="toggle-field">
        <div class="toggleContainer" v-bind:class="{ 'toggleSelected': selected, 'toggleDisabled': isDisabled }" @click="Toggle();">
            <div v-if="!isDisabled" class="toggle"></div>
        </div>
        <span class="toggleLabel" v-bind:class="{ 'toggleDisabled': isDisabled }" @click="Toggle();">{{ labels[selected ? 1 : 0] }}</span>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Watch } from "vue-property-decorator";

    @Component
    export default class ToggleField extends Vue {
        @Prop({ type: Array, required: true }) labels!: Array<string>;
        @Prop({ type: Boolean, required: true }) value!: boolean;
        @Prop({ type: Boolean }) isDisabled!: boolean;

        selected: boolean = false;

        created(): void {
            this.selected = this.value;
        }

        Toggle(): void {
            if (!this.isDisabled) {
                this.selected = !this.selected;
                this.$emit('toggled', this.selected);
            }
        }

        // update 'selected' if provided prop 'value' changed
        @Watch('value')
        ValueChanged(newVal: boolean, oldVal: boolean): void {
            this.selected = newVal;
        }
    };
</script>

<style scoped>
    #toggle-field {
        padding: 10px;
        display: flex;
        align-items: center;
    }

    .toggleContainer {
        background-color: #EF5350;
        border-radius: 25px;
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
        cursor: pointer;
        height: 26px;
        padding: 3px;
        width: 50px;
        transition: background-color 0.2s ease, padding 0.2s ease;
    }

    .toggleSelected {
        background-color: #66BB6A;
        padding-left: 27px;
        transition: background-color 0.2s ease, padding-left 0.2s ease;
    }

    .toggle {
        background-color: #dadada;
        border-radius: 25px;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
        height: 20px;
        width: 20px;
    }

    .toggleLabel {
        cursor: pointer;
        padding-left: 10px;
    }

    .toggleDisabled {
        cursor: no-drop;
    }
</style>
