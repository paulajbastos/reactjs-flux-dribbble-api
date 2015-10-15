import dispatcher from './dispatcher';

export default class Actions {
    static navigate(newRoute) {
        dispatcher.dispatch('NAVIGATE', { location: newRoute });
    }

    static requestDribbbleData(tag) {
        dispatcher.dispatch('REQUEST-DRIBBBLE-DATA', { tag: tag });
    }

    static processDribbbleData(data) {
        dispatcher.dispatch('PROCESS-DRIBBBLE-DATA', data);
    }

    static requestDribbbleShotId(shotId) {
        dispatcher.dispatch('REQUEST-DRIBBBLE-SHOT-ID', { shotId: shotId });
    }

    static processDribbbleShotId(shotId) {
        dispatcher.dispatch('PROCESS-DRIBBBLE-SHOT-ID', shotId);
    }

    static requestDribbbleDataDetail(data) {
        dispatcher.dispatch('REQUEST-DRIBBBLE-DATA-DETAIL', { data: data });
    }

    static processDribbbleDataDetail(data) {
        dispatcher.dispatch('PROCESS-DRIBBBLE-DATA-DETAIL', data);
    }
}
