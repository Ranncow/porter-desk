/**
 * The base screen for the application's homepage.
 *
 * @namespace Porter_Desk_Front_Ui_Route_Home
 */
// MODULE'S VARS
const NS = 'Porter_Desk_Front_Ui_Route_Home';
const REF_CHECK_IN = 'checkIn';

// MODULE'S FUNCTIONS

/**
 * TeqFW DI factory function to get dependencies for the object.
 *
 * @param {Porter_Desk_Front_Defaults} DEF
 * @param {Porter_Desk_Front_Ui_Widget_App_Title} wgTitle
 * @param {Porter_Desk_Front_Ui_Route_Home_A_Form_CheckIn.vueCompTmpl} uiFormCheckIn
 *
 * @returns {Porter_Desk_Front_Ui_Route_Home.vueCompTmpl}
 */
export default function (
    {
        Porter_Desk_Front_Defaults$: DEF,
        Porter_Desk_Front_Ui_Widget_App_Title$: wgTitle,
        Porter_Desk_Front_Ui_Route_Home_A_Form_CheckIn$: uiFormCheckIn,
    }
) {
    // VARS
    const template = `
<layout-main>
    <div class="" style="height: calc(100vh - var(--size-header));">
        <q-toolbar class="q-pr-xs">
            <div>ACTIVE CONSOLE</div>
            <q-space/> 
        </q-toolbar>
        <div class="q-pa-xl row items-start">
            <div class="col text-center q-pa-md column q-gutter-md">
                <div>ROOMS</div>
                <q-btn>View Active Rooms</q-btn>
                <q-btn label="Check-In" @click="onCheckIn"/>
                <q-btn>Check-Out</q-btn>
                <q-btn>Activate Account for Worker</q-btn>
            </div>
            <div class="col text-center q-pa-md column q-gutter-md">
                <div>KITCHEN</div>
                <q-btn>Incoming Orders</q-btn>
                <q-btn>Active Orders</q-btn>
                <q-btn>Order History</q-btn>
                <q-btn>Menu Editor</q-btn>
                <q-btn>Create Order</q-btn>
            </div>
            <div class="col text-center q-pa-md column q-gutter-md">
                <div>CLEANING</div>
                <q-btn>View/Manage Schedule</q-btn>
                <q-btn>Create Order</q-btn>
            </div> 
        </div>
    </div>
    <ui-form-check-in ref="${REF_CHECK_IN}"/> 
</layout-main>
`;

    // MAIN
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Porter_Desk_Front_Ui_Route_Home
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        components: {uiFormCheckIn},
        data() {
            return {};
        },
        computed: {},
        methods: {
            onCheckIn() {
                /** @type {Porter_Desk_Front_Ui_Route_Home_A_Form_CheckIn.IUi} */
                const dlg = this.$refs[REF_CHECK_IN];
                dlg.show();
            },
        },
        async mounted() {
            wgTitle.setTitle('Porter Desk');
            this.onCheckIn();
        },
    };
}
