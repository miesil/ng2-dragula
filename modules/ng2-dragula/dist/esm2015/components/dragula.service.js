/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, Optional } from '@angular/core';
import { Group } from '../Group';
import { Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EventTypes, AllEvents } from '../EventTypes';
import { DrakeFactory } from '../DrakeFactory';
/** @type {?} */
const filterEvent = (eventType, filterDragType, projector) => (input) => {
    return input.pipe(filter(({ event, name }) => {
        return event === eventType
            && (filterDragType === undefined || name === filterDragType);
    }), map(({ name, args }) => projector(name, args)));
};
const ɵ0 = filterEvent;
/** @type {?} */
const elContainerSourceProjector = (name, [el, container, source]) => ({ name, el, container, source });
const ɵ1 = elContainerSourceProjector;
export class DragulaService {
    /**
     * @param {?=} drakeFactory
     */
    constructor(drakeFactory = null) {
        this.drakeFactory = drakeFactory;
        this.dispatch$ = new Subject();
        this.drag = (groupName) => this.dispatch$.pipe(filterEvent(EventTypes.Drag, groupName, (name, [el, source]) => ({ name, el, source })));
        this.dragend = (groupName) => this.dispatch$.pipe(filterEvent(EventTypes.DragEnd, groupName, (name, [el]) => ({ name, el })));
        this.drop = (groupName) => this.dispatch$.pipe(filterEvent(EventTypes.Drop, groupName, (name, [el, target, source, sibling]) => {
            return { name, el, target, source, sibling };
        }));
        this.elContainerSource = (eventType) => (groupName) => this.dispatch$.pipe(filterEvent(eventType, groupName, elContainerSourceProjector));
        this.cancel = this.elContainerSource(EventTypes.Cancel);
        this.remove = this.elContainerSource(EventTypes.Remove);
        this.shadow = this.elContainerSource(EventTypes.Shadow);
        this.over = this.elContainerSource(EventTypes.Over);
        this.out = this.elContainerSource(EventTypes.Out);
        this.cloned = (groupName) => this.dispatch$.pipe(filterEvent(EventTypes.Cloned, groupName, (name, [clone, original, cloneType]) => {
            return { name, clone, original, cloneType };
        }));
        this.dropModel = (groupName) => this.dispatch$.pipe(filterEvent(EventTypes.DropModel, groupName, (name, [el, target, source, sibling, item, sourceModel, targetModel, sourceIndex, targetIndex]) => {
            return { name, el, target, source, sibling, item, sourceModel, targetModel, sourceIndex, targetIndex };
        }));
        this.removeModel = (groupName) => this.dispatch$.pipe(filterEvent(EventTypes.RemoveModel, groupName, (name, [el, container, source, item, sourceModel, sourceIndex]) => {
            return { name, el, container, source, item, sourceModel, sourceIndex };
        }));
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
    add(group) {
        /** @type {?} */
        let existingGroup = this.find(group.name);
        if (existingGroup) {
            throw new Error('Group named: "' + group.name + '" already exists.');
        }
        this.groups[group.name] = group;
        this.handleModels(group);
        this.setupEvents(group);
        return group;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    find(name) {
        return this.groups[name];
    }
    /**
     * @param {?} name
     * @return {?}
     */
    destroy(name) {
        /** @type {?} */
        let group = this.find(name);
        if (!group) {
            return;
        }
        group.drake && group.drake.destroy();
        delete this.groups[name];
    }
    /**
     * Creates a group with the specified name and options.
     *
     * Note: formerly known as `setOptions`
     * @template T
     * @param {?} name
     * @param {?} options
     * @return {?}
     */
    createGroup(name, options) {
        return this.add(new Group(name, this.drakeFactory.build([], options), options));
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    handleModels({ name, drake, options }) {
        /** @type {?} */
        let dragElm;
        /** @type {?} */
        let dragIndex;
        /** @type {?} */
        let dropIndex;
        drake.on('remove', (el, container, source) => {
            if (!drake.models) {
                return;
            }
            /** @type {?} */
            let sourceModel = drake.models[drake.containers.indexOf(source)];
            sourceModel = sourceModel.slice(0);
            /** @type {?} */
            const item = sourceModel.splice(dragIndex, 1)[0];
            // console.log('REMOVE');
            // console.log(sourceModel);
            this.dispatch$.next({
                event: EventTypes.RemoveModel,
                name,
                args: [el, container, source, item, sourceModel, dragIndex]
            });
        });
        drake.on('drag', (el, source) => {
            if (!drake.models) {
                return;
            }
            dragElm = el;
            dragIndex = this.domIndexOf(el, source);
        });
        drake.on('drop', (dropElm, target, source, sibling) => {
            if (!drake.models || !target) {
                return;
            }
            dropIndex = this.domIndexOf(dropElm, target);
            /** @type {?} */
            let sourceModel = drake.models[drake.containers.indexOf(source)];
            /** @type {?} */
            let targetModel = drake.models[drake.containers.indexOf(target)];
            /** @type {?} */
            let item;
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
                let isCopying = dragElm !== dropElm;
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
            this.dispatch$.next({
                event: EventTypes.DropModel,
                name,
                args: [dropElm, target, source, sibling, item, sourceModel, targetModel, dragIndex, dropIndex]
            });
        });
    }
    /**
     * @param {?} group
     * @return {?}
     */
    setupEvents(group) {
        if (group.initEvents) {
            return;
        }
        group.initEvents = true;
        /** @type {?} */
        const name = group.name;
        /** @type {?} */
        let that = this;
        /** @type {?} */
        let emitter = (event) => {
            group.drake.on(event, (...args) => {
                this.dispatch$.next({ event, name, args });
            });
        };
        AllEvents.forEach(emitter);
    }
    /**
     * @param {?} child
     * @param {?} parent
     * @return {?}
     */
    domIndexOf(child, parent) {
        return Array.prototype.indexOf.call(parent.children, child);
    }
}
DragulaService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DragulaService.ctorParameters = () => [
    { type: DrakeFactory, decorators: [{ type: Optional }] }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ3VsYS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLWRyYWd1bGEvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2RyYWd1bGEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUVqQyxPQUFPLEVBQUUsT0FBTyxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQUsvQyxNQUFNLFdBQVcsR0FBRyxDQUNsQixTQUFxQixFQUNyQixjQUFrQyxFQUNsQyxTQUE2QixFQUM3QixFQUFFLENBQUMsQ0FBQyxLQUEyQixFQUFpQixFQUFFO0lBQ2xELE9BQU8sS0FBSyxDQUFDLElBQUksQ0FDZixNQUFNLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQ3pCLE9BQU8sS0FBSyxLQUFLLFNBQVM7ZUFDbkIsQ0FBQyxjQUFjLEtBQUssU0FBUyxJQUFJLElBQUksS0FBSyxjQUFjLENBQUMsQ0FBQztLQUNsRSxDQUFDLEVBQ0YsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FDL0MsQ0FBQztDQUNILENBQUE7OztBQUVELE1BQU0sMEJBQTBCLEdBQzlCLENBQUMsSUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQThCLEVBQUUsRUFBRSxDQUNy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QUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUU7YUFDakcsQ0FBQyxDQUFDO1NBQ0osQ0FBQyxDQUFDOzs7Ozs7SUFHRyxXQUFXLENBQUMsS0FBWTtRQUM5QixJQUFJLEtBQUssQ0FBQyxVQUFVLEVBQUU7WUFDcEIsT0FBTztTQUNSO1FBQ0QsS0FBSyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7O1FBQ3hCLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7O1FBQ3hCLElBQUksSUFBSSxHQUFRLElBQUksQ0FBQzs7UUFDckIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxLQUFpQixFQUFFLEVBQUU7WUFDbEMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxJQUFXLEVBQUUsRUFBRTtnQkFDdkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7YUFDNUMsQ0FBQyxDQUFDO1NBQ0osQ0FBQztRQUNGLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7Ozs7Ozs7SUFHckIsVUFBVSxDQUFDLEtBQVUsRUFBRSxNQUFXO1FBQ3hDLE9BQU8sS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7Ozs7WUF4Ti9ELFVBQVU7Ozs7WUF2QkYsWUFBWSx1QkEwR0wsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vR3JvdXAnO1xyXG5pbXBvcnQgeyBEcmFndWxhT3B0aW9ucyB9IGZyb20gJy4uL0RyYWd1bGFPcHRpb25zJztcclxuaW1wb3J0IHsgU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgRXZlbnRUeXBlcywgQWxsRXZlbnRzIH0gZnJvbSAnLi4vRXZlbnRUeXBlcyc7XHJcbmltcG9ydCB7IERyYWtlRmFjdG9yeSB9IGZyb20gJy4uL0RyYWtlRmFjdG9yeSc7XHJcblxyXG50eXBlIEZpbHRlclByb2plY3RvcjxUIGV4dGVuZHMgeyBuYW1lOiBzdHJpbmc7IH0+ID0gKG5hbWU6IHN0cmluZywgYXJnczogYW55W10pID0+IFQ7XHJcbnR5cGUgRGlzcGF0Y2ggPSB7IGV2ZW50OiBFdmVudFR5cGVzOyBuYW1lOiBzdHJpbmc7IGFyZ3M6IGFueVtdOyB9O1xyXG5cclxuY29uc3QgZmlsdGVyRXZlbnQgPSA8VCBleHRlbmRzIHsgbmFtZTogc3RyaW5nOyB9PihcclxuICBldmVudFR5cGU6IEV2ZW50VHlwZXMsXHJcbiAgZmlsdGVyRHJhZ1R5cGU6IHN0cmluZyB8IHVuZGVmaW5lZCxcclxuICBwcm9qZWN0b3I6IEZpbHRlclByb2plY3RvcjxUPlxyXG4pID0+IChpbnB1dDogT2JzZXJ2YWJsZTxEaXNwYXRjaD4pOiBPYnNlcnZhYmxlPFQ+ID0+IHtcclxuICByZXR1cm4gaW5wdXQucGlwZShcclxuICAgIGZpbHRlcigoeyBldmVudCwgbmFtZSB9KSA9PiB7XHJcbiAgICAgIHJldHVybiBldmVudCA9PT0gZXZlbnRUeXBlXHJcbiAgICAgICAgICAmJiAoZmlsdGVyRHJhZ1R5cGUgPT09IHVuZGVmaW5lZCB8fCBuYW1lID09PSBmaWx0ZXJEcmFnVHlwZSk7XHJcbiAgICB9KSxcclxuICAgIG1hcCgoeyBuYW1lLCBhcmdzIH0pID0+IHByb2plY3RvcihuYW1lLCBhcmdzKSlcclxuICApO1xyXG59XHJcblxyXG5jb25zdCBlbENvbnRhaW5lclNvdXJjZVByb2plY3RvciA9XHJcbiAgKG5hbWU6IHN0cmluZywgW2VsLCBjb250YWluZXIsIHNvdXJjZV06IFtFbGVtZW50LCBFbGVtZW50LCBFbGVtZW50XSkgPT5cclxuICAgICh7IG5hbWUsIGVsLCBjb250YWluZXIsIHNvdXJjZSB9KTtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIERyYWd1bGFTZXJ2aWNlIHtcclxuXHJcbiAgLyogaHR0cHM6Ly9naXRodWIuY29tL2JldmFjcXVhL2RyYWd1bGEjZHJha2Vvbi1ldmVudHMgKi9cclxuXHJcbiAgcHJpdmF0ZSBkaXNwYXRjaCQgPSBuZXcgU3ViamVjdDxEaXNwYXRjaD4oKTtcclxuXHJcbiAgcHVibGljIGRyYWcgPSAoZ3JvdXBOYW1lPzogc3RyaW5nKSA9PiB0aGlzLmRpc3BhdGNoJC5waXBlKFxyXG4gICAgZmlsdGVyRXZlbnQoXHJcbiAgICAgIEV2ZW50VHlwZXMuRHJhZyxcclxuICAgICAgZ3JvdXBOYW1lLFxyXG4gICAgICAobmFtZSwgW2VsLCBzb3VyY2VdOiBbRWxlbWVudCwgRWxlbWVudF0pID0+ICh7IG5hbWUsIGVsLCBzb3VyY2UgfSlcclxuICAgIClcclxuICApO1xyXG5cclxuICBwdWJsaWMgZHJhZ2VuZCA9IChncm91cE5hbWU/OiBzdHJpbmcpID0+IHRoaXMuZGlzcGF0Y2gkLnBpcGUoXHJcbiAgICBmaWx0ZXJFdmVudChcclxuICAgICAgRXZlbnRUeXBlcy5EcmFnRW5kLFxyXG4gICAgICBncm91cE5hbWUsXHJcbiAgICAgIChuYW1lLCBbZWxdOiBbRWxlbWVudF0pID0+ICh7IG5hbWUsIGVsIH0pXHJcbiAgICApXHJcbiAgKTtcclxuXHJcbiAgcHVibGljIGRyb3AgPSAoZ3JvdXBOYW1lPzogc3RyaW5nKSA9PiB0aGlzLmRpc3BhdGNoJC5waXBlKFxyXG4gICAgZmlsdGVyRXZlbnQoXHJcbiAgICAgIEV2ZW50VHlwZXMuRHJvcCxcclxuICAgICAgZ3JvdXBOYW1lLFxyXG4gICAgICAobmFtZSwgW1xyXG4gICAgICAgIGVsLCB0YXJnZXQsIHNvdXJjZSwgc2libGluZ1xyXG4gICAgICBdOiBbRWxlbWVudCwgRWxlbWVudCwgRWxlbWVudCwgRWxlbWVudF0pID0+IHtcclxuICAgICAgICByZXR1cm4geyBuYW1lLCBlbCwgdGFyZ2V0LCBzb3VyY2UsIHNpYmxpbmcgfTtcclxuICAgICAgfSlcclxuICApO1xyXG5cclxuICBwcml2YXRlIGVsQ29udGFpbmVyU291cmNlID1cclxuICAgIChldmVudFR5cGU6IEV2ZW50VHlwZXMpID0+XHJcbiAgICAoZ3JvdXBOYW1lPzogc3RyaW5nKSA9PlxyXG4gICAgdGhpcy5kaXNwYXRjaCQucGlwZShcclxuICAgICAgZmlsdGVyRXZlbnQoZXZlbnRUeXBlLCBncm91cE5hbWUsIGVsQ29udGFpbmVyU291cmNlUHJvamVjdG9yKVxyXG4gICAgKTtcclxuXHJcbiAgcHVibGljIGNhbmNlbCA9IHRoaXMuZWxDb250YWluZXJTb3VyY2UoRXZlbnRUeXBlcy5DYW5jZWwpO1xyXG4gIHB1YmxpYyByZW1vdmUgPSB0aGlzLmVsQ29udGFpbmVyU291cmNlKEV2ZW50VHlwZXMuUmVtb3ZlKTtcclxuICBwdWJsaWMgc2hhZG93ID0gdGhpcy5lbENvbnRhaW5lclNvdXJjZShFdmVudFR5cGVzLlNoYWRvdyk7XHJcbiAgcHVibGljIG92ZXIgPSB0aGlzLmVsQ29udGFpbmVyU291cmNlKEV2ZW50VHlwZXMuT3Zlcik7XHJcbiAgcHVibGljIG91dCA9IHRoaXMuZWxDb250YWluZXJTb3VyY2UoRXZlbnRUeXBlcy5PdXQpO1xyXG5cclxuICBwdWJsaWMgY2xvbmVkID0gKGdyb3VwTmFtZT86IHN0cmluZykgPT4gdGhpcy5kaXNwYXRjaCQucGlwZShcclxuICAgIGZpbHRlckV2ZW50KFxyXG4gICAgICBFdmVudFR5cGVzLkNsb25lZCxcclxuICAgICAgZ3JvdXBOYW1lLFxyXG4gICAgICAobmFtZSwgW1xyXG4gICAgICAgIGNsb25lLCBvcmlnaW5hbCwgY2xvbmVUeXBlXHJcbiAgICAgIF06IFtFbGVtZW50LCBFbGVtZW50LCAnbWlycm9yJyB8ICdjb3B5J10pID0+IHtcclxuICAgICAgICByZXR1cm4geyBuYW1lLCBjbG9uZSwgb3JpZ2luYWwsIGNsb25lVHlwZSB9XHJcbiAgICAgIH0pXHJcbiAgKTtcclxuXHJcbiAgcHVibGljIGRyb3BNb2RlbCA9IDxUID0gYW55Pihncm91cE5hbWU/OiBzdHJpbmcpID0+IHRoaXMuZGlzcGF0Y2gkLnBpcGUoXHJcbiAgICBmaWx0ZXJFdmVudChcclxuICAgICAgRXZlbnRUeXBlcy5Ecm9wTW9kZWwsXHJcbiAgICAgIGdyb3VwTmFtZSxcclxuICAgICAgKG5hbWUsIFtcclxuICAgICAgICBlbCwgdGFyZ2V0LCBzb3VyY2UsIHNpYmxpbmcsIGl0ZW0sIHNvdXJjZU1vZGVsLCB0YXJnZXRNb2RlbCwgc291cmNlSW5kZXgsIHRhcmdldEluZGV4XHJcbiAgICAgIF06IFtFbGVtZW50LCBFbGVtZW50LCBFbGVtZW50LCBFbGVtZW50LCBULCBUW10sIFRbXSwgbnVtYmVyLCBudW1iZXJdKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgbmFtZSwgZWwsIHRhcmdldCwgc291cmNlLCBzaWJsaW5nLCBpdGVtLCBzb3VyY2VNb2RlbCwgdGFyZ2V0TW9kZWwsIHNvdXJjZUluZGV4LCB0YXJnZXRJbmRleCB9XHJcbiAgICAgIH0pXHJcbiAgKTtcclxuXHJcbiAgcHVibGljIHJlbW92ZU1vZGVsID0gPFQgPSBhbnk+KGdyb3VwTmFtZT86IHN0cmluZykgPT4gdGhpcy5kaXNwYXRjaCQucGlwZShcclxuICAgIGZpbHRlckV2ZW50KFxyXG4gICAgICBFdmVudFR5cGVzLlJlbW92ZU1vZGVsLFxyXG4gICAgICBncm91cE5hbWUsXHJcbiAgICAgIChuYW1lLCBbXHJcbiAgICAgICAgZWwsIGNvbnRhaW5lciwgc291cmNlLCBpdGVtLCBzb3VyY2VNb2RlbCwgc291cmNlSW5kZXhcclxuICAgICAgXTogW0VsZW1lbnQsIEVsZW1lbnQsIEVsZW1lbnQsIFQsIFRbXSwgbnVtYmVyXSkgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IG5hbWUsIGVsLCBjb250YWluZXIsIHNvdXJjZSwgaXRlbSwgc291cmNlTW9kZWwsIHNvdXJjZUluZGV4IH1cclxuICAgICAgfVxyXG4gICAgKVxyXG4gICk7XHJcblxyXG4gIHByaXZhdGUgZ3JvdXBzOiB7IFtrOiBzdHJpbmddOiBHcm91cCB9ID0ge307XHJcblxyXG4gIGNvbnN0cnVjdG9yIChAT3B0aW9uYWwoKSBwcml2YXRlIGRyYWtlRmFjdG9yeTogRHJha2VGYWN0b3J5ID0gbnVsbCkge1xyXG4gICAgaWYgKHRoaXMuZHJha2VGYWN0b3J5ID09PSBudWxsKSB7XHJcbiAgICAgIHRoaXMuZHJha2VGYWN0b3J5ID0gbmV3IERyYWtlRmFjdG9yeSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFB1YmxpYyBtYWlubHkgZm9yIHRlc3RpbmcgcHVycG9zZXMuIFByZWZlciBgY3JlYXRlR3JvdXAoKWAuICovXHJcbiAgcHVibGljIGFkZChncm91cDogR3JvdXApOiBHcm91cCB7XHJcbiAgICBsZXQgZXhpc3RpbmdHcm91cCA9IHRoaXMuZmluZChncm91cC5uYW1lKTtcclxuICAgIGlmIChleGlzdGluZ0dyb3VwKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignR3JvdXAgbmFtZWQ6IFwiJyArIGdyb3VwLm5hbWUgKyAnXCIgYWxyZWFkeSBleGlzdHMuJyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmdyb3Vwc1tncm91cC5uYW1lXSA9IGdyb3VwO1xyXG4gICAgdGhpcy5oYW5kbGVNb2RlbHMoZ3JvdXApO1xyXG4gICAgdGhpcy5zZXR1cEV2ZW50cyhncm91cCk7XHJcbiAgICByZXR1cm4gZ3JvdXA7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZmluZChuYW1lOiBzdHJpbmcpOiBHcm91cCB7XHJcbiAgICByZXR1cm4gdGhpcy5ncm91cHNbbmFtZV07XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGVzdHJveShuYW1lOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGxldCBncm91cCA9IHRoaXMuZmluZChuYW1lKTtcclxuICAgIGlmICghZ3JvdXApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgZ3JvdXAuZHJha2UgJiYgZ3JvdXAuZHJha2UuZGVzdHJveSgpO1xyXG4gICAgZGVsZXRlIHRoaXMuZ3JvdXBzW25hbWVdO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhIGdyb3VwIHdpdGggdGhlIHNwZWNpZmllZCBuYW1lIGFuZCBvcHRpb25zLlxyXG4gICAqXHJcbiAgICogTm90ZTogZm9ybWVybHkga25vd24gYXMgYHNldE9wdGlvbnNgXHJcbiAgICovXHJcbiAgcHVibGljIGNyZWF0ZUdyb3VwPFQgPSBhbnk+KG5hbWU6IHN0cmluZywgb3B0aW9uczogRHJhZ3VsYU9wdGlvbnM8VD4pOiBHcm91cCB7XHJcbiAgICByZXR1cm4gdGhpcy5hZGQobmV3IEdyb3VwKFxyXG4gICAgICBuYW1lLFxyXG4gICAgICB0aGlzLmRyYWtlRmFjdG9yeS5idWlsZChbXSwgb3B0aW9ucyksXHJcbiAgICAgIG9wdGlvbnNcclxuICAgICkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoYW5kbGVNb2RlbHMoeyBuYW1lLCBkcmFrZSwgb3B0aW9ucyB9OiBHcm91cCk6IHZvaWQge1xyXG4gICAgbGV0IGRyYWdFbG06IGFueTtcclxuICAgIGxldCBkcmFnSW5kZXg6IG51bWJlcjtcclxuICAgIGxldCBkcm9wSW5kZXg6IG51bWJlcjtcclxuICAgIGRyYWtlLm9uKCdyZW1vdmUnLCAoZWw6IGFueSwgY29udGFpbmVyOiBhbnksIHNvdXJjZTogYW55KSA9PiB7XHJcbiAgICAgIGlmICghZHJha2UubW9kZWxzKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGxldCBzb3VyY2VNb2RlbCA9IGRyYWtlLm1vZGVsc1tkcmFrZS5jb250YWluZXJzLmluZGV4T2Yoc291cmNlKV07XHJcbiAgICAgIHNvdXJjZU1vZGVsID0gc291cmNlTW9kZWwuc2xpY2UoMCk7IC8vIGNsb25lIGl0XHJcbiAgICAgIGNvbnN0IGl0ZW0gPSBzb3VyY2VNb2RlbC5zcGxpY2UoZHJhZ0luZGV4LCAxKVswXTtcclxuICAgICAgLy8gY29uc29sZS5sb2coJ1JFTU9WRScpO1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhzb3VyY2VNb2RlbCk7XHJcbiAgICAgIHRoaXMuZGlzcGF0Y2gkLm5leHQoe1xyXG4gICAgICAgIGV2ZW50OiBFdmVudFR5cGVzLlJlbW92ZU1vZGVsLFxyXG4gICAgICAgIG5hbWUsXHJcbiAgICAgICAgYXJnczogWyBlbCwgY29udGFpbmVyLCBzb3VyY2UsIGl0ZW0sIHNvdXJjZU1vZGVsLCBkcmFnSW5kZXggXVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgZHJha2Uub24oJ2RyYWcnLCAoZWw6IGFueSwgc291cmNlOiBhbnkpID0+IHtcclxuICAgICAgaWYgKCFkcmFrZS5tb2RlbHMpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgZHJhZ0VsbSA9IGVsO1xyXG4gICAgICBkcmFnSW5kZXggPSB0aGlzLmRvbUluZGV4T2YoZWwsIHNvdXJjZSk7XHJcbiAgICB9KTtcclxuICAgIGRyYWtlLm9uKCdkcm9wJywgKGRyb3BFbG06IGFueSwgdGFyZ2V0OiBFbGVtZW50LCBzb3VyY2U6IEVsZW1lbnQsIHNpYmxpbmc/OiBFbGVtZW50KSA9PiB7XHJcbiAgICAgIGlmICghZHJha2UubW9kZWxzIHx8ICF0YXJnZXQpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgZHJvcEluZGV4ID0gdGhpcy5kb21JbmRleE9mKGRyb3BFbG0sIHRhcmdldCk7XHJcbiAgICAgIGxldCBzb3VyY2VNb2RlbCA9IGRyYWtlLm1vZGVsc1tkcmFrZS5jb250YWluZXJzLmluZGV4T2Yoc291cmNlKV07XHJcbiAgICAgIGxldCB0YXJnZXRNb2RlbCA9IGRyYWtlLm1vZGVsc1tkcmFrZS5jb250YWluZXJzLmluZGV4T2YodGFyZ2V0KV07XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdEUk9QJyk7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKHNvdXJjZU1vZGVsKTtcclxuICAgICAgbGV0IGl0ZW06IGFueTtcclxuICAgICAgaWYgKHRhcmdldCA9PT0gc291cmNlKSB7XHJcbiAgICAgICAgc291cmNlTW9kZWwgPSBzb3VyY2VNb2RlbC5zbGljZSgwKVxyXG4gICAgICAgIGl0ZW0gPSBzb3VyY2VNb2RlbC5zcGxpY2UoZHJhZ0luZGV4LCAxKVswXTtcclxuICAgICAgICBzb3VyY2VNb2RlbC5zcGxpY2UoZHJvcEluZGV4LCAwLCBpdGVtKTtcclxuICAgICAgICAvLyB0aGlzIHdhcyB0cnVlIGJlZm9yZSB3ZSBjbG9uZWQgYW5kIHVwZGF0ZWQgc291cmNlTW9kZWwsXHJcbiAgICAgICAgLy8gYnV0IHRhcmdldE1vZGVsIHN0aWxsIGhhcyB0aGUgb2xkIHZhbHVlXHJcbiAgICAgICAgdGFyZ2V0TW9kZWwgPSBzb3VyY2VNb2RlbDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsZXQgaXNDb3B5aW5nID0gZHJhZ0VsbSAhPT0gZHJvcEVsbTtcclxuICAgICAgICBpdGVtID0gc291cmNlTW9kZWxbZHJhZ0luZGV4XTtcclxuICAgICAgICBpZiAoaXNDb3B5aW5nKSB7XHJcbiAgICAgICAgICBpZiAoIW9wdGlvbnMuY29weUl0ZW0pIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSWYgeW91IGhhdmUgZW5hYmxlZCBgY29weWAgb24gYSBncm91cCwgeW91IG11c3QgcHJvdmlkZSBhIGBjb3B5SXRlbWAgZnVuY3Rpb24uXCIpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpdGVtID0gb3B0aW9ucy5jb3B5SXRlbShpdGVtKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghaXNDb3B5aW5nKSB7XHJcbiAgICAgICAgICBzb3VyY2VNb2RlbCA9IHNvdXJjZU1vZGVsLnNsaWNlKDApXHJcbiAgICAgICAgICBzb3VyY2VNb2RlbC5zcGxpY2UoZHJhZ0luZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGFyZ2V0TW9kZWwgPSB0YXJnZXRNb2RlbC5zbGljZSgwKVxyXG4gICAgICAgIHRhcmdldE1vZGVsLnNwbGljZShkcm9wSW5kZXgsIDAsIGl0ZW0pO1xyXG4gICAgICAgIGlmIChpc0NvcHlpbmcpIHtcclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5yZW1vdmVDaGlsZChkcm9wRWxtKTtcclxuICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuZGlzcGF0Y2gkLm5leHQoe1xyXG4gICAgICAgIGV2ZW50OiBFdmVudFR5cGVzLkRyb3BNb2RlbCxcclxuICAgICAgICBuYW1lLFxyXG4gICAgICAgIGFyZ3M6IFsgZHJvcEVsbSwgdGFyZ2V0LCBzb3VyY2UsIHNpYmxpbmcsIGl0ZW0sIHNvdXJjZU1vZGVsLCB0YXJnZXRNb2RlbCwgZHJhZ0luZGV4LCBkcm9wSW5kZXggXVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZXR1cEV2ZW50cyhncm91cDogR3JvdXApOiB2b2lkIHtcclxuICAgIGlmIChncm91cC5pbml0RXZlbnRzKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGdyb3VwLmluaXRFdmVudHMgPSB0cnVlO1xyXG4gICAgY29uc3QgbmFtZSA9IGdyb3VwLm5hbWU7XHJcbiAgICBsZXQgdGhhdDogYW55ID0gdGhpcztcclxuICAgIGxldCBlbWl0dGVyID0gKGV2ZW50OiBFdmVudFR5cGVzKSA9PiB7XHJcbiAgICAgIGdyb3VwLmRyYWtlLm9uKGV2ZW50LCAoLi4uYXJnczogYW55W10pID0+IHtcclxuICAgICAgICB0aGlzLmRpc3BhdGNoJC5uZXh0KHsgZXZlbnQsIG5hbWUsIGFyZ3MgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIEFsbEV2ZW50cy5mb3JFYWNoKGVtaXR0ZXIpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkb21JbmRleE9mKGNoaWxkOiBhbnksIHBhcmVudDogYW55KTogYW55IHtcclxuICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKHBhcmVudC5jaGlsZHJlbiwgY2hpbGQpO1xyXG4gIH1cclxufVxyXG4iXX0=