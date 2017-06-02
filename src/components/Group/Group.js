import React from 'react';
import { connect } from 'react-redux';
import { loadFriends } from '../../redux/reducers/friendReducer';
import AddFriend from './AddFriend';

// Material UI
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';


const toolbarStyle = {
  backgroundColor: 'white',
};

class GroupSelector extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 1,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    this.setState({ value });
    this.props.loadFriends(value);
  }

  render() {
    if (!this.props.groups) return null;
    return (
      <Toolbar style={toolbarStyle}>
        <ToolbarGroup firstChild={true}>
          <DropDownMenu value={this.state.value} onChange={this.handleChange}>
            {
              this.props.groups.map(group => {
                return (
                  <MenuItem key={group.group.id} value={group.group.id} primaryText={group.group.name} />
                );
              })
            }
          </DropDownMenu>
        </ToolbarGroup>
        <ToolbarGroup>
          <AddFriend />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

const mapDispatchToProps = (dispatch) => (

  {
    loadFriends: (gId) => {
      console.log('loadfriend on the page', gId);
      return dispatch(loadFriends(gId))
    }
  }
);

const mapStateToProps = (state) => (
  {
    groups: state.groups,
    group: state.group
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(GroupSelector);



