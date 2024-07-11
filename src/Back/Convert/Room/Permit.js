/**
 * Convert shared DTO from/to other related DTOs (RDB, ...).
 * @implements Porter_Base_Back_Api_Convert
 */
export default class Porter_Desk_Back_Convert_Room_Permit {
    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     * @param {Porter_Desk_Shared_Dto_Room_Permit} shared
     * @param {Porter_Base_Back_Store_RDb_Schema_Room_Permit} rdbPermit
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
            Porter_Desk_Shared_Dto_Room_Permit$: shared,
            Porter_Base_Back_Store_RDb_Schema_Room_Permit$: rdbPermit,
        }
    ) {
        // INSTANCE METHODS

        /**
         * @param {Porter_Base_Back_Store_RDb_Schema_Room_Permit.Dto} dbPermit
         * @param {Porter_Base_Back_Store_RDb_Schema_Room.Dto} dbRoom
         * @returns {Porter_Desk_Shared_Dto_Room_Permit.Dto}
         */
        this.rdb2share = function ({dbPermit, dbRoom}) {
            const res = shared.createDto();
            res.dateCreated = cast.date(dbPermit?.date_created);
            res.dateIn = cast.date(dbPermit?.date_in);
            res.dateOut = cast.date(dbPermit?.date_out);
            res.email = cast.string(dbPermit?.email);
            res.id = cast.int(dbPermit?.id);
            res.name = cast.string(dbPermit?.name);
            res.pin = cast.int(dbPermit?.pin);
            res.roomNum = cast.int(dbRoom?.number);
            res.roomRef = cast.int(dbPermit?.room_ref);
            res.uuid = cast.string(dbPermit?.uuid);
            return res;
        };

        /**
         * The structure of the returned value.
         * @typedef {Object} Share2RdbResult
         * @property {Porter_Base_Back_Store_RDb_Schema_Room_Permit.Dto} dbPermit
         * @memberof Porter_Desk_Back_Convert_Room_Permit
         */

        /**
         * @param {Porter_Desk_Shared_Dto_Room_Permit.Dto} permit
         * @return {Share2RdbResult}
         */
        this.share2rdb = function ({permit}) {
            const dbPermit = rdbPermit.createDto();
            dbPermit.date_created = cast.date(permit?.dateCreated);
            dbPermit.date_in = cast.date(permit?.dateIn);
            dbPermit.date_out = cast.date(permit?.dateOut);
            dbPermit.email = cast.string(permit?.email);
            dbPermit.id = cast.int(permit?.id);
            dbPermit.name = cast.string(permit?.name);
            dbPermit.pin = cast.int(permit?.pin);
            dbPermit.room_ref = cast.int(permit?.roomRef);
            dbPermit.uuid = cast.string(permit?.uuid);
            return {dbPermit};
        };
    }
}
