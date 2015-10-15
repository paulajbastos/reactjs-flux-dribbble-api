import React from 'react';
import Actions from '../actions';
import appStore from '../stores/AppStore';

class DribbbleList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dribbbleData: [],
            tag: 'popular'
        };

        Actions.requestDribbbleData(this.state.tag);
    }

    componentWillMount() {
        this.appStoreId = appStore.registerView(() => { this.updateState(); });
        this.updateState();
    }

    componentWillUnmount() {
        appStore.deregisterView(this.appStoreId);
    }

    updateState() {
        this.setState({
            dribbbleData: appStore.get('dribbbleData')
        });
    }

    /*onClick(route,shotId) {
        Actions.navigate(route);
        Actions.requestDribbbleShotId(shotId);
    }*/
    
    // only shows data if obj.length > 0 

    changeShot(shotId){
        console.log("changeShot = " + shotId);
        Actions.requestDribbbleDataDetail(shotId);
        //Actions.processDribbbleShotId(shotId);
    }

    render() {
        let shots = this.state.dribbbleData.map(shot => {
            
            let s = shot.images.normal.split('/');
            let fn = s[s.length - 1].split('.')[0];

            //SETAR O ID E DEPOS ALTERAR A VIEW
            let handler = event => { return this.changeShot(shot.id, event)};
            //let handler = event => { return this.onClick(this.changeShot(shot.id)); };
            //let handler = event => { return this.onClick("dribbbledetail", shot.id); };


            var divStyle = {
                //color: 'white',
                backgroundImage: 'url(' + shot.images.normal + ')',
                //WebkitTransition: 'all', // note the capital 'W' here
                //msTransition: 'all' // 'ms' is the only lowercase vendor prefix
            };

            return (

                <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12" key={fn} onClick={handler}>
                    <div className="thumbnail">
                        <img src={shot.images.normal}/>
                        <div className="title clearfix">
                            <div className="pull-left"> {shot.title}</div>
                            <div className="pull-right"><span className="glyphicon glyphicon-eye-open"></span> {shot.views_count}</div>
                        </div>

                    </div>
                </div>


            );
        });
        
  

        return (
            <section id="dribbbleList">
                <div className="row">{shots}</div>
            </section>
        );
    }
}

export default DribbbleList;
