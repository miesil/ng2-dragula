/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, Optional } from '@angular/core';
import { Group } from '../Group';
import { Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EventTypes, AllEvents } from '../EventTypes';
import { DrakeFactory } from '../DrakeFactory';
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
var ɵ0 = filterEvent;
/** @type {?} */
var elContainerSourceProjector = function (name, _a) {
    var _b = tslib_1.__read(_a, 3), el = _b[0], container = _b[1], source = _b[2];
    return ({ name: name, el: el, container: container, source: source });
};
var ɵ1 = elContainerSourceProjector;
var DragulaService = /** @class */ (function () {
    function DragulaService(drakeFactory) {
        if (drakeFactory === void 0) { drakeFactory = null; }
        var _this = this;
        this.drakeFactory = drakeFactory;
        this.dispatch$ = new Subject();
        this.drag = function (groupName) { return _this.dispatch$.pipe(filterEvent(EventTypes.Drag, groupName, function (name, _a) {
            var _b = tslib_1.__read(_a, 2), el = _b[0], source = _b[1];
            return ({ name: name, el: el, source: source });
        })); };
        this.dragend = function (groupName) { return _this.dispatch$.pipe(filterEvent(EventTypes.DragEnd, groupName, function (name, _a) {
            var _b = tslib_1.__read(_a, 1), el = _b[0];
            return ({ name: name, el: el });
        })); };
        this.drop = function (groupName) { return _this.dispatch$.pipe(filterEvent(EventTypes.Drop, groupName, function (name, _a) {
            var _b = tslib_1.__read(_a, 4), el = _b[0], target = _b[1], source = _b[2], sibling = _b[3];
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
            var _b = tslib_1.__read(_a, 3), clone = _b[0], original = _b[1], cloneType = _b[2];
            return { name: name, clone: clone, original: original, cloneType: cloneType };
        })); };
        this.dropModel = function (groupName) { return _this.dispatch$.pipe(filterEvent(EventTypes.DropModel, groupName, function (name, _a) {
            var _b = tslib_1.__read(_a, 9), el = _b[0], target = _b[1], source = _b[2], sibling = _b[3], item = _b[4], sourceModel = _b[5], targetModel = _b[6], sourceIndex = _b[7], targetIndex = _b[8];
            return { name: name, el: el, target: target, source: source, sibling: sibling, item: item, sourceModel: sourceModel, targetModel: targetModel, sourceIndex: sourceIndex, targetIndex: targetIndex };
        })); };
        this.removeModel = function (groupName) { return _this.dispatch$.pipe(filterEvent(EventTypes.RemoveModel, groupName, function (name, _a) {
            var _b = tslib_1.__read(_a, 6), el = _b[0], container = _b[1], source = _b[2], item = _b[3], sourceModel = _b[4], sourceIndex = _b[5];
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
        var that = this;
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
export { DragulaService };
function DragulaService_tsickle_Closure_declarations() {
    /** @type {?} */
    DragulaService.prototype.dispatch$;
    /** @type {?} */
    DragulaService.prototype.drag;
    /** @type {?} */
    DragulaService.prototype.dragend;
    /** @type {?} */
    DragulaService.prototype.drop;
    /** @type {?} */
    DragulaService.prototype.elContainerSource;
    /** @type {?} */
    DragulaService.prototype.cancel;
    /** @type {?} */
    DragulaService.prototype.remove;
    /** @type {?} */
    DragulaService.prototype.shadow;
    /** @type {?} */
    DragulaService.prototype.over;
    /** @type {?} */
    DragulaService.prototype.out;
    /** @type {?} */
    DragulaService.prototype.cloned;
    /** @type {?} */
    DragulaService.prototype.dropModel;
    /** @type {?} */
    DragulaService.prototype.removeModel;
    /** @type {?} */
    DragulaService.prototype.groups;
    /** @type {?} */
    DragulaService.prototype.drakeFactory;
}
export { ɵ0, ɵ1 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ3VsYS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLWRyYWd1bGEvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2RyYWd1bGEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFakMsT0FBTyxFQUFFLE9BQU8sRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFLL0MsSUFBTSxXQUFXLEdBQUcsVUFDbEIsU0FBcUIsRUFDckIsY0FBa0MsRUFDbEMsU0FBNkIsSUFDMUIsT0FBQSxVQUFDLEtBQTJCO0lBQy9CLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FDZixNQUFNLENBQUMsVUFBQyxFQUFlO1lBQWIsZ0JBQUssRUFBRSxjQUFJO1FBQ25CLE9BQU8sS0FBSyxLQUFLLFNBQVM7ZUFDbkIsQ0FBQyxjQUFjLEtBQUssU0FBUyxJQUFJLElBQUksS0FBSyxjQUFjLENBQUMsQ0FBQztLQUNsRSxDQUFDLEVBQ0YsR0FBRyxDQUFDLFVBQUMsRUFBYztZQUFaLGNBQUksRUFBRSxjQUFJO1FBQU8sT0FBQSxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztJQUFyQixDQUFxQixDQUFDLENBQy9DLENBQUM7Q0FDSCxFQVJJLENBUUosQ0FBQTs7O0FBRUQsSUFBTSwwQkFBMEIsR0FDOUIsVUFBQyxJQUFZLEVBQUUsRUFBb0Q7UUFBcEQsMEJBQW9ELEVBQW5ELFVBQUUsRUFBRSxpQkFBUyxFQUFFLGNBQU07SUFDbkMs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QUMsQ0FBQzs7Ozs7OztJQUdyQixtQ0FBVTs7Ozs7Y0FBQyxLQUFVLEVBQUUsTUFBVztRQUN4QyxPQUFPLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDOzs7Z0JBeE4vRCxVQUFVOzs7O2dCQXZCRixZQUFZLHVCQTBHTCxRQUFROzt5QkFoSHhCOztTQThCYSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi9Hcm91cCc7XHJcbmltcG9ydCB7IERyYWd1bGFPcHRpb25zIH0gZnJvbSAnLi4vRHJhZ3VsYU9wdGlvbnMnO1xyXG5pbXBvcnQgeyBTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGZpbHRlciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBFdmVudFR5cGVzLCBBbGxFdmVudHMgfSBmcm9tICcuLi9FdmVudFR5cGVzJztcclxuaW1wb3J0IHsgRHJha2VGYWN0b3J5IH0gZnJvbSAnLi4vRHJha2VGYWN0b3J5JztcclxuXHJcbnR5cGUgRmlsdGVyUHJvamVjdG9yPFQgZXh0ZW5kcyB7IG5hbWU6IHN0cmluZzsgfT4gPSAobmFtZTogc3RyaW5nLCBhcmdzOiBhbnlbXSkgPT4gVDtcclxudHlwZSBEaXNwYXRjaCA9IHsgZXZlbnQ6IEV2ZW50VHlwZXM7IG5hbWU6IHN0cmluZzsgYXJnczogYW55W107IH07XHJcblxyXG5jb25zdCBmaWx0ZXJFdmVudCA9IDxUIGV4dGVuZHMgeyBuYW1lOiBzdHJpbmc7IH0+KFxyXG4gIGV2ZW50VHlwZTogRXZlbnRUeXBlcyxcclxuICBmaWx0ZXJEcmFnVHlwZTogc3RyaW5nIHwgdW5kZWZpbmVkLFxyXG4gIHByb2plY3RvcjogRmlsdGVyUHJvamVjdG9yPFQ+XHJcbikgPT4gKGlucHV0OiBPYnNlcnZhYmxlPERpc3BhdGNoPik6IE9ic2VydmFibGU8VD4gPT4ge1xyXG4gIHJldHVybiBpbnB1dC5waXBlKFxyXG4gICAgZmlsdGVyKCh7IGV2ZW50LCBuYW1lIH0pID0+IHtcclxuICAgICAgcmV0dXJuIGV2ZW50ID09PSBldmVudFR5cGVcclxuICAgICAgICAgICYmIChmaWx0ZXJEcmFnVHlwZSA9PT0gdW5kZWZpbmVkIHx8IG5hbWUgPT09IGZpbHRlckRyYWdUeXBlKTtcclxuICAgIH0pLFxyXG4gICAgbWFwKCh7IG5hbWUsIGFyZ3MgfSkgPT4gcHJvamVjdG9yKG5hbWUsIGFyZ3MpKVxyXG4gICk7XHJcbn1cclxuXHJcbmNvbnN0IGVsQ29udGFpbmVyU291cmNlUHJvamVjdG9yID1cclxuICAobmFtZTogc3RyaW5nLCBbZWwsIGNvbnRhaW5lciwgc291cmNlXTogW0VsZW1lbnQsIEVsZW1lbnQsIEVsZW1lbnRdKSA9PlxyXG4gICAgKHsgbmFtZSwgZWwsIGNvbnRhaW5lciwgc291cmNlIH0pO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRHJhZ3VsYVNlcnZpY2Uge1xyXG5cclxuICAvKiBodHRwczovL2dpdGh1Yi5jb20vYmV2YWNxdWEvZHJhZ3VsYSNkcmFrZW9uLWV2ZW50cyAqL1xyXG5cclxuICBwcml2YXRlIGRpc3BhdGNoJCA9IG5ldyBTdWJqZWN0PERpc3BhdGNoPigpO1xyXG5cclxuICBwdWJsaWMgZHJhZyA9IChncm91cE5hbWU/OiBzdHJpbmcpID0+IHRoaXMuZGlzcGF0Y2gkLnBpcGUoXHJcbiAgICBmaWx0ZXJFdmVudChcclxuICAgICAgRXZlbnRUeXBlcy5EcmFnLFxyXG4gICAgICBncm91cE5hbWUsXHJcbiAgICAgIChuYW1lLCBbZWwsIHNvdXJjZV06IFtFbGVtZW50LCBFbGVtZW50XSkgPT4gKHsgbmFtZSwgZWwsIHNvdXJjZSB9KVxyXG4gICAgKVxyXG4gICk7XHJcblxyXG4gIHB1YmxpYyBkcmFnZW5kID0gKGdyb3VwTmFtZT86IHN0cmluZykgPT4gdGhpcy5kaXNwYXRjaCQucGlwZShcclxuICAgIGZpbHRlckV2ZW50KFxyXG4gICAgICBFdmVudFR5cGVzLkRyYWdFbmQsXHJcbiAgICAgIGdyb3VwTmFtZSxcclxuICAgICAgKG5hbWUsIFtlbF06IFtFbGVtZW50XSkgPT4gKHsgbmFtZSwgZWwgfSlcclxuICAgIClcclxuICApO1xyXG5cclxuICBwdWJsaWMgZHJvcCA9IChncm91cE5hbWU/OiBzdHJpbmcpID0+IHRoaXMuZGlzcGF0Y2gkLnBpcGUoXHJcbiAgICBmaWx0ZXJFdmVudChcclxuICAgICAgRXZlbnRUeXBlcy5Ecm9wLFxyXG4gICAgICBncm91cE5hbWUsXHJcbiAgICAgIChuYW1lLCBbXHJcbiAgICAgICAgZWwsIHRhcmdldCwgc291cmNlLCBzaWJsaW5nXHJcbiAgICAgIF06IFtFbGVtZW50LCBFbGVtZW50LCBFbGVtZW50LCBFbGVtZW50XSkgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IG5hbWUsIGVsLCB0YXJnZXQsIHNvdXJjZSwgc2libGluZyB9O1xyXG4gICAgICB9KVxyXG4gICk7XHJcblxyXG4gIHByaXZhdGUgZWxDb250YWluZXJTb3VyY2UgPVxyXG4gICAgKGV2ZW50VHlwZTogRXZlbnRUeXBlcykgPT5cclxuICAgIChncm91cE5hbWU/OiBzdHJpbmcpID0+XHJcbiAgICB0aGlzLmRpc3BhdGNoJC5waXBlKFxyXG4gICAgICBmaWx0ZXJFdmVudChldmVudFR5cGUsIGdyb3VwTmFtZSwgZWxDb250YWluZXJTb3VyY2VQcm9qZWN0b3IpXHJcbiAgICApO1xyXG5cclxuICBwdWJsaWMgY2FuY2VsID0gdGhpcy5lbENvbnRhaW5lclNvdXJjZShFdmVudFR5cGVzLkNhbmNlbCk7XHJcbiAgcHVibGljIHJlbW92ZSA9IHRoaXMuZWxDb250YWluZXJTb3VyY2UoRXZlbnRUeXBlcy5SZW1vdmUpO1xyXG4gIHB1YmxpYyBzaGFkb3cgPSB0aGlzLmVsQ29udGFpbmVyU291cmNlKEV2ZW50VHlwZXMuU2hhZG93KTtcclxuICBwdWJsaWMgb3ZlciA9IHRoaXMuZWxDb250YWluZXJTb3VyY2UoRXZlbnRUeXBlcy5PdmVyKTtcclxuICBwdWJsaWMgb3V0ID0gdGhpcy5lbENvbnRhaW5lclNvdXJjZShFdmVudFR5cGVzLk91dCk7XHJcblxyXG4gIHB1YmxpYyBjbG9uZWQgPSAoZ3JvdXBOYW1lPzogc3RyaW5nKSA9PiB0aGlzLmRpc3BhdGNoJC5waXBlKFxyXG4gICAgZmlsdGVyRXZlbnQoXHJcbiAgICAgIEV2ZW50VHlwZXMuQ2xvbmVkLFxyXG4gICAgICBncm91cE5hbWUsXHJcbiAgICAgIChuYW1lLCBbXHJcbiAgICAgICAgY2xvbmUsIG9yaWdpbmFsLCBjbG9uZVR5cGVcclxuICAgICAgXTogW0VsZW1lbnQsIEVsZW1lbnQsICdtaXJyb3InIHwgJ2NvcHknXSkgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IG5hbWUsIGNsb25lLCBvcmlnaW5hbCwgY2xvbmVUeXBlIH1cclxuICAgICAgfSlcclxuICApO1xyXG5cclxuICBwdWJsaWMgZHJvcE1vZGVsID0gPFQgPSBhbnk+KGdyb3VwTmFtZT86IHN0cmluZykgPT4gdGhpcy5kaXNwYXRjaCQucGlwZShcclxuICAgIGZpbHRlckV2ZW50KFxyXG4gICAgICBFdmVudFR5cGVzLkRyb3BNb2RlbCxcclxuICAgICAgZ3JvdXBOYW1lLFxyXG4gICAgICAobmFtZSwgW1xyXG4gICAgICAgIGVsLCB0YXJnZXQsIHNvdXJjZSwgc2libGluZywgaXRlbSwgc291cmNlTW9kZWwsIHRhcmdldE1vZGVsLCBzb3VyY2VJbmRleCwgdGFyZ2V0SW5kZXhcclxuICAgICAgXTogW0VsZW1lbnQsIEVsZW1lbnQsIEVsZW1lbnQsIEVsZW1lbnQsIFQsIFRbXSwgVFtdLCBudW1iZXIsIG51bWJlcl0pID0+IHtcclxuICAgICAgICByZXR1cm4geyBuYW1lLCBlbCwgdGFyZ2V0LCBzb3VyY2UsIHNpYmxpbmcsIGl0ZW0sIHNvdXJjZU1vZGVsLCB0YXJnZXRNb2RlbCwgc291cmNlSW5kZXgsIHRhcmdldEluZGV4IH1cclxuICAgICAgfSlcclxuICApO1xyXG5cclxuICBwdWJsaWMgcmVtb3ZlTW9kZWwgPSA8VCA9IGFueT4oZ3JvdXBOYW1lPzogc3RyaW5nKSA9PiB0aGlzLmRpc3BhdGNoJC5waXBlKFxyXG4gICAgZmlsdGVyRXZlbnQoXHJcbiAgICAgIEV2ZW50VHlwZXMuUmVtb3ZlTW9kZWwsXHJcbiAgICAgIGdyb3VwTmFtZSxcclxuICAgICAgKG5hbWUsIFtcclxuICAgICAgICBlbCwgY29udGFpbmVyLCBzb3VyY2UsIGl0ZW0sIHNvdXJjZU1vZGVsLCBzb3VyY2VJbmRleFxyXG4gICAgICBdOiBbRWxlbWVudCwgRWxlbWVudCwgRWxlbWVudCwgVCwgVFtdLCBudW1iZXJdKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgbmFtZSwgZWwsIGNvbnRhaW5lciwgc291cmNlLCBpdGVtLCBzb3VyY2VNb2RlbCwgc291cmNlSW5kZXggfVxyXG4gICAgICB9XHJcbiAgICApXHJcbiAgKTtcclxuXHJcbiAgcHJpdmF0ZSBncm91cHM6IHsgW2s6IHN0cmluZ106IEdyb3VwIH0gPSB7fTtcclxuXHJcbiAgY29uc3RydWN0b3IgKEBPcHRpb25hbCgpIHByaXZhdGUgZHJha2VGYWN0b3J5OiBEcmFrZUZhY3RvcnkgPSBudWxsKSB7XHJcbiAgICBpZiAodGhpcy5kcmFrZUZhY3RvcnkgPT09IG51bGwpIHtcclxuICAgICAgdGhpcy5kcmFrZUZhY3RvcnkgPSBuZXcgRHJha2VGYWN0b3J5KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogUHVibGljIG1haW5seSBmb3IgdGVzdGluZyBwdXJwb3Nlcy4gUHJlZmVyIGBjcmVhdGVHcm91cCgpYC4gKi9cclxuICBwdWJsaWMgYWRkKGdyb3VwOiBHcm91cCk6IEdyb3VwIHtcclxuICAgIGxldCBleGlzdGluZ0dyb3VwID0gdGhpcy5maW5kKGdyb3VwLm5hbWUpO1xyXG4gICAgaWYgKGV4aXN0aW5nR3JvdXApIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdHcm91cCBuYW1lZDogXCInICsgZ3JvdXAubmFtZSArICdcIiBhbHJlYWR5IGV4aXN0cy4nKTtcclxuICAgIH1cclxuICAgIHRoaXMuZ3JvdXBzW2dyb3VwLm5hbWVdID0gZ3JvdXA7XHJcbiAgICB0aGlzLmhhbmRsZU1vZGVscyhncm91cCk7XHJcbiAgICB0aGlzLnNldHVwRXZlbnRzKGdyb3VwKTtcclxuICAgIHJldHVybiBncm91cDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBmaW5kKG5hbWU6IHN0cmluZyk6IEdyb3VwIHtcclxuICAgIHJldHVybiB0aGlzLmdyb3Vwc1tuYW1lXTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkZXN0cm95KG5hbWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgbGV0IGdyb3VwID0gdGhpcy5maW5kKG5hbWUpO1xyXG4gICAgaWYgKCFncm91cCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBncm91cC5kcmFrZSAmJiBncm91cC5kcmFrZS5kZXN0cm95KCk7XHJcbiAgICBkZWxldGUgdGhpcy5ncm91cHNbbmFtZV07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIGEgZ3JvdXAgd2l0aCB0aGUgc3BlY2lmaWVkIG5hbWUgYW5kIG9wdGlvbnMuXHJcbiAgICpcclxuICAgKiBOb3RlOiBmb3JtZXJseSBrbm93biBhcyBgc2V0T3B0aW9uc2BcclxuICAgKi9cclxuICBwdWJsaWMgY3JlYXRlR3JvdXA8VCA9IGFueT4obmFtZTogc3RyaW5nLCBvcHRpb25zOiBEcmFndWxhT3B0aW9uczxUPik6IEdyb3VwIHtcclxuICAgIHJldHVybiB0aGlzLmFkZChuZXcgR3JvdXAoXHJcbiAgICAgIG5hbWUsXHJcbiAgICAgIHRoaXMuZHJha2VGYWN0b3J5LmJ1aWxkKFtdLCBvcHRpb25zKSxcclxuICAgICAgb3B0aW9uc1xyXG4gICAgKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZU1vZGVscyh7IG5hbWUsIGRyYWtlLCBvcHRpb25zIH06IEdyb3VwKTogdm9pZCB7XHJcbiAgICBsZXQgZHJhZ0VsbTogYW55O1xyXG4gICAgbGV0IGRyYWdJbmRleDogbnVtYmVyO1xyXG4gICAgbGV0IGRyb3BJbmRleDogbnVtYmVyO1xyXG4gICAgZHJha2Uub24oJ3JlbW92ZScsIChlbDogYW55LCBjb250YWluZXI6IGFueSwgc291cmNlOiBhbnkpID0+IHtcclxuICAgICAgaWYgKCFkcmFrZS5tb2RlbHMpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgbGV0IHNvdXJjZU1vZGVsID0gZHJha2UubW9kZWxzW2RyYWtlLmNvbnRhaW5lcnMuaW5kZXhPZihzb3VyY2UpXTtcclxuICAgICAgc291cmNlTW9kZWwgPSBzb3VyY2VNb2RlbC5zbGljZSgwKTsgLy8gY2xvbmUgaXRcclxuICAgICAgY29uc3QgaXRlbSA9IHNvdXJjZU1vZGVsLnNwbGljZShkcmFnSW5kZXgsIDEpWzBdO1xyXG4gICAgICAvLyBjb25zb2xlLmxvZygnUkVNT1ZFJyk7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKHNvdXJjZU1vZGVsKTtcclxuICAgICAgdGhpcy5kaXNwYXRjaCQubmV4dCh7XHJcbiAgICAgICAgZXZlbnQ6IEV2ZW50VHlwZXMuUmVtb3ZlTW9kZWwsXHJcbiAgICAgICAgbmFtZSxcclxuICAgICAgICBhcmdzOiBbIGVsLCBjb250YWluZXIsIHNvdXJjZSwgaXRlbSwgc291cmNlTW9kZWwsIGRyYWdJbmRleCBdXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICBkcmFrZS5vbignZHJhZycsIChlbDogYW55LCBzb3VyY2U6IGFueSkgPT4ge1xyXG4gICAgICBpZiAoIWRyYWtlLm1vZGVscykge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBkcmFnRWxtID0gZWw7XHJcbiAgICAgIGRyYWdJbmRleCA9IHRoaXMuZG9tSW5kZXhPZihlbCwgc291cmNlKTtcclxuICAgIH0pO1xyXG4gICAgZHJha2Uub24oJ2Ryb3AnLCAoZHJvcEVsbTogYW55LCB0YXJnZXQ6IEVsZW1lbnQsIHNvdXJjZTogRWxlbWVudCwgc2libGluZz86IEVsZW1lbnQpID0+IHtcclxuICAgICAgaWYgKCFkcmFrZS5tb2RlbHMgfHwgIXRhcmdldCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBkcm9wSW5kZXggPSB0aGlzLmRvbUluZGV4T2YoZHJvcEVsbSwgdGFyZ2V0KTtcclxuICAgICAgbGV0IHNvdXJjZU1vZGVsID0gZHJha2UubW9kZWxzW2RyYWtlLmNvbnRhaW5lcnMuaW5kZXhPZihzb3VyY2UpXTtcclxuICAgICAgbGV0IHRhcmdldE1vZGVsID0gZHJha2UubW9kZWxzW2RyYWtlLmNvbnRhaW5lcnMuaW5kZXhPZih0YXJnZXQpXTtcclxuICAgICAgLy8gY29uc29sZS5sb2coJ0RST1AnKTtcclxuICAgICAgLy8gY29uc29sZS5sb2coc291cmNlTW9kZWwpO1xyXG4gICAgICBsZXQgaXRlbTogYW55O1xyXG4gICAgICBpZiAodGFyZ2V0ID09PSBzb3VyY2UpIHtcclxuICAgICAgICBzb3VyY2VNb2RlbCA9IHNvdXJjZU1vZGVsLnNsaWNlKDApXHJcbiAgICAgICAgaXRlbSA9IHNvdXJjZU1vZGVsLnNwbGljZShkcmFnSW5kZXgsIDEpWzBdO1xyXG4gICAgICAgIHNvdXJjZU1vZGVsLnNwbGljZShkcm9wSW5kZXgsIDAsIGl0ZW0pO1xyXG4gICAgICAgIC8vIHRoaXMgd2FzIHRydWUgYmVmb3JlIHdlIGNsb25lZCBhbmQgdXBkYXRlZCBzb3VyY2VNb2RlbCxcclxuICAgICAgICAvLyBidXQgdGFyZ2V0TW9kZWwgc3RpbGwgaGFzIHRoZSBvbGQgdmFsdWVcclxuICAgICAgICB0YXJnZXRNb2RlbCA9IHNvdXJjZU1vZGVsO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxldCBpc0NvcHlpbmcgPSBkcmFnRWxtICE9PSBkcm9wRWxtO1xyXG4gICAgICAgIGl0ZW0gPSBzb3VyY2VNb2RlbFtkcmFnSW5kZXhdO1xyXG4gICAgICAgIGlmIChpc0NvcHlpbmcpIHtcclxuICAgICAgICAgIGlmICghb3B0aW9ucy5jb3B5SXRlbSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJZiB5b3UgaGF2ZSBlbmFibGVkIGBjb3B5YCBvbiBhIGdyb3VwLCB5b3UgbXVzdCBwcm92aWRlIGEgYGNvcHlJdGVtYCBmdW5jdGlvbi5cIilcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGl0ZW0gPSBvcHRpb25zLmNvcHlJdGVtKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFpc0NvcHlpbmcpIHtcclxuICAgICAgICAgIHNvdXJjZU1vZGVsID0gc291cmNlTW9kZWwuc2xpY2UoMClcclxuICAgICAgICAgIHNvdXJjZU1vZGVsLnNwbGljZShkcmFnSW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0YXJnZXRNb2RlbCA9IHRhcmdldE1vZGVsLnNsaWNlKDApXHJcbiAgICAgICAgdGFyZ2V0TW9kZWwuc3BsaWNlKGRyb3BJbmRleCwgMCwgaXRlbSk7XHJcbiAgICAgICAgaWYgKGlzQ29weWluZykge1xyXG4gICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdGFyZ2V0LnJlbW92ZUNoaWxkKGRyb3BFbG0pO1xyXG4gICAgICAgICAgfSBjYXRjaCAoZSkge31cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5kaXNwYXRjaCQubmV4dCh7XHJcbiAgICAgICAgZXZlbnQ6IEV2ZW50VHlwZXMuRHJvcE1vZGVsLFxyXG4gICAgICAgIG5hbWUsXHJcbiAgICAgICAgYXJnczogWyBkcm9wRWxtLCB0YXJnZXQsIHNvdXJjZSwgc2libGluZywgaXRlbSwgc291cmNlTW9kZWwsIHRhcmdldE1vZGVsLCBkcmFnSW5kZXgsIGRyb3BJbmRleCBdXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNldHVwRXZlbnRzKGdyb3VwOiBHcm91cCk6IHZvaWQge1xyXG4gICAgaWYgKGdyb3VwLmluaXRFdmVudHMpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgZ3JvdXAuaW5pdEV2ZW50cyA9IHRydWU7XHJcbiAgICBjb25zdCBuYW1lID0gZ3JvdXAubmFtZTtcclxuICAgIGxldCB0aGF0OiBhbnkgPSB0aGlzO1xyXG4gICAgbGV0IGVtaXR0ZXIgPSAoZXZlbnQ6IEV2ZW50VHlwZXMpID0+IHtcclxuICAgICAgZ3JvdXAuZHJha2Uub24oZXZlbnQsICguLi5hcmdzOiBhbnlbXSkgPT4ge1xyXG4gICAgICAgIHRoaXMuZGlzcGF0Y2gkLm5leHQoeyBldmVudCwgbmFtZSwgYXJncyB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgQWxsRXZlbnRzLmZvckVhY2goZW1pdHRlcik7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRvbUluZGV4T2YoY2hpbGQ6IGFueSwgcGFyZW50OiBhbnkpOiBhbnkge1xyXG4gICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwocGFyZW50LmNoaWxkcmVuLCBjaGlsZCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==