import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { AUTOCOMPLETE } from '../identifiers.js';
import InjectChip from '../chip/Chip.js';
import InjectInput from '../input/Input.js';
import events from '../utils/events.js';

const POSITION = {
  AUTO: 'auto',
  DOWN: 'down',
  UP: 'up'
};

const factory = (Chip, Input) => {
  class Autocomplete extends Component {
   static propTypes = {
     allowCreate: PropTypes.bool,
     className: PropTypes.string,
     direction: PropTypes.oneOf(['auto', 'up', 'down']),
     disabled: PropTypes.bool,
     error: PropTypes.string,
     label: PropTypes.string,
     multiple: PropTypes.bool,
     onBlur: PropTypes.func,
     onChange: PropTypes.func,
     onFocus: PropTypes.func,
     selectedPosition: PropTypes.oneOf(['above', 'below']),
     showSuggestionsWhenValueIsSet: PropTypes.bool,
     source: PropTypes.any,
     suggestionMatch: PropTypes.oneOf(['start', 'anywhere', 'word']),
     theme: PropTypes.shape({
       active: PropTypes.string,
       autocomplete: PropTypes.string,
       focus: PropTypes.string,
       input: PropTypes.string,
       label: PropTypes.string,
       suggestion: PropTypes.string,
       suggestions: PropTypes.string,
       up: PropTypes.string,
       value: PropTypes.string,
       values: PropTypes.string
     }),
     value: PropTypes.any
   };

   static defaultProps = {
     allowCreate: false,
     className: '',
     direction: 'auto',
     selectedPosition: 'above',
     multiple: true,
     showSuggestionsWhenValueIsSet: false,
     source: {},
     suggestionMatch: 'start'
   };

   state = {
     direction: this.props.direction,
     focus: false,
     showAllSuggestions: this.props.showSuggestionsWhenValueIsSet,
     query: this.query(this.props.value)
   };

   componentWillReceiveProps (nextProps) {
     if (!this.props.multiple) {
       this.setState({
         query: this.query(nextProps.value)
       });
     }
   }

   shouldComponentUpdate (nextProps, nextState) {
     if (!this.state.focus && nextState.focus && this.props.direction === POSITION.AUTO) {
       const direction = this.calculateDirection();
       if (this.state.direction !== direction) {
         this.setState({ direction });
       }
     }
     return true;
   }

   handleChange = (keys, event) => {
     const key = this.props.multiple ? keys : keys[0];
     const query = this.query(key);
     if (this.props.onChange) this.props.onChange(key, event);
     this.setState(
       {focus: false, query, showAllSuggestions: this.props.showSuggestionsWhenValueIsSet},
       () => { ReactDOM.findDOMNode(this).querySelector('input').blur(); }
     );
   };

   handleQueryBlur = (event) => {
     if (this.state.focus) this.setState({focus: false});
     if (this.props.onBlur) this.props.onBlur(event, this.state.active);
   };

   handleQueryChange = (value) => {
     this.setState({query: value, showAllSuggestions: false});
   };

   handleQueryFocus = () => {
     this.refs.suggestions.scrollTop = 0;
     this.setState({active: '', focus: true});
     if (this.props.onFocus) this.props.onFocus();
   };

   handleQueryKeyDown = (event) => {
     // Clear query when pressing backspace and showing all suggestions.
     const shouldClearQuery = (
       event.which === 8
       && this.props.showSuggestionsWhenValueIsSet
       && this.state.showAllSuggestions
     );
     if (shouldClearQuery) {
       this.setState({query: ''});
     }

     if (event.which === 13) {
       let target = this.state.active;
       if (!target) {
         target = this.props.allowCreate
           ? this.state.query
           : [...this.suggestions().keys()][0];
         this.setState({active: target});
       }
       this.select(event, target);
     }
   };

   handleQueryKeyUp = (event) => {
     if (event.which === 27) ReactDOM.findDOMNode(this).querySelector('input').blur();

     if ([40, 38].indexOf(event.which) !== -1) {
       const suggestionsKeys = [...this.suggestions().keys()];
       let index = suggestionsKeys.indexOf(this.state.active) + (event.which === 40 ? +1 : -1);
       if (index < 0) index = suggestionsKeys.length - 1;
       if (index >= suggestionsKeys.length) index = 0;
       this.setState({active: suggestionsKeys[index]});
     }
   };

   handleSuggestionHover = (event) => {
     this.setState({active: event.target.id});
   };

   calculateDirection () {
     if (this.props.direction === 'auto') {
       const client = ReactDOM.findDOMNode(this.refs.input).getBoundingClientRect();
       const screen_height = window.innerHeight || document.documentElement.offsetHeight;
       const up = client.top > ((screen_height / 2) + client.height);
       return up ? 'up' : 'down';
     } else {
       return this.props.direction;
     }
   }

   query (key) {
      let query_value = '';
      if (!this.props.multiple && key) {
        const source_value = this.source().get(key);
        query_value = source_value ? source_value : key;
      }
      return query_value;
    }

   suggestions () {
     let suggest = new Map();
     const rawQuery = this.state.query || (this.props.multiple ? '' : this.props.value);
     const query = (rawQuery || '').toLowerCase().trim();
     const values = this.values();
     const source = this.source();

     // Suggest any non-set value which matches the query
     if (this.props.multiple) {
       for (const [key, value] of source) {
         if (!values.has(key) && this.matches(value.toLowerCase().trim(), query)) {
           suggest.set(key, value);
         }
       }

     // When multiple is false, suggest any value which matches the query if showAllSuggestions is false
     } else if (query && !this.state.showAllSuggestions) {
       for (const [key, value] of source) {
         if (this.matches(value.toLowerCase().trim(), query)) {
           suggest.set(key, value);
         }
       }

     // When multiple is false, suggest all values when showAllSuggestions is true
     } else {
       suggest = source;
     }

     return suggest;
   }

   matches (value, query) {
     const { suggestionMatch } = this.props;

     if (suggestionMatch === 'start') {
       return value.startsWith(query);
     } else if (suggestionMatch === 'anywhere') {
       return value.includes(query);
     } else if (suggestionMatch === 'word') {
       const re = new RegExp(`\\b${query}`, 'g');
       return re.test(value);
     }

     return false;
   }

   source () {
     const { source: src } = this.props;
     if (src.hasOwnProperty('length')) {
       return new Map(src.map((item) => Array.isArray(item) ? [...item] : [item, item]));
     } else {
       return new Map(Object.keys(src).map((key) => [key, src[key]]));
     }
   }

   values () {
     const valueMap = new Map();
     const vals = this.props.multiple ? this.props.value : [this.props.value];
     for (const [k, v] of this.source()) {
       if (vals.indexOf(k) !== -1) valueMap.set(k, v);
     }
     return valueMap;
   }

   select = (event, target) => {
     events.pauseEvent(event);
     const values = this.values(this.props.value);
     const newValue = target === void 0 ? event.target.id : target;
     this.handleChange([newValue, ...values.keys()], event);
   };

   unselect (key, event) {
     if (!this.props.disabled) {
       const values = this.values(this.props.value);
       values.delete(key);
       this.handleChange([...values.keys()], event);
     }
   }

   renderSelected () {
     if (this.props.multiple) {
       const selectedItems = [...this.values()].map(([key, value]) => {
         return (
           <Chip
             key={key}
             className={this.props.theme.value}
             deletable
             onDeleteClick={this.unselect.bind(this, key)}
           >
             {value}
           </Chip>
         );
       });

       return <ul className={this.props.theme.values}>{selectedItems}</ul>;
     }
   }

   renderSuggestions () {
     const { theme } = this.props;
     const suggestions = [...this.suggestions()].map(([key, value]) => {
       const className = classnames(theme.suggestion, {[theme.active]: this.state.active === key});
       return (
         <li
           id={key}
           key={key}
           className={className}
           onMouseDown={this.select}
           onMouseOver={this.handleSuggestionHover}
         >
           {value}
         </li>
       );
     });

     const className = classnames(theme.suggestions, {[theme.up]: this.state.direction === 'up'});
     return <ul ref='suggestions' className={className}>{suggestions}</ul>;
   }

   render () {
     const {
      allowCreate, error, label, source, suggestionMatch, //eslint-disable-line no-unused-vars
      selectedPosition, showSuggestionsWhenValueIsSet,    //eslint-disable-line no-unused-vars
      theme, ...other
    } = this.props;
     const className = classnames(theme.autocomplete, {
       [theme.focus]: this.state.focus
     }, this.props.className);

     return (
       <div data-react-toolbox='autocomplete' className={className}>
         {this.props.selectedPosition === 'above' ? this.renderSelected() : null}
         <Input
           {...other}
           ref='input'
           className={theme.input}
           error={error}
           label={label}
           onBlur={this.handleQueryBlur}
           onChange={this.handleQueryChange}
           onFocus={this.handleQueryFocus}
           onKeyDown={this.handleQueryKeyDown}
           onKeyUp={this.handleQueryKeyUp}
           value={this.state.query}
         />
         {this.renderSuggestions()}
         {this.props.selectedPosition === 'below' ? this.renderSelected() : null}
       </div>
     );
   }
  }

  return Autocomplete;
};

const Autocomplete = factory(InjectChip, InjectInput);
export default themr(AUTOCOMPLETE)(Autocomplete);
export { factory as autocompleteFactory };
export { Autocomplete };
