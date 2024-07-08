/**
 * The main UI component to use with `createApp`.
 *
 * @namespace Porter_Desk_Front_Ui_Main
 */
// MODULE'S VARS
const NS = 'Porter_Desk_Front_Ui_Main';

// MODULE'S FUNCTIONS

/**
 * TeqFW DI factory function to get dependencies for the object.
 *
 * @param {Porter_Desk_Front_Defaults} DEF
 * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
 * @param {TeqFw_Web_Front_Mod_Version} modVersion
 *
 * @returns {Porter_Desk_Front_Ui_Main.vueCompTmpl}
 */
export default function (
    {
        Porter_Desk_Front_Defaults$: DEF,
        TeqFw_Core_Shared_Api_Logger$$: logger,
        TeqFw_Web_Front_Mod_Version$: modVersion,
    }
) {
    // VARS
    const template = `<router-view/>`;

    // MAIN
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Porter_Desk_Front_Ui_Main
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        async created() {
            const router = this.$router;
            logger.info(`Started with route: '${JSON.stringify(router?.currentRoute.value)}'`);
            if (modVersion.needUpgrade()) {
                debugger; // TODO: remove after the fix
                logger.info(`The front app needs upgrade.`);
                router.push(DEF.ROUTE_APP_UPGRADE);
            }
        },
    };
}
