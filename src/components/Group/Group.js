import React from 'react';
import { connect } from 'react-redux';
import { loadGroups } from '../../redux/reducers/groupReducer';

const GroupOption = ({ group }) => (
  <option>{group.name}</option>
);

const GroupSelector = ({ groups }) => (
  <select>
    {
      groups.map(group => {
        return (
          <GroupOption key={group.id} group={group.group} />
        );
      })
    }
  </select>
);

const mapDispatchToProps = (dispatch) => (
  {
    loadGroups: () => dispatch(loadGroups(1))
  }
);

const mapStateToProps = (state) => (
  {
    groups: state.groups
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(GroupSelector);



