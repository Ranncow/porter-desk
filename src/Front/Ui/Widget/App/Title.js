/**
 * A 'presenter' part of the widget that represents the title in the app.
 */
// MODULE'S INTERFACES
// noinspection JSUnusedLocalSymbols
/**
 * The view for this presenter must implement this interface.
 * @interface
 * @memberOf Porter_Desk_Front_Ui_Widget_App_Title
 * @mixin
 */
class IView {
    /**
     * Set the title of the top bar.
     * @param {string} data
     */
    setTitle(data) { };
}

// MODULE'S CLASSES
export default class Porter_Desk_Front_Ui_Widget_App_Title {
    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
        }
    ) {
        // VARS
        /** @type {Porter_Desk_Front_Ui_Widget_App_Title.IView} */
        let _view;

        // INSTANCE METHODS
        /**
         * @return {Porter_Desk_Front_Ui_Widget_App_Title.IView}
         */
        this.getView = () => _view;

        /**
         * @param {string} data
         */
        this.setTitle = function (data) {
            const norm = cast.string(data);
            self.document.title = norm;
            _view?.setTitle(norm);
        };

        /**
         * @param {Porter_Desk_Front_Ui_Widget_App_Title.IView} view
         */
        this.setView = function (view) {
            _view = view;
        };

    }
}
