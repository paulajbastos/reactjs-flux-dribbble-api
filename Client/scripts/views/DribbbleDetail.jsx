import React from 'react';
import Actions from '../actions';
import appStore from '../stores/AppStore';


class DribbbleDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dribbbleDataDetail: [],
            shotId: ''
        };

        //Actions.requestDribbbleShot(this.state.shot);
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
            dribbbleDataDetail: appStore.get('dribbbleDataDetail')

        });
    }

    render() {
        let CurrentShot = this.state.dribbbleDataDetail;
        //console.log(" aqui - "+ CurrentShot);
        //console.log(CurrentShot);
        //console.log(Object.keys(CurrentShot));
        /* <div className="col-sm-6 col-md-3">
            <img src={CurrentShot.images.normal}/>
        </div>
        */    

        //avatar_url
        //description            

        if(Object.keys(CurrentShot).length !== 0){

            return (
                <section id="dribbbleDetail">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="thumbnail">
                                <img src={CurrentShot.images.normal}/>
                                <div className="title clearfix">
                                    <div className="pull-left"> {CurrentShot.title}</div>
                                    <div className="pull-right"><span className="glyphicon glyphicon-eye-open"></span> {CurrentShot.views_count}</div>
                                </div>
                            </div>
                            <div className="spacer med"></div>
                            <div className="descr">
                                <div className="header clearfix">
                                    <div className="avatar pull-left"><img src={CurrentShot.user.avatar_url}/></div>
                                    <div className="author pull-left">{CurrentShot.user.name}</div>
                                </div>
                                <div className="spacer med"></div>
                                <div className="descr-text" dangerouslySetInnerHTML={{__html: CurrentShot.description}}></div>
                            </div>
                        </div>
                    </div>
                </section>
            );
        }
        else{

            return (
                <section id="dribbbleDetail">
                    <div className="row">
                        <div className="col-sm-6 col-md-3">
                            Aguarde...
                        </div>
                    </div>
                </section>
            );
        }
        
        
    }
}
//
export default DribbbleDetail;
