import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';

import Button from '../button';
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
        pagerClassName:  PropTypes.string,
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
        nextButtonContent: React.PropTypes.oneOfType([
                                    React.PropTypes.string,
                                    React.PropTypes.element
                                ]),
        leftRightArrowButtonTypes :React.PropTypes.object,
        leftRightRangeButtonTypes :React.PropTypes.object,
        pagesButtonTypes :React.PropTypes.object,
        theme: PropTypes.shape({
            pager: PropTypes.string,
            active: PropTypes.string,
            leftRightArrowButton: PropTypes.string,
            leftRightRangeButton: PropTypes.string,
            pagesButton: PropTypes.string
        }),
        currentPage: React.PropTypes.number.isRequired,
        lastPage: React.PropTypes.number.isRequired,
        visiblePagesBlockSize: React.PropTypes.number.isRequired,
        onPageChange: React.PropTypes.func
    };

    static defaultProps = {
            prevButtonContent: '\u003C',
            rangeLeftButtonContent: '...',
            rangeRightButtonContent: '...',
            nextButtonContent: '\u003E',
            leftRightArrowButtonTypes:  {raised: true},
            leftRightRangeButtonTypes:  {flat: true},
            pagesButtonTypes: {flat: true},
            visiblePagesBlockSize: initialVisiblePagesBlockSize,
            currentPage: initialCurrentPage,
            lastPage: initialCurrentPage
    };

    state = {
        currentPage: this.props.currentPage,
        lastPage: this.props.lastPage
    };

    componentWillReceiveProps (nextProps) {
      if (nextProps.currentPage && !isNaN(Number(nextProps.currentPage)) &&
        this.state.currentPage !== nextProps.currentPage) {
        this.setState({ 
            currentPage: Number(nextProps.currentPage < first ? first : nextProps.currentPage)
        });
      }
      if (nextProps.lastPage && !isNaN(Number(nextProps.lastPage)) &&
        this.state.lastPage !== nextProps.lastPage) {
        this.setState({ 
            lastPage: Number(nextProps.lastPage < first ? first : nextProps.lastPage)
        });
      }
    };

    handlerPageClick(page)
    {
        var oldValue = this.state.currentPage;
        var newValue = page;

        if (this.props.onPageChange) {
            this.props.onPageChange(oldValue, newValue);
        }

        this.setState({
            currentPage: newValue
        });
    };

    handlerRangeClick(key)
    {
        var curr = this.state.currentPage;
        var last = this.state.lastPage;

        var right = !this._ranges.rightStart ? last : this._ranges.rightStart;
        var left = !this._ranges.leftEnd ? first : this._ranges.leftEnd;
        
        var newValue = curr;
        if (key === 'prev') {
            var sum = first + left;
            newValue = (sum >> 1); //rounding to left
        }
        else {
            var sum = last + right;
            newValue = (sum >> 1) + (sum % 2); //rounding to right
        }

        if (this.props.onPageChange) {
            this.props.onPageChange(curr, newValue);
        }

        this.setState({
            currentPage: newValue
        });
    };

    handlerPrevNextClick(key)
    {
        var oldValue = this.state.currentPage;
        var newValue = key === 'prev' ? oldValue - 1 : oldValue + 1;
        
        if (this.props.onPageChange) {
            this.props.onPageChange(oldValue, newValue);
        }

        this.setState({
            currentPage: newValue
        });
    };

    //fields
    _ranges = {
        leftEnd: null, 
        rightStart: null
    };

    //rendering
    //private methods
    renderPages(curr, last)
    {
        last = last < first ? first : last;
        if (curr < first || curr > last)
        {
            curr = curr < first ? first : curr > last ? last : curr;
            this.setState({
                currentPage: curr
            });
        }

        /*
        * adjustment of start and end elements at range to have equal elements during navigation
        * 2 - because we already have the rendered first and last button
        */
        var adjustment = 2;
        var content = [];

        var blockSize = this.props.visiblePagesBlockSize === 1 ? adjustment : this.props.visiblePagesBlockSize;

        var padding = blockSize >> 1;
        var left = curr - padding * (blockSize % 2); //in case of even visiblePagesBlockSize
        var right = curr + padding;

        var blocksNumber = Math.ceil(last / blockSize);
        var currentBlock = Math.ceil(curr / blockSize);

        var start = ((currentBlock - 1) * blockSize) + first;        
        var end = start + blockSize - first;        

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

        for(var i = start; i <= last && i <= end; ++i) {
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
    };

    render() {
        const {leftRightArrowButtonTypes, prevButtonContent, nextButtonContent, 
                pagerClassName, currentPage, lastPage, theme, ...other} = this.props;

        if (lastPage < first)
        {
            console.error("ArgumentOutOfRangeException: last Page must be bigger or equal first = 1.");
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
        };
    }

    return Pager;
};

const Pager = factory(Button);

export default themr(PAGER)(Pager);
export {
  factory as pagerFactory
};
export { Pager };
