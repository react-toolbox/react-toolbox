import React from 'react';
import ReactDOM from 'react-dom';
import ClassNames from 'classnames';
import Input from '../input';
import events from '../utils/events';
import Chip from '../chip';
import style from './style';

const POSITION = {
 AUTO: 'auto',
 DOWN: 'down',
 UP: 'up'
};

class Autocomplete extends React.Component {
 static propTypes = {
   className: React.PropTypes.string,
   direction: React.PropTypes.oneOf(['auto', 'up', 'down']),
   disabled: React.PropTypes.bool,
   error: React.PropTypes.string,
   label: React.PropTypes.string,
   multiple: React.PropTypes.bool,
   onChange: React.PropTypes.func,
   selectedPosition: React.PropTypes.oneOf(['above', 'below']),
   showSuggestionsWhenValueIsSet: React.PropTypes.bool,
   source: React.PropTypes.any,
   value: React.PropTypes.any
 };

 static defaultProps = {
   className: '',
   direction: 'auto',
   selectedPosition: 'above',
   multiple: true,
   showSuggestionsWhenValueIsSet: false,
   source: {}
 };

 state = {
   direction: this.props.direction,
   focus: false,
   showAllSuggestions: this.props.showSuggestionsWhenValueIsSet,
   query: this.query(this.props.value)
 };

 componentWillReceiveProps (nextProps) {
   if (!this.props.multiple) {
     this.setState({query: nextProps.value});
   }
 }

 shouldComponentUpdate (nextProps, nextState) {
   if (!this.state.focus && nextState.focus && this.props.direction === POSITION.AUTO) {
     const direction = this.calculateDirection();
     if (this.state.direction !== direction) {
       this.setState({ direction });
       return false;
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
     () => { this.refs.input.blur(); }
   );
 };

 handleQueryBlur = () => {
   if (this.state.focus) this.setState({focus: false});
 };

 handleQueryChange = (value) => {
   this.setState({query: value, showAllSuggestions: false});
 };

 handleQueryFocus = () => {
   this.refs.suggestions.scrollTop = 0;
   this.setState({active: '', focus: true});
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
 };

 handleQueryKeyUp = (event) => {
   if (event.which === 13 && this.state.active) this.select(this.state.active, event);
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
   return !this.props.multiple && key ? this.source().get(key) : '';
 }

 suggestions () {
   let suggest = new Map();
   const query = this.state.query.toLowerCase().trim() || '';
   const values = this.values();
   const source = this.source();

   // Suggest any non-set value which matches the query
   if (this.props.multiple) {
     for (const [key, value] of source) {
       if (!values.has(key) && value.toLowerCase().trim().startsWith(query)) {
         suggest.set(key, value);
       }
     }

   // When multiple is false, suggest any value which matches the query if showAllSuggestions is false
   } else if (query && !this.state.showAllSuggestions) {
     for (const [key, value] of source) {
       if (value.toLowerCase().trim().startsWith(query)) {
         suggest.set(key, value);
       }
     }

   // When multiple is false, suggest all values when showAllSuggestions is true
   } else {
     suggest = source;
   }

   return suggest;
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

 select (key, event) {
   events.pauseEvent(event);
   const values = this.values(this.props.value);
   this.handleChange([key, ...values.keys()], event);
 }

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
           className={style.value}
           deletable
           onDeleteClick={this.unselect.bind(this, key)}
         >
           {value}
         </Chip>
       );
     });

     return <ul className={style.values}>{selectedItems}</ul>;
   }
 }

 renderSuggestions () {
   const suggestions = [...this.suggestions()].map(([key, value]) => {
     const className = ClassNames(style.suggestion, {[style.active]: this.state.active === key});
     return (
       <li
         key={key}
         className={className}
         onMouseDown={this.select.bind(this, key)}
         onMouseOver={this.handleSuggestionHover.bind(this, key)}
       >
         {value}
       </li>
     );
   });

   const className = ClassNames(style.suggestions, {[style.up]: this.state.direction === 'up'});
   return <ul ref='suggestions' className={className}>{suggestions}</ul>;
 }

 render () {
   const {error, label, ...other} = this.props;
   const className = ClassNames(style.root, {
     [style.focus]: this.state.focus
   }, this.props.className);

   return (
     <div data-react-toolbox='autocomplete' className={className}>
       {this.props.selectedPosition === 'above' ? this.renderSelected() : null}
       <Input
         {...other}
         ref='input'
         className={style.input}
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

export default Autocomplete;
