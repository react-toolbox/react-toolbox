import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import filterReactChildren from '../utils/filter-react-children';
import isComponentOfType from '../utils/is-component-of-type';
import { TABLE } from '../identifiers';
import InjectTableHead from './TableHead';
import InjectTableRow from './TableRow';

const factory = (TableHead, TableRow) => {
  const isTableHead = child => isComponentOfType(TableHead, child);
  const isTableRow = child => isComponentOfType(TableRow, child);

  class Table extends Component {
    static propTypes = {
      children: PropTypes.node,
      className: PropTypes.string,
      multiSelectable: PropTypes.bool,
      onRowSelect: PropTypes.func,
      selectable: PropTypes.bool,
      theme: PropTypes.shape({
        head: PropTypes.string,
        table: PropTypes.string,
      }),
    };

    static defaultProps = {
      className: '',
      multiSelectable: false,
      selectable: true,
    };

    getRowTuples = () => React.Children
      .toArray(filterReactChildren(this.props.children, isTableRow))
      .map((child, index) => [index, Boolean(child.props.selected)]);

    handleHeadSelect = (value) => {
      if (this.props.onRowSelect) {
        this.props.onRowSelect(value
          ? this.getRowTuples().map(item => item[0])
          : []);
      }
    };

    handleRowSelect = (idx) => {
      if (this.props.onRowSelect) {
        if (this.props.multiSelectable) {
          const current = this.getRowTuples().filter(item => item[1]).map(item => item[0]);
          const rowIndex = current.indexOf(idx);
          const indexes = rowIndex !== -1
          ? [...current.slice(0, rowIndex), ...current.slice(rowIndex + 1)]
          : [...current, idx];
          this.props.onRowSelect(indexes);
        } else {
          this.props.onRowSelect([idx]);
        }
      }
    };

    renderHead = () => {
      const tuples = this.getRowTuples();
      const selected = tuples.filter(item => item[1]).length === tuples.length;
      return React.Children.map(
        filterReactChildren(this.props.children, isTableHead),
        child => cloneElement(child, {
          selected,
          multiSelectable: this.props.multiSelectable,
          onSelect: this.handleHeadSelect,
          selectable: this.props.selectable,
        }),
      );
    };

    renderRows = () => React.Children.map(
      filterReactChildren(this.props.children, isTableRow),
      (child, idx) => cloneElement(child, {
        idx,
        onSelect: this.handleRowSelect,
        selectable: this.props.selectable,
      }),
    );

    render() {
      const {
        className,
        multiSelectable, // eslint-disable-line
        onRowSelect,     // eslint-disable-line
        selectable,      // eslint-disable-line
        theme,
        ...rest
      } = this.props;
      return (
        <table {...rest} className={classnames(theme.table, className)}>
          <thead className={theme.head}>{this.renderHead()}</thead>
          <tbody>{this.renderRows()}</tbody>
        </table>
      );
    }
  }

  return Table;
};

const Table = factory(InjectTableHead, InjectTableRow);
export default themr(TABLE)(Table);
export { factory as tableFactory };
export { Table };
