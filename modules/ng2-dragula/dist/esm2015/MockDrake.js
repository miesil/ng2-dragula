/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Subject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DrakeFactory } from './DrakeFactory';
/** @type {?} */
export const MockDrakeFactory = new DrakeFactory((containers, options) => {
    return new MockDrake(containers, options);
});
/**
 * You can use MockDrake to simulate Drake events.
 *
 * The three methods that actually do anything are `on(event, listener)`,
 * `destroy()`, and a new method, `emit()`. Use `emit()` to manually emit Drake
 * events, and if you injected MockDrake properly with MockDrakeFactory or
 * mocked the DragulaService.find() method, then you can make ng2-dragula think
 * drags and drops are happening.
 *
 * Caveats:
 *
 * 1. YOU MUST MAKE THE DOM CHANGES YOURSELF.
 * 2. REPEAT: YOU MUST MAKE THE DOM CHANGES YOURSELF.
 *    That means `source.removeChild(el)`, and `target.insertBefore(el)`.
 * 3. None of the other methods do anything.
 *    That's ok, because ng2-dragula doesn't use them.
 */
export class MockDrake {
    /**
     * @param {?=} containers A list of container elements.
     * @param {?=} options These will NOT be used. At all.
     * @param {?=} models Nonstandard, but useful for testing using `new MockDrake()` directly.
     *               Note, default value is undefined, like a real Drake. Don't change that.
     */
    constructor(containers = [], options = {}, models) {
        this.containers = containers;
        this.options = options;
        this.models = models;
        /* Doesn't represent anything meaningful. */
        this.dragging = false;
        this.emitter$ = new Subject();
        this.subs = new Subscription();
    }
    /**
     * @param {?} item
     * @return {?}
     */
    start(item) {
        this.dragging = true;
    }
    /**
     * @return {?}
     */
    end() {
        this.dragging = false;
    }
    /**
     * @param {?=} revert
     * @return {?}
     */
    cancel(revert) {
        this.dragging = false;
    }
    /**
     * @return {?}
     */
    remove() {
        this.dragging = false;
    }
    /**
     * @param {?} event
     * @param {?} callback
     * @return {?}
     */
    on(event, callback) {
        this.subs.add(this.emitter$
            .pipe(filter(({ eventType }) => eventType === event))
            .subscribe(({ args }) => {
            callback(...args);
        }));
    }
    /**
     * @return {?}
     */
    destroy() {
        this.subs.unsubscribe();
    }
    /**
     * This is the most useful method. You can use it to manually fire events that would normally
     * be fired by a real drake.
     *
     * You're likely most interested in firing `drag`, `remove` and `drop`, the three events
     * DragulaService uses to implement [dragulaModel].
     *
     * See https://github.com/bevacqua/dragula#drakeon-events for what you should emit (and in what order).
     *
     * (Note also, firing dropModel and removeModel won't work. You would have to mock DragulaService for that.)
     * @param {?} eventType
     * @param {...?} args
     * @return {?}
     */
    emit(eventType, ...args) {
        this.emitter$.next({ eventType, args });
    }
}
function MockDrake_tsickle_Closure_declarations() {
    /** @type {?} */
    MockDrake.prototype.dragging;
    /** @type {?} */
    MockDrake.prototype.emitter$;
    /** @type {?} */
    MockDrake.prototype.subs;
    /** @type {?} */
    MockDrake.prototype.containers;
    /** @type {?} */
    MockDrake.prototype.options;
    /** @type {?} */
    MockDrake.prototype.models;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9ja0RyYWtlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLWRyYWd1bGEvIiwic291cmNlcyI6WyJNb2NrRHJha2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTdDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUd4QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBRTlDLGFBQWEsZ0JBQWdCLEdBQUcsSUFBSSxZQUFZLENBQUMsQ0FBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLEVBQUU7SUFDdkUsT0FBTyxJQUFJLFNBQVMsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7Q0FDM0MsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQkgsTUFBTTs7Ozs7OztJQU9KLFlBQ1MsYUFBd0IsRUFBRSxFQUMxQixVQUEwQixFQUFFLEVBQzVCO1FBRkEsZUFBVSxHQUFWLFVBQVU7UUFDVixZQUFPLEdBQVAsT0FBTztRQUNQLFdBQU0sR0FBTixNQUFNOzt3QkFJSyxLQUFLO3dCQXNCTixJQUFJLE9BQU8sRUFBMEM7b0JBRXpELElBQUksWUFBWSxFQUFFO0tBM0I3Qjs7Ozs7SUFNSixLQUFLLENBQUMsSUFBYTtRQUNqQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztLQUN0Qjs7OztJQUVELEdBQUc7UUFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztLQUN2Qjs7Ozs7SUFJRCxNQUFNLENBQUMsTUFBWTtRQUNqQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztLQUN2Qjs7OztJQUVELE1BQU07UUFDSixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztLQUN2Qjs7Ozs7O0lBT0QsRUFBRSxDQUFDLEtBQWEsRUFBRSxRQUFrQjtRQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUTthQUN4QixJQUFJLENBQ0gsTUFBTSxDQUFDLENBQUMsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLENBQUMsU0FBUyxLQUFLLEtBQUssQ0FBQyxDQUMvQzthQUNBLFNBQVMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUN0QixRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztTQUNuQixDQUFDLENBQUMsQ0FBQztLQUNQOzs7O0lBRUQsT0FBTztRQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDekI7Ozs7Ozs7Ozs7Ozs7OztJQWFELElBQUksQ0FBQyxTQUFxQixFQUFFLEdBQUcsSUFBVztRQUN4QyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO0tBQ3hDO0NBRUYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgRHJha2VXaXRoTW9kZWxzIH0gZnJvbSAnLi9EcmFrZVdpdGhNb2RlbHMnO1xyXG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IEV2ZW50VHlwZXMgfSBmcm9tICcuL0V2ZW50VHlwZXMnO1xyXG5pbXBvcnQgeyBEcmFndWxhT3B0aW9ucyB9IGZyb20gJy4vRHJhZ3VsYU9wdGlvbnMnO1xyXG5pbXBvcnQgeyBEcmFrZUZhY3RvcnkgfSBmcm9tICcuL0RyYWtlRmFjdG9yeSc7XHJcblxyXG5leHBvcnQgY29uc3QgTW9ja0RyYWtlRmFjdG9yeSA9IG5ldyBEcmFrZUZhY3RvcnkoKGNvbnRhaW5lcnMsIG9wdGlvbnMpID0+IHtcclxuICByZXR1cm4gbmV3IE1vY2tEcmFrZShjb250YWluZXJzLCBvcHRpb25zKTtcclxufSk7XHJcblxyXG4vKiogWW91IGNhbiB1c2UgTW9ja0RyYWtlIHRvIHNpbXVsYXRlIERyYWtlIGV2ZW50cy5cclxuICpcclxuICogVGhlIHRocmVlIG1ldGhvZHMgdGhhdCBhY3R1YWxseSBkbyBhbnl0aGluZyBhcmUgYG9uKGV2ZW50LCBsaXN0ZW5lcilgLFxyXG4gKiBgZGVzdHJveSgpYCwgYW5kIGEgbmV3IG1ldGhvZCwgYGVtaXQoKWAuIFVzZSBgZW1pdCgpYCB0byBtYW51YWxseSBlbWl0IERyYWtlXHJcbiAqIGV2ZW50cywgYW5kIGlmIHlvdSBpbmplY3RlZCBNb2NrRHJha2UgcHJvcGVybHkgd2l0aCBNb2NrRHJha2VGYWN0b3J5IG9yXHJcbiAqIG1vY2tlZCB0aGUgRHJhZ3VsYVNlcnZpY2UuZmluZCgpIG1ldGhvZCwgdGhlbiB5b3UgY2FuIG1ha2UgbmcyLWRyYWd1bGEgdGhpbmtcclxuICogZHJhZ3MgYW5kIGRyb3BzIGFyZSBoYXBwZW5pbmcuXHJcbiAqXHJcbiAqIENhdmVhdHM6XHJcbiAqXHJcbiAqIDEuIFlPVSBNVVNUIE1BS0UgVEhFIERPTSBDSEFOR0VTIFlPVVJTRUxGLlxyXG4gKiAyLiBSRVBFQVQ6IFlPVSBNVVNUIE1BS0UgVEhFIERPTSBDSEFOR0VTIFlPVVJTRUxGLlxyXG4gKiAgICBUaGF0IG1lYW5zIGBzb3VyY2UucmVtb3ZlQ2hpbGQoZWwpYCwgYW5kIGB0YXJnZXQuaW5zZXJ0QmVmb3JlKGVsKWAuXHJcbiAqIDMuIE5vbmUgb2YgdGhlIG90aGVyIG1ldGhvZHMgZG8gYW55dGhpbmcuXHJcbiAqICAgIFRoYXQncyBvaywgYmVjYXVzZSBuZzItZHJhZ3VsYSBkb2Vzbid0IHVzZSB0aGVtLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1vY2tEcmFrZSBpbXBsZW1lbnRzIERyYWtlV2l0aE1vZGVscyB7XHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIGNvbnRhaW5lcnMgQSBsaXN0IG9mIGNvbnRhaW5lciBlbGVtZW50cy5cclxuICAgKiBAcGFyYW0gb3B0aW9ucyBUaGVzZSB3aWxsIE5PVCBiZSB1c2VkLiBBdCBhbGwuXHJcbiAgICogQHBhcmFtIG1vZGVscyBOb25zdGFuZGFyZCwgYnV0IHVzZWZ1bCBmb3IgdGVzdGluZyB1c2luZyBgbmV3IE1vY2tEcmFrZSgpYCBkaXJlY3RseS5cclxuICAgKiAgICAgICAgICAgICAgIE5vdGUsIGRlZmF1bHQgdmFsdWUgaXMgdW5kZWZpbmVkLCBsaWtlIGEgcmVhbCBEcmFrZS4gRG9uJ3QgY2hhbmdlIHRoYXQuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgY29udGFpbmVyczogRWxlbWVudFtdID0gW10sXHJcbiAgICBwdWJsaWMgb3B0aW9uczogRHJhZ3VsYU9wdGlvbnMgPSB7fSxcclxuICAgIHB1YmxpYyBtb2RlbHM/OiBhbnlbXVtdXHJcbiAgKSB7fVxyXG5cclxuICAvKiBEb2Vzbid0IHJlcHJlc2VudCBhbnl0aGluZyBtZWFuaW5nZnVsLiAqL1xyXG4gIGRyYWdnaW5nOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qIERvZXMgbm90aGluZyB1c2VmdWwuICovXHJcbiAgc3RhcnQoaXRlbTogRWxlbWVudCk6IGFueSB7XHJcbiAgICB0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcclxuICB9XHJcbiAgLyogRG9lcyBub3RoaW5nIHVzZWZ1bC4gKi9cclxuICBlbmQoKTogYW55IHtcclxuICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcclxuICB9XHJcbiAgLyogRG9lcyBub3RoaW5nIHVzZWZ1bC4gKi9cclxuICBjYW5jZWwocmV2ZXJ0OiBib29sZWFuKTogYW55O1xyXG4gIGNhbmNlbCgpOiBhbnk7XHJcbiAgY2FuY2VsKHJldmVydD86IGFueSkge1xyXG4gICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xyXG4gIH1cclxuICAvKiBEb2VzIG5vdGhpbmcgdXNlZnVsLiAqL1xyXG4gIHJlbW92ZSgpOiBhbnkge1xyXG4gICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLy8gQmFzaWMgYnV0IGZ1bGx5IGZ1bmN0aW9uYWwgZXZlbnQgZW1pdHRlciBzaGltXHJcbiAgcHJpdmF0ZSBlbWl0dGVyJCA9IG5ldyBTdWJqZWN0PHsgZXZlbnRUeXBlOiBFdmVudFR5cGVzLCBhcmdzOiBhbnlbXSB9PigpO1xyXG5cclxuICBwcml2YXRlIHN1YnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XHJcblxyXG4gIG9uKGV2ZW50OiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbik6IGFueSB7XHJcbiAgICB0aGlzLnN1YnMuYWRkKHRoaXMuZW1pdHRlciRcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgZmlsdGVyKCh7IGV2ZW50VHlwZSB9KSA9PiBldmVudFR5cGUgPT09IGV2ZW50KVxyXG4gICAgICApXHJcbiAgICAgIC5zdWJzY3JpYmUoKHsgYXJncyB9KSA9PiB7XHJcbiAgICAgICAgY2FsbGJhY2soLi4uYXJncyk7XHJcbiAgICAgIH0pKTtcclxuICB9XHJcblxyXG4gIGRlc3Ryb3koKTogYW55IHtcclxuICAgIHRoaXMuc3Vicy51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBpcyB0aGUgbW9zdCB1c2VmdWwgbWV0aG9kLiBZb3UgY2FuIHVzZSBpdCB0byBtYW51YWxseSBmaXJlIGV2ZW50cyB0aGF0IHdvdWxkIG5vcm1hbGx5XHJcbiAgICogYmUgZmlyZWQgYnkgYSByZWFsIGRyYWtlLlxyXG4gICAqXHJcbiAgICogWW91J3JlIGxpa2VseSBtb3N0IGludGVyZXN0ZWQgaW4gZmlyaW5nIGBkcmFnYCwgYHJlbW92ZWAgYW5kIGBkcm9wYCwgdGhlIHRocmVlIGV2ZW50c1xyXG4gICAqIERyYWd1bGFTZXJ2aWNlIHVzZXMgdG8gaW1wbGVtZW50IFtkcmFndWxhTW9kZWxdLlxyXG4gICAqXHJcbiAgICogU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9iZXZhY3F1YS9kcmFndWxhI2RyYWtlb24tZXZlbnRzIGZvciB3aGF0IHlvdSBzaG91bGQgZW1pdCAoYW5kIGluIHdoYXQgb3JkZXIpLlxyXG4gICAqXHJcbiAgICogKE5vdGUgYWxzbywgZmlyaW5nIGRyb3BNb2RlbCBhbmQgcmVtb3ZlTW9kZWwgd29uJ3Qgd29yay4gWW91IHdvdWxkIGhhdmUgdG8gbW9jayBEcmFndWxhU2VydmljZSBmb3IgdGhhdC4pXHJcbiAgICovXHJcbiAgZW1pdChldmVudFR5cGU6IEV2ZW50VHlwZXMsIC4uLmFyZ3M6IGFueVtdKSB7XHJcbiAgICB0aGlzLmVtaXR0ZXIkLm5leHQoeyBldmVudFR5cGUsIGFyZ3MgfSlcclxuICB9XHJcblxyXG59XHJcbiJdfQ==