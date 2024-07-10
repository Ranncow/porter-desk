/**
 * The UI component to display an active orders queue.
 *
 * @namespace Porter_Desk_Front_Ui_Lib_ActiveOrders
 */
// MODULE'S VARS
const NS = 'Porter_Desk_Front_Ui_Lib_ActiveOrders';

// MODULE'S FUNCTIONS

/**
 * TeqFW DI factory function to get dependencies for the object.
 *
 * @param {Porter_Desk_Front_Defaults} DEF
 * @param {Porter_Base_Front_Web_ServerEvent} sse
 * @param {Porter_Base_Shared_Util_Format} format
 * @param {Porter_Desk_Front_Mod_Order_Active} modActive
 *
 * @returns {Porter_Desk_Front_Ui_Lib_ActiveOrders.vueCompTmpl}
 */
export default function (
    {
        Porter_Desk_Front_Defaults$: DEF,
        Porter_Base_Front_Web_ServerEvent$: sse,
        Porter_Base_Shared_Util_Format$: format,
        Porter_Desk_Front_Mod_Order_Active$: modActive,
    }
) {
    // VARS
    const template = `
<div>
    <q-toolbar class="q-pr-xs">
        <div>ACTIVE ORDERS</div>
        <q-space/>
        <q-btn flat icon="menu" @click="onFilter" />
    </q-toolbar>
    <div class="q-gutter-xs q-pa-xs">
        <q-card v-for="item in items">
            <q-card-section>
                <div class="text-caption">{{item?.type}}</div>
                <div class="row justify-between">
                <div>{{uiUuid(item?.uuid)}}</div>
                <div>{{uiDate(item?.dateCreated)}}</div>
                </div>
            </q-card-section>
        </q-card>
    </div>
    <ui-spinner :loading="ifLoading"/>
</div>
`;

    // MAIN
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Porter_Desk_Front_Ui_Lib_ActiveOrders
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        components: {},
        data() {
            return {
                /** @type {Porter_Base_Shared_Dto_Order.Dto[]} */
                items: [],
                ifLoading: false,
            };
        },
        computed: {},
        methods: {
            /**
             * @param {Date} date
             * @return {string}
             */
            uiDate(date) {
                return format.dateTime(date, false, false);
            },
            /**
             * @param {string} uuid
             * @return {string}
             */
            uiUuid(uuid) {
                return (typeof uuid === 'string') ? uuid.substring(0, 8) : null;
            }
        },
        async mounted() {
            // FUNCS
            /**
             * @param {Porter_Base_Shared_Dto_Order.Dto} payload
             */
            const hndlRefresh = (payload) => {
                this.items.unshift(payload);
            };

            // MAIN
            this.ifLoading = true;
            const all = await modActive.list();
            all.sort((a, b) => b.dateCreated - a.dateCreated);
            this.items.length = 0;
            this.items.push(...all);
            this.ifLoading = false;
            // open SSE to get updates
            sse.setHandlers({REFRESH: hndlRefresh});
            await sse.open();
        },
    };
}
