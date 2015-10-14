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

    static processDribbbleDataDetail(data) {
        dispatcher.dispatch('PROCESS-DRIBBBLE-DATA-DETAIL', data);
    }
}
