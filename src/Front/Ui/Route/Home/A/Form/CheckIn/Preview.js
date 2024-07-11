/**
 * The form to display a registration permit.
 *
 * @namespace Porter_Desk_Front_Ui_Route_Home_A_Form_CheckIn_Preview
 */
// MODULE'S VARS
const NS = 'Porter_Desk_Front_Ui_Route_Home_A_Form_CheckIn_Preview';
const REF_SELF = 'self';

// MODULE'S INTERFACES
// noinspection JSUnusedLocalSymbols
/**
 * These the methods are available to call for the components.
 * @interface
 * @mixin
 * @memberOf Porter_Desk_Front_Ui_Route_Home_A_Form_CheckIn_Preview
 */
class IUi {
    /**
     * Hide the dialog.
     */
    hide() { }

    /**
     * Display the dialog.
     * @param {number} id
     */
    show({id}) { }
}

// MODULE'S FUNCTIONS

/**
 * TeqFW DI factory function to get dependencies for the object.
 *
 * @param {Porter_Desk_Front_Defaults} DEF
 * @param {Porter_Base_Shared_Util_Format} format
 * @param {Porter_Desk_Front_Mod_Room_Permit} modPermit
 *
 * @returns {Porter_Desk_Front_Ui_Route_Home_A_Form_CheckIn_Preview.vueCompTmpl}
 */
export default function (
    {
        Porter_Desk_Front_Defaults$: DEF,
        Porter_Base_Shared_Util_Format$: format,
        Porter_Desk_Front_Mod_Room_Permit$: modPermit,
    }
) {
    // VARS
    const template = `
<q-dialog ref="${REF_SELF}">
    <q-card>
        <q-bar>
            <div>Check-In Permit #{{origin?.id}}</div>
            <q-space/>
            <q-btn dense flat icon="close" v-close-popup/>
        </q-bar>

        <q-card-section class="column justify-center items-center q-gutter-xs">
            <q-input :model-value="origin?.uuid"
                     dense
                     label="UUID"
                     outlined
                     readonly
            />  
            <q-input :model-value="origin?.pin"
                     dense
                     label="PIN"
                     outlined
                     readonly
            />         
            <q-input :model-value="origin?.name"
                     dense
                     label="Name"
                     outlined
                     readonly
            />       
            <q-input :model-value="origin?.email"
                     dense
                     label="Email"
                     outlined
                     readonly
            />     
            <q-input :model-value="origin?.roomNum"
                     dense
                     label="Room"
                     outlined
                     readonly
            />   
            <q-input :model-value="uiDateIn"
                     dense
                     label="Date In"
                     outlined
                     readonly
            />         
            <q-input :model-value="uiDateOut"
                     dense
                     label="Date Out"
                     outlined
                     readonly
            />         
        </q-card-section>

        <q-card-actions align="center">
            <q-btn outline label="OK" @click="onOk"/>
        </q-card-actions>

        <ui-spinner :loading="ifLoading"/>
    </q-card>
</q-dialog>
`;

    // MAIN
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Porter_Desk_Front_Ui_Route_Home_A_Form_CheckIn_Preview
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        components: {},
        data() {
            return {
                /** @type {Porter_Desk_Shared_Dto_Room_Permit.Dto} */
                origin: undefined,
                ifLoading: false,
            };
        },
        computed: {
            uiDateIn() {
                return format.dateTime(this.origin?.dateIn, false);
            },
            uiDateOut() {
                return format.dateTime(this.origin?.dateOut, false);
            },
        },
        /**
         * @mixes Porter_Desk_Front_Ui_Route_Home_A_Form_CheckIn_Preview.IUi
         */
        methods: {
            hide() {
                const ui = this.$refs[REF_SELF];
                ui.hide();
            },
            async onOk() {
                this.hide();
            },
            async show({id}) {
                const ui = this.$refs[REF_SELF];
                ui.show();
                this.ifLoading = true;
                const found = await modPermit.read({id});
                if (found) this.origin = found;
                this.ifLoading = false;
            },
        },
        async mounted() {},
    };
}
