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
 * @param {Porter_Desk_Front_Ui_Widget_App_Title} wgTitle
 *
 * @returns {Porter_Desk_Front_Ui_Lib_ActiveOrders.vueCompTmpl}
 */
export default function (
    {
        Porter_Desk_Front_Defaults$: DEF,
        Porter_Desk_Front_Ui_Widget_App_Title$: wgTitle,
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
        <q-card v-for="i in 5">
            <q-card-section>Order #{{i}}</q-card-section>
        </q-card>
    </div>
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
                ifLoading: false,
            };
        },
        computed: {},
        methods: {},
        async mounted() {},
    };
}
