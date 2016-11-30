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
     keepFocusOnChange: PropTypes.bool,
     label: PropTypes.string,
     multiple: PropTypes.bool,
     onBlur: PropTypes.func,
     onChange: PropTypes.func,
     onQueryChange: PropTypes.func,
     onFocus: PropTypes.func,
     selectedPosition: PropTypes.oneOf(['above', 'below', 'none']),
     showSelectedWhenNotInSource: PropTypes.bool,
     showSuggestionsWhenValueIsSet: PropTypes.bool,
     source: PropTypes.any,
     suggestionMatch: PropTypes.oneOf(['start', 'anywhere', 'word']),
     theme: PropTypes.shape({
       active: PropTypes.string,
       autocomplete: PropTypes.string,
       focus: PropTypes.string,
       input: PropTypes.string,
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
     keepFocusOnChange: false,
     multiple: true,
     selectedPosition: 'above',
     showSuggestionsWhenValueIsSet: false,
     showSelectedWhenNotInSource: false,
     source: {},
     suggestionMatch: 'start'
   };

   state = {
     direction: this.props.direction,
     focus: false,
     showAllSuggestions: this.props.showSuggestionsWhenValueIsSet,
     query: this.query(this.props.value),
     valueIsObject: false
   };

   componentDidMount () {
     this.setState({
       // TODO: Move to method
       valueIsObject: !Array.isArray(this.props.value) && typeof this.props.value === 'object'
     });
   }

   componentWillReceiveProps (nextProps) {
     if (!this.props.multiple) {
       this.setState({
         query: this.query(nextProps.value)
       });
     }
     // TODO: Better comparison?
     if (nextProps.multiple && this.props.value !== nextProps.value) {
       console.log('value has changed fo real', nextProps.value);
       this.setState({
         // TODO: Move to method
         valueIsObject: !Array.isArray(nextProps.value) && typeof nextProps.value === 'object'
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

   handleChange = (values, event) => {
     console.log('handle change', values);
     const value = this.props.multiple ? values : values[0];
     console.log('new keys here in handle change', value);
     const { showSuggestionsWhenValueIsSet: showAllSuggestions } = this.props;
     const query = this.query(value);
     // TODO: Pass back key/value if object originally supplied for value
     if (this.props.onChange) this.props.onChange(value, event);
     if (this.props.keepFocusOnChange) {
       this.setState({ query, showAllSuggestions });
     } else {
       this.setState({ focus: false, query, showAllSuggestions }, () => {
         ReactDOM.findDOMNode(this).querySelector('input').blur();
       });
     }
   };

   handleMouseDown = () => {
     this.selectOrCreateActiveItem();
   };

   handleQueryBlur = (event) => {
     if (this.state.focus) this.setState({focus: false});
     if (this.props.onBlur) this.props.onBlur(event, this.state.active);
   };

   handleQueryChange = (value) => {
     if (this.props.onQueryChange) this.props.onQueryChange(value);
     this.setState({query: value, showAllSuggestions: false, active: null});
   };

   handleQueryFocus = () => {
     this.suggestionsNode.scrollTop = 0;
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
       this.selectOrCreateActiveItem();
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
       const client = ReactDOM.findDOMNode(this.inputNode).getBoundingClientRect();
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

   selectOrCreateActiveItem () {
     let target = this.state.active;
     if (!target) {
       target = this.props.allowCreate
         ? this.state.query
         : [...this.suggestions().keys()][0];
       this.setState({active: target});
     }
     this.select(event, target);
   }

   suggestions () {
     let suggest = new Map();
     const rawQuery = this.state.query || (this.props.multiple ? '' : this.props.value);
     const query = (rawQuery || '').toLowerCase().trim();
     const values = this.values();
     const source = this.source();

     console.log('in suggestions', values);
     // Suggest any non-set value which matches the query
     if (this.props.multiple) {
       for (const [key, value] of source) {
         //if ((Array.isArray(values) && !values.has(key)) && this.matches(value.toLowerCase().trim(), query)) {
         if ((!values.has(key)) && this.matches(value.toLowerCase().trim(), query)) {
           suggest.set(key, value);
         }
       }

     // When multipleArray is false, suggest any value which matches the query if showAllSuggestions is false
     } else if (query && !this.state.showAllSuggestions) {
       for (const [key, value] of source) {
         if (this.matches(value.toLowerCase().trim(), query)) {
           suggest.set(key, value);
         }
       }

     // When multipleArray is false, suggest all values when showAllSuggestions is true
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
     const vals = this.props.multiple ? this.props.value : [this.props.value];

     if (this.props.showSelectedWhenNotInSource && typeof vals === 'object') {
       return new Map(Object.entries(vals));
     }

     const valueMap = new Map();
     for (const [k, v] of this.source()) {
       if ((Array.isArray(vals) && vals.indexOf(k) !== -1) || (k in vals)) {
         valueMap.set(k, v);
       }
     }
     return valueMap;
   }

   select = (event, target) => {
     events.pauseEvent(event);
     let values = this.values(this.props.value);
     const source = this.source();
     const newValue = target === void 0 ? event.target.id : target;
     console.log('selected', target, event.target);
     if (this.state.valueIsObject) {
       console.log('current values', values);
       console.log('new value', newValue);

       const sourceObj = Array.from(source).reduce((obj, [k, value]) => {
         console.log('reducer', 'key', k, 'value', value);
         if (k === newValue) {
           obj[k] = value; // Be careful! ES6 Maps may have non-String keys.
         }
         return obj;
       }, {});

       values = Array.from(values).reduce((obj, [ke, value]) => {
         console.log('reducer', 'key', ke, 'value', value);
           obj[ke] = value; // Be careful! ES6 Maps may have non-String keys.
          return obj;
       }, {});

       console.log('new obj', sourceObj);

       return this.handleChange(Object.assign(values, sourceObj), event);
     }

     this.handleChange([newValue, ...values.keys()], event);
   };

   unselect (key, event) {
     if (!this.props.disabled) {
       const values = this.values(this.props.value);

       console.log('unselected vals', values, 'key', key);
       /*if (typeof values === 'object') {
         delete values[key];

         return this.handleChange(Object.keys(values), event);
       }*/

       values.delete(key);

       console.log('new keys', values.keys());

       if (this.state.valueIsObject) {
         const valuesObj = Array.from(values).reduce((obj, [k, value]) => {
           obj[k] = value; // Be careful! ES6 Maps may have non-String keys.
           return obj;
         }, {});

         return this.handleChange(valuesObj, event);
       }
       this.handleChange([...values.keys()], event);
     }
   }

   renderSelected () {
     if (this.props.multiple) {
       let selectedItems = [];

       if (typeof this.values() === 'object') {
         console.log('values here', this.values().keys());

         // TODO: Extract to renderSelectedFromObject and renderSelectedFromArray methods
         selectedItems = [...this.values()].map(([key, value]) => {
           console.log('key', key, 'value', value, 'name', this.values()[key]);
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
       } else {
         selectedItems = [...this.values()].map(([key, value]) => {
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
       }

       console.log('items', selectedItems);

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
           onMouseDown={this.handleMouseDown}
           onMouseOver={this.handleSuggestionHover}
         >
           {value}
         </li>
       );
     });

     return (
       <ul
         className={classnames(theme.suggestions, {[theme.up]: this.state.direction === 'up'})}
         ref={node => { this.suggestionsNode = node; }}
       >
         {suggestions}
       </ul>
     );
   }

   render () {
     const {
      allowCreate, error, label, source, suggestionMatch, //eslint-disable-line no-unused-vars
      selectedPosition, keepFocusOnChange, showSuggestionsWhenValueIsSet, showSelectedWhenNotInSource, onQueryChange, //eslint-disable-line no-unused-vars
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
           ref={node => { this.inputNode = node; }}
           autoComplete="off"
           className={theme.input}
           error={error}
           label={label}
           onBlur={this.handleQueryBlur}
           onChange={this.handleQueryChange}
           onFocus={this.handleQueryFocus}
           onKeyDown={this.handleQueryKeyDown}
           onKeyUp={this.handleQueryKeyUp}
           theme={theme}
           themeNamespace="input"
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
