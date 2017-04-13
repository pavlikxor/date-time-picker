"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var picker_service_1 = require("./picker.service");
var TimePanelComponent = (function () {
    function TimePanelComponent(service) {
        this.service = service;
        this.onSetTime = new core_1.EventEmitter();
        this.hourFloor = 1;
        this.hourCeiling = 12;
    }
    TimePanelComponent.prototype.ngOnInit = function () {
        this.moment = this.service.moment.clone();
        this.hourTime = this.service.dtHourTime;
        this.theme = this.service.dtTheme;
        this.mode = this.service.dtMode;
        this.showSeconds = this.service.dtShowSeconds;
        if (this.hourTime === '12') {
            if (this.moment.hours() <= 11) {
                this.hourValue = this.moment.hours();
            }
            else if (this.moment.hours() > 12) {
                this.hourValue = this.moment.hours() - 12;
            }
            else if (this.moment.hours() === 0 || this.moment.hours() === 12) {
                this.hourValue = 12;
            }
        }
        if (this.hourTime === '24') {
            this.hourValue = this.moment.hours();
            this.hourFloor = 0;
            this.hourCeiling = 23;
        }
        this.minValue = this.moment.minutes();
        this.secValue = this.moment.seconds();
        this.meridianValue = this.moment.clone().locale('en').format('A');
    };
    TimePanelComponent.prototype.setMeridian = function (meridian) {
        this.meridianValue = meridian;
    };
    TimePanelComponent.prototype.setTime = function () {
        this.onSetTime.emit({ hour: this.hourValue, min: this.minValue, sec: this.secValue, meridian: this.meridianValue });
    };
    return TimePanelComponent;
}());
TimePanelComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'dialog-time-panel',
                changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                template: "<div class=\"time-panel\" [ngClass]=\"{\n    'picker-popup': mode === 'popup',\n    'picker-dropdown': mode === 'dropdown',\n    'picker-inline': mode === 'inline',\n    'theme-green': theme === 'green',\n    'theme-teal': theme === 'teal',\n    'theme-grape': theme === 'grape',\n    'theme-cyan': theme === 'cyan',\n    'theme-red': theme === 'red',\n    'theme-gray': theme === 'gray'}\"><div class=\"time-panel-header\"><div class=\"time\">{{hourValue | numberFixedLen: 2}} : {{minValue | numberFixedLen: 2}}</div><div class=\"meridiem\" *ngIf=\"hourTime === '12'\"><div class=\"button-group\"><button class=\"button\" type=\"button\" [class.active]=\"meridianValue === 'AM'\" (click)=\"setMeridian('AM')\">AM</button> <button class=\"button\" type=\"button\" [class.active]=\"meridianValue === 'PM'\" (click)=\"setMeridian('PM')\">PM</button></div></div></div><div class=\"time-control\"><div class=\"title\">{{'hour' | translate}}</div><app-slide-bar [theme]=\"theme\" [floor]=\"hourFloor\" [ceiling]=\"hourCeiling\" [(low)]=\"hourValue\"></app-slide-bar></div><div class=\"time-control\"><div class=\"title\">{{'minute' | translate}}</div><app-slide-bar [theme]=\"theme\" [floor]=\"0\" [ceiling]=\"59\" [(low)]=\"minValue\"></app-slide-bar></div><div class=\"time-control\" *ngIf=\"showSeconds\"><div class=\"title\">{{'second' | translate}}</div><app-slide-bar [theme]=\"theme\" [floor]=\"0\" [ceiling]=\"59\" [(low)]=\"secValue\"></app-slide-bar></div><div class=\"control\"><button class=\"button\" type=\"button\" (click)=\"setTime()\">{{'set time' | translate}}</button></div></div>",
                styles: ["*,::after,::before{-moz-box-sizing:border-box;box-sizing:border-box}:host{position:absolute;top:0;left:0;width:100%;height:100%}.time-panel{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-moz-box-orient:vertical;-moz-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-justify-content:space-around;-ms-flex-pack:distribute;justify-content:space-around;width:100%;height:100%}.time-panel-header{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-moz-box-pack:center;-ms-flex-pack:center;justify-content:center}.time{font-size:37.92px;line-height:40px;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-moz-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;width:50%;padding:20px 0 0;color:#0070ba}.picker-inline .time{font-size:21.328px;line-height:40px;padding:0}@media only screen and (min-width:768px){.picker-dropdown .time{font-size:21.328px;line-height:40px;padding:0}}.title{font-size:21.328px;line-height:40px;width:80%;margin:10px auto}.picker-inline .title{font-size:12px;line-height:20px;margin:5px auto}@media only screen and (min-width:768px){.picker-dropdown .title{font-size:12px;line-height:20px;margin:5px auto}}.meridiem{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-moz-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;width:50%}.picker-inline .meridiem{font-size:8px;line-height:10px}@media only screen and (min-width:768px){.picker-dropdown .meridiem{font-size:8px;line-height:10px}}.meridiem .button-group{display:inline-block}.meridiem .button{border:1px solid #0070ba;background:#fff;-moz-border-radius:3px;border-radius:3px;float:left;margin:0;-webkit-box-align:initial;-webkit-align-items:initial;-moz-box-align:initial;-ms-flex-align:initial;align-items:initial;color:#0070ba;width:auto;padding:0 5px;cursor:pointer}.meridiem .button:first-child{-moz-border-radius-topright:0;border-top-right-radius:0;-moz-border-radius-bottomright:0;border-bottom-right-radius:0;border-right:0}.meridiem .button:last-child{-moz-border-radius-topleft:0;border-top-left-radius:0;-moz-border-radius-bottomleft:0;border-bottom-left-radius:0}.meridiem .button.active{background:#0070ba;color:#fff}.control{font-size:21.328px;line-height:40px;text-align:center}.picker-inline .control{font-size:12px;line-height:20px;margin:5px 0}@media only screen and (min-width:768px){.picker-dropdown .control{font-size:12px;line-height:20px;margin:5px 0}}.control .button{width:50%;background:#0070ba;color:#fff;margin:0 auto;border:1px solid #0070ba;-moz-border-radius:3px;border-radius:3px;cursor:pointer}.control .button:hover{background-color:#0061a1}.theme-green .time{color:#2b8a3e}.theme-green .meridiem .button{border-color:#2b8a3e;color:#2b8a3e}.theme-green .meridiem .button.active{background:#2b8a3e;color:#fff}.theme-green .control .button{background:#2b8a3e;border-color:#2b8a3e}.theme-green .control .button:hover{background-color:#257735}.theme-teal .time{color:#087f5b}.theme-teal .meridiem .button{border-color:#087f5b;color:#087f5b}.theme-teal .meridiem .button.active{background:#087f5b;color:#fff}.theme-teal .control .button{background:#087f5b;border-color:#087f5b}.theme-teal .control .button:hover{background-color:#06674a}.theme-cyan .time{color:#0b7285}.theme-cyan .meridiem .button{border-color:#0b7285;color:#0b7285}.theme-cyan .meridiem .button.active{background:#0b7285;color:#fff}.theme-cyan .control .button{background:#0b7285;border-color:#0b7285}.theme-cyan .control .button:hover{background-color:#095e6d}.theme-grape .time{color:#862e9c}.theme-grape .meridiem .button{border-color:#862e9c;color:#862e9c}.theme-grape .meridiem .button.active{background:#862e9c;color:#fff}.theme-grape .control .button{background:#862e9c;border-color:#862e9c}.theme-grape .control .button:hover{background-color:#752888}.theme-red .time{color:#c92a2a}.theme-red .meridiem .button{border-color:#c92a2a;color:#c92a2a}.theme-red .meridiem .button.active{background:#c92a2a;color:#fff}.theme-red .control .button{background:#c92a2a;border-color:#c92a2a}.theme-red .control .button:hover{background-color:#b42626}.theme-gray .time{color:#212529}.theme-gray .meridiem .button{border-color:#212529;color:#212529}.theme-gray .meridiem .button.active{background:#212529;color:#fff}.theme-gray .control .button{background:#212529;border-color:#212529}.theme-gray .control .button:hover{background-color:#16181b}"],
            },] },
];
TimePanelComponent.ctorParameters = function () { return [
    { type: picker_service_1.PickerService, },
]; };
TimePanelComponent.propDecorators = {
    'onSetTime': [{ type: core_1.Output },],
};
exports.TimePanelComponent = TimePanelComponent;
//# sourceMappingURL=time-panel.component.js.map