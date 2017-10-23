import React = require('react');

interface inputProps {
  id: string
  label: string
  text: string
  onChange: (string) => void
  email?: boolean
  children?: any,
  className?: string
};

export default class Input extends React.Component<any,any> {
  static defaultProps = {
    onChange: ()=>{},
    onFocus: ()=>{},
    onBlur: ()=>{}
  }
  state = {
    text: ''
  }
  input = null
  componentWillReceiveProps(nextProps) {
    if (nextProps.forceText !== false && nextProps.forceText !== this.props.forceText) {
      this.setState({
        text: nextProps.forceText
      });
    }
  }
  bindInput(input) {
    if (this.input) {
      this.input.removeEventListener('keydown', this.props.onKeyDown);
    }
    this.input = input;
    if (input) {
      input.addEventListener('keydown', this.props.onKeyDown);
    }
  }
  onChange(e) {
    const text = this.input.value;
    this.setState({ text });
    this.props.onChange(text);
  }
  render() {
    const {className, id, label, email, children, onSubmit} = this.props;
    const {text} = this.state;
    return (
      <div className={className || 'input'}>
        <label htmlFor={id}>{label}</label>
        <input 
          type={email ? 'email' : 'text'}
          id={id} 
          placeholder="Type here" 
          value={text}
          ref={x=>this.bindInput(x)}
          onChange={x=>this.onChange(x)}
          onFocus={x=>this.props.onFocus(x)}
          onBlur={x=>this.props.onBlur(x)}
          autoComplete="off"
        />
        {children}
      </div>
    );
  }
}