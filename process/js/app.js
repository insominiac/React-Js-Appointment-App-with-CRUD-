var React = require('react');
var ReactDOM = require('react-dom');

var AptList = require('./AptList');

var AddAppointment = require('./AddApointment');

var SearchAppointments = require('./SearchAppointments');

 var _ = require('lodash');

    

var MainInterface = React.createClass({

    getInitialState:function(){

        return {
            displayAptForm: false,
            orderBy:'petName',
            orderDir:'asc',
            MyApts:[]               
            
        }
    },

    componentDidMount:function(){
        this.serverRequest = $.get('./js/data.json', function(result){
            var temApts = result;
            this.setState({
                MyApts:temApts    
            });

        }.bind(this));

    },

    componentWillUmount:function(){
        this.serverRequest.abort();
    },
    deleteMessage:function(item){
        var allApts = this.state.MyApts;
        var newApts = _.without(allApts,item);
        this.setState({
                MyApts:newApts
        });
    },

    toggleAddDisplay:function(){
            var tempVisible = !this.state.displayAptForm;
            this.setState({
                    displayAptForm: tempVisible
            });

    },

    addItem:function(tempItem){
        var temApts = this.state.MyApts;
        temApts.push(tempItem);
        this.setState({
            MyApts:temApts

        });

    },

    reOrder:function(orderBy,orderDir){
        this.setState({
            orderBy: orderBy,
            orderDir:orderDir
        });
    
    },

    searchApts:function(){

        
    },

    render:function(){

        var filterApts = this.state.MyApts;
        var orderBy =  this.state.orderBy;
        var orderDir = this.state.orderDir;

        filterApts = _.orderBy(filterApts, function(item){
            return item[orderBy].toLowerCase();
        },orderDir);
        filterApts = filterApts.map(function(item, index){
           return (
               <AptList key={index}
                    singleItem = {item} 
                    whichItem={item}
                    onDelete={this.deleteMessage}/>            
              
                ) }.bind(this)        
                );
                                          
        return( 

            
            <div className="interface">
                <AddAppointment formVisible={this.state.displayAptForm} 
                handleToggle={this.toggleAddDisplay}
                addApt={this.addItem}/>
                <SearchAppointments  orderBy={this.state.orderBy} 
                    orderDir={this.state.orderDir} onReOrder={this.reOrder} onSearch = {this.searchApts}/>
                 <div className="item-list media-list">
                    <ul className="item-list media-list">
                        {filterApts}
                    </ul>
                 </div>        
            </div>
          )//return

    }//render

   



});//MainInterface


ReactDOM.render(

    <MainInterface/>,
    document.getElementById('appointments')
);