import { useState, useCallback} from 'react'

const useFormInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);
  
    const handleChange = useCallback((e) => {
      setValue(e.target.value);
    }, []);
  
    return [value, handleChange, setValue];
}

export default useFormInput;