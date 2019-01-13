/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Subject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DrakeFactory } from './DrakeFactory';
/** @type {?} */
export var MockDrakeFactory = new DrakeFactory(function (containers, options) {
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
var /**
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
MockDrake = /** @class */ (function () {
    /**
     * @param containers A list of container elements.
     * @param options These will NOT be used. At all.
     * @param models Nonstandard, but useful for testing using `new MockDrake()` directly.
     *               Note, default value is undefined, like a real Drake. Don't change that.
     */
    function MockDrake(containers, options, models) {
        if (containers === void 0) { containers = []; }
        if (options === void 0) { options = {}; }
        this.containers = containers;
        this.options = options;
        this.models = models;
        /* Doesn't represent anything meaningful. */
        this.dragging = false;
        this.emitter$ = new Subject();
        this.subs = new Subscription();
    }
    /* Does nothing useful. */
    /**
     * @param {?} item
     * @return {?}
     */
    MockDrake.prototype.start = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.dragging = true;
    };
    /* Does nothing useful. */
    /**
     * @return {?}
     */
    MockDrake.prototype.end = /**
     * @return {?}
     */
    function () {
        this.dragging = false;
    };
    /**
     * @param {?=} revert
     * @return {?}
     */
    MockDrake.prototype.cancel = /**
     * @param {?=} revert
     * @return {?}
     */
    function (revert) {
        this.dragging = false;
    };
    /* Does nothing useful. */
    /**
     * @return {?}
     */
    MockDrake.prototype.remove = /**
     * @return {?}
     */
    function () {
        this.dragging = false;
    };
    /**
     * @param {?} event
     * @param {?} callback
     * @return {?}
     */
    MockDrake.prototype.on = /**
     * @param {?} event
     * @param {?} callback
     * @return {?}
     */
    function (event, callback) {
        this.subs.add(this.emitter$
            .pipe(filter(function (_a) {
            var eventType = _a.eventType;
            return eventType === event;
        }))
            .subscribe(function (_a) {
            var args = _a.args;
            callback.apply(void 0, tslib_1.__spread(args));
        }));
    };
    /**
     * @return {?}
     */
    MockDrake.prototype.destroy = /**
     * @return {?}
     */
    function () {
        this.subs.unsubscribe();
    };
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
     */
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
    MockDrake.prototype.emit = /**
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
    function (eventType) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.emitter$.next({ eventType: eventType, args: args });
    };
    return MockDrake;
}());
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
export { MockDrake };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9ja0RyYWtlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLWRyYWd1bGEvIiwic291cmNlcyI6WyJNb2NrRHJha2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUU3QyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHeEMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQUU5QyxXQUFhLGdCQUFnQixHQUFHLElBQUksWUFBWSxDQUFDLFVBQUMsVUFBVSxFQUFFLE9BQU87SUFDbkUsT0FBTyxJQUFJLFNBQVMsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7Q0FDM0MsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQkg7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFDRTs7Ozs7T0FLRztJQUNILG1CQUNTLFlBQ0EsU0FDQTs7O1FBRkEsZUFBVSxHQUFWLFVBQVU7UUFDVixZQUFPLEdBQVAsT0FBTztRQUNQLFdBQU0sR0FBTixNQUFNOzt3QkFJSyxLQUFLO3dCQXNCTixJQUFJLE9BQU8sRUFBMEM7b0JBRXpELElBQUksWUFBWSxFQUFFO0tBM0I3QjtJQUtKLDBCQUEwQjs7Ozs7SUFDMUIseUJBQUs7Ozs7SUFBTCxVQUFNLElBQWE7UUFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7S0FDdEI7SUFDRCwwQkFBMEI7Ozs7SUFDMUIsdUJBQUc7OztJQUFIO1FBQ0UsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7S0FDdkI7Ozs7O0lBSUQsMEJBQU07Ozs7SUFBTixVQUFPLE1BQVk7UUFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7S0FDdkI7SUFDRCwwQkFBMEI7Ozs7SUFDMUIsMEJBQU07OztJQUFOO1FBQ0UsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7S0FDdkI7Ozs7OztJQU9ELHNCQUFFOzs7OztJQUFGLFVBQUcsS0FBYSxFQUFFLFFBQWtCO1FBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRO2FBQ3hCLElBQUksQ0FDSCxNQUFNLENBQUMsVUFBQyxFQUFhO2dCQUFYLHdCQUFTO1lBQU8sT0FBQSxTQUFTLEtBQUssS0FBSztRQUFuQixDQUFtQixDQUFDLENBQy9DO2FBQ0EsU0FBUyxDQUFDLFVBQUMsRUFBUTtnQkFBTixjQUFJO1lBQ2hCLFFBQVEsZ0NBQUksSUFBSSxHQUFFO1NBQ25CLENBQUMsQ0FBQyxDQUFDO0tBQ1A7Ozs7SUFFRCwyQkFBTzs7O0lBQVA7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3pCO0lBRUQ7Ozs7Ozs7Ozs7T0FVRzs7Ozs7Ozs7Ozs7Ozs7O0lBQ0gsd0JBQUk7Ozs7Ozs7Ozs7Ozs7O0lBQUosVUFBSyxTQUFxQjtRQUFFLGNBQWM7YUFBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJQUFjO1lBQWQsNkJBQWM7O1FBQ3hDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBUyxXQUFBLEVBQUUsSUFBSSxNQUFBLEVBQUUsQ0FBQyxDQUFBO0tBQ3hDO29CQTlGSDtJQWdHQyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFyRUQscUJBcUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IERyYWtlV2l0aE1vZGVscyB9IGZyb20gJy4vRHJha2VXaXRoTW9kZWxzJztcclxuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBFdmVudFR5cGVzIH0gZnJvbSAnLi9FdmVudFR5cGVzJztcclxuaW1wb3J0IHsgRHJhZ3VsYU9wdGlvbnMgfSBmcm9tICcuL0RyYWd1bGFPcHRpb25zJztcclxuaW1wb3J0IHsgRHJha2VGYWN0b3J5IH0gZnJvbSAnLi9EcmFrZUZhY3RvcnknO1xyXG5cclxuZXhwb3J0IGNvbnN0IE1vY2tEcmFrZUZhY3RvcnkgPSBuZXcgRHJha2VGYWN0b3J5KChjb250YWluZXJzLCBvcHRpb25zKSA9PiB7XHJcbiAgcmV0dXJuIG5ldyBNb2NrRHJha2UoY29udGFpbmVycywgb3B0aW9ucyk7XHJcbn0pO1xyXG5cclxuLyoqIFlvdSBjYW4gdXNlIE1vY2tEcmFrZSB0byBzaW11bGF0ZSBEcmFrZSBldmVudHMuXHJcbiAqXHJcbiAqIFRoZSB0aHJlZSBtZXRob2RzIHRoYXQgYWN0dWFsbHkgZG8gYW55dGhpbmcgYXJlIGBvbihldmVudCwgbGlzdGVuZXIpYCxcclxuICogYGRlc3Ryb3koKWAsIGFuZCBhIG5ldyBtZXRob2QsIGBlbWl0KClgLiBVc2UgYGVtaXQoKWAgdG8gbWFudWFsbHkgZW1pdCBEcmFrZVxyXG4gKiBldmVudHMsIGFuZCBpZiB5b3UgaW5qZWN0ZWQgTW9ja0RyYWtlIHByb3Blcmx5IHdpdGggTW9ja0RyYWtlRmFjdG9yeSBvclxyXG4gKiBtb2NrZWQgdGhlIERyYWd1bGFTZXJ2aWNlLmZpbmQoKSBtZXRob2QsIHRoZW4geW91IGNhbiBtYWtlIG5nMi1kcmFndWxhIHRoaW5rXHJcbiAqIGRyYWdzIGFuZCBkcm9wcyBhcmUgaGFwcGVuaW5nLlxyXG4gKlxyXG4gKiBDYXZlYXRzOlxyXG4gKlxyXG4gKiAxLiBZT1UgTVVTVCBNQUtFIFRIRSBET00gQ0hBTkdFUyBZT1VSU0VMRi5cclxuICogMi4gUkVQRUFUOiBZT1UgTVVTVCBNQUtFIFRIRSBET00gQ0hBTkdFUyBZT1VSU0VMRi5cclxuICogICAgVGhhdCBtZWFucyBgc291cmNlLnJlbW92ZUNoaWxkKGVsKWAsIGFuZCBgdGFyZ2V0Lmluc2VydEJlZm9yZShlbClgLlxyXG4gKiAzLiBOb25lIG9mIHRoZSBvdGhlciBtZXRob2RzIGRvIGFueXRoaW5nLlxyXG4gKiAgICBUaGF0J3Mgb2ssIGJlY2F1c2UgbmcyLWRyYWd1bGEgZG9lc24ndCB1c2UgdGhlbS5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBNb2NrRHJha2UgaW1wbGVtZW50cyBEcmFrZVdpdGhNb2RlbHMge1xyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBjb250YWluZXJzIEEgbGlzdCBvZiBjb250YWluZXIgZWxlbWVudHMuXHJcbiAgICogQHBhcmFtIG9wdGlvbnMgVGhlc2Ugd2lsbCBOT1QgYmUgdXNlZC4gQXQgYWxsLlxyXG4gICAqIEBwYXJhbSBtb2RlbHMgTm9uc3RhbmRhcmQsIGJ1dCB1c2VmdWwgZm9yIHRlc3RpbmcgdXNpbmcgYG5ldyBNb2NrRHJha2UoKWAgZGlyZWN0bHkuXHJcbiAgICogICAgICAgICAgICAgICBOb3RlLCBkZWZhdWx0IHZhbHVlIGlzIHVuZGVmaW5lZCwgbGlrZSBhIHJlYWwgRHJha2UuIERvbid0IGNoYW5nZSB0aGF0LlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIGNvbnRhaW5lcnM6IEVsZW1lbnRbXSA9IFtdLFxyXG4gICAgcHVibGljIG9wdGlvbnM6IERyYWd1bGFPcHRpb25zID0ge30sXHJcbiAgICBwdWJsaWMgbW9kZWxzPzogYW55W11bXVxyXG4gICkge31cclxuXHJcbiAgLyogRG9lc24ndCByZXByZXNlbnQgYW55dGhpbmcgbWVhbmluZ2Z1bC4gKi9cclxuICBkcmFnZ2luZzogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAvKiBEb2VzIG5vdGhpbmcgdXNlZnVsLiAqL1xyXG4gIHN0YXJ0KGl0ZW06IEVsZW1lbnQpOiBhbnkge1xyXG4gICAgdGhpcy5kcmFnZ2luZyA9IHRydWU7XHJcbiAgfVxyXG4gIC8qIERvZXMgbm90aGluZyB1c2VmdWwuICovXHJcbiAgZW5kKCk6IGFueSB7XHJcbiAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XHJcbiAgfVxyXG4gIC8qIERvZXMgbm90aGluZyB1c2VmdWwuICovXHJcbiAgY2FuY2VsKHJldmVydDogYm9vbGVhbik6IGFueTtcclxuICBjYW5jZWwoKTogYW55O1xyXG4gIGNhbmNlbChyZXZlcnQ/OiBhbnkpIHtcclxuICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcclxuICB9XHJcbiAgLyogRG9lcyBub3RoaW5nIHVzZWZ1bC4gKi9cclxuICByZW1vdmUoKTogYW55IHtcclxuICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIC8vIEJhc2ljIGJ1dCBmdWxseSBmdW5jdGlvbmFsIGV2ZW50IGVtaXR0ZXIgc2hpbVxyXG4gIHByaXZhdGUgZW1pdHRlciQgPSBuZXcgU3ViamVjdDx7IGV2ZW50VHlwZTogRXZlbnRUeXBlcywgYXJnczogYW55W10gfT4oKTtcclxuXHJcbiAgcHJpdmF0ZSBzdWJzID0gbmV3IFN1YnNjcmlwdGlvbigpO1xyXG5cclxuICBvbihldmVudDogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pOiBhbnkge1xyXG4gICAgdGhpcy5zdWJzLmFkZCh0aGlzLmVtaXR0ZXIkXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIGZpbHRlcigoeyBldmVudFR5cGUgfSkgPT4gZXZlbnRUeXBlID09PSBldmVudClcclxuICAgICAgKVxyXG4gICAgICAuc3Vic2NyaWJlKCh7IGFyZ3MgfSkgPT4ge1xyXG4gICAgICAgIGNhbGxiYWNrKC4uLmFyZ3MpO1xyXG4gICAgICB9KSk7XHJcbiAgfVxyXG5cclxuICBkZXN0cm95KCk6IGFueSB7XHJcbiAgICB0aGlzLnN1YnMudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgaXMgdGhlIG1vc3QgdXNlZnVsIG1ldGhvZC4gWW91IGNhbiB1c2UgaXQgdG8gbWFudWFsbHkgZmlyZSBldmVudHMgdGhhdCB3b3VsZCBub3JtYWxseVxyXG4gICAqIGJlIGZpcmVkIGJ5IGEgcmVhbCBkcmFrZS5cclxuICAgKlxyXG4gICAqIFlvdSdyZSBsaWtlbHkgbW9zdCBpbnRlcmVzdGVkIGluIGZpcmluZyBgZHJhZ2AsIGByZW1vdmVgIGFuZCBgZHJvcGAsIHRoZSB0aHJlZSBldmVudHNcclxuICAgKiBEcmFndWxhU2VydmljZSB1c2VzIHRvIGltcGxlbWVudCBbZHJhZ3VsYU1vZGVsXS5cclxuICAgKlxyXG4gICAqIFNlZSBodHRwczovL2dpdGh1Yi5jb20vYmV2YWNxdWEvZHJhZ3VsYSNkcmFrZW9uLWV2ZW50cyBmb3Igd2hhdCB5b3Ugc2hvdWxkIGVtaXQgKGFuZCBpbiB3aGF0IG9yZGVyKS5cclxuICAgKlxyXG4gICAqIChOb3RlIGFsc28sIGZpcmluZyBkcm9wTW9kZWwgYW5kIHJlbW92ZU1vZGVsIHdvbid0IHdvcmsuIFlvdSB3b3VsZCBoYXZlIHRvIG1vY2sgRHJhZ3VsYVNlcnZpY2UgZm9yIHRoYXQuKVxyXG4gICAqL1xyXG4gIGVtaXQoZXZlbnRUeXBlOiBFdmVudFR5cGVzLCAuLi5hcmdzOiBhbnlbXSkge1xyXG4gICAgdGhpcy5lbWl0dGVyJC5uZXh0KHsgZXZlbnRUeXBlLCBhcmdzIH0pXHJcbiAgfVxyXG5cclxufVxyXG4iXX0=