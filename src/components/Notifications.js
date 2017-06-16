import React, { Component } from 'react';
import ReactMaterialUiNotifications from 'react-materialui-notifications';
import moment from 'moment';
import { connect } from 'react-redux';

//Material UI
import Message from 'material-ui/svg-icons/communication/message';
import { deepOrange500 } from 'material-ui/styles/colors';


class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayvar: []
    };

    this.showPersonalisedNotification.bind(this);
  }


  componentDidUpdate() {
    const { user } = this.props;
    if (user.hasOwnProperty('nearby')) this.showPersonalisedNotification(user.nearby);
  }

  showPersonalisedNotification(nearby) {
    if (nearby.length > 0) {
      nearby.forEach(nearbyUser => {

        //check if exist in localstate
        if (this.state.arrayvar.indexOf(nearbyUser.id) === -1) {

          // Set the locaState
          this.setState({
            arrayvar: this.state.arrayvar.concat([nearbyUser.id])
          });

          // Pop up the notification
          ReactMaterialUiNotifications.showNotification({
            title: 'Nearby',
            additionalText: `${nearbyUser.name} is near you!`,
            icon: <Message />,
            iconBadgeColor: deepOrange500,
            timestamp: moment().format('h:mm A'),
            personalised: true,
            avatar: nearbyUser.photo
          });
        }
      });
    }
  }

  render() {
    return (<ReactMaterialUiNotifications
      desktop={true}
      transitionName={{ leave: 'dummy', leaveActive: 'fadeOut', appear: 'dummy', appearActive: 'zoomInUp' }}
      transitionAppear={true}
      transitionLeave={true} />
    );
  }
}

const mapStateToProps = (store) => {
  return {
    user: store.user
  };
};

export default connect(mapStateToProps)(Notifications);
