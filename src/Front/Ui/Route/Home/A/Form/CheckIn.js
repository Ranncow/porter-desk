/**
 * The base screen for the application's homepage.
 *
 * @namespace Porter_Desk_Front_Ui_Route_Home_A_Form_CheckIn
 */
// MODULE'S VARS
const NS = 'Porter_Desk_Front_Ui_Route_Home_A_Form_CheckIn';
const REF_SELF = 'self';

// MODULE'S INTERFACES
// noinspection JSUnusedLocalSymbols
/**
 * These the methods are available to call for the components.
 * @interface
 * @mixin
 * @memberOf Porter_Desk_Front_Ui_Route_Home_A_Form_CheckIn
 */
class IUi {
    /**
     * Hide the dialog.
     */
    hide() { }

    /**
     * Display the dialog.
     */
    show() { }
}

// MODULE'S FUNCTIONS

/**
 * TeqFW DI factory function to get dependencies for the object.
 *
 * @param {Porter_Desk_Front_Defaults} DEF
 * @param {Porter_Base_Shared_Util_Date} date
 * @param {Porter_Base_Shared_Util_Format} format
 * @param {Porter_Base_Front_Mod_Notify} modNotify
 *
 * @returns {Porter_Desk_Front_Ui_Route_Home_A_Form_CheckIn.vueCompTmpl}
 */
export default function (
    {
        Porter_Desk_Front_Defaults$: DEF,
        Porter_Base_Shared_Util_Date$: date,
        Porter_Base_Shared_Util_Format$: format,
        Porter_Base_Front_Mod_Notify$: modNotify,
    }
) {
    // VARS
    const template = `
<q-dialog ref="${REF_SELF}">
    <q-card>
        <q-bar>
            <div>Check-In</div>
            <q-space/>
            <q-btn dense flat icon="close" v-close-popup/>
        </q-bar>

        <!-- The customer data -->
        <q-card-section class="column justify-center items-center q-gutter-xs">
            <q-input v-model="fldRoom"
                     autofocus
                     dense
                     label="Room"
                     outlined
            />
            <div class="row q-gutter-xs justify-between">
                <q-input v-model="fldDateIn"
                         dense
                         label="Date In"
                         outlined
                         style="max-width: 100px"
                />
                <q-input v-model="fldTimeIn"
                         dense
                         label="Time In"
                         outlined
                         style="max-width: 100px"
                />
            </div>
            <div class="row q-gutter-xs justify-between">
                <q-input v-model="fldDateOut"
                         dense
                         label="Date Out"
                         outlined
                         style="max-width: 100px"
                />
                <q-input v-model="fldTimeOut"
                         dense
                         label="Time Out"
                         outlined
                         style="max-width: 100px"
                />
            </div>
            <q-input v-model="fldName"
                     dense
                     label="Name"
                     outlined
            />
            <q-input v-model="fldEmail"
                     dense
                     label="Email"
                     outlined
                     type="email"
            />
        </q-card-section>

        <!-- The list of rewards -->
        <q-card-section class="column justify-left items-left q-gutter-xs">
            <q-radio v-for="one of items" dense v-model="selected" :val="one.bid" :label="one.name" />            
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
     * @memberOf Porter_Desk_Front_Ui_Route_Home_A_Form_CheckIn
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        components: {},
        data() {
            return {
                fldDateIn: format.date(),
                fldDateOut: format.date(date.addDays(1)),
                fldEmail: undefined,
                fldName: undefined,
                fldRoom: undefined,
                fldTimeIn: '12:00',
                fldTimeOut: '12:00',
                ifLoading: false,
            };
        },
        computed: {},
        /**
         * @mixes Porter_Desk_Front_Ui_Route_Home_A_Form_CheckIn.IUi
         */
        methods: {
            hide() {
                const ui = this.$refs[REF_SELF];
                ui.hide();
            },
            async onOk() {
                // emulate form processing
                this.ifLoading = true;
                await new Promise((resolve) => {
                    setTimeout(resolve, 500);
                });
                this.ifLoading = false;
                this.hide();
                modNotify.positive(`New permit is created.`);
            },
            async show() {
                const ui = this.$refs[REF_SELF];
                ui.show();
            },
        },
        async mounted() {},
    };
}
