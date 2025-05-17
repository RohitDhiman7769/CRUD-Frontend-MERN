const InputField = (props) => {
/**
 * 
 * @param {*} e get input event name, value 
 */
  const inputValue = (e) => {
    props.getInputValue(e.target.name, e.target.value); 
  };
  
    return (
        <>
        <input className={props.className} type={props.type} name={props.name} value={props.value} 
        placeholder={props.placeholder} onChange={(e) => inputValue(e)} />
        </>
    
    )
}

export default InputField