(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('dragula'), require('@angular/core'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('ng2-dragula', ['exports', 'dragula', '@angular/core', 'rxjs', 'rxjs/operators'], factory) :
    (factory((global['ng2-dragula'] = {}),global.dragula,global.ng.core,global.rxjs,global.rxjs.operators));
}(this, (function (exports,dragulaExpt,core,rxjs,operators) { 'use strict';

    var dragulaExpt__default = 'default' in dragulaExpt ? dragulaExpt['default'] : dragulaExpt;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

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
    var AllEvents = Object.keys(EventTypes).map(function (k) { return (EventTypes[ /** @type {?} */(k)]); });

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /** @type {?} */
    var dragula = dragulaExpt__default || dragulaExpt;
    var DrakeFactory = /** @class */ (function () {
        function DrakeFactory(build) {
            if (build === void 0) {
                build = dragula;
            }
            this.build = build;
        }
        return DrakeFactory;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /** @type {?} */
    var filterEvent = function (eventType, filterDragType, projector) {
        return function (input) {
            return input.pipe(operators.filter(function (_a) {
                var event = _a.event, name = _a.name;
                return event === eventType
                    && (filterDragType === undefined || name === filterDragType);
            }), operators.map(function (_a) {
                var name = _a.name, args = _a.args;
                return projector(name, args);
            }));
        };
    };
    /** @type {?} */
    var elContainerSourceProjector = function (name, _a) {
        var _b = __read(_a, 3), el = _b[0], container = _b[1], source = _b[2];
        return ({ name: name, el: el, container: container, source: source });
    };
    var DragulaService = /** @class */ (function () {
        function DragulaService(drakeFactory) {
            if (drakeFactory === void 0) {
                drakeFactory = null;
            }
            var _this = this;
            this.drakeFactory = drakeFactory;
            this.dispatch$ = new rxjs.Subject();
            this.drag = function (groupName) {
                return _this.dispatch$.pipe(filterEvent(EventTypes.Drag, groupName, function (name, _a) {
                    var _b = __read(_a, 2), el = _b[0], source = _b[1];
                    return ({ name: name, el: el, source: source });
                }));
            };
            this.dragend = function (groupName) {
                return _this.dispatch$.pipe(filterEvent(EventTypes.DragEnd, groupName, function (name, _a) {
                    var _b = __read(_a, 1), el = _b[0];
                    return ({ name: name, el: el });
                }));
            };
            this.drop = function (groupName) {
                return _this.dispatch$.pipe(filterEvent(EventTypes.Drop, groupName, function (name, _a) {
                    var _b = __read(_a, 4), el = _b[0], target = _b[1], source = _b[2], sibling = _b[3];
                    return { name: name, el: el, target: target, source: source, sibling: sibling };
                }));
            };
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
            this.cloned = function (groupName) {
                return _this.dispatch$.pipe(filterEvent(EventTypes.Cloned, groupName, function (name, _a) {
                    var _b = __read(_a, 3), clone = _b[0], original = _b[1], cloneType = _b[2];
                    return { name: name, clone: clone, original: original, cloneType: cloneType };
                }));
            };
            this.dropModel = function (groupName) {
                return _this.dispatch$.pipe(filterEvent(EventTypes.DropModel, groupName, function (name, _a) {
                    var _b = __read(_a, 9), el = _b[0], target = _b[1], source = _b[2], sibling = _b[3], item = _b[4], sourceModel = _b[5], targetModel = _b[6], sourceIndex = _b[7], targetIndex = _b[8];
                    return { name: name, el: el, target: target, source: source, sibling: sibling, item: item, sourceModel: sourceModel, targetModel: targetModel, sourceIndex: sourceIndex, targetIndex: targetIndex };
                }));
            };
            this.removeModel = function (groupName) {
                return _this.dispatch$.pipe(filterEvent(EventTypes.RemoveModel, groupName, function (name, _a) {
                    var _b = __read(_a, 6), el = _b[0], container = _b[1], source = _b[2], item = _b[3], sourceModel = _b[4], sourceIndex = _b[5];
                    return { name: name, el: el, container: container, source: source, item: item, sourceModel: sourceModel, sourceIndex: sourceIndex };
                }));
            };
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
            { type: core.Injectable }
        ];
        /** @nocollapse */
        DragulaService.ctorParameters = function () {
            return [
                { type: DrakeFactory, decorators: [{ type: core.Optional }] }
            ];
        };
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
            this.dragulaModelChange = new core.EventEmitter();
        }
        Object.defineProperty(DragulaDirective.prototype, "container", {
            get: /**
             * @return {?}
             */ function () {
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
                this.subs = new rxjs.Subscription();
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
            { type: core.Directive, args: [{ selector: '[dragula]' },] }
        ];
        /** @nocollapse */
        DragulaDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: DragulaService }
            ];
        };
        DragulaDirective.propDecorators = {
            dragula: [{ type: core.Input }],
            dragulaModel: [{ type: core.Input }],
            dragulaModelChange: [{ type: core.Output }]
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
            { type: core.NgModule, args: [{
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
     */ MockDrake = /** @class */ (function () {
        /**
         * @param containers A list of container elements.
         * @param options These will NOT be used. At all.
         * @param models Nonstandard, but useful for testing using `new MockDrake()` directly.
         *               Note, default value is undefined, like a real Drake. Don't change that.
         */
        function MockDrake(containers, options, models) {
            if (containers === void 0) {
                containers = [];
            }
            if (options === void 0) {
                options = {};
            }
            this.containers = containers;
            this.options = options;
            this.models = models;
            /* Doesn't represent anything meaningful. */
            this.dragging = false;
            this.emitter$ = new rxjs.Subject();
            this.subs = new rxjs.Subscription();
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
                    .pipe(operators.filter(function (_a) {
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

    exports.DragulaDirective = DragulaDirective;
    exports.DragulaService = DragulaService;
    exports.DragulaModule = DragulaModule;
    exports.dragula = dragula;
    exports.DrakeFactory = DrakeFactory;
    exports.Group = Group;
    exports.EventTypes = EventTypes;
    exports.MockDrake = MockDrake;
    exports.MockDrakeFactory = MockDrakeFactory;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLWRyYWd1bGEudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIm5nOi8vbmcyLWRyYWd1bGEvR3JvdXAudHMiLCJuZzovL25nMi1kcmFndWxhL0V2ZW50VHlwZXMudHMiLCJuZzovL25nMi1kcmFndWxhL0RyYWtlRmFjdG9yeS50cyIsIm5nOi8vbmcyLWRyYWd1bGEvY29tcG9uZW50cy9kcmFndWxhLnNlcnZpY2UudHMiLCJuZzovL25nMi1kcmFndWxhL2NvbXBvbmVudHMvZHJhZ3VsYS5kaXJlY3RpdmUudHMiLCJuZzovL25nMi1kcmFndWxhL2NvbXBvbmVudHMvZHJhZ3VsYS5tb2R1bGUudHMiLCJuZzovL25nMi1kcmFndWxhL01vY2tEcmFrZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7IERyYWtlV2l0aE1vZGVscyB9IGZyb20gXCIuL0RyYWtlV2l0aE1vZGVsc1wiO1xyXG5pbXBvcnQgeyBEcmFndWxhT3B0aW9ucyB9IGZyb20gXCIuL0RyYWd1bGFPcHRpb25zXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgR3JvdXAge1xyXG4gIHB1YmxpYyBpbml0RXZlbnRzOiBib29sZWFuID0gZmFsc2U7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nLFxyXG4gICAgcHVibGljIGRyYWtlOiBEcmFrZVdpdGhNb2RlbHMsXHJcbiAgICBwdWJsaWMgb3B0aW9uczogRHJhZ3VsYU9wdGlvbnNcclxuICApIHt9XHJcbn1cclxuIiwiZXhwb3J0IGVudW0gRXZlbnRUeXBlcyB7XHJcbiAgICBDYW5jZWwgPSBcImNhbmNlbFwiLFxyXG4gICAgQ2xvbmVkID0gXCJjbG9uZWRcIixcclxuICAgIERyYWcgPSBcImRyYWdcIixcclxuICAgIERyYWdFbmQgPSBcImRyYWdlbmRcIixcclxuICAgIERyb3AgPSBcImRyb3BcIixcclxuICAgIE91dCA9IFwib3V0XCIsXHJcbiAgICBPdmVyID0gXCJvdmVyXCIsXHJcbiAgICBSZW1vdmUgPSBcInJlbW92ZVwiLFxyXG4gICAgU2hhZG93ID0gXCJzaGFkb3dcIixcclxuICAgIERyb3BNb2RlbCA9IFwiZHJvcE1vZGVsXCIsXHJcbiAgICBSZW1vdmVNb2RlbCA9IFwicmVtb3ZlTW9kZWxcIixcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IEFsbEV2ZW50czogRXZlbnRUeXBlc1tdID0gT2JqZWN0LmtleXMoRXZlbnRUeXBlcykubWFwKGsgPT4gRXZlbnRUeXBlc1trIGFzIGFueV0gYXMgRXZlbnRUeXBlcyk7XHJcblxyXG5cclxuIiwiaW1wb3J0IHsgRHJhZ3VsYU9wdGlvbnMgfSBmcm9tICcuL0RyYWd1bGFPcHRpb25zJztcclxuaW1wb3J0IHsgRHJha2VXaXRoTW9kZWxzIH0gZnJvbSAnLi9EcmFrZVdpdGhNb2RlbHMnO1xyXG5pbXBvcnQgKiBhcyBkcmFndWxhRXhwdCBmcm9tICdkcmFndWxhJztcclxuZXhwb3J0IGNvbnN0IGRyYWd1bGE6IChjb250YWluZXJzPzogYW55LCBvcHRpb25zPzogYW55KSA9PiBhbnkgPSAoZHJhZ3VsYUV4cHQgYXMgYW55KS5kZWZhdWx0IHx8IGRyYWd1bGFFeHB0O1xyXG5cclxuZXhwb3J0IHR5cGUgRHJha2VCdWlsZGVyID0gKGNvbnRhaW5lcnM6IGFueVtdLCBvcHRpb25zOiBEcmFndWxhT3B0aW9ucykgPT4gRHJha2VXaXRoTW9kZWxzO1xyXG5cclxuZXhwb3J0IGNsYXNzIERyYWtlRmFjdG9yeSB7XHJcbiAgY29uc3RydWN0b3IgKHB1YmxpYyBidWlsZDogRHJha2VCdWlsZGVyID0gZHJhZ3VsYSkge31cclxufVxyXG5cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi9Hcm91cCc7XHJcbmltcG9ydCB7IERyYWd1bGFPcHRpb25zIH0gZnJvbSAnLi4vRHJhZ3VsYU9wdGlvbnMnO1xyXG5pbXBvcnQgeyBTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGZpbHRlciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBFdmVudFR5cGVzLCBBbGxFdmVudHMgfSBmcm9tICcuLi9FdmVudFR5cGVzJztcclxuaW1wb3J0IHsgRHJha2VGYWN0b3J5IH0gZnJvbSAnLi4vRHJha2VGYWN0b3J5JztcclxuXHJcbnR5cGUgRmlsdGVyUHJvamVjdG9yPFQgZXh0ZW5kcyB7IG5hbWU6IHN0cmluZzsgfT4gPSAobmFtZTogc3RyaW5nLCBhcmdzOiBhbnlbXSkgPT4gVDtcclxudHlwZSBEaXNwYXRjaCA9IHsgZXZlbnQ6IEV2ZW50VHlwZXM7IG5hbWU6IHN0cmluZzsgYXJnczogYW55W107IH07XHJcblxyXG5jb25zdCBmaWx0ZXJFdmVudCA9IDxUIGV4dGVuZHMgeyBuYW1lOiBzdHJpbmc7IH0+KFxyXG4gIGV2ZW50VHlwZTogRXZlbnRUeXBlcyxcclxuICBmaWx0ZXJEcmFnVHlwZTogc3RyaW5nIHwgdW5kZWZpbmVkLFxyXG4gIHByb2plY3RvcjogRmlsdGVyUHJvamVjdG9yPFQ+XHJcbikgPT4gKGlucHV0OiBPYnNlcnZhYmxlPERpc3BhdGNoPik6IE9ic2VydmFibGU8VD4gPT4ge1xyXG4gIHJldHVybiBpbnB1dC5waXBlKFxyXG4gICAgZmlsdGVyKCh7IGV2ZW50LCBuYW1lIH0pID0+IHtcclxuICAgICAgcmV0dXJuIGV2ZW50ID09PSBldmVudFR5cGVcclxuICAgICAgICAgICYmIChmaWx0ZXJEcmFnVHlwZSA9PT0gdW5kZWZpbmVkIHx8IG5hbWUgPT09IGZpbHRlckRyYWdUeXBlKTtcclxuICAgIH0pLFxyXG4gICAgbWFwKCh7IG5hbWUsIGFyZ3MgfSkgPT4gcHJvamVjdG9yKG5hbWUsIGFyZ3MpKVxyXG4gICk7XHJcbn1cclxuXHJcbmNvbnN0IGVsQ29udGFpbmVyU291cmNlUHJvamVjdG9yID1cclxuICAobmFtZTogc3RyaW5nLCBbZWwsIGNvbnRhaW5lciwgc291cmNlXTogW0VsZW1lbnQsIEVsZW1lbnQsIEVsZW1lbnRdKSA9PlxyXG4gICAgKHsgbmFtZSwgZWwsIGNvbnRhaW5lciwgc291cmNlIH0pO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRHJhZ3VsYVNlcnZpY2Uge1xyXG5cclxuICAvKiBodHRwczovL2dpdGh1Yi5jb20vYmV2YWNxdWEvZHJhZ3VsYSNkcmFrZW9uLWV2ZW50cyAqL1xyXG5cclxuICBwcml2YXRlIGRpc3BhdGNoJCA9IG5ldyBTdWJqZWN0PERpc3BhdGNoPigpO1xyXG5cclxuICBwdWJsaWMgZHJhZyA9IChncm91cE5hbWU/OiBzdHJpbmcpID0+IHRoaXMuZGlzcGF0Y2gkLnBpcGUoXHJcbiAgICBmaWx0ZXJFdmVudChcclxuICAgICAgRXZlbnRUeXBlcy5EcmFnLFxyXG4gICAgICBncm91cE5hbWUsXHJcbiAgICAgIChuYW1lLCBbZWwsIHNvdXJjZV06IFtFbGVtZW50LCBFbGVtZW50XSkgPT4gKHsgbmFtZSwgZWwsIHNvdXJjZSB9KVxyXG4gICAgKVxyXG4gICk7XHJcblxyXG4gIHB1YmxpYyBkcmFnZW5kID0gKGdyb3VwTmFtZT86IHN0cmluZykgPT4gdGhpcy5kaXNwYXRjaCQucGlwZShcclxuICAgIGZpbHRlckV2ZW50KFxyXG4gICAgICBFdmVudFR5cGVzLkRyYWdFbmQsXHJcbiAgICAgIGdyb3VwTmFtZSxcclxuICAgICAgKG5hbWUsIFtlbF06IFtFbGVtZW50XSkgPT4gKHsgbmFtZSwgZWwgfSlcclxuICAgIClcclxuICApO1xyXG5cclxuICBwdWJsaWMgZHJvcCA9IChncm91cE5hbWU/OiBzdHJpbmcpID0+IHRoaXMuZGlzcGF0Y2gkLnBpcGUoXHJcbiAgICBmaWx0ZXJFdmVudChcclxuICAgICAgRXZlbnRUeXBlcy5Ecm9wLFxyXG4gICAgICBncm91cE5hbWUsXHJcbiAgICAgIChuYW1lLCBbXHJcbiAgICAgICAgZWwsIHRhcmdldCwgc291cmNlLCBzaWJsaW5nXHJcbiAgICAgIF06IFtFbGVtZW50LCBFbGVtZW50LCBFbGVtZW50LCBFbGVtZW50XSkgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IG5hbWUsIGVsLCB0YXJnZXQsIHNvdXJjZSwgc2libGluZyB9O1xyXG4gICAgICB9KVxyXG4gICk7XHJcblxyXG4gIHByaXZhdGUgZWxDb250YWluZXJTb3VyY2UgPVxyXG4gICAgKGV2ZW50VHlwZTogRXZlbnRUeXBlcykgPT5cclxuICAgIChncm91cE5hbWU/OiBzdHJpbmcpID0+XHJcbiAgICB0aGlzLmRpc3BhdGNoJC5waXBlKFxyXG4gICAgICBmaWx0ZXJFdmVudChldmVudFR5cGUsIGdyb3VwTmFtZSwgZWxDb250YWluZXJTb3VyY2VQcm9qZWN0b3IpXHJcbiAgICApO1xyXG5cclxuICBwdWJsaWMgY2FuY2VsID0gdGhpcy5lbENvbnRhaW5lclNvdXJjZShFdmVudFR5cGVzLkNhbmNlbCk7XHJcbiAgcHVibGljIHJlbW92ZSA9IHRoaXMuZWxDb250YWluZXJTb3VyY2UoRXZlbnRUeXBlcy5SZW1vdmUpO1xyXG4gIHB1YmxpYyBzaGFkb3cgPSB0aGlzLmVsQ29udGFpbmVyU291cmNlKEV2ZW50VHlwZXMuU2hhZG93KTtcclxuICBwdWJsaWMgb3ZlciA9IHRoaXMuZWxDb250YWluZXJTb3VyY2UoRXZlbnRUeXBlcy5PdmVyKTtcclxuICBwdWJsaWMgb3V0ID0gdGhpcy5lbENvbnRhaW5lclNvdXJjZShFdmVudFR5cGVzLk91dCk7XHJcblxyXG4gIHB1YmxpYyBjbG9uZWQgPSAoZ3JvdXBOYW1lPzogc3RyaW5nKSA9PiB0aGlzLmRpc3BhdGNoJC5waXBlKFxyXG4gICAgZmlsdGVyRXZlbnQoXHJcbiAgICAgIEV2ZW50VHlwZXMuQ2xvbmVkLFxyXG4gICAgICBncm91cE5hbWUsXHJcbiAgICAgIChuYW1lLCBbXHJcbiAgICAgICAgY2xvbmUsIG9yaWdpbmFsLCBjbG9uZVR5cGVcclxuICAgICAgXTogW0VsZW1lbnQsIEVsZW1lbnQsICdtaXJyb3InIHwgJ2NvcHknXSkgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IG5hbWUsIGNsb25lLCBvcmlnaW5hbCwgY2xvbmVUeXBlIH1cclxuICAgICAgfSlcclxuICApO1xyXG5cclxuICBwdWJsaWMgZHJvcE1vZGVsID0gPFQgPSBhbnk+KGdyb3VwTmFtZT86IHN0cmluZykgPT4gdGhpcy5kaXNwYXRjaCQucGlwZShcclxuICAgIGZpbHRlckV2ZW50KFxyXG4gICAgICBFdmVudFR5cGVzLkRyb3BNb2RlbCxcclxuICAgICAgZ3JvdXBOYW1lLFxyXG4gICAgICAobmFtZSwgW1xyXG4gICAgICAgIGVsLCB0YXJnZXQsIHNvdXJjZSwgc2libGluZywgaXRlbSwgc291cmNlTW9kZWwsIHRhcmdldE1vZGVsLCBzb3VyY2VJbmRleCwgdGFyZ2V0SW5kZXhcclxuICAgICAgXTogW0VsZW1lbnQsIEVsZW1lbnQsIEVsZW1lbnQsIEVsZW1lbnQsIFQsIFRbXSwgVFtdLCBudW1iZXIsIG51bWJlcl0pID0+IHtcclxuICAgICAgICByZXR1cm4geyBuYW1lLCBlbCwgdGFyZ2V0LCBzb3VyY2UsIHNpYmxpbmcsIGl0ZW0sIHNvdXJjZU1vZGVsLCB0YXJnZXRNb2RlbCwgc291cmNlSW5kZXgsIHRhcmdldEluZGV4IH1cclxuICAgICAgfSlcclxuICApO1xyXG5cclxuICBwdWJsaWMgcmVtb3ZlTW9kZWwgPSA8VCA9IGFueT4oZ3JvdXBOYW1lPzogc3RyaW5nKSA9PiB0aGlzLmRpc3BhdGNoJC5waXBlKFxyXG4gICAgZmlsdGVyRXZlbnQoXHJcbiAgICAgIEV2ZW50VHlwZXMuUmVtb3ZlTW9kZWwsXHJcbiAgICAgIGdyb3VwTmFtZSxcclxuICAgICAgKG5hbWUsIFtcclxuICAgICAgICBlbCwgY29udGFpbmVyLCBzb3VyY2UsIGl0ZW0sIHNvdXJjZU1vZGVsLCBzb3VyY2VJbmRleFxyXG4gICAgICBdOiBbRWxlbWVudCwgRWxlbWVudCwgRWxlbWVudCwgVCwgVFtdLCBudW1iZXJdKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgbmFtZSwgZWwsIGNvbnRhaW5lciwgc291cmNlLCBpdGVtLCBzb3VyY2VNb2RlbCwgc291cmNlSW5kZXggfVxyXG4gICAgICB9XHJcbiAgICApXHJcbiAgKTtcclxuXHJcbiAgcHJpdmF0ZSBncm91cHM6IHsgW2s6IHN0cmluZ106IEdyb3VwIH0gPSB7fTtcclxuXHJcbiAgY29uc3RydWN0b3IgKEBPcHRpb25hbCgpIHByaXZhdGUgZHJha2VGYWN0b3J5OiBEcmFrZUZhY3RvcnkgPSBudWxsKSB7XHJcbiAgICBpZiAodGhpcy5kcmFrZUZhY3RvcnkgPT09IG51bGwpIHtcclxuICAgICAgdGhpcy5kcmFrZUZhY3RvcnkgPSBuZXcgRHJha2VGYWN0b3J5KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogUHVibGljIG1haW5seSBmb3IgdGVzdGluZyBwdXJwb3Nlcy4gUHJlZmVyIGBjcmVhdGVHcm91cCgpYC4gKi9cclxuICBwdWJsaWMgYWRkKGdyb3VwOiBHcm91cCk6IEdyb3VwIHtcclxuICAgIGxldCBleGlzdGluZ0dyb3VwID0gdGhpcy5maW5kKGdyb3VwLm5hbWUpO1xyXG4gICAgaWYgKGV4aXN0aW5nR3JvdXApIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdHcm91cCBuYW1lZDogXCInICsgZ3JvdXAubmFtZSArICdcIiBhbHJlYWR5IGV4aXN0cy4nKTtcclxuICAgIH1cclxuICAgIHRoaXMuZ3JvdXBzW2dyb3VwLm5hbWVdID0gZ3JvdXA7XHJcbiAgICB0aGlzLmhhbmRsZU1vZGVscyhncm91cCk7XHJcbiAgICB0aGlzLnNldHVwRXZlbnRzKGdyb3VwKTtcclxuICAgIHJldHVybiBncm91cDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBmaW5kKG5hbWU6IHN0cmluZyk6IEdyb3VwIHtcclxuICAgIHJldHVybiB0aGlzLmdyb3Vwc1tuYW1lXTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkZXN0cm95KG5hbWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgbGV0IGdyb3VwID0gdGhpcy5maW5kKG5hbWUpO1xyXG4gICAgaWYgKCFncm91cCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBncm91cC5kcmFrZSAmJiBncm91cC5kcmFrZS5kZXN0cm95KCk7XHJcbiAgICBkZWxldGUgdGhpcy5ncm91cHNbbmFtZV07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIGEgZ3JvdXAgd2l0aCB0aGUgc3BlY2lmaWVkIG5hbWUgYW5kIG9wdGlvbnMuXHJcbiAgICpcclxuICAgKiBOb3RlOiBmb3JtZXJseSBrbm93biBhcyBgc2V0T3B0aW9uc2BcclxuICAgKi9cclxuICBwdWJsaWMgY3JlYXRlR3JvdXA8VCA9IGFueT4obmFtZTogc3RyaW5nLCBvcHRpb25zOiBEcmFndWxhT3B0aW9uczxUPik6IEdyb3VwIHtcclxuICAgIHJldHVybiB0aGlzLmFkZChuZXcgR3JvdXAoXHJcbiAgICAgIG5hbWUsXHJcbiAgICAgIHRoaXMuZHJha2VGYWN0b3J5LmJ1aWxkKFtdLCBvcHRpb25zKSxcclxuICAgICAgb3B0aW9uc1xyXG4gICAgKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZU1vZGVscyh7IG5hbWUsIGRyYWtlLCBvcHRpb25zIH06IEdyb3VwKTogdm9pZCB7XHJcbiAgICBsZXQgZHJhZ0VsbTogYW55O1xyXG4gICAgbGV0IGRyYWdJbmRleDogbnVtYmVyO1xyXG4gICAgbGV0IGRyb3BJbmRleDogbnVtYmVyO1xyXG4gICAgZHJha2Uub24oJ3JlbW92ZScsIChlbDogYW55LCBjb250YWluZXI6IGFueSwgc291cmNlOiBhbnkpID0+IHtcclxuICAgICAgaWYgKCFkcmFrZS5tb2RlbHMpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgbGV0IHNvdXJjZU1vZGVsID0gZHJha2UubW9kZWxzW2RyYWtlLmNvbnRhaW5lcnMuaW5kZXhPZihzb3VyY2UpXTtcclxuICAgICAgc291cmNlTW9kZWwgPSBzb3VyY2VNb2RlbC5zbGljZSgwKTsgLy8gY2xvbmUgaXRcclxuICAgICAgY29uc3QgaXRlbSA9IHNvdXJjZU1vZGVsLnNwbGljZShkcmFnSW5kZXgsIDEpWzBdO1xyXG4gICAgICAvLyBjb25zb2xlLmxvZygnUkVNT1ZFJyk7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKHNvdXJjZU1vZGVsKTtcclxuICAgICAgdGhpcy5kaXNwYXRjaCQubmV4dCh7XHJcbiAgICAgICAgZXZlbnQ6IEV2ZW50VHlwZXMuUmVtb3ZlTW9kZWwsXHJcbiAgICAgICAgbmFtZSxcclxuICAgICAgICBhcmdzOiBbIGVsLCBjb250YWluZXIsIHNvdXJjZSwgaXRlbSwgc291cmNlTW9kZWwsIGRyYWdJbmRleCBdXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICBkcmFrZS5vbignZHJhZycsIChlbDogYW55LCBzb3VyY2U6IGFueSkgPT4ge1xyXG4gICAgICBpZiAoIWRyYWtlLm1vZGVscykge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBkcmFnRWxtID0gZWw7XHJcbiAgICAgIGRyYWdJbmRleCA9IHRoaXMuZG9tSW5kZXhPZihlbCwgc291cmNlKTtcclxuICAgIH0pO1xyXG4gICAgZHJha2Uub24oJ2Ryb3AnLCAoZHJvcEVsbTogYW55LCB0YXJnZXQ6IEVsZW1lbnQsIHNvdXJjZTogRWxlbWVudCwgc2libGluZz86IEVsZW1lbnQpID0+IHtcclxuICAgICAgaWYgKCFkcmFrZS5tb2RlbHMgfHwgIXRhcmdldCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBkcm9wSW5kZXggPSB0aGlzLmRvbUluZGV4T2YoZHJvcEVsbSwgdGFyZ2V0KTtcclxuICAgICAgbGV0IHNvdXJjZU1vZGVsID0gZHJha2UubW9kZWxzW2RyYWtlLmNvbnRhaW5lcnMuaW5kZXhPZihzb3VyY2UpXTtcclxuICAgICAgbGV0IHRhcmdldE1vZGVsID0gZHJha2UubW9kZWxzW2RyYWtlLmNvbnRhaW5lcnMuaW5kZXhPZih0YXJnZXQpXTtcclxuICAgICAgLy8gY29uc29sZS5sb2coJ0RST1AnKTtcclxuICAgICAgLy8gY29uc29sZS5sb2coc291cmNlTW9kZWwpO1xyXG4gICAgICBsZXQgaXRlbTogYW55O1xyXG4gICAgICBpZiAodGFyZ2V0ID09PSBzb3VyY2UpIHtcclxuICAgICAgICBzb3VyY2VNb2RlbCA9IHNvdXJjZU1vZGVsLnNsaWNlKDApXHJcbiAgICAgICAgaXRlbSA9IHNvdXJjZU1vZGVsLnNwbGljZShkcmFnSW5kZXgsIDEpWzBdO1xyXG4gICAgICAgIHNvdXJjZU1vZGVsLnNwbGljZShkcm9wSW5kZXgsIDAsIGl0ZW0pO1xyXG4gICAgICAgIC8vIHRoaXMgd2FzIHRydWUgYmVmb3JlIHdlIGNsb25lZCBhbmQgdXBkYXRlZCBzb3VyY2VNb2RlbCxcclxuICAgICAgICAvLyBidXQgdGFyZ2V0TW9kZWwgc3RpbGwgaGFzIHRoZSBvbGQgdmFsdWVcclxuICAgICAgICB0YXJnZXRNb2RlbCA9IHNvdXJjZU1vZGVsO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxldCBpc0NvcHlpbmcgPSBkcmFnRWxtICE9PSBkcm9wRWxtO1xyXG4gICAgICAgIGl0ZW0gPSBzb3VyY2VNb2RlbFtkcmFnSW5kZXhdO1xyXG4gICAgICAgIGlmIChpc0NvcHlpbmcpIHtcclxuICAgICAgICAgIGlmICghb3B0aW9ucy5jb3B5SXRlbSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJZiB5b3UgaGF2ZSBlbmFibGVkIGBjb3B5YCBvbiBhIGdyb3VwLCB5b3UgbXVzdCBwcm92aWRlIGEgYGNvcHlJdGVtYCBmdW5jdGlvbi5cIilcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGl0ZW0gPSBvcHRpb25zLmNvcHlJdGVtKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFpc0NvcHlpbmcpIHtcclxuICAgICAgICAgIHNvdXJjZU1vZGVsID0gc291cmNlTW9kZWwuc2xpY2UoMClcclxuICAgICAgICAgIHNvdXJjZU1vZGVsLnNwbGljZShkcmFnSW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0YXJnZXRNb2RlbCA9IHRhcmdldE1vZGVsLnNsaWNlKDApXHJcbiAgICAgICAgdGFyZ2V0TW9kZWwuc3BsaWNlKGRyb3BJbmRleCwgMCwgaXRlbSk7XHJcbiAgICAgICAgaWYgKGlzQ29weWluZykge1xyXG4gICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdGFyZ2V0LnJlbW92ZUNoaWxkKGRyb3BFbG0pO1xyXG4gICAgICAgICAgfSBjYXRjaCAoZSkge31cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5kaXNwYXRjaCQubmV4dCh7XHJcbiAgICAgICAgZXZlbnQ6IEV2ZW50VHlwZXMuRHJvcE1vZGVsLFxyXG4gICAgICAgIG5hbWUsXHJcbiAgICAgICAgYXJnczogWyBkcm9wRWxtLCB0YXJnZXQsIHNvdXJjZSwgc2libGluZywgaXRlbSwgc291cmNlTW9kZWwsIHRhcmdldE1vZGVsLCBkcmFnSW5kZXgsIGRyb3BJbmRleCBdXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNldHVwRXZlbnRzKGdyb3VwOiBHcm91cCk6IHZvaWQge1xyXG4gICAgaWYgKGdyb3VwLmluaXRFdmVudHMpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgZ3JvdXAuaW5pdEV2ZW50cyA9IHRydWU7XHJcbiAgICBjb25zdCBuYW1lID0gZ3JvdXAubmFtZTtcclxuICAgIGxldCB0aGF0OiBhbnkgPSB0aGlzO1xyXG4gICAgbGV0IGVtaXR0ZXIgPSAoZXZlbnQ6IEV2ZW50VHlwZXMpID0+IHtcclxuICAgICAgZ3JvdXAuZHJha2Uub24oZXZlbnQsICguLi5hcmdzOiBhbnlbXSkgPT4ge1xyXG4gICAgICAgIHRoaXMuZGlzcGF0Y2gkLm5leHQoeyBldmVudCwgbmFtZSwgYXJncyB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgQWxsRXZlbnRzLmZvckVhY2goZW1pdHRlcik7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRvbUluZGV4T2YoY2hpbGQ6IGFueSwgcGFyZW50OiBhbnkpOiBhbnkge1xyXG4gICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwocGFyZW50LmNoaWxkcmVuLCBjaGlsZCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE91dHB1dCwgRWxlbWVudFJlZiwgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgU2ltcGxlQ2hhbmdlLCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRHJhZ3VsYVNlcnZpY2UgfSBmcm9tICcuL2RyYWd1bGEuc2VydmljZSc7XHJcbmltcG9ydCB7IERyYWtlV2l0aE1vZGVscyB9IGZyb20gJy4uL0RyYWtlV2l0aE1vZGVscyc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uL0dyb3VwJztcclxuXHJcbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW2RyYWd1bGFdJ30pXHJcbmV4cG9ydCBjbGFzcyBEcmFndWxhRGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBkcmFndWxhOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgcHVibGljIGRyYWd1bGFNb2RlbDogYW55W107XHJcbiAgQE91dHB1dCgpIHB1YmxpYyBkcmFndWxhTW9kZWxDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueVtdPigpO1xyXG5cclxuICBwcml2YXRlIHN1YnM6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgcHJpdmF0ZSBnZXQgY29udGFpbmVyKCk6IEhUTUxFbGVtZW50IHtcclxuICAgIHJldHVybiB0aGlzLmVsICYmIHRoaXMuZWwubmF0aXZlRWxlbWVudDtcclxuICB9XHJcbiAgcHJpdmF0ZSBncm91cDogR3JvdXA7XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmLCBwcml2YXRlIGRyYWd1bGFTZXJ2aWNlOiBEcmFndWxhU2VydmljZSkge1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHtkcmFndWxhPzogU2ltcGxlQ2hhbmdlLCBkcmFndWxhTW9kZWw/OiBTaW1wbGVDaGFuZ2V9KTogdm9pZCB7XHJcbiAgICBpZiAoY2hhbmdlcyAmJiBjaGFuZ2VzLmRyYWd1bGEpIHtcclxuICAgICAgY29uc3QgeyBwcmV2aW91c1ZhbHVlOiBwcmV2LCBjdXJyZW50VmFsdWU6IGN1cnJlbnQsIGZpcnN0Q2hhbmdlIH0gPSBjaGFuZ2VzLmRyYWd1bGE7XHJcbiAgICAgIGxldCBoYWRQcmV2aW91c1ZhbHVlID0gISFwcmV2O1xyXG4gICAgICBsZXQgaGFzTmV3VmFsdWUgPSAhIWN1cnJlbnQ7XHJcbiAgICAgIC8vIHNvbWV0aGluZyAtPiBudWxsICAgICAgID0+ICB0ZWFyZG93biBvbmx5XHJcbiAgICAgIC8vIHNvbWV0aGluZyAtPiBzb21ldGhpbmcgID0+ICB0ZWFyZG93biwgdGhlbiBzZXR1cFxyXG4gICAgICAvLyAgICAgIG51bGwgLT4gc29tZXRoaW5nICA9PiAgc2V0dXAgb25seVxyXG4gICAgICAvL1xyXG4gICAgICAvLyAgICAgIG51bGwgLT4gbnVsbCAocHJlY2x1ZGVkIGJ5IGZhY3Qgb2YgY2hhbmdlIGJlaW5nIHByZXNlbnQpXHJcbiAgICAgIGlmIChoYWRQcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy50ZWFyZG93bihwcmV2KTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoaGFzTmV3VmFsdWUpIHtcclxuICAgICAgICB0aGlzLnNldHVwKCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoY2hhbmdlcyAmJiBjaGFuZ2VzLmRyYWd1bGFNb2RlbCkge1xyXG4gICAgICAvLyB0aGlzIGNvZGUgb25seSBydW5zIHdoZW4geW91J3JlIG5vdCBjaGFuZ2luZyB0aGUgZ3JvdXAgbmFtZVxyXG4gICAgICAvLyBiZWNhdXNlIGlmIHlvdSdyZSBjaGFuZ2luZyB0aGUgZ3JvdXAgbmFtZSwgeW91J2xsIGJlIGRvaW5nIHNldHVwIG9yIHRlYXJkb3duXHJcbiAgICAgIC8vIGl0IGFsc28gb25seSBydW5zIGlmIHRoZXJlIGlzIGEgZ3JvdXAgbmFtZSB0byBhdHRhY2ggdG8uXHJcbiAgICAgIGNvbnN0IHsgcHJldmlvdXNWYWx1ZTogcHJldiwgY3VycmVudFZhbHVlOiBjdXJyZW50LCBmaXJzdENoYW5nZSB9ID0gY2hhbmdlcy5kcmFndWxhTW9kZWw7XHJcbiAgICAgIGNvbnN0IHsgZHJha2UgfSA9IHRoaXMuZ3JvdXA7XHJcbiAgICAgIGlmICh0aGlzLmRyYWd1bGEgJiYgZHJha2UpIHtcclxuICAgICAgICBkcmFrZS5tb2RlbHMgPSBkcmFrZS5tb2RlbHMgfHwgW107XHJcbiAgICAgICAgbGV0IHByZXZJbmRleCA9IGRyYWtlLm1vZGVscy5pbmRleE9mKHByZXYpO1xyXG4gICAgICAgIGlmIChwcmV2SW5kZXggIT09IC0xKSB7XHJcbiAgICAgICAgICAvLyBkZWxldGUgdGhlIHByZXZpb3VzXHJcbiAgICAgICAgICBkcmFrZS5tb2RlbHMuc3BsaWNlKHByZXZJbmRleCwgMSk7XHJcbiAgICAgICAgICAvLyBtYXliZSBpbnNlcnQgYSBuZXcgb25lIGF0IHRoZSBzYW1lIHNwb3RcclxuICAgICAgICAgIGlmICghIWN1cnJlbnQpIHtcclxuICAgICAgICAgICAgZHJha2UubW9kZWxzLnNwbGljZShwcmV2SW5kZXgsIDAsIGN1cnJlbnQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoISFjdXJyZW50KSB7XHJcbiAgICAgICAgICAvLyBubyBwcmV2aW91cyBvbmUgdG8gcmVtb3ZlOyBqdXN0IHB1c2ggdGhpcyBvbmUuXHJcbiAgICAgICAgICBkcmFrZS5tb2RlbHMucHVzaChjdXJyZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIGNhbGwgbmdPbkluaXQgJ3NldHVwJyBiZWNhdXNlIHdlIHdhbnQgdG8gY2FsbCBpdCBpbiBuZ09uQ2hhbmdlc1xyXG4gIC8vIGFuZCBpdCB3b3VsZCBvdGhlcndpc2UgcnVuIHR3aWNlXHJcbiAgcHVibGljIHNldHVwKCk6IHZvaWQge1xyXG4gICAgbGV0IGNoZWNrTW9kZWwgPSAoZ3JvdXA6IEdyb3VwKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLmRyYWd1bGFNb2RlbCkge1xyXG4gICAgICAgIGlmIChncm91cC5kcmFrZS5tb2RlbHMpIHtcclxuICAgICAgICAgIGdyb3VwLmRyYWtlLm1vZGVscy5wdXNoKHRoaXMuZHJhZ3VsYU1vZGVsKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZ3JvdXAuZHJha2UubW9kZWxzID0gW3RoaXMuZHJhZ3VsYU1vZGVsXTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy8gZmluZCBvciBjcmVhdGUgYSBncm91cFxyXG4gICAgbGV0IGdyb3VwID0gdGhpcy5kcmFndWxhU2VydmljZS5maW5kKHRoaXMuZHJhZ3VsYSk7XHJcbiAgICBpZiAoIWdyb3VwKSB7XHJcbiAgICAgIGxldCBvcHRpb25zID0ge307XHJcbiAgICAgIGdyb3VwID0gdGhpcy5kcmFndWxhU2VydmljZS5jcmVhdGVHcm91cCh0aGlzLmRyYWd1bGEsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGVuc3VyZSBtb2RlbCBhbmQgY29udGFpbmVyIGVsZW1lbnQgYXJlIHB1c2hlZFxyXG4gICAgY2hlY2tNb2RlbChncm91cCk7XHJcbiAgICBncm91cC5kcmFrZS5jb250YWluZXJzLnB1c2godGhpcy5jb250YWluZXIpO1xyXG4gICAgdGhpcy5zdWJzY3JpYmUodGhpcy5kcmFndWxhKTtcclxuXHJcbiAgICB0aGlzLmdyb3VwID0gZ3JvdXA7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3Vic2NyaWJlKG5hbWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5zdWJzID0gbmV3IFN1YnNjcmlwdGlvbigpO1xyXG4gICAgdGhpcy5zdWJzLmFkZChcclxuICAgICAgdGhpcy5kcmFndWxhU2VydmljZVxyXG4gICAgICAuZHJvcE1vZGVsKG5hbWUpXHJcbiAgICAgIC5zdWJzY3JpYmUoKHsgc291cmNlLCB0YXJnZXQsIHNvdXJjZU1vZGVsLCB0YXJnZXRNb2RlbCB9KSA9PiB7XHJcbiAgICAgICAgaWYgKHNvdXJjZSA9PT0gdGhpcy5lbC5uYXRpdmVFbGVtZW50KSB7XHJcbiAgICAgICAgICB0aGlzLmRyYWd1bGFNb2RlbENoYW5nZS5lbWl0KHNvdXJjZU1vZGVsKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRhcmdldCA9PT0gdGhpcy5lbC5uYXRpdmVFbGVtZW50KSB7XHJcbiAgICAgICAgICB0aGlzLmRyYWd1bGFNb2RlbENoYW5nZS5lbWl0KHRhcmdldE1vZGVsKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gICAgdGhpcy5zdWJzLmFkZChcclxuICAgICAgdGhpcy5kcmFndWxhU2VydmljZVxyXG4gICAgICAucmVtb3ZlTW9kZWwobmFtZSlcclxuICAgICAgLnN1YnNjcmliZSgoeyBzb3VyY2UsIHNvdXJjZU1vZGVsIH0pID0+IHtcclxuICAgICAgICBpZiAoc291cmNlID09PSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgICAgIHRoaXMuZHJhZ3VsYU1vZGVsQ2hhbmdlLmVtaXQoc291cmNlTW9kZWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdGVhcmRvd24oZ3JvdXBOYW1lOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnN1YnMpIHtcclxuICAgICAgdGhpcy5zdWJzLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBncm91cCA9IHRoaXMuZHJhZ3VsYVNlcnZpY2UuZmluZChncm91cE5hbWUpO1xyXG4gICAgaWYgKGdyb3VwKSB7XHJcbiAgICAgIGNvbnN0IGl0ZW1Ub1JlbW92ZSA9IGdyb3VwLmRyYWtlLmNvbnRhaW5lcnMuaW5kZXhPZih0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgICBpZiAoaXRlbVRvUmVtb3ZlICE9PSAtMSkge1xyXG4gICAgICAgIGdyb3VwLmRyYWtlLmNvbnRhaW5lcnMuc3BsaWNlKGl0ZW1Ub1JlbW92ZSwgMSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMuZHJhZ3VsYU1vZGVsICYmIGdyb3VwLmRyYWtlICYmIGdyb3VwLmRyYWtlLm1vZGVscykge1xyXG4gICAgICAgIGxldCBtb2RlbEluZGV4ID0gZ3JvdXAuZHJha2UubW9kZWxzLmluZGV4T2YodGhpcy5kcmFndWxhTW9kZWwpO1xyXG4gICAgICAgIGlmIChtb2RlbEluZGV4ICE9PSAtMSkge1xyXG4gICAgICAgICAgZ3JvdXAuZHJha2UubW9kZWxzLnNwbGljZShtb2RlbEluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMudGVhcmRvd24odGhpcy5kcmFndWxhKTtcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERyYWd1bGFEaXJlY3RpdmUgfSBmcm9tICcuL2RyYWd1bGEuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgRHJhZ3VsYVNlcnZpY2UgfSBmcm9tICcuL2RyYWd1bGEuc2VydmljZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGV4cG9ydHM6IFtEcmFndWxhRGlyZWN0aXZlXSxcclxuICBkZWNsYXJhdGlvbnM6IFtEcmFndWxhRGlyZWN0aXZlXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIERyYWd1bGFNb2R1bGUge1xyXG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IERyYWd1bGFNb2R1bGUsXHJcbiAgICAgIHByb3ZpZGVyczogW0RyYWd1bGFTZXJ2aWNlXVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgRHJha2VXaXRoTW9kZWxzIH0gZnJvbSAnLi9EcmFrZVdpdGhNb2RlbHMnO1xyXG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IEV2ZW50VHlwZXMgfSBmcm9tICcuL0V2ZW50VHlwZXMnO1xyXG5pbXBvcnQgeyBEcmFndWxhT3B0aW9ucyB9IGZyb20gJy4vRHJhZ3VsYU9wdGlvbnMnO1xyXG5pbXBvcnQgeyBEcmFrZUZhY3RvcnkgfSBmcm9tICcuL0RyYWtlRmFjdG9yeSc7XHJcblxyXG5leHBvcnQgY29uc3QgTW9ja0RyYWtlRmFjdG9yeSA9IG5ldyBEcmFrZUZhY3RvcnkoKGNvbnRhaW5lcnMsIG9wdGlvbnMpID0+IHtcclxuICByZXR1cm4gbmV3IE1vY2tEcmFrZShjb250YWluZXJzLCBvcHRpb25zKTtcclxufSk7XHJcblxyXG4vKiogWW91IGNhbiB1c2UgTW9ja0RyYWtlIHRvIHNpbXVsYXRlIERyYWtlIGV2ZW50cy5cclxuICpcclxuICogVGhlIHRocmVlIG1ldGhvZHMgdGhhdCBhY3R1YWxseSBkbyBhbnl0aGluZyBhcmUgYG9uKGV2ZW50LCBsaXN0ZW5lcilgLFxyXG4gKiBgZGVzdHJveSgpYCwgYW5kIGEgbmV3IG1ldGhvZCwgYGVtaXQoKWAuIFVzZSBgZW1pdCgpYCB0byBtYW51YWxseSBlbWl0IERyYWtlXHJcbiAqIGV2ZW50cywgYW5kIGlmIHlvdSBpbmplY3RlZCBNb2NrRHJha2UgcHJvcGVybHkgd2l0aCBNb2NrRHJha2VGYWN0b3J5IG9yXHJcbiAqIG1vY2tlZCB0aGUgRHJhZ3VsYVNlcnZpY2UuZmluZCgpIG1ldGhvZCwgdGhlbiB5b3UgY2FuIG1ha2UgbmcyLWRyYWd1bGEgdGhpbmtcclxuICogZHJhZ3MgYW5kIGRyb3BzIGFyZSBoYXBwZW5pbmcuXHJcbiAqXHJcbiAqIENhdmVhdHM6XHJcbiAqXHJcbiAqIDEuIFlPVSBNVVNUIE1BS0UgVEhFIERPTSBDSEFOR0VTIFlPVVJTRUxGLlxyXG4gKiAyLiBSRVBFQVQ6IFlPVSBNVVNUIE1BS0UgVEhFIERPTSBDSEFOR0VTIFlPVVJTRUxGLlxyXG4gKiAgICBUaGF0IG1lYW5zIGBzb3VyY2UucmVtb3ZlQ2hpbGQoZWwpYCwgYW5kIGB0YXJnZXQuaW5zZXJ0QmVmb3JlKGVsKWAuXHJcbiAqIDMuIE5vbmUgb2YgdGhlIG90aGVyIG1ldGhvZHMgZG8gYW55dGhpbmcuXHJcbiAqICAgIFRoYXQncyBvaywgYmVjYXVzZSBuZzItZHJhZ3VsYSBkb2Vzbid0IHVzZSB0aGVtLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1vY2tEcmFrZSBpbXBsZW1lbnRzIERyYWtlV2l0aE1vZGVscyB7XHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIGNvbnRhaW5lcnMgQSBsaXN0IG9mIGNvbnRhaW5lciBlbGVtZW50cy5cclxuICAgKiBAcGFyYW0gb3B0aW9ucyBUaGVzZSB3aWxsIE5PVCBiZSB1c2VkLiBBdCBhbGwuXHJcbiAgICogQHBhcmFtIG1vZGVscyBOb25zdGFuZGFyZCwgYnV0IHVzZWZ1bCBmb3IgdGVzdGluZyB1c2luZyBgbmV3IE1vY2tEcmFrZSgpYCBkaXJlY3RseS5cclxuICAgKiAgICAgICAgICAgICAgIE5vdGUsIGRlZmF1bHQgdmFsdWUgaXMgdW5kZWZpbmVkLCBsaWtlIGEgcmVhbCBEcmFrZS4gRG9uJ3QgY2hhbmdlIHRoYXQuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgY29udGFpbmVyczogRWxlbWVudFtdID0gW10sXHJcbiAgICBwdWJsaWMgb3B0aW9uczogRHJhZ3VsYU9wdGlvbnMgPSB7fSxcclxuICAgIHB1YmxpYyBtb2RlbHM/OiBhbnlbXVtdXHJcbiAgKSB7fVxyXG5cclxuICAvKiBEb2Vzbid0IHJlcHJlc2VudCBhbnl0aGluZyBtZWFuaW5nZnVsLiAqL1xyXG4gIGRyYWdnaW5nOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qIERvZXMgbm90aGluZyB1c2VmdWwuICovXHJcbiAgc3RhcnQoaXRlbTogRWxlbWVudCk6IGFueSB7XHJcbiAgICB0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcclxuICB9XHJcbiAgLyogRG9lcyBub3RoaW5nIHVzZWZ1bC4gKi9cclxuICBlbmQoKTogYW55IHtcclxuICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcclxuICB9XHJcbiAgLyogRG9lcyBub3RoaW5nIHVzZWZ1bC4gKi9cclxuICBjYW5jZWwocmV2ZXJ0OiBib29sZWFuKTogYW55O1xyXG4gIGNhbmNlbCgpOiBhbnk7XHJcbiAgY2FuY2VsKHJldmVydD86IGFueSkge1xyXG4gICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xyXG4gIH1cclxuICAvKiBEb2VzIG5vdGhpbmcgdXNlZnVsLiAqL1xyXG4gIHJlbW92ZSgpOiBhbnkge1xyXG4gICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLy8gQmFzaWMgYnV0IGZ1bGx5IGZ1bmN0aW9uYWwgZXZlbnQgZW1pdHRlciBzaGltXHJcbiAgcHJpdmF0ZSBlbWl0dGVyJCA9IG5ldyBTdWJqZWN0PHsgZXZlbnRUeXBlOiBFdmVudFR5cGVzLCBhcmdzOiBhbnlbXSB9PigpO1xyXG5cclxuICBwcml2YXRlIHN1YnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XHJcblxyXG4gIG9uKGV2ZW50OiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbik6IGFueSB7XHJcbiAgICB0aGlzLnN1YnMuYWRkKHRoaXMuZW1pdHRlciRcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgZmlsdGVyKCh7IGV2ZW50VHlwZSB9KSA9PiBldmVudFR5cGUgPT09IGV2ZW50KVxyXG4gICAgICApXHJcbiAgICAgIC5zdWJzY3JpYmUoKHsgYXJncyB9KSA9PiB7XHJcbiAgICAgICAgY2FsbGJhY2soLi4uYXJncyk7XHJcbiAgICAgIH0pKTtcclxuICB9XHJcblxyXG4gIGRlc3Ryb3koKTogYW55IHtcclxuICAgIHRoaXMuc3Vicy51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBpcyB0aGUgbW9zdCB1c2VmdWwgbWV0aG9kLiBZb3UgY2FuIHVzZSBpdCB0byBtYW51YWxseSBmaXJlIGV2ZW50cyB0aGF0IHdvdWxkIG5vcm1hbGx5XHJcbiAgICogYmUgZmlyZWQgYnkgYSByZWFsIGRyYWtlLlxyXG4gICAqXHJcbiAgICogWW91J3JlIGxpa2VseSBtb3N0IGludGVyZXN0ZWQgaW4gZmlyaW5nIGBkcmFnYCwgYHJlbW92ZWAgYW5kIGBkcm9wYCwgdGhlIHRocmVlIGV2ZW50c1xyXG4gICAqIERyYWd1bGFTZXJ2aWNlIHVzZXMgdG8gaW1wbGVtZW50IFtkcmFndWxhTW9kZWxdLlxyXG4gICAqXHJcbiAgICogU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9iZXZhY3F1YS9kcmFndWxhI2RyYWtlb24tZXZlbnRzIGZvciB3aGF0IHlvdSBzaG91bGQgZW1pdCAoYW5kIGluIHdoYXQgb3JkZXIpLlxyXG4gICAqXHJcbiAgICogKE5vdGUgYWxzbywgZmlyaW5nIGRyb3BNb2RlbCBhbmQgcmVtb3ZlTW9kZWwgd29uJ3Qgd29yay4gWW91IHdvdWxkIGhhdmUgdG8gbW9jayBEcmFndWxhU2VydmljZSBmb3IgdGhhdC4pXHJcbiAgICovXHJcbiAgZW1pdChldmVudFR5cGU6IEV2ZW50VHlwZXMsIC4uLmFyZ3M6IGFueVtdKSB7XHJcbiAgICB0aGlzLmVtaXR0ZXIkLm5leHQoeyBldmVudFR5cGUsIGFyZ3MgfSlcclxuICB9XHJcblxyXG59XHJcbiJdLCJuYW1lcyI6WyIoIC8qKiBAdHlwZSB7P30gKi8oZHJhZ3VsYUV4cHQpKS5kZWZhdWx0IiwiZmlsdGVyIiwibWFwIiwiU3ViamVjdCIsIkluamVjdGFibGUiLCJPcHRpb25hbCIsIkV2ZW50RW1pdHRlciIsIlN1YnNjcmlwdGlvbiIsIkRpcmVjdGl2ZSIsIkVsZW1lbnRSZWYiLCJJbnB1dCIsIk91dHB1dCIsIk5nTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztJQUFBOzs7Ozs7Ozs7Ozs7OztBQWNBLG9CQXVHdUIsQ0FBQyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLEdBQUcsT0FBTyxNQUFNLEtBQUssVUFBVSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLENBQUM7WUFBRSxPQUFPLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENB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