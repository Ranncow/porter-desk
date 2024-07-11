/**
 * Structure the shared data about a visit registration permit.
 */
// MODULE'S VARS
const NS = 'Porter_Desk_Shared_Dto_Room_Permit';

/**
 * @memberOf Porter_Desk_Shared_Dto_Room_Permit
 * @type {Object}
 */
const ATTR = {
    DATE_CREATED: 'dateCreated',
    DATE_IN: 'dateIn',
    DATE_OUT: 'dateOut',
    EMAIL: 'email',
    ID: 'id',
    NAME: 'name',
    PIN: 'pin',
    ROOM_NUM: 'roomNum',
    ROOM_REF: 'roomRef',
    UUID: 'uuid',
};

// MODULE'S CLASSES
/**
 * @memberOf Porter_Desk_Shared_Dto_Room_Permit
 */
class Dto {
    static namespace = NS;
    /**
     * Date-time when record was created.
     * @type {Date}
     */
    dateCreated;
    /**
     * Date-time when the visitor should check into the room.
     * @type {Date}
     */
    dateIn;
    /**
     * Date-time when the visitor should check out the room.
     * @type {Date}
     */
    dateOut;
    /**
     * The email of the visitor to get a link to register a visit.
     * @type {string}
     */
    email;
    /**
     * @type {number}
     */
    id;
    /**
     * The name of the visitor.
     * @type {string}
     */
    name;
    /**
     * The random set of a digits for manual registration.
     * @type {number}
     */
    pin;
    /**
     * The number of the related room.
     * @type {number}
     */
    roomNum;
    /**
     * The reference to related room.
     * @type {number}
     */
    roomRef;
    /**
     * Universally Unique Identifier.
     * @type {string}
     */
    uuid;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto_Meta
 */
export default class Porter_Desk_Shared_Dto_Room_Permit {
    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
        }
    ) {
        // INSTANCE METHODS
        /**
         * @param {Porter_Desk_Shared_Dto_Room_Permit.Dto} [data]
         * @return {Porter_Desk_Shared_Dto_Room_Permit.Dto}
         */
        this.createDto = function (data) {
            // create new DTO and populate it with initialization data
            const res = Object.assign(new Dto(), data);
            // cast known attributes
            res.dateCreated = cast.date(data?.dateCreated);
            res.dateIn = cast.date(data?.dateIn);
            res.dateOut = cast.date(data?.dateOut);
            res.email = cast.string(data?.email);
            res.id = cast.int(data?.id);
            res.name = cast.string(data?.name);
            res.pin = cast.int(data?.pin);
            res.roomNum = cast.int(data?.roomNum);
            res.roomRef = cast.int(data?.roomRef);
            res.uuid = cast.string(data?.uuid);
            return res;
        };

        this.getAttributes = () => ATTR;
    }

}
