import { Base, EmitterBase } from '../base';
import { Identity } from '../../identity';
import Transport from '../../transport/transport';
import { FrameEvents } from '../events/frame';
import { validateIdentity } from '../../util/validate';

export type EntityType = 'window' | 'iframe' | 'external connection' | 'unknown';

export interface FrameInfo {
    uuid: string;
    name: string;
    entityType: EntityType;
    parent: Identity;
}

/**
 * @lends Frame
 */
// tslint:disable-next-line
export default class _FrameModule extends Base {
    /**
     * Asynchronously returns a reference to the specified frame. The frame does not have to exist
     * @param {Identity} identity - the identity of the frame you want to wrap
     * @return {Promise.<_Frame>}
     * @tutorial Frame.wrap
     * @static
     */
    public async wrap(identity: Identity): Promise<_Frame> {
        const errorMsg = validateIdentity(identity);
        if (errorMsg) {
            throw new Error(errorMsg);
        }
        return new _Frame(this.wire, identity);
    }

    /**
     * Synchronously returns a reference to the specified frame. The frame does not have to exist
     * @param {Identity} identity - the identity of the frame you want to wrap
     * @return {_Frame}
     * @tutorial Frame.wrapSync
     * @static
     */
    public wrapSync(identity: Identity): _Frame {
        const errorMsg = validateIdentity(identity);
        if (errorMsg) {
            throw new Error(errorMsg);
        }
        return new _Frame(this.wire, identity);
    }

    /**
     * Asynchronously returns a reference to the current frame
     * @return {Promise.<_Frame>}
     * @tutorial Frame.getCurrent
     * @static
     */
    public getCurrent(): Promise<_Frame> {
        return Promise.resolve(new _Frame(this.wire, this.me));
    }

    /**
     * Synchronously returns a reference to the current frame
     * @return {_Frame}
     * @tutorial Frame.getCurrentSync
     * @static
     */
    public getCurrentSync(): _Frame {
        return new _Frame(this.wire, this.me);
    }
}

/**
 * @classdesc Represents a way to interact with `iframes`. Facilitates discovery of current context
 * (iframe or main window) as well as the ability to listen for <a href="tutorial-Frame.EventEmitter.html">frame-specific events</a>.
 * @class
 * @alias Frame
 * @hideconstructor
 */
// tslint:disable-next-line
export class _Frame extends EmitterBase<FrameEvents> {

    constructor(wire: Transport, public identity: Identity) {
        super(wire, ['frame', identity.uuid, identity.name]);
    }

    /**
     * Adds the listener function to the end of the listeners array for the specified event type.
     * @param { string | symbol } eventType  - The type of the event.
     * @param { Function } listener - Called whenever an event of the specified type occurs.
     * @param { SubOptions } [options] - Option to support event timestamps.
     * @return {Promise.<this>}
     * @function addListener
     * @memberof Frame
     * @instance
     * @tutorial Frame.EventEmitter
     */

    /**
     * Adds a listener to the end of the listeners array for the specified event.
     * @param { string | symbol } eventType  - The type of the event.
     * @param { Function } listener - Called whenever an event of the specified type occurs.
     * @param { SubOptions } [options] - Option to support event timestamps.
     * @return {Promise.<this>}
     * @function on
     * @memberof Frame
     * @instance
     * @tutorial Frame.EventEmitter
     */

    /**
     * Adds a one time listener for the event. The listener is invoked only the first time the event is fired, after which it is removed.
     * @param { string | symbol } eventType  - The type of the event.
     * @param { Function } listener - The callback function.
     * @param { SubOptions } [options] - Option to support event timestamps.
     * @return {Promise.<this>}
     * @function once
     * @memberof Frame
     * @instance
     * @tutorial Frame.EventEmitter
     */

    /**
     * Adds a listener to the beginning of the listeners array for the specified event.
     * @param { string | symbol } eventType  - The type of the event.
     * @param { Function } listener - The callback function.
     * @param { SubOptions } [options] - Option to support event timestamps.
     * @return {Promise.<this>}
     * @function prependListener
     * @memberof Frame
     * @instance
     * @tutorial Frame.EventEmitter
     */

    /**
     * Adds a one time listener for the event. The listener is invoked only the first time the event is fired, after which it is removed.
     * The listener is added to the beginning of the listeners array.
     * @param { string | symbol } eventType  - The type of the event.
     * @param { Function } listener - The callback function.
     * @param { SubOptions } [options] - Option to support event timestamps.
     * @return {Promise.<this>}
     * @function prependOnceListener
     * @memberof Frame
     * @instance
     * @tutorial Frame.EventEmitter
     */

    /**
     * Remove a listener from the listener array for the specified event.
     * Caution: Calling this method changes the array indices in the listener array behind the listener.
     * @param { string | symbol } eventType  - The type of the event.
     * @param { Function } listener - The callback function.
     * @param { SubOptions } [options] - Option to support event timestamps.
     * @return {Promise.<this>}
     * @function removeListener
     * @memberof Frame
     * @instance
     * @tutorial Frame.EventEmitter
     */

    /**
     * Removes all listeners, or those of the specified event.
     * @param { string | symbol } [eventType]  - The type of the event.
     * @return {Promise.<this>}
     * @function removeAllListeners
     * @memberof Frame
     * @instance
     * @tutorial Frame.EventEmitter
     */

    /**
     * Returns a frame info object for the represented frame
     * @return {Promise.<FrameInfo>}
     * @tutorial Frame.getInfo
     */
    public getInfo(): Promise<FrameInfo> {
        return this.wire.sendAction('get-frame-info', this.identity).then(({ payload }) => payload.data);
    }

    /**
     * Returns a frame info object representing the window that the referenced iframe is
     * currently embedded in
     * @return {Promise.<FrameInfo>}
     * @tutorial Frame.getParentWindow
     */
    public getParentWindow(): Promise<FrameInfo> {
        return this.wire.sendAction('get-parent-window', this.identity).then(({ payload }) => payload.data);
    }

}
