import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dialogActions } from '../Store/dialogSlice';

const Delete = () => {
  const { status, onSubmit, data } = useSelector(state => state.dialog.delete)
  const dispatch = useDispatch()

  const handleOnClick = ({ innerText }) => {
    if (innerText === "Delete") onSubmit()
    dispatch(dialogActions.hide('delete'))
  }

  return (
    <Dialog open={status} onClose={() => { }}
      PaperProps={{
        sx: {
          width: 500,
          minHeight:200
        }
      }}>
      <DialogTitle fontWeight={700} fontSize={22}> Delete Confirmation </DialogTitle>
      <DialogContent>
        <DialogContentText color="text.main" fontSize={16}>{data}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ pb: 2, pr: 2 }}>
        <Button
          variant='contained'
          size="small"
          sx={{ bgcolor: "secondary.main" }}
          onClick={e => handleOnClick(e.currentTarget)}>
          Cancel
        </Button>
        <Button
          variant='contained'
          size="small"
          onClick={e => handleOnClick(e.currentTarget)}
          sx={{ bgcolor: "secondary.main", "&:hover": { bgcolor: "red !important" } }}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Delete