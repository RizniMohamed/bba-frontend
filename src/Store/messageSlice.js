import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    msg: "",
    variant: ""

}
const MessageSlice = createSlice({
    name: "Message Slice",
    initialState,
    reducers: {
        show: (state, payload) => {
            console.log(payload);
            const [msg, variant = "success"] = payload?.payload
            state.status = true
            state.msg = msg
            state.variant = variant

        },
        hide: (state, payload) => {
            state.status = false
            state.msg = ""
            state.variant = ""
        },
    }
})

export const messageActions = MessageSlice.actions
export default MessageSlice


/**
 * import {dialogActions} from 'path from your file'
 * import { useDispatch } from 'react-redux';
 *
 * const ComponentName = (params) => {
 *  const dispatch = useDispatch()
 *  const onSubmit = () => { <-- run this function on dialog submit action
 *      your login on submit
 *  }
 *  const dialogData = ......... <-- string or object or array or whatever you going to send into the dialog
 * 
 *  const dialog = ['dialogName', onSubmit, dialogData] <-- this order need to keep it in this way
 * 
 *  const handleClick = () => {
 *      dispatch(dialogActions.show(dialog))        <-- pass array to show function
 *      dispatch(dialogActions.hide("dialogName"))  <-- pass string to hide function
 *  }
 * 
 *  return (
 *      <Button onSubmit={handleClick}>Click Me</Button>
 *      JSX...
 *  )
 * }
 * 
 * export default ComponentName
 */