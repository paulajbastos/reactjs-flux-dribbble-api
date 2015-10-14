﻿import Store from '../lib/Store';
import find from 'lodash/collection/find';
import dispatcher from '../dispatcher';
import Actions from '../actions';
import $ from 'jquery';

class AppStore extends Store {

    constructor() {
        super('AppStore');
        this.logger.debug('Initializing AppStore');

        this.initialize('pages', [
          { name: 'dribbblelist', title: 'Dribbble', nav: false, default: true },
          { name: 'dribbbledetail', title: 'Dribbble Detail', nav: false, default: false }
        ]);
        this.initialize('route', this.getNavigationRoute(window.location.hash.substr(1)));
        this.initialize('dribbbleData', []);
        this.initialize('dribbbleDataDetail', []);
        this.initialize('lastDribbbleRequest', 0);
    }

    onAction(actionType, data) {
        this.logger.debug(`Received Action ${actionType} with data`, data);
        switch (actionType) {

            case 'NAVIGATE':
                let newRoute = this.getNavigationRoute(data.location);
                //console.log("newRoute = "+ newRoute);
                if (newRoute !== this.get('route')) {
                    this.set('route', newRoute);
                    window.location.hash = `#${newRoute}`;
                }
                break;

            case 'REQUEST-DRIBBBLE-DATA':
                let lastRequest = this.get('lastDribbbleRequest');
                let currentTime = Date.now;
                let fiveMinutes = 5 * 60 * 1000;
                if ((currentTime - lastRequest) > fiveMinutes) {
                    return;
                }

                $.ajax({
                    url: 'https://api.dribbble.com/v1/shots?access_token=7839443b2099142e9f0111e3726d4f93de80c529b6e7c91064d448825381bf74&callback=?',
                    //url: 'http://api.dribbble.com/v1//shots/',
                    //data: { tags: data.tag, tagmode: 'any', format: 'json' },
                    data: { format: 'json' },
                    dataType: 'json',
                    jsonp: 'jsoncallback'
                }).done(response => {
                    Actions.processDribbbleData(response);
                });
                break;

            case 'REQUEST-DRIBBBLE-SHOT-ID':
                $.ajax({
                    url: 'https://api.dribbble.com/v1/shots/'+data.shotId+'?access_token=7839443b2099142e9f0111e3726d4f93de80c529b6e7c91064d448825381bf74&callback=?',
                    //url: 'http://api.dribbble.com/v1//shots/',
                    //data: { tags: data.tag, tagmode: 'any', format: 'json' },
                    data: { format: 'json' },
                    dataType: 'json',
                    jsonp: 'jsoncallback'
                }).done(response => {
                    Actions.processDribbbleDataDetail(response);
                });
                break;

            case 'PROCESS-DRIBBBLE-DATA':
                this.set('dribbbleData', data.data);
                break;

            case 'PROCESS-DRIBBBLE-DATA-DETAIL':
                this.set('dribbbleDataDetail', data.data);
                break;

            
            default:
                this.logger.debug('Unknown actionType for this store - ignoring');
                break;
        }
    }

    getNavigationRoute(route) {
        let newRoute = find(this.get('pages'), path => { return path.name === route.toLowerCase(); });
        if (!newRoute) {
            newRoute = find(this.get('pages'), path => { return path.default && path.default === true; });
        }
        return newRoute.name || '';
    }
}

var appStore = new AppStore();
dispatcher.registerStore(appStore);

export default appStore;
