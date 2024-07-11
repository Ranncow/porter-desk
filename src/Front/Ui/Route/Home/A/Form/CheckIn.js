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
 * @param {Porter_Desk_Front_Mod_Room} modRoom
 * @param {Porter_Desk_Front_Mod_Room_Permit} modPermit
 * @param {typeof Porter_Base_Shared_Enum_Room_State} STATE
 *
 * @returns {Porter_Desk_Front_Ui_Route_Home_A_Form_CheckIn.vueCompTmpl}
 */
export default function (
    {
        Porter_Desk_Front_Defaults$: DEF,
        Porter_Base_Shared_Util_Date$: date,
        Porter_Base_Shared_Util_Format$: format,
        Porter_Base_Front_Mod_Notify$: modNotify,
        Porter_Desk_Front_Mod_Room$: modRoom,
        Porter_Desk_Front_Mod_Room_Permit$: modPermit,
        Porter_Base_Shared_Enum_Room_State$: STATE,
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
            <q-select v-model="fldRoom"
                      :options="optsRoom"
                      dense
                      emit-value
                      label="Room"
                      map-options
                      outlined
                      style="width: 200px"
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
                optsRoom: [],
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
                // FUNCS
                function getDate(date, time) {
                    const txt = `${date} ${time}`;
                    return new Date(txt);
                }

                // MAIN
                // emulate form processing
                this.ifLoading = true;
                const dto = modPermit.composeEntity();
                dto.dateIn = getDate(this.fldDateIn, this.fldTimeIn);
                dto.dateOut = getDate(this.fldDateOut, this.fldTimeOut);
                dto.email = this.fldEmail;
                dto.name = this.fldName;
                dto.roomRef = this.fldRoom;
                debugger
                const rs = await modPermit.create({entity: dto});
                this.ifLoading = false;
                this.hide();
                if (rs.uuid) modNotify.positive(`New permit is created.`);
                else modNotify.negative(`New permit is not created.`);
            },
            async show() {
                const ui = this.$refs[REF_SELF];
                ui.show();
            },
        },
        async mounted() {
            const items = await modRoom.list();
            this.fldRoom = undefined;
            this.optsRoom.length = 0;
            for (const item of items) {
                if (item.state === STATE.READY) {
                    this.optsRoom.push({value: item.id, label: item.number});
                    if (!this.fldRoom) this.fldRoom = item.id; // select the first ready room
                }
            }
        },
    };
}
