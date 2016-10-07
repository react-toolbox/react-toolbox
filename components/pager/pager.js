import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';

import InjectButton from '../button';
import { PAGER } from '../identifiers.js';

const isOnePage = (first, last) => {
    return first === last || !last;
};

const isBorderPage = (curr, border) => {
    return curr === border;
};

const initialVisiblePagesBlockSize = 3;
const initialCurrentPage = 1;
const first = 1;

const factory = (Button) => {
  class Pager extends Component {

    static propTypes = {
        currentPage: React.PropTypes.number.isRequired,
        lastPage: React.PropTypes.number.isRequired,
        leftRightArrowButtonTypes: React.PropTypes.object,
        leftRightRangeButtonTypes: React.PropTypes.object,
        nextButtonContent: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.element
        ]),
        onPageChange: React.PropTypes.func,
        pagerClassName: PropTypes.string,
        pagesButtonTypes: React.PropTypes.object,
        prevButtonContent: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.element
        ]),
        rangeLeftButtonContent: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.element
        ]),
        rangeRightButtonContent: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.element
        ]),
        theme: PropTypes.shape({
            pager: PropTypes.string,
            active: PropTypes.string,
            leftRightArrowButton: PropTypes.string,
            leftRightRangeButton: PropTypes.string,
            pagesButton: PropTypes.string
        }),
        visiblePagesBlockSize: React.PropTypes.number.isRequired
    }

    static defaultProps = {
        currentPage: initialCurrentPage,
        lastPage: initialCurrentPage,
        leftRightArrowButtonTypes: {raised: true},
        leftRightRangeButtonTypes: {flat: true},
        nextButtonContent: '\u003E',
        pagesButtonTypes: {flat: true},
        prevButtonContent: '\u003C',
        rangeLeftButtonContent: '...',
        rangeRightButtonContent: '...',
        visiblePagesBlockSize: initialVisiblePagesBlockSize
    }

    state = {
        currentPage: this.props.currentPage,
        lastPage: this.props.lastPage
    }

    componentWillReceiveProps (nextProps) {
      if (nextProps.currentPage && !isNaN(Number(nextProps.currentPage))
        && this.state.currentPage !== nextProps.currentPage) {
        this.setState({
            currentPage: Number(nextProps.currentPage < first ? first : nextProps.currentPage)
        });
      }
      if (nextProps.lastPage && !isNaN(Number(nextProps.lastPage))
        && this.state.lastPage !== nextProps.lastPage) {
        this.setState({
            lastPage: Number(nextProps.lastPage < first ? first : nextProps.lastPage)
        });
      }
    }

    handlerPageClick (page) {
        const oldValue = this.state.currentPage;
        const newValue = page;

        if (this.props.onPageChange) {
            this.props.onPageChange(oldValue, newValue);
        }

        this.setState({
            currentPage: newValue
        });
    }

    handlerRangeClick (key) {
        const curr = this.state.currentPage;
        const last = this.state.lastPage;

        const right = !this._ranges.rightStart ? last : this._ranges.rightStart;
        const left = !this._ranges.leftEnd ? first : this._ranges.leftEnd;

        let newValue = curr;
        let sum = first + left;
        if (key === 'prev') {
            newValue = (sum >> 1); //rounding to left
        } else {
            sum = last + right;
            newValue = (sum >> 1) + (sum % 2); //rounding to right
        }

        if (this.props.onPageChange) {
            this.props.onPageChange(curr, newValue);
        }

        this.setState({
            currentPage: newValue
        });
    }

    handlerPrevNextClick (key) {
        const oldValue = this.state.currentPage;
        const newValue = key === 'prev' ? oldValue - 1 : oldValue + 1;

        if (this.props.onPageChange) {
            this.props.onPageChange(oldValue, newValue);
        }

        this.setState({
            currentPage: newValue
        });
    }

    //fields
    _ranges = {
        leftEnd: null,
        rightStart: null
    }

    //rendering
    //private methods
    renderPages (currPage, lastPage) {
        let curr = currPage;
        let last = lastPage < first ? first : lastPage;
        if (curr < first || curr > last) {
            curr = curr < first ? first : curr > last ? last : curr;
            this.setState({
                currentPage: curr
            });
        }

        /*
        * adjustment of start and end elements at range to have equal elements during navigation
        * 2 - because we already have the rendered first and last button
        */
        const adjustment = 2;
        const content = [];

        const blockSize = this.props.visiblePagesBlockSize === 1 ? adjustment : this.props.visiblePagesBlockSize;

        const padding = blockSize >> 1;
        const left = curr - padding * (blockSize % 2); //in case of even visiblePagesBlockSize
        const right = curr + padding;

        const blocksNumber = Math.ceil(last / blockSize);
        let currentBlock = Math.ceil(curr / blockSize);

        let start = ((currentBlock - 1) * blockSize) + first;
        let end = start + blockSize - first;

        if (currentBlock === 1) { //adjust set of buttons if current is on the left boundary
            end += adjustment;
            end = (last - first) === end ? last : end;
        } else if (currentBlock < blocksNumber) { //adjustment set of buttons if current is between boundaries
            start = left;
            end = right;

            currentBlock = Math.ceil(end / blockSize);
        }

        if (currentBlock === blocksNumber) { //adjustment set of buttons if current is on the right boundary
            start = last - (blockSize + adjustment - first);
            start = start - 1 <= first ? first : start;
            end = last;
        }

        if (currentBlock > 1 && (start - 1) > first) {
            content.push(
                <Button
                    key={first}
                    {...this.props.pagesButtonTypes}
                    className={classnames(this.props.theme.pagesButton, (curr === first ? this.props.theme.active : null))}
                    onClick={this.handlerPageClick.bind(this, first)}>
                    { String(first) }
                </Button>
            );

            content.push(
                <Button
                    key={'prev'}
                    {...this.props.leftRightRangeButtonTypes}
                    className={classnames(this.props.theme.leftRightRangeButton)}
                    onClick={this.handlerRangeClick.bind(this, 'prev')}>
                    { this.props.rangeLeftButtonContent }
                </Button>
            );
        }

        for (let i = start; i <= last && i <= end; ++i) {
            content.push(
                    <Button
                        key={i}
                        {...this.props.pagesButtonTypes}
                        className={classnames(this.props.theme.pagesButton, (curr === i ? this.props.theme.active : null))}
                        onClick={this.handlerPageClick.bind(this, i)}>
                        { String(i) }
                    </Button>
                );
        }

        if (currentBlock < blocksNumber && end < last) {
            content.push(
                <Button
                    key={'next'}
                    {...this.props.leftRightRangeButtonTypes}
                    className={classnames(this.props.theme.leftRightRangeButton)}
                    onClick={this.handlerRangeClick.bind(this, 'next')}>
                    { this.props.rangeRightButtonContent }
                </Button>
            );

            content.push(
                <Button
                    key={last}
                    {...this.props.pagesButtonTypes}
                    className={classnames(this.props.theme.pagesButton, (curr === last ? this.props.theme.active : null))}
                    onClick={this.handlerPageClick.bind(this, last)}>
                    { String(last) }
                </Button>
            );
        }

        // keep range boundaries to calculate correct navigation through the range
        this._ranges.leftEnd = start;
        this._ranges.rightStart = end - 1;

        return content;
    }

    render () {
        const {leftRightArrowButtonTypes, prevButtonContent, nextButtonContent,
                pagerClassName, lastPage, theme} = this.props;

        if (lastPage < first) {
            console.error('ArgumentOutOfRangeException: last Page must be bigger or equal first = 1.');
        }

        return (
            <div data-react-toolbox='pager' className={classnames(theme.pager, pagerClassName)} >

                <Button
                    {...leftRightArrowButtonTypes}
                    disabled={isOnePage(first, this.state.lastPage) || isBorderPage(this.state.currentPage, first)}
                    className={theme.leftRightArrowButton}
                    onClick={this.handlerPrevNextClick.bind(this, 'prev')}>
                    { prevButtonContent }
                </Button>
                {
                    this.renderPages(this.state.currentPage, this.state.lastPage)
                }
                <Button
                    {...leftRightArrowButtonTypes}
                    disabled={isOnePage(first, this.state.lastPage) || isBorderPage(this.state.currentPage, this.state.lastPage)}
                    className={theme.leftRightArrowButton}
                    onClick={this.handlerPrevNextClick.bind(this, 'next')}>
                    { nextButtonContent }
                </Button>

            </div>);
        }
    }

    return Pager;
};

const Pager = factory(InjectButton);

export default themr(PAGER)(Pager);
export {
  factory as pagerFactory
};
export { Pager };
