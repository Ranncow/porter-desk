/**
 * Structure the shared data about an item in a rooms list.
 */
// MODULE'S VARS
const NS = 'Porter_Desk_Shared_Dto_Room_List_Item';

/**
 * @memberOf Porter_Desk_Shared_Dto_Room_List_Item
 * @type {Object}
 */
const ATTR = {
    ID: 'id',
    NUMBER: 'number',
    STATE: 'state',
};

// MODULE'S CLASSES
/**
 * @memberOf Porter_Desk_Shared_Dto_Room_List_Item
 */
class Dto {
    static namespace = NS;
    /**
     * Backend ID for the record.
     * @type {number}
     */
    id;
    /**
     * The room number.
     * @type {number}
     */
    number;
    /**
     * The current state of the room.
     * @type {string}
     * @see Porter_Base_Shared_Enum_Room_State
     */
    state;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto_Meta
 */
export default class Porter_Desk_Shared_Dto_Room_List_Item {
    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     * @param {typeof Porter_Base_Shared_Enum_Room_State} STATE
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
            Porter_Base_Shared_Enum_Room_State$: STATE,
        }
    ) {
        // INSTANCE METHODS
        /**
         * @param {Porter_Desk_Shared_Dto_Room_List_Item.Dto} [data]
         * @return {Porter_Desk_Shared_Dto_Room_List_Item.Dto}
         */
        this.createDto = function (data) {
            // create new DTO and populate it with initialization data
            const res = Object.assign(new Dto(), data);
            // cast known attributes
            res.id = cast.int(data?.id);
            res.number = cast.int(data?.number);
            res.state = cast.enum(data?.state, STATE);
            return res;
        };

        this.getAttributes = () => ATTR;
    }

}
