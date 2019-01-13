/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, Input, Output, ElementRef, EventEmitter } from '@angular/core';
import { DragulaService } from './dragula.service';
import { Subscription } from 'rxjs';
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
export { DragulaDirective };
function DragulaDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    DragulaDirective.prototype.dragula;
    /** @type {?} */
    DragulaDirective.prototype.dragulaModel;
    /** @type {?} */
    DragulaDirective.prototype.dragulaModelChange;
    /** @type {?} */
    DragulaDirective.prototype.subs;
    /** @type {?} */
    DragulaDirective.prototype.group;
    /** @type {?} */
    DragulaDirective.prototype.el;
    /** @type {?} */
    DragulaDirective.prototype.dragulaService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ3VsYS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItZHJhZ3VsYS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZHJhZ3VsYS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQThDLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvSCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFbkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQzs7OEJBZ0JQLEVBQWMsRUFBVSxjQUE4QjtRQUF0RCxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWdCO2tDQVQzQyxJQUFJLFlBQVksRUFBUzs7MEJBSW5ELHVDQUFTOzs7OztZQUNuQixPQUFPLElBQUksQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUM7Ozs7Ozs7OztJQU9uQyxzQ0FBVzs7OztjQUFDLE9BQThEO1FBQy9FLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDOUIsMEJBQVEsdUJBQW1CLEVBQUUseUJBQXFCLEVBQUUsNEJBQVcsQ0FBcUI7O1lBQ3BGLElBQUksZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQzs7WUFDOUIsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQzs7Ozs7O1lBTTVCLElBQUksZ0JBQWdCLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDckI7WUFDRCxJQUFJLFdBQVcsRUFBRTtnQkFDZixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDZDtTQUNGO2FBQU0sSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLFlBQVksRUFBRTtZQUkxQywrQkFBUSx1QkFBbUIsRUFB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Q0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7OztnQkFoSS9CLFNBQVMsU0FBQyxFQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUM7Ozs7Z0JBTkMsVUFBVTtnQkFDcEMsY0FBYzs7OzBCQU9wQixLQUFLOytCQUNMLEtBQUs7cUNBQ0wsTUFBTTs7MkJBVlQ7O1NBT2EsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgT3V0cHV0LCBFbGVtZW50UmVmLCBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBTaW1wbGVDaGFuZ2UsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEcmFndWxhU2VydmljZSB9IGZyb20gJy4vZHJhZ3VsYS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRHJha2VXaXRoTW9kZWxzIH0gZnJvbSAnLi4vRHJha2VXaXRoTW9kZWxzJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vR3JvdXAnO1xyXG5cclxuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdbZHJhZ3VsYV0nfSlcclxuZXhwb3J0IGNsYXNzIERyYWd1bGFEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XHJcbiAgQElucHV0KCkgcHVibGljIGRyYWd1bGE6IHN0cmluZztcclxuICBASW5wdXQoKSBwdWJsaWMgZHJhZ3VsYU1vZGVsOiBhbnlbXTtcclxuICBAT3V0cHV0KCkgcHVibGljIGRyYWd1bGFNb2RlbENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55W10+KCk7XHJcblxyXG4gIHByaXZhdGUgc3ViczogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBwcml2YXRlIGdldCBjb250YWluZXIoKTogSFRNTEVsZW1lbnQge1xyXG4gICAgcmV0dXJuIHRoaXMuZWwgJiYgdGhpcy5lbC5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuICBwcml2YXRlIGdyb3VwOiBHcm91cDtcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgZHJhZ3VsYVNlcnZpY2U6IERyYWd1bGFTZXJ2aWNlKSB7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczoge2RyYWd1bGE/OiBTaW1wbGVDaGFuZ2UsIGRyYWd1bGFNb2RlbD86IFNpbXBsZUNoYW5nZX0pOiB2b2lkIHtcclxuICAgIGlmIChjaGFuZ2VzICYmIGNoYW5nZXMuZHJhZ3VsYSkge1xyXG4gICAgICBjb25zdCB7IHByZXZpb3VzVmFsdWU6IHByZXYsIGN1cnJlbnRWYWx1ZTogY3VycmVudCwgZmlyc3RDaGFuZ2UgfSA9IGNoYW5nZXMuZHJhZ3VsYTtcclxuICAgICAgbGV0IGhhZFByZXZpb3VzVmFsdWUgPSAhIXByZXY7XHJcbiAgICAgIGxldCBoYXNOZXdWYWx1ZSA9ICEhY3VycmVudDtcclxuICAgICAgLy8gc29tZXRoaW5nIC0+IG51bGwgICAgICAgPT4gIHRlYXJkb3duIG9ubHlcclxuICAgICAgLy8gc29tZXRoaW5nIC0+IHNvbWV0aGluZyAgPT4gIHRlYXJkb3duLCB0aGVuIHNldHVwXHJcbiAgICAgIC8vICAgICAgbnVsbCAtPiBzb21ldGhpbmcgID0+ICBzZXR1cCBvbmx5XHJcbiAgICAgIC8vXHJcbiAgICAgIC8vICAgICAgbnVsbCAtPiBudWxsIChwcmVjbHVkZWQgYnkgZmFjdCBvZiBjaGFuZ2UgYmVpbmcgcHJlc2VudClcclxuICAgICAgaWYgKGhhZFByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICB0aGlzLnRlYXJkb3duKHByZXYpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChoYXNOZXdWYWx1ZSkge1xyXG4gICAgICAgIHRoaXMuc2V0dXAoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChjaGFuZ2VzICYmIGNoYW5nZXMuZHJhZ3VsYU1vZGVsKSB7XHJcbiAgICAgIC8vIHRoaXMgY29kZSBvbmx5IHJ1bnMgd2hlbiB5b3UncmUgbm90IGNoYW5naW5nIHRoZSBncm91cCBuYW1lXHJcbiAgICAgIC8vIGJlY2F1c2UgaWYgeW91J3JlIGNoYW5naW5nIHRoZSBncm91cCBuYW1lLCB5b3UnbGwgYmUgZG9pbmcgc2V0dXAgb3IgdGVhcmRvd25cclxuICAgICAgLy8gaXQgYWxzbyBvbmx5IHJ1bnMgaWYgdGhlcmUgaXMgYSBncm91cCBuYW1lIHRvIGF0dGFjaCB0by5cclxuICAgICAgY29uc3QgeyBwcmV2aW91c1ZhbHVlOiBwcmV2LCBjdXJyZW50VmFsdWU6IGN1cnJlbnQsIGZpcnN0Q2hhbmdlIH0gPSBjaGFuZ2VzLmRyYWd1bGFNb2RlbDtcclxuICAgICAgY29uc3QgeyBkcmFrZSB9ID0gdGhpcy5ncm91cDtcclxuICAgICAgaWYgKHRoaXMuZHJhZ3VsYSAmJiBkcmFrZSkge1xyXG4gICAgICAgIGRyYWtlLm1vZGVscyA9IGRyYWtlLm1vZGVscyB8fCBbXTtcclxuICAgICAgICBsZXQgcHJldkluZGV4ID0gZHJha2UubW9kZWxzLmluZGV4T2YocHJldik7XHJcbiAgICAgICAgaWYgKHByZXZJbmRleCAhPT0gLTEpIHtcclxuICAgICAgICAgIC8vIGRlbGV0ZSB0aGUgcHJldmlvdXNcclxuICAgICAgICAgIGRyYWtlLm1vZGVscy5zcGxpY2UocHJldkluZGV4LCAxKTtcclxuICAgICAgICAgIC8vIG1heWJlIGluc2VydCBhIG5ldyBvbmUgYXQgdGhlIHNhbWUgc3BvdFxyXG4gICAgICAgICAgaWYgKCEhY3VycmVudCkge1xyXG4gICAgICAgICAgICBkcmFrZS5tb2RlbHMuc3BsaWNlKHByZXZJbmRleCwgMCwgY3VycmVudCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICghIWN1cnJlbnQpIHtcclxuICAgICAgICAgIC8vIG5vIHByZXZpb3VzIG9uZSB0byByZW1vdmU7IGp1c3QgcHVzaCB0aGlzIG9uZS5cclxuICAgICAgICAgIGRyYWtlLm1vZGVscy5wdXNoKGN1cnJlbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gY2FsbCBuZ09uSW5pdCAnc2V0dXAnIGJlY2F1c2Ugd2Ugd2FudCB0byBjYWxsIGl0IGluIG5nT25DaGFuZ2VzXHJcbiAgLy8gYW5kIGl0IHdvdWxkIG90aGVyd2lzZSBydW4gdHdpY2VcclxuICBwdWJsaWMgc2V0dXAoKTogdm9pZCB7XHJcbiAgICBsZXQgY2hlY2tNb2RlbCA9IChncm91cDogR3JvdXApID0+IHtcclxuICAgICAgaWYgKHRoaXMuZHJhZ3VsYU1vZGVsKSB7XHJcbiAgICAgICAgaWYgKGdyb3VwLmRyYWtlLm1vZGVscykge1xyXG4gICAgICAgICAgZ3JvdXAuZHJha2UubW9kZWxzLnB1c2godGhpcy5kcmFndWxhTW9kZWwpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBncm91cC5kcmFrZS5tb2RlbHMgPSBbdGhpcy5kcmFndWxhTW9kZWxdO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBmaW5kIG9yIGNyZWF0ZSBhIGdyb3VwXHJcbiAgICBsZXQgZ3JvdXAgPSB0aGlzLmRyYWd1bGFTZXJ2aWNlLmZpbmQodGhpcy5kcmFndWxhKTtcclxuICAgIGlmICghZ3JvdXApIHtcclxuICAgICAgbGV0IG9wdGlvbnMgPSB7fTtcclxuICAgICAgZ3JvdXAgPSB0aGlzLmRyYWd1bGFTZXJ2aWNlLmNyZWF0ZUdyb3VwKHRoaXMuZHJhZ3VsYSwgb3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZW5zdXJlIG1vZGVsIGFuZCBjb250YWluZXIgZWxlbWVudCBhcmUgcHVzaGVkXHJcbiAgICBjaGVja01vZGVsKGdyb3VwKTtcclxuICAgIGdyb3VwLmRyYWtlLmNvbnRhaW5lcnMucHVzaCh0aGlzLmNvbnRhaW5lcik7XHJcbiAgICB0aGlzLnN1YnNjcmliZSh0aGlzLmRyYWd1bGEpO1xyXG5cclxuICAgIHRoaXMuZ3JvdXAgPSBncm91cDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdWJzY3JpYmUobmFtZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnN1YnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XHJcbiAgICB0aGlzLnN1YnMuYWRkKFxyXG4gICAgICB0aGlzLmRyYWd1bGFTZXJ2aWNlXHJcbiAgICAgIC5kcm9wTW9kZWwobmFtZSlcclxuICAgICAgLnN1YnNjcmliZSgoeyBzb3VyY2UsIHRhcmdldCwgc291cmNlTW9kZWwsIHRhcmdldE1vZGVsIH0pID0+IHtcclxuICAgICAgICBpZiAoc291cmNlID09PSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgICAgIHRoaXMuZHJhZ3VsYU1vZGVsQ2hhbmdlLmVtaXQoc291cmNlTW9kZWwpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0ID09PSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgICAgIHRoaXMuZHJhZ3VsYU1vZGVsQ2hhbmdlLmVtaXQodGFyZ2V0TW9kZWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgICB0aGlzLnN1YnMuYWRkKFxyXG4gICAgICB0aGlzLmRyYWd1bGFTZXJ2aWNlXHJcbiAgICAgIC5yZW1vdmVNb2RlbChuYW1lKVxyXG4gICAgICAuc3Vic2NyaWJlKCh7IHNvdXJjZSwgc291cmNlTW9kZWwgfSkgPT4ge1xyXG4gICAgICAgIGlmIChzb3VyY2UgPT09IHRoaXMuZWwubmF0aXZlRWxlbWVudCkge1xyXG4gICAgICAgICAgdGhpcy5kcmFndWxhTW9kZWxDaGFuZ2UuZW1pdChzb3VyY2VNb2RlbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB0ZWFyZG93bihncm91cE5hbWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuc3Vicykge1xyXG4gICAgICB0aGlzLnN1YnMudW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICAgIGNvbnN0IGdyb3VwID0gdGhpcy5kcmFndWxhU2VydmljZS5maW5kKGdyb3VwTmFtZSk7XHJcbiAgICBpZiAoZ3JvdXApIHtcclxuICAgICAgY29uc3QgaXRlbVRvUmVtb3ZlID0gZ3JvdXAuZHJha2UuY29udGFpbmVycy5pbmRleE9mKHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XHJcbiAgICAgIGlmIChpdGVtVG9SZW1vdmUgIT09IC0xKSB7XHJcbiAgICAgICAgZ3JvdXAuZHJha2UuY29udGFpbmVycy5zcGxpY2UoaXRlbVRvUmVtb3ZlLCAxKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5kcmFndWxhTW9kZWwgJiYgZ3JvdXAuZHJha2UgJiYgZ3JvdXAuZHJha2UubW9kZWxzKSB7XHJcbiAgICAgICAgbGV0IG1vZGVsSW5kZXggPSBncm91cC5kcmFrZS5tb2RlbHMuaW5kZXhPZih0aGlzLmRyYWd1bGFNb2RlbCk7XHJcbiAgICAgICAgaWYgKG1vZGVsSW5kZXggIT09IC0xKSB7XHJcbiAgICAgICAgICBncm91cC5kcmFrZS5tb2RlbHMuc3BsaWNlKG1vZGVsSW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy50ZWFyZG93bih0aGlzLmRyYWd1bGEpO1xyXG4gIH1cclxuXHJcbn1cclxuIl19