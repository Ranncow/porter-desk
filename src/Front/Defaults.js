/**
 * Plugin constants (hardcoded configuration) for frontend code.
 */
export default class Porter_Desk_Front_Defaults {

    ROUTE_HOME = '/';

    /** @type {Porter_Desk_Shared_Defaults} */
    SHARED;

    /**
     * @param {Porter_Desk_Shared_Defaults} SHARED
     */
    constructor(
        {
            Porter_Desk_Shared_Defaults$: SHARED,
        }
    ) {
        this.SHARED = SHARED;
        Object.freeze(this);
    }
}
