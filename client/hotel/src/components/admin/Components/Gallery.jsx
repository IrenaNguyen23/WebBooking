import React, { useEffect, useState } from 'react'
import { addGallery, deleteGallery, getAllGalleries, getAllRooms } from '../../utils/ApiFunctions';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Select } from '@mui/material';


const Gallery = () => {
    const [galleries, setGalleries] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState('');
    const [selectedFileName, setSelectedFileName] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchGalleries();
        fetchRooms()
    }, []);

    const fetchGalleries = async () => {
        try {
            const galleries = await getAllGalleries()
            setGalleries(galleries)
        } catch (error) {
            console.error(error);
        }
    };

    const fetchRooms = async () => {
        try {
            const result = await getAllRooms()
            setRooms(result)
        } catch (error) {
            console.error(error);
        }
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setSelectedFileName(file.name); 
    };

    const handleRoomChange = (event) => {
        setSelectedRoom(event.target.value);
    };

    const handleUpload = async () => {
        if (!selectedFile || !selectedRoom) {
            alert('Please select a file and a room.');
            return;
        }

        try {
            const success = await addGallery(selectedFile, selectedRoom);
            if (success) {
                fetchGalleries(); // Refresh the gallery after upload
                handleClose(); // Đóng modal sau khi upload thành công
            } else {
                alert('Failed to upload image.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const result = await deleteGallery(id);
            if (result === "") {
                fetchGalleries(); // Refresh the gallery after delete
            } else {
                alert('Failed to delete image: ' + result.message);
            }
        } catch (error) {
            console.error(error);
            alert('Failed to delete image: ' + error.message);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedFile(null);
        setSelectedRoom('');
    };

    const getRoomName = (roomId) => {
        const room = rooms.find(room => room.id === roomId);
        return room ? room.name : '';
    };
    return (
        <div className='container-fluid'>
            <Button variant="contained" onClick={handleClickOpen}>
                Add Image
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Image</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add a new image, please select a room and upload an image file.
                    </DialogContentText>
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel id="select-room-label">Select Room</InputLabel>
                        <Select
                            labelId="select-room-label"
                            value={selectedRoom}
                            onChange={handleRoomChange}
                            label="Select Room"
                        >
                            {rooms.map((room) => (
                                <MenuItem key={room.id} value={room.id}>
                                    {room.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        variant="contained"
                        component="label"
                        sx={{ mt: 2 }}
                    >
                        {selectedFileName ? selectedFileName : 'Choose File'}
                        <input
                            type="file"
                            hidden
                            onChange={handleFileChange}
                        />
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleUpload} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>


        <ImageList cols={4} sx={{
            width: 'auto',
            height: 'auto',
            overflowY: 'auto',
        }}>
            {galleries.map((item) => (
                <ImageListItem key={item.id}>
                    <img
                        src={`data:image/jpeg;base64,${item.image}`} // Hiển thị blob base64 trực tiếp
                        alt={item.title}
                        loading="lazy"
                    />
                    <ImageListItemBar
                            title={getRoomName(item.roomId)}
                            actionIcon={
                                <IconButton
                                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                    aria-label="delete"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    <DeleteIcon color="secondary" />
                                </IconButton>
                            }
                        />
                </ImageListItem>
            ))}
        </ImageList>
        </div>
    )
}

export default Gallery
