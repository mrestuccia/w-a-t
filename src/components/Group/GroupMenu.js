/*import React from 'react';
import { connect } from 'react-redux';

//Material UI
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Drawer from 'material-ui/Drawer';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';


const toolbarStyle = {
  backgroundColor: 'white',
};

class GroupMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 1,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    this.setState({ value });
  }

  render() {
    if (!this.props.groups) return null;
    return (

        <MenuItem value={this.state.value} onChange={this.handleChange} style={{display: user.id ? 'block' : 'none'}} primaryText="Group:Family" checked={true} rightIcon={<ArrowDropRight/>}
              menuItems={[
                <MenuItem primaryText="Family" checked={true}/>,
                <MenuItem primaryText="FullStack Friends"  />,
                <MenuItem primaryText="Co-worker" />,
        
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

export default connect(mapStateToProps, mapDispatchToProps)(GroupSelector);*/