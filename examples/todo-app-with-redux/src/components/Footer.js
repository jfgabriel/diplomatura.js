import React from 'react';
import { connect } from 'react-redux';

export function Footer({ count }) {
  return <div style={{ margin: '10px' }}>Todo Count: {count}</div>;
}

const mapStateToProps = (state) => ({
  count: state.todos.allIds.length,
});

export default connect(mapStateToProps)(Footer);
