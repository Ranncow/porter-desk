/**
 * The web application initializes the Vue app and then mounts it to the given DOM element on the page.
 *
 * @implements TeqFw_Web_Front_Api_App
 */
export default class Porter_Desk_Front_App {
    /**
     * @param {TeqFw_Di_Api_Container} container
     * @param {Porter_Desk_Front_Defaults} DEF
     * @param {TeqFw_Core_Shared_Logger_Base} loggerBase
     * @param {TeqFw_Core_Shared_Api_Logger_Transport} loggerTransport
     * @param {TeqFw_Vue_Front_Ext_Vue} extVue
     * @param {TeqFw_Ui_Quasar_Front_Ext} extQuasar
     * @param {TeqFw_Web_Front_Mod_Config} modCfg
     * @param {TeqFw_Ui_Quasar_Front_Lib_Spinner.vueCompTmpl} uiSpinner
     * @param {Porter_Desk_Front_Ui_Layout_Main.vueCompTmpl} layoutMain
     * @param {Porter_Desk_Front_Ui_Main.vueCompTmpl} uiMain
     */
    constructor(
        {
            container,
            Porter_Desk_Front_Defaults$: DEF,
            TeqFw_Core_Shared_Logger_Base$: loggerBase,
            TeqFw_Core_Shared_Api_Logger_Transport$: loggerTransport,
            TeqFw_Vue_Front_Ext_Vue: extVue,
            TeqFw_Ui_Quasar_Front_Ext: extQuasar,
            TeqFw_Web_Front_Mod_Config$: modCfg,
            TeqFw_Ui_Quasar_Front_Lib_Spinner$: uiSpinner,
            Porter_Desk_Front_Ui_Layout_Main$: layoutMain,
            Porter_Desk_Front_Ui_Main$: uiMain,
        }
    ) {
        // VARS
        let _app; // root vue component for the application
        let _print; // function to printout logs to UI or console
        const {
            /** @type {{createApp:function}} */
            Vue,
            /** @type {{createRouter:function, createWebHashHistory:function}} */
            VueRouter,
        } = extVue;

        const {default: quasar} = extQuasar;
        const QDark = quasar.Dark; // https://quasar.dev/quasar-plugins/dark#outside-of-a-vue-file

        // INSTANCE METHODS

        this.init = async function (fnPrintout) {
            // FUNCS

            /**
             * Create printout function to log application startup events (to page or to console).
             * @param {function(string)} fn
             * @return {function(string)}
             */
            function createPrintout(fn) {
                return (typeof fn === 'function') ? fn : (msg) => console.log(msg);
            }

            function initLogger() {
                loggerBase.setTransport(loggerTransport);
            }

            /**
             * Set up Quasar UI.
             *  - icons: https://quasar.dev/start/umd
             *
             * @param {{use:function, iconSet: Object}} app
             * @param quasar
             */
            function initQuasarUi(app, quasar) {
                app.use(quasar, {config: {}});
                // https://quasar.dev/start/umd
                // noinspection JSUnresolvedVariable
                // quasar.iconSet.set(quasar.iconSet.svgMaterialIcons);
                // const useDark = modAppCfg.getUseThemeDark();
                // QDark.set(useDark);
            }

            /**
             * Add global components to the Vue app.
             * @param {{component:function}} app
             */
            function initUiComponents(app) {
                // ... and add global available components
                app.component('layoutMain', layoutMain);
                app.component('uiSpinner', uiSpinner);
            }

            /**
             * @param {{use:function}} app Vue 3 app
             * @param {Porter_Desk_Front_Defaults} DEF
             * @param {TeqFw_Di_Api_Container} container
             */
            function initRouter(app, DEF, container) {
                // VARS
                const META_ANON = 'anonymous';

                // MAIN
                /** @type {{addRoute, beforeEach}} */
                const router = VueRouter.createRouter({
                    history: VueRouter.createWebHashHistory(),
                    routes: [],
                });
                // setup application routes (load es6-module on demand using DI-container)
                router.addRoute({
                    path: DEF.ROUTE_HOME,
                    component: () => container.get('Porter_Desk_Front_Ui_Route_Home$'),
                    meta: {[META_ANON]: true},
                });
                //
                // router.beforeEach((to) => {   });
                //
                app.use(router);
            }

            // MAIN
            let res = false;
            try {
                _print = createPrintout(fnPrintout);
                _print(`Creating the frontend application...`);
                // create root vue component
                _app = Vue.createApp(uiMain);
                _print(`Initializing global UI components...`);
                initUiComponents(_app);
                _print(`Initializing Quasar UI...`);
                initQuasarUi(_app, quasar);
                _print(`Loading the front app configuration...`);
                await modCfg.init();
                _print(`Initializing the logger...`);
                initLogger();
                _print(`Initializing the Vue Router...`);
                initRouter(_app, DEF, container);
                _print(`The front app initialization is complete.`);
                res = true;
            } catch (e) {
                loggerBase.error(this.constructor.name, e);
                _print(e?.message);
            }
            return res;
        };

        /**
         * Mount root vue component of the application to DOM element.
         *
         * @see https://v3.vuejs.org/api/application-api.html#mount
         *
         * @param {Element|string} elRoot
         */
        this.mount = function (elRoot) {
            _app.mount(elRoot);
        };

        /**
         * Launch re-installation app.
         * @param {Element|string} elRoot
         */
        this.reinstall = function (elRoot) {
            _print(`
It is required to reinstall app. Please clean up all data in DevTools 
(F12 / Application / Storage / Clear site data).
Then reload this page.
`);
        };
    }
}
