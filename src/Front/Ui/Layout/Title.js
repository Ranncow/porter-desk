/**
 * The page title.
 *
 * @namespace Porter_Desk_Front_Ui_Layout_Title
 */
// MODULE'S VARS
const NS = 'Porter_Desk_Front_Ui_Layout_Title';

// MODULE'S FUNCTIONS

/**
 * TeqFW DI factory function to get dependencies for the object.
 *
 * @param {Porter_Desk_Front_Defaults} DEF
 * @param {Porter_Desk_Front_Ui_Widget_App_Title} wgTitle
 *
 * @returns {Porter_Desk_Front_Ui_Layout_Title.vueCompTmpl}
 */
export default function (
    {
        Porter_Desk_Front_Defaults$: DEF,
        Porter_Desk_Front_Ui_Widget_App_Title$: wgTitle,
    }
) {
    // VARS
    const template = `
<span>{{value}}</span>
`;

    // MAIN
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Porter_Desk_Front_Ui_Layout_Title
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        data() {
            return {
                value: null,
            };
        },
        /**
         * @mixes Porter_Desk_Front_Ui_Widget_App_Title.IView
         */
        methods: {
            setTitle(data) {
                this.value = data;
            },
        },
        mounted() {
            wgTitle.setView(this);
        },
    };
}
