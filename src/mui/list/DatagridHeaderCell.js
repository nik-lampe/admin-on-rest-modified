import React from 'react';
import PropTypes from 'prop-types';
import defaultsDeep from 'lodash.defaultsdeep';
import shouldUpdate from 'recompose/shouldUpdate';
import { TableHeaderColumn } from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import ContentSort from 'material-ui/svg-icons/content/sort';
import { lightBlack, minBlack } from 'material-ui/styles/colors';
import FieldTitle from '../../util/FieldTitle';

const styles = {
    labelStyle: {
        textTransform: 'none',
    },
    sortButton: {
        minWidth: 40,
        color: lightBlack,
    },
    nonSortableLabel: {
        position: 'relative',
        paddingLeft: 16,
        paddingRight: 16,
        verticalAlign: 'middle',
        letterSpacing: 0,
        textTransform: 'none',
        fontWeight: 500,
        fontSize: 14,
        color: minBlack,
    },
};

export const DatagridHeaderCell = ({
    field,
    defaultStyle,
    currentSort,
    updateSort,
    resource,
}) => {
    const style = defaultsDeep(
        {},
        field.props.headerStyle,
        field.type.defaultProps ? field.type.defaultProps.headerStyle : {},
        defaultStyle
    );
    return (
        <TableHeaderColumn style={style}>
            {field.props.sortable !== false && field.props.source ? (
                <FlatButton
                    labelPosition="before"
                    onClick={updateSort}
                    data-sort={field.props.source}
                    labelStyle={styles.labelStyle}
                    label={
                        <FieldTitle
                            label={field.props.label}
                            source={field.props.source}
                            resource={resource}
                        />
                    }
                    icon={
                        field.props.source === currentSort.field ? (
                            <ContentSort
                                style={
                                    currentSort.order === 'ASC' ? (
                                        { transform: 'rotate(180deg)' }
                                    ) : (
                                        {}
                                    )
                                }
                            />
                        ) : (
                            false
                        )
                    }
                    style={styles.sortButton}
                />
            ) : (
                <span style={styles.nonSortableLabel}>
                    {
                        <FieldTitle
                            label={field.props.label}
                            source={field.props.source}
                            resource={resource}
                        />
                    }
                </span>
            )}
        </TableHeaderColumn>
    );
};

DatagridHeaderCell.propTypes = {
    field: PropTypes.element,
    defaultStyle: PropTypes.shape({
        th: PropTypes.object,
        'th:first-child': PropTypes.object,
        sortButton: PropTypes.object,
        nonSortableLabel: PropTypes.object,
    }),
    currentSort: PropTypes.shape({
        sort: PropTypes.string,
        order: PropTypes.string,
    }),
    isSorting: PropTypes.bool,
    sortable: PropTypes.bool,
    resource: PropTypes.string,
    updateSort: PropTypes.func.isRequired,
};

export default shouldUpdate(
    (props, nextProps) =>
        props.isSorting !== nextProps.isSorting ||
        (nextProps.isSorting &&
            props.currentSort.order !== nextProps.currentSort.order)
)(DatagridHeaderCell);
