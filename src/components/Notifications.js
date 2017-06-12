import React from 'react';
import ReactMaterialUiNotifications from 'react-materialui-notifications';

//Material UI
import Message from 'material-ui/svg-icons/communication/message';
import moment from 'moment';


const showPersonalisedNotification = () => {
  // update notifications count
  this.setState({
    count: ++this.state.count
  })
  ReactMaterialUiNotifications.showNotification({
    title: 'Title',
    additionalText: `Some message to be displayed ${this.state.count}`,
    icon: <Message />,
    iconBadgeColor: deepOrange500,
    overflowText: "me@gmail.com",
    timestamp: moment().format('h:mm A'),
    personalised: true,
    avatar: "demo.png"
  });
};


const Notifications = () => {
  return (<ReactMaterialUiNotifications
    desktop={true}
    transitionName={{ leave: 'dummy', leaveActive: 'fadeOut', appear: 'dummy', appearActive: 'zoomInUp' }}
    transitionAppear={true}
    transitionLeave={true} />
  );
};

export default Notifications;
