/**
 * The base screen for the application's homepage.
 *
 * @namespace Porter_Desk_Front_Ui_Route_Home
 */
// MODULE'S VARS
const NS = 'Porter_Desk_Front_Ui_Route_Home';
const REF_CHECK_IN_CREATE = 'checkInCreate';
const REF_CHECK_IN_PREVIEW = 'checkInPreview';

// MODULE'S FUNCTIONS

/**
 * TeqFW DI factory function to get dependencies for the object.
 *
 * @param {Porter_Desk_Front_Defaults} DEF
 * @param {Porter_Desk_Front_Ui_Widget_App_Title} wgTitle
 * @param {Porter_Desk_Front_Ui_Route_Home_A_Form_CheckIn_Create.vueCompTmpl} uiFormCheckInCreate
 * @param {Porter_Desk_Front_Ui_Route_Home_A_Form_CheckIn_Preview.vueCompTmpl} uiFormCheckInPreview
 *
 * @returns {Porter_Desk_Front_Ui_Route_Home.vueCompTmpl}
 */
export default function (
    {
        Porter_Desk_Front_Defaults$: DEF,
        Porter_Desk_Front_Ui_Widget_App_Title$: wgTitle,
        Porter_Desk_Front_Ui_Route_Home_A_Form_CheckIn_Create$: uiFormCheckInCreate,
        Porter_Desk_Front_Ui_Route_Home_A_Form_CheckIn_Preview$: uiFormCheckInPreview,
    }
) {
    // VARS
    const template = `
<layout-main>
    <div class="" style="height: calc(100vh - var(--size-header));">
        <q-toolbar class="q-pr-xs">
            <div class="header-left">ACTIVE CONSOLE</div>
            <q-space/> 
        </q-toolbar>
        <div class="q-pa-xl box-container">
            <div class="col text-center q-pa-md column q-gutter-md">
                <div class="title-container">
                    <q-img
                    src="rooms.ico"
                    alt="Rooms"
                    style="width: 54px; height: 44px; margin-right: 8px;"
                    />
                    <div>Rooms</div>
                </div>
                <q-btn label="Check-In a guest" @click="onCheckIn"/>
                <q-btn>Check-Out a guest</q-btn>
                <q-btn>View active rooms</q-btn>
            </div>
            <div class="col text-center q-pa-md column q-gutter-md">
                <div class="title-container">
                    <q-img
                    src="kitchen.ico"
                    alt="Kitchen"
                    style="width: 54px; height: 44px; margin-right: 8px;"
                    />
                    <div>Kitchen</div>
                </div>
                <q-btn>Create order</q-btn>
                <q-btn>Active orders</q-btn>
                <q-btn>Order history</q-btn>
                <q-btn>Edit menu</q-btn>
            </div>
            <div class="col text-center q-pa-md column q-gutter-md">
                <div class="title-container">
                    <q-img
                    src="cleaning.ico"
                    alt="Cleaning"
                    style="width: 54px; height: 44px; margin-right: 8px;"
                    />
                    <div>Cleaning</div>
                </div>
                <q-btn>Create Order</q-btn>
                <q-btn>View/Manage Schedule</q-btn>
            </div> 
        </div>
    </div>
    <ui-form-check-in-create ref="${REF_CHECK_IN_CREATE}" @onSuccess="doCheckInCreateSuccess"/> 
    <ui-form-check-in-preview ref="${REF_CHECK_IN_PREVIEW}"/> 
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
        components: {uiFormCheckInCreate, uiFormCheckInPreview},
        data() {
            return {};
        },
        computed: {},
        methods: {
            /**
             * Display the CheckIn Preview dialog for newly created permit.
             * @param {Porter_Desk_Shared_Dto_Room_Permit.Dto} dto
             */
            doCheckInCreateSuccess(dto) {
                /** @type {Porter_Desk_Front_Ui_Route_Home_A_Form_CheckIn_Preview.IUi} */
                const dlg = this.$refs[REF_CHECK_IN_PREVIEW];
                dlg.show({id: dto?.id});
            },
            onCheckIn() {
                /** @type {Porter_Desk_Front_Ui_Route_Home_A_Form_CheckIn_Create.IUi} */
                const dlg = this.$refs[REF_CHECK_IN_CREATE];
                dlg.show();
            },
        },
        async mounted() {
            wgTitle.setTitle('Porter Desk');
        },
    };
}
