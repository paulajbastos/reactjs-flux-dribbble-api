import React from 'react';
import Actions from '../actions';
import appStore from '../stores/AppStore';


class DribbbleDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dribbbleDataDetail: []
            //shotId: ''
        };

        //Actions.requestDribbbleShotId(this.state.shotId);
    }

    componentWillMount() {
        let CurrentShot = this.state.dribbbleDataDetail;
        console.log("componentWillMount = " + Object.keys(CurrentShot).length);
        //console.log("componentWillMount = " + this.state.shotId);
        
        //this.appStoreId = appStore.registerView(() => { this.updateState(); });
        //this.updateState();
    }

    componentDidMount() {
        //console.log("carregou - componentDidMount");
        this.appStoreId = appStore.registerView(() => { this.updateState(); });
        this.updateState();

        //Actions.requestDribbbleShotId(this.state.shotId);

        
    }

    componentWillUnmount() {
        //let CurrentShot = this.state.dribbbleDataDetail;
        //console.log("componentWillUnmount = " + Object.keys(CurrentShot).length);
        //console.log("componentWillUnmount = " + this.state.shotId);
        appStore.deregisterView(this.appStoreId);
    }

    updateState() {
        this.setState(
            {dribbbleDataDetail: appStore.get('dribbbleDataDetail')}
        );


    }

    componentWillUpdate() {
        //let CurrentShot = this.state.dribbbleDataDetail;
        //console.log("will update = " + Object.keys(CurrentShot).length);
        //console.log("will update = " + this.state.shotId);
    }

    render() {

        var CurrentShot = this.state.dribbbleDataDetail;
        console.log("RENDER = " + Object.keys(CurrentShot).length);
        //console.log("RENDER ID= " + CurrentShot.id);

        var _title = "";
        var _img = "";
        var _viewsCount = "";
        var _avatar = "";
        var _author =  "";   
        var _description = "aguarde";

        if(Object.keys(CurrentShot).length !== 0){
            
            console.log("carregou - RENDER");

            _title = CurrentShot.title;
            _img = CurrentShot.images.normal;
            _viewsCount = CurrentShot.views_count;
            _avatar = CurrentShot.user.avatar_url;
            _author = CurrentShot.user.name;
            _description = CurrentShot.description;


        }else{
            console.log("nao carregou - RENDER");
            //Actions.navigate("dribbblelist");
        }

        /*else{
            _title = "";
            _img = "";
            _viewsCount = "";
            _avatar = "";
            _author =  "";   
            _description = "aguarde";
        }*/
        
        return (

           <section id="dribbbleDetail">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="thumbnail">
                            <img src={_img}/>
                            <div className="title clearfix">
                                <div className="pull-left"> {_title}</div>
                                <div className="pull-right"><span className="glyphicon glyphicon-eye-open"></span> {_viewsCount}</div>
                            </div>
                        </div>
                        <div className="spacer med"></div>
                        <div className="descr">
                            <div className="header clearfix">
                                <div className="avatar pull-left"><img src={_avatar}/></div>
                                <div className="author pull-left">{_author}</div>
                            </div>
                            <div className="spacer med"></div>
                            <div className="descr-text" dangerouslySetInnerHTML={{__html: _description}}></div>
                        </div>
                    </div>
                </div>
            </section>

        );
    }
}
//
export default DribbbleDetail;
