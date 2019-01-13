import * as dragulaExpt from 'dragula';
import dragulaExpt__default, {  } from 'dragula';
import { __spread, __read } from 'tslib';
import { Injectable, Optional, Directive, Input, Output, ElementRef, EventEmitter, NgModule } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Group = /** @class */ (function () {
    function Group(name, drake, options) {
        this.name = name;
        this.drake = drake;
        this.options = options;
        this.initEvents = false;
    }
    return Group;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {string} */
var EventTypes = {
    Cancel: "cancel",
    Cloned: "cloned",
    Drag: "drag",
    DragEnd: "dragend",
    Drop: "drop",
    Out: "out",
    Over: "over",
    Remove: "remove",
    Shadow: "shadow",
    DropModel: "dropModel",
    RemoveModel: "removeModel",
};
/** @type {?} */
var AllEvents = Object.keys(EventTypes).map(function (k) { return (EventTypes[/** @type {?} */ (k)]); });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @type {?} */
var dragula = dragulaExpt__default || dragulaExpt;
var DrakeFactory = /** @class */ (function () {
    function DrakeFactory(build) {
        if (build === void 0) { build = dragula; }
        this.build = build;
    }
    return DrakeFactory;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @type {?} */
var filterEvent = function (eventType, filterDragType, projector) { return function (input) {
    return input.pipe(filter(function (_a) {
        var event = _a.event, name = _a.name;
        return event === eventType
            && (filterDragType === undefined || name === filterDragType);
    }), map(function (_a) {
        var name = _a.name, args = _a.args;
        return projector(name, args);
    }));
}; };
/** @type {?} */
var elContainerSourceProjector = function (name, _a) {
    var _b = __read(_a, 3), el = _b[0], container = _b[1], source = _b[2];
    return ({ name: name, el: el, container: container, source: source });
};
var DragulaService = /** @class */ (function () {
    function DragulaService(drakeFactory) {
        if (drakeFactory === void 0) { drakeFactory = null; }
        var _this = this;
        this.drakeFactory = drakeFactory;
        this.dispatch$ = new Subject();
        this.drag = function (groupName) { return _this.dispatch$.pipe(filterEvent(EventTypes.Drag, groupName, function (name, _a) {
            var _b = __read(_a, 2), el = _b[0], source = _b[1];
            return ({ name: name, el: el, source: source });
        })); };
        this.dragend = function (groupName) { return _this.dispatch$.pipe(filterEvent(EventTypes.DragEnd, groupName, function (name, _a) {
            var _b = __read(_a, 1), el = _b[0];
            return ({ name: name, el: el });
        })); };
        this.drop = function (groupName) { return _this.dispatch$.pipe(filterEvent(EventTypes.Drop, groupName, function (name, _a) {
            var _b = __read(_a, 4), el = _b[0], target = _b[1], source = _b[2], sibling = _b[3];
            return { name: name, el: el, target: target, source: source, sibling: sibling };
        })); };
        this.elContainerSource = function (eventType) {
            return function (groupName) {
                return _this.dispatch$.pipe(filterEvent(eventType, groupName, elContainerSourceProjector));
            };
        };
        this.cancel = this.elContainerSource(EventTypes.Cancel);
        this.remove = this.elContainerSource(EventTypes.Remove);
        this.shadow = this.elContainerSource(EventTypes.Shadow);
        this.over = this.elContainerSource(EventTypes.Over);
        this.out = this.elContainerSource(EventTypes.Out);
        this.cloned = function (groupName) { return _this.dispatch$.pipe(filterEvent(EventTypes.Cloned, groupName, function (name, _a) {
            var _b = __read(_a, 3), clone = _b[0], original = _b[1], cloneType = _b[2];
            return { name: name, clone: clone, original: original, cloneType: cloneType };
        })); };
        this.dropModel = function (groupName) { return _this.dispatch$.pipe(filterEvent(EventTypes.DropModel, groupName, function (name, _a) {
            var _b = __read(_a, 9), el = _b[0], target = _b[1], source = _b[2], sibling = _b[3], item = _b[4], sourceModel = _b[5], targetModel = _b[6], sourceIndex = _b[7], targetIndex = _b[8];
            return { name: name, el: el, target: target, source: source, sibling: sibling, item: item, sourceModel: sourceModel, targetModel: targetModel, sourceIndex: sourceIndex, targetIndex: targetIndex };
        })); };
        this.removeModel = function (groupName) { return _this.dispatch$.pipe(filterEvent(EventTypes.RemoveModel, groupName, function (name, _a) {
            var _b = __read(_a, 6), el = _b[0], container = _b[1], source = _b[2], item = _b[3], sourceModel = _b[4], sourceIndex = _b[5];
            return { name: name, el: el, container: container, source: source, item: item, sourceModel: sourceModel, sourceIndex: sourceIndex };
        })); };
        this.groups = {};
        if (this.drakeFactory === null) {
            this.drakeFactory = new DrakeFactory();
        }
    }
    /**
     * Public mainly for testing purposes. Prefer `createGroup()`.
     * @param {?} group
     * @return {?}
     */
    DragulaService.prototype.add = /**
     * Public mainly for testing purposes. Prefer `createGroup()`.
     * @param {?} group
     * @return {?}
     */
    function (group) {
        /** @type {?} */
        var existingGroup = this.find(group.name);
        if (existingGroup) {
            throw new Error('Group named: "' + group.name + '" already exists.');
        }
        this.groups[group.name] = group;
        this.handleModels(group);
        this.setupEvents(group);
        return group;
    };
    /**
     * @param {?} name
     * @return {?}
     */
    DragulaService.prototype.find = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        return this.groups[name];
    };
    /**
     * @param {?} name
     * @return {?}
     */
    DragulaService.prototype.destroy = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        /** @type {?} */
        var group = this.find(name);
        if (!group) {
            return;
        }
        group.drake && group.drake.destroy();
        delete this.groups[name];
    };
    /**
     * Creates a group with the specified name and options.
     *
     * Note: formerly known as `setOptions`
     * @template T
     * @param {?} name
     * @param {?} options
     * @return {?}
     */
    DragulaService.prototype.createGroup = /**
     * Creates a group with the specified name and options.
     *
     * Note: formerly known as `setOptions`
     * @template T
     * @param {?} name
     * @param {?} options
     * @return {?}
     */
    function (name, options) {
        return this.add(new Group(name, this.drakeFactory.build([], options), options));
    };
    /**
     * @param {?} __0
     * @return {?}
     */
    DragulaService.prototype.handleModels = /**
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var _this = this;
        var name = _a.name, drake = _a.drake, options = _a.options;
        /** @type {?} */
        var dragElm;
        /** @type {?} */
        var dragIndex;
        /** @type {?} */
        var dropIndex;
        drake.on('remove', function (el, container, source) {
            if (!drake.models) {
                return;
            }
            /** @type {?} */
            var sourceModel = drake.models[drake.containers.indexOf(source)];
            sourceModel = sourceModel.slice(0);
            /** @type {?} */
            var item = sourceModel.splice(dragIndex, 1)[0];
            // console.log('REMOVE');
            // console.log(sourceModel);
            // console.log('REMOVE');
            // console.log(sourceModel);
            _this.dispatch$.next({
                event: EventTypes.RemoveModel,
                name: name,
                args: [el, container, source, item, sourceModel, dragIndex]
            });
        });
        drake.on('drag', function (el, source) {
            if (!drake.models) {
                return;
            }
            dragElm = el;
            dragIndex = _this.domIndexOf(el, source);
        });
        drake.on('drop', function (dropElm, target, source, sibling) {
            if (!drake.models || !target) {
                return;
            }
            dropIndex = _this.domIndexOf(dropElm, target);
            /** @type {?} */
            var sourceModel = drake.models[drake.containers.indexOf(source)];
            /** @type {?} */
            var targetModel = drake.models[drake.containers.indexOf(target)];
            /** @type {?} */
            var item;
            if (target === source) {
                sourceModel = sourceModel.slice(0);
                item = sourceModel.splice(dragIndex, 1)[0];
                sourceModel.splice(dropIndex, 0, item);
                // this was true before we cloned and updated sourceModel,
                // but targetModel still has the old value
                targetModel = sourceModel;
            }
            else {
                /** @type {?} */
                var isCopying = dragElm !== dropElm;
                item = sourceModel[dragIndex];
                if (isCopying) {
                    if (!options.copyItem) {
                        throw new Error("If you have enabled `copy` on a group, you must provide a `copyItem` function.");
                    }
                    item = options.copyItem(item);
                }
                if (!isCopying) {
                    sourceModel = sourceModel.slice(0);
                    sourceModel.splice(dragIndex, 1);
                }
                targetModel = targetModel.slice(0);
                targetModel.splice(dropIndex, 0, item);
                if (isCopying) {
                    try {
                        target.removeChild(dropElm);
                    }
                    catch (e) { }
                }
            }
            _this.dispatch$.next({
                event: EventTypes.DropModel,
                name: name,
                args: [dropElm, target, source, sibling, item, sourceModel, targetModel, dragIndex, dropIndex]
            });
        });
    };
    /**
     * @param {?} group
     * @return {?}
     */
    DragulaService.prototype.setupEvents = /**
     * @param {?} group
     * @return {?}
     */
    function (group) {
        var _this = this;
        if (group.initEvents) {
            return;
        }
        group.initEvents = true;
        /** @type {?} */
        var name = group.name;
        /** @type {?} */
        var emitter = function (event) {
            group.drake.on(event, function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                _this.dispatch$.next({ event: event, name: name, args: args });
            });
        };
        AllEvents.forEach(emitter);
    };
    /**
     * @param {?} child
     * @param {?} parent
     * @return {?}
     */
    DragulaService.prototype.domIndexOf = /**
     * @param {?} child
     * @param {?} parent
     * @return {?}
     */
    function (child, parent) {
        return Array.prototype.indexOf.call(parent.children, child);
    };
    DragulaService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    DragulaService.ctorParameters = function () { return [
        { type: DrakeFactory, decorators: [{ type: Optional }] }
    ]; };
    return DragulaService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DragulaDirective = /** @class */ (function () {
    function DragulaDirective(el, dragulaService) {
        this.el = el;
        this.dragulaService = dragulaService;
        this.dragulaModelChange = new EventEmitter();
    }
    Object.defineProperty(DragulaDirective.prototype, "container", {
        get: /**
         * @return {?}
         */
        function () {
            return this.el && this.el.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} changes
     * @return {?}
     */
    DragulaDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes && changes.dragula) {
            var _a = changes.dragula, prev = _a.previousValue, current = _a.currentValue, firstChange = _a.firstChange;
            /** @type {?} */
            var hadPreviousValue = !!prev;
            /** @type {?} */
            var hasNewValue = !!current;
            // something -> null       =>  teardown only
            // something -> something  =>  teardown, then setup
            //      null -> something  =>  setup only
            //
            //      null -> null (precluded by fact of change being present)
            if (hadPreviousValue) {
                this.teardown(prev);
            }
            if (hasNewValue) {
                this.setup();
            }
        }
        else if (changes && changes.dragulaModel) {
            var _b = changes.dragulaModel, prev = _b.previousValue, current = _b.currentValue, firstChange = _b.firstChange;
            var drake = this.group.drake;
            if (this.dragula && drake) {
                drake.models = drake.models || [];
                /** @type {?} */
                var prevIndex = drake.models.indexOf(prev);
                if (prevIndex !== -1) {
                    // delete the previous
                    drake.models.splice(prevIndex, 1);
                    // maybe insert a new one at the same spot
                    if (!!current) {
                        drake.models.splice(prevIndex, 0, current);
                    }
                }
                else if (!!current) {
                    // no previous one to remove; just push this one.
                    drake.models.push(current);
                }
            }
        }
    };
    /**
     * @return {?}
     */
    DragulaDirective.prototype.setup = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var checkModel = function (group) {
            if (_this.dragulaModel) {
                if (group.drake.models) {
                    group.drake.models.push(_this.dragulaModel);
                }
                else {
                    group.drake.models = [_this.dragulaModel];
                }
            }
        };
        /** @type {?} */
        var group = this.dragulaService.find(this.dragula);
        if (!group) {
            /** @type {?} */
            var options = {};
            group = this.dragulaService.createGroup(this.dragula, options);
        }
        // ensure model and container element are pushed
        checkModel(group);
        group.drake.containers.push(this.container);
        this.subscribe(this.dragula);
        this.group = group;
    };
    /**
     * @param {?} name
     * @return {?}
     */
    DragulaDirective.prototype.subscribe = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        var _this = this;
        this.subs = new Subscription();
        this.subs.add(this.dragulaService
            .dropModel(name)
            .subscribe(function (_a) {
            var source = _a.source, target = _a.target, sourceModel = _a.sourceModel, targetModel = _a.targetModel;
            if (source === _this.el.nativeElement) {
                _this.dragulaModelChange.emit(sourceModel);
            }
            else if (target === _this.el.nativeElement) {
                _this.dragulaModelChange.emit(targetModel);
            }
        }));
        this.subs.add(this.dragulaService
            .removeModel(name)
            .subscribe(function (_a) {
            var source = _a.source, sourceModel = _a.sourceModel;
            if (source === _this.el.nativeElement) {
                _this.dragulaModelChange.emit(sourceModel);
            }
        }));
    };
    /**
     * @param {?} groupName
     * @return {?}
     */
    DragulaDirective.prototype.teardown = /**
     * @param {?} groupName
     * @return {?}
     */
    function (groupName) {
        if (this.subs) {
            this.subs.unsubscribe();
        }
        /** @type {?} */
        var group = this.dragulaService.find(groupName);
        if (group) {
            /** @type {?} */
            var itemToRemove = group.drake.containers.indexOf(this.el.nativeElement);
            if (itemToRemove !== -1) {
                group.drake.containers.splice(itemToRemove, 1);
            }
            if (this.dragulaModel && group.drake && group.drake.models) {
                /** @type {?} */
                var modelIndex = group.drake.models.indexOf(this.dragulaModel);
                if (modelIndex !== -1) {
                    group.drake.models.splice(modelIndex, 1);
                }
            }
        }
    };
    /**
     * @return {?}
     */
    DragulaDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.teardown(this.dragula);
    };
    DragulaDirective.decorators = [
        { type: Directive, args: [{ selector: '[dragula]' },] }
    ];
    /** @nocollapse */
    DragulaDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: DragulaService }
    ]; };
    DragulaDirective.propDecorators = {
        dragula: [{ type: Input }],
        dragulaModel: [{ type: Input }],
        dragulaModelChange: [{ type: Output }]
    };
    return DragulaDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DragulaModule = /** @class */ (function () {
    function DragulaModule() {
    }
    /**
     * @return {?}
     */
    DragulaModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: DragulaModule,
            providers: [DragulaService]
        };
    };
    DragulaModule.decorators = [
        { type: NgModule, args: [{
                    exports: [DragulaDirective],
                    declarations: [DragulaDirective],
                },] }
    ];
    return DragulaModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @type {?} */
var MockDrakeFactory = new DrakeFactory(function (containers, options) {
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
var  /**
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
            callback.apply(void 0, __spread(args));
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
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { DragulaDirective, DragulaService, DragulaModule, dragula, DrakeFactory, Group, EventTypes, MockDrake, MockDrakeFactory };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLWRyYWd1bGEuanMubWFwIiwic291cmNlcyI6WyJuZzovL25nMi1kcmFndWxhL0dyb3VwLnRzIiwibmc6Ly9uZzItZHJhZ3VsYS9FdmVudFR5cGVzLnRzIiwibmc6Ly9uZzItZHJhZ3VsYS9EcmFrZUZhY3RvcnkudHMiLCJuZzovL25nMi1kcmFndWxhL2NvbXBvbmVudHMvZHJhZ3VsYS5zZXJ2aWNlLnRzIiwibmc6Ly9uZzItZHJhZ3VsYS9jb21wb25lbnRzL2RyYWd1bGEuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZzItZHJhZ3VsYS9jb21wb25lbnRzL2RyYWd1bGEubW9kdWxlLnRzIiwibmc6Ly9uZzItZHJhZ3VsYS9Nb2NrRHJha2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRHJha2VXaXRoTW9kZWxzIH0gZnJvbSBcIi4vRHJha2VXaXRoTW9kZWxzXCI7XHJcbmltcG9ydCB7IERyYWd1bGFPcHRpb25zIH0gZnJvbSBcIi4vRHJhZ3VsYU9wdGlvbnNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBHcm91cCB7XHJcbiAgcHVibGljIGluaXRFdmVudHM6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcsXHJcbiAgICBwdWJsaWMgZHJha2U6IERyYWtlV2l0aE1vZGVscyxcclxuICAgIHB1YmxpYyBvcHRpb25zOiBEcmFndWxhT3B0aW9uc1xyXG4gICkge31cclxufVxyXG4iLCJleHBvcnQgZW51bSBFdmVudFR5cGVzIHtcclxuICAgIENhbmNlbCA9IFwiY2FuY2VsXCIsXHJcbiAgICBDbG9uZWQgPSBcImNsb25lZFwiLFxyXG4gICAgRHJhZyA9IFwiZHJhZ1wiLFxyXG4gICAgRHJhZ0VuZCA9IFwiZHJhZ2VuZFwiLFxyXG4gICAgRHJvcCA9IFwiZHJvcFwiLFxyXG4gICAgT3V0ID0gXCJvdXRcIixcclxuICAgIE92ZXIgPSBcIm92ZXJcIixcclxuICAgIFJlbW92ZSA9IFwicmVtb3ZlXCIsXHJcbiAgICBTaGFkb3cgPSBcInNoYWRvd1wiLFxyXG4gICAgRHJvcE1vZGVsID0gXCJkcm9wTW9kZWxcIixcclxuICAgIFJlbW92ZU1vZGVsID0gXCJyZW1vdmVNb2RlbFwiLFxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgQWxsRXZlbnRzOiBFdmVudFR5cGVzW10gPSBPYmplY3Qua2V5cyhFdmVudFR5cGVzKS5tYXAoayA9PiBFdmVudFR5cGVzW2sgYXMgYW55XSBhcyBFdmVudFR5cGVzKTtcclxuXHJcblxyXG4iLCJpbXBvcnQgeyBEcmFndWxhT3B0aW9ucyB9IGZyb20gJy4vRHJhZ3VsYU9wdGlvbnMnO1xyXG5pbXBvcnQgeyBEcmFrZVdpdGhNb2RlbHMgfSBmcm9tICcuL0RyYWtlV2l0aE1vZGVscyc7XHJcbmltcG9ydCAqIGFzIGRyYWd1bGFFeHB0IGZyb20gJ2RyYWd1bGEnO1xyXG5leHBvcnQgY29uc3QgZHJhZ3VsYTogKGNvbnRhaW5lcnM/OiBhbnksIG9wdGlvbnM/OiBhbnkpID0+IGFueSA9IChkcmFndWxhRXhwdCBhcyBhbnkpLmRlZmF1bHQgfHwgZHJhZ3VsYUV4cHQ7XHJcblxyXG5leHBvcnQgdHlwZSBEcmFrZUJ1aWxkZXIgPSAoY29udGFpbmVyczogYW55W10sIG9wdGlvbnM6IERyYWd1bGFPcHRpb25zKSA9PiBEcmFrZVdpdGhNb2RlbHM7XHJcblxyXG5leHBvcnQgY2xhc3MgRHJha2VGYWN0b3J5IHtcclxuICBjb25zdHJ1Y3RvciAocHVibGljIGJ1aWxkOiBEcmFrZUJ1aWxkZXIgPSBkcmFndWxhKSB7fVxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uL0dyb3VwJztcclxuaW1wb3J0IHsgRHJhZ3VsYU9wdGlvbnMgfSBmcm9tICcuLi9EcmFndWxhT3B0aW9ucyc7XHJcbmltcG9ydCB7IFN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZmlsdGVyLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IEV2ZW50VHlwZXMsIEFsbEV2ZW50cyB9IGZyb20gJy4uL0V2ZW50VHlwZXMnO1xyXG5pbXBvcnQgeyBEcmFrZUZhY3RvcnkgfSBmcm9tICcuLi9EcmFrZUZhY3RvcnknO1xyXG5cclxudHlwZSBGaWx0ZXJQcm9qZWN0b3I8VCBleHRlbmRzIHsgbmFtZTogc3RyaW5nOyB9PiA9IChuYW1lOiBzdHJpbmcsIGFyZ3M6IGFueVtdKSA9PiBUO1xyXG50eXBlIERpc3BhdGNoID0geyBldmVudDogRXZlbnRUeXBlczsgbmFtZTogc3RyaW5nOyBhcmdzOiBhbnlbXTsgfTtcclxuXHJcbmNvbnN0IGZpbHRlckV2ZW50ID0gPFQgZXh0ZW5kcyB7IG5hbWU6IHN0cmluZzsgfT4oXHJcbiAgZXZlbnRUeXBlOiBFdmVudFR5cGVzLFxyXG4gIGZpbHRlckRyYWdUeXBlOiBzdHJpbmcgfCB1bmRlZmluZWQsXHJcbiAgcHJvamVjdG9yOiBGaWx0ZXJQcm9qZWN0b3I8VD5cclxuKSA9PiAoaW5wdXQ6IE9ic2VydmFibGU8RGlzcGF0Y2g+KTogT2JzZXJ2YWJsZTxUPiA9PiB7XHJcbiAgcmV0dXJuIGlucHV0LnBpcGUoXHJcbiAgICBmaWx0ZXIoKHsgZXZlbnQsIG5hbWUgfSkgPT4ge1xyXG4gICAgICByZXR1cm4gZXZlbnQgPT09IGV2ZW50VHlwZVxyXG4gICAgICAgICAgJiYgKGZpbHRlckRyYWdUeXBlID09PSB1bmRlZmluZWQgfHwgbmFtZSA9PT0gZmlsdGVyRHJhZ1R5cGUpO1xyXG4gICAgfSksXHJcbiAgICBtYXAoKHsgbmFtZSwgYXJncyB9KSA9PiBwcm9qZWN0b3IobmFtZSwgYXJncykpXHJcbiAgKTtcclxufVxyXG5cclxuY29uc3QgZWxDb250YWluZXJTb3VyY2VQcm9qZWN0b3IgPVxyXG4gIChuYW1lOiBzdHJpbmcsIFtlbCwgY29udGFpbmVyLCBzb3VyY2VdOiBbRWxlbWVudCwgRWxlbWVudCwgRWxlbWVudF0pID0+XHJcbiAgICAoeyBuYW1lLCBlbCwgY29udGFpbmVyLCBzb3VyY2UgfSk7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBEcmFndWxhU2VydmljZSB7XHJcblxyXG4gIC8qIGh0dHBzOi8vZ2l0aHViLmNvbS9iZXZhY3F1YS9kcmFndWxhI2RyYWtlb24tZXZlbnRzICovXHJcblxyXG4gIHByaXZhdGUgZGlzcGF0Y2gkID0gbmV3IFN1YmplY3Q8RGlzcGF0Y2g+KCk7XHJcblxyXG4gIHB1YmxpYyBkcmFnID0gKGdyb3VwTmFtZT86IHN0cmluZykgPT4gdGhpcy5kaXNwYXRjaCQucGlwZShcclxuICAgIGZpbHRlckV2ZW50KFxyXG4gICAgICBFdmVudFR5cGVzLkRyYWcsXHJcbiAgICAgIGdyb3VwTmFtZSxcclxuICAgICAgKG5hbWUsIFtlbCwgc291cmNlXTogW0VsZW1lbnQsIEVsZW1lbnRdKSA9PiAoeyBuYW1lLCBlbCwgc291cmNlIH0pXHJcbiAgICApXHJcbiAgKTtcclxuXHJcbiAgcHVibGljIGRyYWdlbmQgPSAoZ3JvdXBOYW1lPzogc3RyaW5nKSA9PiB0aGlzLmRpc3BhdGNoJC5waXBlKFxyXG4gICAgZmlsdGVyRXZlbnQoXHJcbiAgICAgIEV2ZW50VHlwZXMuRHJhZ0VuZCxcclxuICAgICAgZ3JvdXBOYW1lLFxyXG4gICAgICAobmFtZSwgW2VsXTogW0VsZW1lbnRdKSA9PiAoeyBuYW1lLCBlbCB9KVxyXG4gICAgKVxyXG4gICk7XHJcblxyXG4gIHB1YmxpYyBkcm9wID0gKGdyb3VwTmFtZT86IHN0cmluZykgPT4gdGhpcy5kaXNwYXRjaCQucGlwZShcclxuICAgIGZpbHRlckV2ZW50KFxyXG4gICAgICBFdmVudFR5cGVzLkRyb3AsXHJcbiAgICAgIGdyb3VwTmFtZSxcclxuICAgICAgKG5hbWUsIFtcclxuICAgICAgICBlbCwgdGFyZ2V0LCBzb3VyY2UsIHNpYmxpbmdcclxuICAgICAgXTogW0VsZW1lbnQsIEVsZW1lbnQsIEVsZW1lbnQsIEVsZW1lbnRdKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgbmFtZSwgZWwsIHRhcmdldCwgc291cmNlLCBzaWJsaW5nIH07XHJcbiAgICAgIH0pXHJcbiAgKTtcclxuXHJcbiAgcHJpdmF0ZSBlbENvbnRhaW5lclNvdXJjZSA9XHJcbiAgICAoZXZlbnRUeXBlOiBFdmVudFR5cGVzKSA9PlxyXG4gICAgKGdyb3VwTmFtZT86IHN0cmluZykgPT5cclxuICAgIHRoaXMuZGlzcGF0Y2gkLnBpcGUoXHJcbiAgICAgIGZpbHRlckV2ZW50KGV2ZW50VHlwZSwgZ3JvdXBOYW1lLCBlbENvbnRhaW5lclNvdXJjZVByb2plY3RvcilcclxuICAgICk7XHJcblxyXG4gIHB1YmxpYyBjYW5jZWwgPSB0aGlzLmVsQ29udGFpbmVyU291cmNlKEV2ZW50VHlwZXMuQ2FuY2VsKTtcclxuICBwdWJsaWMgcmVtb3ZlID0gdGhpcy5lbENvbnRhaW5lclNvdXJjZShFdmVudFR5cGVzLlJlbW92ZSk7XHJcbiAgcHVibGljIHNoYWRvdyA9IHRoaXMuZWxDb250YWluZXJTb3VyY2UoRXZlbnRUeXBlcy5TaGFkb3cpO1xyXG4gIHB1YmxpYyBvdmVyID0gdGhpcy5lbENvbnRhaW5lclNvdXJjZShFdmVudFR5cGVzLk92ZXIpO1xyXG4gIHB1YmxpYyBvdXQgPSB0aGlzLmVsQ29udGFpbmVyU291cmNlKEV2ZW50VHlwZXMuT3V0KTtcclxuXHJcbiAgcHVibGljIGNsb25lZCA9IChncm91cE5hbWU/OiBzdHJpbmcpID0+IHRoaXMuZGlzcGF0Y2gkLnBpcGUoXHJcbiAgICBmaWx0ZXJFdmVudChcclxuICAgICAgRXZlbnRUeXBlcy5DbG9uZWQsXHJcbiAgICAgIGdyb3VwTmFtZSxcclxuICAgICAgKG5hbWUsIFtcclxuICAgICAgICBjbG9uZSwgb3JpZ2luYWwsIGNsb25lVHlwZVxyXG4gICAgICBdOiBbRWxlbWVudCwgRWxlbWVudCwgJ21pcnJvcicgfCAnY29weSddKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgbmFtZSwgY2xvbmUsIG9yaWdpbmFsLCBjbG9uZVR5cGUgfVxyXG4gICAgICB9KVxyXG4gICk7XHJcblxyXG4gIHB1YmxpYyBkcm9wTW9kZWwgPSA8VCA9IGFueT4oZ3JvdXBOYW1lPzogc3RyaW5nKSA9PiB0aGlzLmRpc3BhdGNoJC5waXBlKFxyXG4gICAgZmlsdGVyRXZlbnQoXHJcbiAgICAgIEV2ZW50VHlwZXMuRHJvcE1vZGVsLFxyXG4gICAgICBncm91cE5hbWUsXHJcbiAgICAgIChuYW1lLCBbXHJcbiAgICAgICAgZWwsIHRhcmdldCwgc291cmNlLCBzaWJsaW5nLCBpdGVtLCBzb3VyY2VNb2RlbCwgdGFyZ2V0TW9kZWwsIHNvdXJjZUluZGV4LCB0YXJnZXRJbmRleFxyXG4gICAgICBdOiBbRWxlbWVudCwgRWxlbWVudCwgRWxlbWVudCwgRWxlbWVudCwgVCwgVFtdLCBUW10sIG51bWJlciwgbnVtYmVyXSkgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IG5hbWUsIGVsLCB0YXJnZXQsIHNvdXJjZSwgc2libGluZywgaXRlbSwgc291cmNlTW9kZWwsIHRhcmdldE1vZGVsLCBzb3VyY2VJbmRleCwgdGFyZ2V0SW5kZXggfVxyXG4gICAgICB9KVxyXG4gICk7XHJcblxyXG4gIHB1YmxpYyByZW1vdmVNb2RlbCA9IDxUID0gYW55Pihncm91cE5hbWU/OiBzdHJpbmcpID0+IHRoaXMuZGlzcGF0Y2gkLnBpcGUoXHJcbiAgICBmaWx0ZXJFdmVudChcclxuICAgICAgRXZlbnRUeXBlcy5SZW1vdmVNb2RlbCxcclxuICAgICAgZ3JvdXBOYW1lLFxyXG4gICAgICAobmFtZSwgW1xyXG4gICAgICAgIGVsLCBjb250YWluZXIsIHNvdXJjZSwgaXRlbSwgc291cmNlTW9kZWwsIHNvdXJjZUluZGV4XHJcbiAgICAgIF06IFtFbGVtZW50LCBFbGVtZW50LCBFbGVtZW50LCBULCBUW10sIG51bWJlcl0pID0+IHtcclxuICAgICAgICByZXR1cm4geyBuYW1lLCBlbCwgY29udGFpbmVyLCBzb3VyY2UsIGl0ZW0sIHNvdXJjZU1vZGVsLCBzb3VyY2VJbmRleCB9XHJcbiAgICAgIH1cclxuICAgIClcclxuICApO1xyXG5cclxuICBwcml2YXRlIGdyb3VwczogeyBbazogc3RyaW5nXTogR3JvdXAgfSA9IHt9O1xyXG5cclxuICBjb25zdHJ1Y3RvciAoQE9wdGlvbmFsKCkgcHJpdmF0ZSBkcmFrZUZhY3Rvcnk6IERyYWtlRmFjdG9yeSA9IG51bGwpIHtcclxuICAgIGlmICh0aGlzLmRyYWtlRmFjdG9yeSA9PT0gbnVsbCkge1xyXG4gICAgICB0aGlzLmRyYWtlRmFjdG9yeSA9IG5ldyBEcmFrZUZhY3RvcnkoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBQdWJsaWMgbWFpbmx5IGZvciB0ZXN0aW5nIHB1cnBvc2VzLiBQcmVmZXIgYGNyZWF0ZUdyb3VwKClgLiAqL1xyXG4gIHB1YmxpYyBhZGQoZ3JvdXA6IEdyb3VwKTogR3JvdXAge1xyXG4gICAgbGV0IGV4aXN0aW5nR3JvdXAgPSB0aGlzLmZpbmQoZ3JvdXAubmFtZSk7XHJcbiAgICBpZiAoZXhpc3RpbmdHcm91cCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0dyb3VwIG5hbWVkOiBcIicgKyBncm91cC5uYW1lICsgJ1wiIGFscmVhZHkgZXhpc3RzLicpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5ncm91cHNbZ3JvdXAubmFtZV0gPSBncm91cDtcclxuICAgIHRoaXMuaGFuZGxlTW9kZWxzKGdyb3VwKTtcclxuICAgIHRoaXMuc2V0dXBFdmVudHMoZ3JvdXApO1xyXG4gICAgcmV0dXJuIGdyb3VwO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGZpbmQobmFtZTogc3RyaW5nKTogR3JvdXAge1xyXG4gICAgcmV0dXJuIHRoaXMuZ3JvdXBzW25hbWVdO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRlc3Ryb3kobmFtZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBsZXQgZ3JvdXAgPSB0aGlzLmZpbmQobmFtZSk7XHJcbiAgICBpZiAoIWdyb3VwKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGdyb3VwLmRyYWtlICYmIGdyb3VwLmRyYWtlLmRlc3Ryb3koKTtcclxuICAgIGRlbGV0ZSB0aGlzLmdyb3Vwc1tuYW1lXTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYSBncm91cCB3aXRoIHRoZSBzcGVjaWZpZWQgbmFtZSBhbmQgb3B0aW9ucy5cclxuICAgKlxyXG4gICAqIE5vdGU6IGZvcm1lcmx5IGtub3duIGFzIGBzZXRPcHRpb25zYFxyXG4gICAqL1xyXG4gIHB1YmxpYyBjcmVhdGVHcm91cDxUID0gYW55PihuYW1lOiBzdHJpbmcsIG9wdGlvbnM6IERyYWd1bGFPcHRpb25zPFQ+KTogR3JvdXAge1xyXG4gICAgcmV0dXJuIHRoaXMuYWRkKG5ldyBHcm91cChcclxuICAgICAgbmFtZSxcclxuICAgICAgdGhpcy5kcmFrZUZhY3RvcnkuYnVpbGQoW10sIG9wdGlvbnMpLFxyXG4gICAgICBvcHRpb25zXHJcbiAgICApKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlTW9kZWxzKHsgbmFtZSwgZHJha2UsIG9wdGlvbnMgfTogR3JvdXApOiB2b2lkIHtcclxuICAgIGxldCBkcmFnRWxtOiBhbnk7XHJcbiAgICBsZXQgZHJhZ0luZGV4OiBudW1iZXI7XHJcbiAgICBsZXQgZHJvcEluZGV4OiBudW1iZXI7XHJcbiAgICBkcmFrZS5vbigncmVtb3ZlJywgKGVsOiBhbnksIGNvbnRhaW5lcjogYW55LCBzb3VyY2U6IGFueSkgPT4ge1xyXG4gICAgICBpZiAoIWRyYWtlLm1vZGVscykge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBsZXQgc291cmNlTW9kZWwgPSBkcmFrZS5tb2RlbHNbZHJha2UuY29udGFpbmVycy5pbmRleE9mKHNvdXJjZSldO1xyXG4gICAgICBzb3VyY2VNb2RlbCA9IHNvdXJjZU1vZGVsLnNsaWNlKDApOyAvLyBjbG9uZSBpdFxyXG4gICAgICBjb25zdCBpdGVtID0gc291cmNlTW9kZWwuc3BsaWNlKGRyYWdJbmRleCwgMSlbMF07XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdSRU1PVkUnKTtcclxuICAgICAgLy8gY29uc29sZS5sb2coc291cmNlTW9kZWwpO1xyXG4gICAgICB0aGlzLmRpc3BhdGNoJC5uZXh0KHtcclxuICAgICAgICBldmVudDogRXZlbnRUeXBlcy5SZW1vdmVNb2RlbCxcclxuICAgICAgICBuYW1lLFxyXG4gICAgICAgIGFyZ3M6IFsgZWwsIGNvbnRhaW5lciwgc291cmNlLCBpdGVtLCBzb3VyY2VNb2RlbCwgZHJhZ0luZGV4IF1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIGRyYWtlLm9uKCdkcmFnJywgKGVsOiBhbnksIHNvdXJjZTogYW55KSA9PiB7XHJcbiAgICAgIGlmICghZHJha2UubW9kZWxzKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGRyYWdFbG0gPSBlbDtcclxuICAgICAgZHJhZ0luZGV4ID0gdGhpcy5kb21JbmRleE9mKGVsLCBzb3VyY2UpO1xyXG4gICAgfSk7XHJcbiAgICBkcmFrZS5vbignZHJvcCcsIChkcm9wRWxtOiBhbnksIHRhcmdldDogRWxlbWVudCwgc291cmNlOiBFbGVtZW50LCBzaWJsaW5nPzogRWxlbWVudCkgPT4ge1xyXG4gICAgICBpZiAoIWRyYWtlLm1vZGVscyB8fCAhdGFyZ2V0KSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGRyb3BJbmRleCA9IHRoaXMuZG9tSW5kZXhPZihkcm9wRWxtLCB0YXJnZXQpO1xyXG4gICAgICBsZXQgc291cmNlTW9kZWwgPSBkcmFrZS5tb2RlbHNbZHJha2UuY29udGFpbmVycy5pbmRleE9mKHNvdXJjZSldO1xyXG4gICAgICBsZXQgdGFyZ2V0TW9kZWwgPSBkcmFrZS5tb2RlbHNbZHJha2UuY29udGFpbmVycy5pbmRleE9mKHRhcmdldCldO1xyXG4gICAgICAvLyBjb25zb2xlLmxvZygnRFJPUCcpO1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhzb3VyY2VNb2RlbCk7XHJcbiAgICAgIGxldCBpdGVtOiBhbnk7XHJcbiAgICAgIGlmICh0YXJnZXQgPT09IHNvdXJjZSkge1xyXG4gICAgICAgIHNvdXJjZU1vZGVsID0gc291cmNlTW9kZWwuc2xpY2UoMClcclxuICAgICAgICBpdGVtID0gc291cmNlTW9kZWwuc3BsaWNlKGRyYWdJbmRleCwgMSlbMF07XHJcbiAgICAgICAgc291cmNlTW9kZWwuc3BsaWNlKGRyb3BJbmRleCwgMCwgaXRlbSk7XHJcbiAgICAgICAgLy8gdGhpcyB3YXMgdHJ1ZSBiZWZvcmUgd2UgY2xvbmVkIGFuZCB1cGRhdGVkIHNvdXJjZU1vZGVsLFxyXG4gICAgICAgIC8vIGJ1dCB0YXJnZXRNb2RlbCBzdGlsbCBoYXMgdGhlIG9sZCB2YWx1ZVxyXG4gICAgICAgIHRhcmdldE1vZGVsID0gc291cmNlTW9kZWw7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IGlzQ29weWluZyA9IGRyYWdFbG0gIT09IGRyb3BFbG07XHJcbiAgICAgICAgaXRlbSA9IHNvdXJjZU1vZGVsW2RyYWdJbmRleF07XHJcbiAgICAgICAgaWYgKGlzQ29weWluZykge1xyXG4gICAgICAgICAgaWYgKCFvcHRpb25zLmNvcHlJdGVtKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIklmIHlvdSBoYXZlIGVuYWJsZWQgYGNvcHlgIG9uIGEgZ3JvdXAsIHlvdSBtdXN0IHByb3ZpZGUgYSBgY29weUl0ZW1gIGZ1bmN0aW9uLlwiKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaXRlbSA9IG9wdGlvbnMuY29weUl0ZW0oaXRlbSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWlzQ29weWluZykge1xyXG4gICAgICAgICAgc291cmNlTW9kZWwgPSBzb3VyY2VNb2RlbC5zbGljZSgwKVxyXG4gICAgICAgICAgc291cmNlTW9kZWwuc3BsaWNlKGRyYWdJbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRhcmdldE1vZGVsID0gdGFyZ2V0TW9kZWwuc2xpY2UoMClcclxuICAgICAgICB0YXJnZXRNb2RlbC5zcGxpY2UoZHJvcEluZGV4LCAwLCBpdGVtKTtcclxuICAgICAgICBpZiAoaXNDb3B5aW5nKSB7XHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0YXJnZXQucmVtb3ZlQ2hpbGQoZHJvcEVsbSk7XHJcbiAgICAgICAgICB9IGNhdGNoIChlKSB7fVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICB0aGlzLmRpc3BhdGNoJC5uZXh0KHtcclxuICAgICAgICBldmVudDogRXZlbnRUeXBlcy5Ecm9wTW9kZWwsXHJcbiAgICAgICAgbmFtZSxcclxuICAgICAgICBhcmdzOiBbIGRyb3BFbG0sIHRhcmdldCwgc291cmNlLCBzaWJsaW5nLCBpdGVtLCBzb3VyY2VNb2RlbCwgdGFyZ2V0TW9kZWwsIGRyYWdJbmRleCwgZHJvcEluZGV4IF1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0dXBFdmVudHMoZ3JvdXA6IEdyb3VwKTogdm9pZCB7XHJcbiAgICBpZiAoZ3JvdXAuaW5pdEV2ZW50cykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBncm91cC5pbml0RXZlbnRzID0gdHJ1ZTtcclxuICAgIGNvbnN0IG5hbWUgPSBncm91cC5uYW1lO1xyXG4gICAgbGV0IHRoYXQ6IGFueSA9IHRoaXM7XHJcbiAgICBsZXQgZW1pdHRlciA9IChldmVudDogRXZlbnRUeXBlcykgPT4ge1xyXG4gICAgICBncm91cC5kcmFrZS5vbihldmVudCwgKC4uLmFyZ3M6IGFueVtdKSA9PiB7XHJcbiAgICAgICAgdGhpcy5kaXNwYXRjaCQubmV4dCh7IGV2ZW50LCBuYW1lLCBhcmdzIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH07XHJcbiAgICBBbGxFdmVudHMuZm9yRWFjaChlbWl0dGVyKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZG9tSW5kZXhPZihjaGlsZDogYW55LCBwYXJlbnQ6IGFueSk6IGFueSB7XHJcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChwYXJlbnQuY2hpbGRyZW4sIGNoaWxkKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgT3V0cHV0LCBFbGVtZW50UmVmLCBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBTaW1wbGVDaGFuZ2UsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEcmFndWxhU2VydmljZSB9IGZyb20gJy4vZHJhZ3VsYS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRHJha2VXaXRoTW9kZWxzIH0gZnJvbSAnLi4vRHJha2VXaXRoTW9kZWxzJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vR3JvdXAnO1xyXG5cclxuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdbZHJhZ3VsYV0nfSlcclxuZXhwb3J0IGNsYXNzIERyYWd1bGFEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XHJcbiAgQElucHV0KCkgcHVibGljIGRyYWd1bGE6IHN0cmluZztcclxuICBASW5wdXQoKSBwdWJsaWMgZHJhZ3VsYU1vZGVsOiBhbnlbXTtcclxuICBAT3V0cHV0KCkgcHVibGljIGRyYWd1bGFNb2RlbENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55W10+KCk7XHJcblxyXG4gIHByaXZhdGUgc3ViczogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBwcml2YXRlIGdldCBjb250YWluZXIoKTogSFRNTEVsZW1lbnQge1xyXG4gICAgcmV0dXJuIHRoaXMuZWwgJiYgdGhpcy5lbC5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuICBwcml2YXRlIGdyb3VwOiBHcm91cDtcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgZHJhZ3VsYVNlcnZpY2U6IERyYWd1bGFTZXJ2aWNlKSB7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczoge2RyYWd1bGE/OiBTaW1wbGVDaGFuZ2UsIGRyYWd1bGFNb2RlbD86IFNpbXBsZUNoYW5nZX0pOiB2b2lkIHtcclxuICAgIGlmIChjaGFuZ2VzICYmIGNoYW5nZXMuZHJhZ3VsYSkge1xyXG4gICAgICBjb25zdCB7IHByZXZpb3VzVmFsdWU6IHByZXYsIGN1cnJlbnRWYWx1ZTogY3VycmVudCwgZmlyc3RDaGFuZ2UgfSA9IGNoYW5nZXMuZHJhZ3VsYTtcclxuICAgICAgbGV0IGhhZFByZXZpb3VzVmFsdWUgPSAhIXByZXY7XHJcbiAgICAgIGxldCBoYXNOZXdWYWx1ZSA9ICEhY3VycmVudDtcclxuICAgICAgLy8gc29tZXRoaW5nIC0+IG51bGwgICAgICAgPT4gIHRlYXJkb3duIG9ubHlcclxuICAgICAgLy8gc29tZXRoaW5nIC0+IHNvbWV0aGluZyAgPT4gIHRlYXJkb3duLCB0aGVuIHNldHVwXHJcbiAgICAgIC8vICAgICAgbnVsbCAtPiBzb21ldGhpbmcgID0+ICBzZXR1cCBvbmx5XHJcbiAgICAgIC8vXHJcbiAgICAgIC8vICAgICAgbnVsbCAtPiBudWxsIChwcmVjbHVkZWQgYnkgZmFjdCBvZiBjaGFuZ2UgYmVpbmcgcHJlc2VudClcclxuICAgICAgaWYgKGhhZFByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICB0aGlzLnRlYXJkb3duKHByZXYpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChoYXNOZXdWYWx1ZSkge1xyXG4gICAgICAgIHRoaXMuc2V0dXAoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChjaGFuZ2VzICYmIGNoYW5nZXMuZHJhZ3VsYU1vZGVsKSB7XHJcbiAgICAgIC8vIHRoaXMgY29kZSBvbmx5IHJ1bnMgd2hlbiB5b3UncmUgbm90IGNoYW5naW5nIHRoZSBncm91cCBuYW1lXHJcbiAgICAgIC8vIGJlY2F1c2UgaWYgeW91J3JlIGNoYW5naW5nIHRoZSBncm91cCBuYW1lLCB5b3UnbGwgYmUgZG9pbmcgc2V0dXAgb3IgdGVhcmRvd25cclxuICAgICAgLy8gaXQgYWxzbyBvbmx5IHJ1bnMgaWYgdGhlcmUgaXMgYSBncm91cCBuYW1lIHRvIGF0dGFjaCB0by5cclxuICAgICAgY29uc3QgeyBwcmV2aW91c1ZhbHVlOiBwcmV2LCBjdXJyZW50VmFsdWU6IGN1cnJlbnQsIGZpcnN0Q2hhbmdlIH0gPSBjaGFuZ2VzLmRyYWd1bGFNb2RlbDtcclxuICAgICAgY29uc3QgeyBkcmFrZSB9ID0gdGhpcy5ncm91cDtcclxuICAgICAgaWYgKHRoaXMuZHJhZ3VsYSAmJiBkcmFrZSkge1xyXG4gICAgICAgIGRyYWtlLm1vZGVscyA9IGRyYWtlLm1vZGVscyB8fCBbXTtcclxuICAgICAgICBsZXQgcHJldkluZGV4ID0gZHJha2UubW9kZWxzLmluZGV4T2YocHJldik7XHJcbiAgICAgICAgaWYgKHByZXZJbmRleCAhPT0gLTEpIHtcclxuICAgICAgICAgIC8vIGRlbGV0ZSB0aGUgcHJldmlvdXNcclxuICAgICAgICAgIGRyYWtlLm1vZGVscy5zcGxpY2UocHJldkluZGV4LCAxKTtcclxuICAgICAgICAgIC8vIG1heWJlIGluc2VydCBhIG5ldyBvbmUgYXQgdGhlIHNhbWUgc3BvdFxyXG4gICAgICAgICAgaWYgKCEhY3VycmVudCkge1xyXG4gICAgICAgICAgICBkcmFrZS5tb2RlbHMuc3BsaWNlKHByZXZJbmRleCwgMCwgY3VycmVudCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICghIWN1cnJlbnQpIHtcclxuICAgICAgICAgIC8vIG5vIHByZXZpb3VzIG9uZSB0byByZW1vdmU7IGp1c3QgcHVzaCB0aGlzIG9uZS5cclxuICAgICAgICAgIGRyYWtlLm1vZGVscy5wdXNoKGN1cnJlbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gY2FsbCBuZ09uSW5pdCAnc2V0dXAnIGJlY2F1c2Ugd2Ugd2FudCB0byBjYWxsIGl0IGluIG5nT25DaGFuZ2VzXHJcbiAgLy8gYW5kIGl0IHdvdWxkIG90aGVyd2lzZSBydW4gdHdpY2VcclxuICBwdWJsaWMgc2V0dXAoKTogdm9pZCB7XHJcbiAgICBsZXQgY2hlY2tNb2RlbCA9IChncm91cDogR3JvdXApID0+IHtcclxuICAgICAgaWYgKHRoaXMuZHJhZ3VsYU1vZGVsKSB7XHJcbiAgICAgICAgaWYgKGdyb3VwLmRyYWtlLm1vZGVscykge1xyXG4gICAgICAgICAgZ3JvdXAuZHJha2UubW9kZWxzLnB1c2godGhpcy5kcmFndWxhTW9kZWwpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBncm91cC5kcmFrZS5tb2RlbHMgPSBbdGhpcy5kcmFndWxhTW9kZWxdO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBmaW5kIG9yIGNyZWF0ZSBhIGdyb3VwXHJcbiAgICBsZXQgZ3JvdXAgPSB0aGlzLmRyYWd1bGFTZXJ2aWNlLmZpbmQodGhpcy5kcmFndWxhKTtcclxuICAgIGlmICghZ3JvdXApIHtcclxuICAgICAgbGV0IG9wdGlvbnMgPSB7fTtcclxuICAgICAgZ3JvdXAgPSB0aGlzLmRyYWd1bGFTZXJ2aWNlLmNyZWF0ZUdyb3VwKHRoaXMuZHJhZ3VsYSwgb3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZW5zdXJlIG1vZGVsIGFuZCBjb250YWluZXIgZWxlbWVudCBhcmUgcHVzaGVkXHJcbiAgICBjaGVja01vZGVsKGdyb3VwKTtcclxuICAgIGdyb3VwLmRyYWtlLmNvbnRhaW5lcnMucHVzaCh0aGlzLmNvbnRhaW5lcik7XHJcbiAgICB0aGlzLnN1YnNjcmliZSh0aGlzLmRyYWd1bGEpO1xyXG5cclxuICAgIHRoaXMuZ3JvdXAgPSBncm91cDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdWJzY3JpYmUobmFtZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnN1YnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XHJcbiAgICB0aGlzLnN1YnMuYWRkKFxyXG4gICAgICB0aGlzLmRyYWd1bGFTZXJ2aWNlXHJcbiAgICAgIC5kcm9wTW9kZWwobmFtZSlcclxuICAgICAgLnN1YnNjcmliZSgoeyBzb3VyY2UsIHRhcmdldCwgc291cmNlTW9kZWwsIHRhcmdldE1vZGVsIH0pID0+IHtcclxuICAgICAgICBpZiAoc291cmNlID09PSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgICAgIHRoaXMuZHJhZ3VsYU1vZGVsQ2hhbmdlLmVtaXQoc291cmNlTW9kZWwpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0ID09PSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgICAgIHRoaXMuZHJhZ3VsYU1vZGVsQ2hhbmdlLmVtaXQodGFyZ2V0TW9kZWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgICB0aGlzLnN1YnMuYWRkKFxyXG4gICAgICB0aGlzLmRyYWd1bGFTZXJ2aWNlXHJcbiAgICAgIC5yZW1vdmVNb2RlbChuYW1lKVxyXG4gICAgICAuc3Vic2NyaWJlKCh7IHNvdXJjZSwgc291cmNlTW9kZWwgfSkgPT4ge1xyXG4gICAgICAgIGlmIChzb3VyY2UgPT09IHRoaXMuZWwubmF0aXZlRWxlbWVudCkge1xyXG4gICAgICAgICAgdGhpcy5kcmFndWxhTW9kZWxDaGFuZ2UuZW1pdChzb3VyY2VNb2RlbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB0ZWFyZG93bihncm91cE5hbWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuc3Vicykge1xyXG4gICAgICB0aGlzLnN1YnMudW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICAgIGNvbnN0IGdyb3VwID0gdGhpcy5kcmFndWxhU2VydmljZS5maW5kKGdyb3VwTmFtZSk7XHJcbiAgICBpZiAoZ3JvdXApIHtcclxuICAgICAgY29uc3QgaXRlbVRvUmVtb3ZlID0gZ3JvdXAuZHJha2UuY29udGFpbmVycy5pbmRleE9mKHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XHJcbiAgICAgIGlmIChpdGVtVG9SZW1vdmUgIT09IC0xKSB7XHJcbiAgICAgICAgZ3JvdXAuZHJha2UuY29udGFpbmVycy5zcGxpY2UoaXRlbVRvUmVtb3ZlLCAxKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5kcmFndWxhTW9kZWwgJiYgZ3JvdXAuZHJha2UgJiYgZ3JvdXAuZHJha2UubW9kZWxzKSB7XHJcbiAgICAgICAgbGV0IG1vZGVsSW5kZXggPSBncm91cC5kcmFrZS5tb2RlbHMuaW5kZXhPZih0aGlzLmRyYWd1bGFNb2RlbCk7XHJcbiAgICAgICAgaWYgKG1vZGVsSW5kZXggIT09IC0xKSB7XHJcbiAgICAgICAgICBncm91cC5kcmFrZS5tb2RlbHMuc3BsaWNlKG1vZGVsSW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy50ZWFyZG93bih0aGlzLmRyYWd1bGEpO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRHJhZ3VsYURpcmVjdGl2ZSB9IGZyb20gJy4vZHJhZ3VsYS5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBEcmFndWxhU2VydmljZSB9IGZyb20gJy4vZHJhZ3VsYS5zZXJ2aWNlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgZXhwb3J0czogW0RyYWd1bGFEaXJlY3RpdmVdLFxyXG4gIGRlY2xhcmF0aW9uczogW0RyYWd1bGFEaXJlY3RpdmVdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRHJhZ3VsYU1vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogRHJhZ3VsYU1vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbRHJhZ3VsYVNlcnZpY2VdXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBEcmFrZVdpdGhNb2RlbHMgfSBmcm9tICcuL0RyYWtlV2l0aE1vZGVscyc7XHJcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgRXZlbnRUeXBlcyB9IGZyb20gJy4vRXZlbnRUeXBlcyc7XHJcbmltcG9ydCB7IERyYWd1bGFPcHRpb25zIH0gZnJvbSAnLi9EcmFndWxhT3B0aW9ucyc7XHJcbmltcG9ydCB7IERyYWtlRmFjdG9yeSB9IGZyb20gJy4vRHJha2VGYWN0b3J5JztcclxuXHJcbmV4cG9ydCBjb25zdCBNb2NrRHJha2VGYWN0b3J5ID0gbmV3IERyYWtlRmFjdG9yeSgoY29udGFpbmVycywgb3B0aW9ucykgPT4ge1xyXG4gIHJldHVybiBuZXcgTW9ja0RyYWtlKGNvbnRhaW5lcnMsIG9wdGlvbnMpO1xyXG59KTtcclxuXHJcbi8qKiBZb3UgY2FuIHVzZSBNb2NrRHJha2UgdG8gc2ltdWxhdGUgRHJha2UgZXZlbnRzLlxyXG4gKlxyXG4gKiBUaGUgdGhyZWUgbWV0aG9kcyB0aGF0IGFjdHVhbGx5IGRvIGFueXRoaW5nIGFyZSBgb24oZXZlbnQsIGxpc3RlbmVyKWAsXHJcbiAqIGBkZXN0cm95KClgLCBhbmQgYSBuZXcgbWV0aG9kLCBgZW1pdCgpYC4gVXNlIGBlbWl0KClgIHRvIG1hbnVhbGx5IGVtaXQgRHJha2VcclxuICogZXZlbnRzLCBhbmQgaWYgeW91IGluamVjdGVkIE1vY2tEcmFrZSBwcm9wZXJseSB3aXRoIE1vY2tEcmFrZUZhY3Rvcnkgb3JcclxuICogbW9ja2VkIHRoZSBEcmFndWxhU2VydmljZS5maW5kKCkgbWV0aG9kLCB0aGVuIHlvdSBjYW4gbWFrZSBuZzItZHJhZ3VsYSB0aGlua1xyXG4gKiBkcmFncyBhbmQgZHJvcHMgYXJlIGhhcHBlbmluZy5cclxuICpcclxuICogQ2F2ZWF0czpcclxuICpcclxuICogMS4gWU9VIE1VU1QgTUFLRSBUSEUgRE9NIENIQU5HRVMgWU9VUlNFTEYuXHJcbiAqIDIuIFJFUEVBVDogWU9VIE1VU1QgTUFLRSBUSEUgRE9NIENIQU5HRVMgWU9VUlNFTEYuXHJcbiAqICAgIFRoYXQgbWVhbnMgYHNvdXJjZS5yZW1vdmVDaGlsZChlbClgLCBhbmQgYHRhcmdldC5pbnNlcnRCZWZvcmUoZWwpYC5cclxuICogMy4gTm9uZSBvZiB0aGUgb3RoZXIgbWV0aG9kcyBkbyBhbnl0aGluZy5cclxuICogICAgVGhhdCdzIG9rLCBiZWNhdXNlIG5nMi1kcmFndWxhIGRvZXNuJ3QgdXNlIHRoZW0uXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTW9ja0RyYWtlIGltcGxlbWVudHMgRHJha2VXaXRoTW9kZWxzIHtcclxuICAvKipcclxuICAgKiBAcGFyYW0gY29udGFpbmVycyBBIGxpc3Qgb2YgY29udGFpbmVyIGVsZW1lbnRzLlxyXG4gICAqIEBwYXJhbSBvcHRpb25zIFRoZXNlIHdpbGwgTk9UIGJlIHVzZWQuIEF0IGFsbC5cclxuICAgKiBAcGFyYW0gbW9kZWxzIE5vbnN0YW5kYXJkLCBidXQgdXNlZnVsIGZvciB0ZXN0aW5nIHVzaW5nIGBuZXcgTW9ja0RyYWtlKClgIGRpcmVjdGx5LlxyXG4gICAqICAgICAgICAgICAgICAgTm90ZSwgZGVmYXVsdCB2YWx1ZSBpcyB1bmRlZmluZWQsIGxpa2UgYSByZWFsIERyYWtlLiBEb24ndCBjaGFuZ2UgdGhhdC5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyBjb250YWluZXJzOiBFbGVtZW50W10gPSBbXSxcclxuICAgIHB1YmxpYyBvcHRpb25zOiBEcmFndWxhT3B0aW9ucyA9IHt9LFxyXG4gICAgcHVibGljIG1vZGVscz86IGFueVtdW11cclxuICApIHt9XHJcblxyXG4gIC8qIERvZXNuJ3QgcmVwcmVzZW50IGFueXRoaW5nIG1lYW5pbmdmdWwuICovXHJcbiAgZHJhZ2dpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgLyogRG9lcyBub3RoaW5nIHVzZWZ1bC4gKi9cclxuICBzdGFydChpdGVtOiBFbGVtZW50KTogYW55IHtcclxuICAgIHRoaXMuZHJhZ2dpbmcgPSB0cnVlO1xyXG4gIH1cclxuICAvKiBEb2VzIG5vdGhpbmcgdXNlZnVsLiAqL1xyXG4gIGVuZCgpOiBhbnkge1xyXG4gICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xyXG4gIH1cclxuICAvKiBEb2VzIG5vdGhpbmcgdXNlZnVsLiAqL1xyXG4gIGNhbmNlbChyZXZlcnQ6IGJvb2xlYW4pOiBhbnk7XHJcbiAgY2FuY2VsKCk6IGFueTtcclxuICBjYW5jZWwocmV2ZXJ0PzogYW55KSB7XHJcbiAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XHJcbiAgfVxyXG4gIC8qIERvZXMgbm90aGluZyB1c2VmdWwuICovXHJcbiAgcmVtb3ZlKCk6IGFueSB7XHJcbiAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICAvLyBCYXNpYyBidXQgZnVsbHkgZnVuY3Rpb25hbCBldmVudCBlbWl0dGVyIHNoaW1cclxuICBwcml2YXRlIGVtaXR0ZXIkID0gbmV3IFN1YmplY3Q8eyBldmVudFR5cGU6IEV2ZW50VHlwZXMsIGFyZ3M6IGFueVtdIH0+KCk7XHJcblxyXG4gIHByaXZhdGUgc3VicyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcclxuXHJcbiAgb24oZXZlbnQ6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKTogYW55IHtcclxuICAgIHRoaXMuc3Vicy5hZGQodGhpcy5lbWl0dGVyJFxyXG4gICAgICAucGlwZShcclxuICAgICAgICBmaWx0ZXIoKHsgZXZlbnRUeXBlIH0pID0+IGV2ZW50VHlwZSA9PT0gZXZlbnQpXHJcbiAgICAgIClcclxuICAgICAgLnN1YnNjcmliZSgoeyBhcmdzIH0pID0+IHtcclxuICAgICAgICBjYWxsYmFjayguLi5hcmdzKTtcclxuICAgICAgfSkpO1xyXG4gIH1cclxuXHJcbiAgZGVzdHJveSgpOiBhbnkge1xyXG4gICAgdGhpcy5zdWJzLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGlzIHRoZSBtb3N0IHVzZWZ1bCBtZXRob2QuIFlvdSBjYW4gdXNlIGl0IHRvIG1hbnVhbGx5IGZpcmUgZXZlbnRzIHRoYXQgd291bGQgbm9ybWFsbHlcclxuICAgKiBiZSBmaXJlZCBieSBhIHJlYWwgZHJha2UuXHJcbiAgICpcclxuICAgKiBZb3UncmUgbGlrZWx5IG1vc3QgaW50ZXJlc3RlZCBpbiBmaXJpbmcgYGRyYWdgLCBgcmVtb3ZlYCBhbmQgYGRyb3BgLCB0aGUgdGhyZWUgZXZlbnRzXHJcbiAgICogRHJhZ3VsYVNlcnZpY2UgdXNlcyB0byBpbXBsZW1lbnQgW2RyYWd1bGFNb2RlbF0uXHJcbiAgICpcclxuICAgKiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2JldmFjcXVhL2RyYWd1bGEjZHJha2Vvbi1ldmVudHMgZm9yIHdoYXQgeW91IHNob3VsZCBlbWl0IChhbmQgaW4gd2hhdCBvcmRlcikuXHJcbiAgICpcclxuICAgKiAoTm90ZSBhbHNvLCBmaXJpbmcgZHJvcE1vZGVsIGFuZCByZW1vdmVNb2RlbCB3b24ndCB3b3JrLiBZb3Ugd291bGQgaGF2ZSB0byBtb2NrIERyYWd1bGFTZXJ2aWNlIGZvciB0aGF0LilcclxuICAgKi9cclxuICBlbWl0KGV2ZW50VHlwZTogRXZlbnRUeXBlcywgLi4uYXJnczogYW55W10pIHtcclxuICAgIHRoaXMuZW1pdHRlciQubmV4dCh7IGV2ZW50VHlwZSwgYXJncyB9KVxyXG4gIH1cclxuXHJcbn1cclxuIl0sIm5hbWVzIjpbIigvKiogQHR5cGUgez99ICovIChkcmFndWxhRXhwdCkpLmRlZmF1bHQiXSwibWFw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