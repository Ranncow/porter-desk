/**
 * The main layout for all desk app routes.
 *
 * @namespace Porter_Desk_Front_Ui_Layout_Main
 */
// MODULE'S VARS
const NS = 'Porter_Desk_Front_Ui_Layout_Main';

// MODULE'S FUNCTIONS

/**
 * TeqFW DI factory function to get dependencies for the object.
 *
 * @param {Porter_Desk_Front_Defaults} DEF
 * @param {TeqFw_Vue_Front_Util} utilVue
 * @param {Porter_Desk_Front_Ui_Layout_Title.vueCompTmpl} uiTitle
 * @param {Porter_Desk_Front_Ui_Lib_ActiveOrders.vueCompTmpl} uiActiveOrders
 *
 * @returns {Porter_Desk_Front_Ui_Layout_Main.vueCompTmpl}
 */
export default function (
    {
        Porter_Desk_Front_Defaults$: DEF,
        TeqFw_Vue_Front_Util$: utilVue,
        Porter_Desk_Front_Ui_Layout_Title$: uiTitle,
        Porter_Desk_Front_Ui_Lib_ActiveOrders$: uiActiveOrders,
    }
) {
    // VARS
    const template = `
<q-layout view="hHh lpR lFf">

    <q-header elevated class="">
        <q-toolbar class="q-pr-xs">
            <q-img
                    src="favicon.ico"
                    alt="Logo"
                    style="width: 40px; height: 40px; margin-right: 8px;"
            />
            <q-toolbar-title class="q-pl-xs">
                <ui-title/>
            </q-toolbar-title>
        </q-toolbar>
    </q-header>

    <q-page-container>
        <q-splitter
                v-model="splitterModel"
                style="height: calc(100vh - var(--size-header))"
        >

            <template v-slot:before>
                <ui-active-orders/>
            </template>

            <template v-slot:after>
                <router-view>
                    <q-page style="overflow-y: auto;">
                        <slot/>
                    </q-page>
                </router-view>
            </template>

        </q-splitter>

    </q-page-container>

</q-layout>
`;

    // MAIN
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Porter_Desk_Front_Ui_Layout_Main
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        components: {uiActiveOrders, uiTitle},
        data() {
            return {
                ifNavigatorOpen: false,
                splitterModel: 33,
            };
        },
        computed: {},
        methods: {
            toggleNavigator() {
                this.ifNavigatorOpen = !this.ifNavigatorOpen;
            }
        },
        created() { },
    };
}
