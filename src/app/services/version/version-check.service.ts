import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'; 
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { interval } from 'rxjs';
import { filter, map } from 'rxjs/operators';

declare var $: any;

@Injectable()
export class VersionCheckService {

    constructor(public swUpdate: SwUpdate) {
        interval(1000 * 60 * environment.updateMinutes).subscribe(
            () => swUpdate.checkForUpdate().then(() => console.log('checking for updates'))
        );
    }

    public checkForUpdates(): void {
        const updatesAvailable = this.swUpdate.versionUpdates.pipe(
        filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
        map(evt => ({
        type: 'UPDATE_AVAILABLE',
        current: evt.currentVersion,
        available: evt.latestVersion,
        })));
        console.log('checkUpdate');
        updatesAvailable
        .subscribe(event => {
            console.log('updateAvailable', event);
            this.showNotification()
        });
    }

    public showNotification() {

        $.notify({
            // options
            icon: 'warning',
            title: 'Nueva versión disponible',
            message: 'Existe una actualización, haz click aquí para actualizar', 
            // url: environment.web,
            target: '_self',
        },{
            // settings
            element: 'body',
            position: null,
            type: "info",
            allow_dismiss: false,
            newest_on_top: false,
            showProgressbar: false,
            placement: {
                from: "top",
                align: "right"
            },
            offset: 20,
            spacing: 10,
            z_index: 1031,
            // delay: 5000,
            timer: 1000 * 60 * 60,
            url_target: '_blank',
            mouse_over: null,
            animate: {
                enter: 'animated fadeInDown',
                exit: 'animated fadeOutUp'
            },
            onShow: null,
            onShown: null,
            onClose: null,
            onClosed: null,
            icon_type: 'class',
            template: '<div data-notify="container" style="cursor: pointer;" class="update col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
                '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                '<i class="material-icons" data-notify="icon">warning</i>' +
                '<span data-notify="title"><strong>{1}</strong></span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                    '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
        });

      }

}
