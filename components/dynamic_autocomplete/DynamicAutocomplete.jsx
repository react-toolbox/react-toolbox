import React from 'react';
import ReactDOM from 'react-dom';
import ClassNames from 'classnames';
import Input from '../input';
import events from '../utils/events';
import style from './style';


class DynamicAutocomplete extends React.Component {
    static propTypes = {
        className: React.PropTypes.string,
        disabled: React.PropTypes.bool,
        error: React.PropTypes.string,
        label: React.PropTypes.string,
        onSelectOption: React.PropTypes.func,
        getSource: React.PropTypes.func
    };

    static defaultProps = {
        className: ''
    };

    state = {
        focus: false,
        query: ''
    };

    handleChange = (key, event) => {
        const value = this.state.source.get(key);
        if (this.props.onSelectOption) this.props.onSelectOption(value, event);
        this.setState({focus: false, query: value.name, source: null}, () => {
            this.refs.input.blur();
        });
    };

    handleQueryBlur = () => {
        if (this.state.focus) this.setState({focus: false});
    };

    handleQueryChange = (value) => {
        this.setState({query: value});
        if(value !== '')
            this.props.getSource(value).then(src => {
                this.state.query !== '' ? this.setState({source: src}) : this.setState({source: null});
            });
        else
            this.setState({source: null});

    };

    handleQueryFocus = () => {
        this.refs.suggestions.scrollTop = 0;
        this.setState({active: '', focus: true});
    };

    handleQueryKeyUp = (event) => {
        if (event.which === 13 && this.state.active)
            this.select(this.state.active, event);
        if (event.which === 27) this.refs.input.blur();
        if ([40, 38].indexOf(event.which) !== -1) {
            const suggestionsKeys = [...this.suggestions().keys()];
            let index = suggestionsKeys.indexOf(this.state.active) + (event.which === 40 ? +1 : -1);
            if (index < 0) index = suggestionsKeys.length - 1;
            if (index >= suggestionsKeys.length) index = 0;
            this.setState({active: suggestionsKeys[index]});
        }
    };

    handleSuggestionHover = (key) => {
        this.setState({active: key});
    };

    suggestions() {
        return this.state.source || new Map();
    }

    select(key, event) {
        events.pauseEvent(event);
        this.handleChange(key, event);
    }

    renderSuggestions() {
        const suggestions = [...this.suggestions()].map(([key, value]) => {
            const className = ClassNames(style.suggestion, {[style.active]: this.state.active === key});
            return (
                <li
                    key={key}
                    className={className}
                    onMouseDown={this.select.bind(this, key)}
                    onMouseOver={this.handleSuggestionHover.bind(this, key)} >
                    {value.name}
                </li>
            );
        });
        return <ul ref='suggestions' className={ClassNames(style.suggestions)}>{suggestions}</ul>
    }

    render() {
        const {error, label, ...other} = this.props;
        const className = ClassNames(style.root, {
            [style.focus]: this.state.focus
        }, this.props.className);

        const suggestions = this.renderSuggestions();
        return (
            <div data-react-toolbox='dynamic-autocomplete' className={className}>
                <Input
                    {...other}
                    ref='input'
                    className={style.input}
                    error={error}
                    label={label}
                    onBlur={this.handleQueryBlur}
                    onChange={this.handleQueryChange}
                    onFocus={this.handleQueryFocus}
                    onKeyUp={this.handleQueryKeyUp}
                    value={this.state.query}
                />
                {suggestions}
            </div>
        );
    }
}

export default DynamicAutocomplete;
