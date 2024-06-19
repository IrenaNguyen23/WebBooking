import React, { useEffect, useState } from 'react'
import { addGallery, deleteGallery, getAllGalleries, getAllRooms } from '../../utils/ApiFunctions';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import DeleteIcon from '@mui/icons-material/Delete';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Select } from '@mui/material';


const Gallery = () => {
    const [galleries, setGalleries] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState('');
    const [selectedFileNames, setSelectedFileNames] = useState([]);
    const [open, setOpen] = useState(false);

    const [page, setPage] = useState(1); // Trang hiện tại
    const [pageSize, setPageSize] = useState(20); // Số lượng mục trên mỗi trang
    const [totalItems, setTotalItems] = useState(0); // Tổng số mục

    useEffect(() => {
        fetchGalleries();
        fetchRooms();
    }, [page, pageSize]);


    const fetchGalleries = async () => {
        try {
            const allGalleries = await getAllGalleries()
            const total = allGalleries.length;
            const start = (page - 1) * pageSize;
            const end = start + pageSize;
            const slicedGalleries = allGalleries.slice(start, end);

            setGalleries(slicedGalleries);
            setTotalItems(total);
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
        const files = Array.from(event.target.files);
        setSelectedFiles(files);
        setSelectedFileNames(files.map(file => file.name));
    };

    const handleRoomChange = (event) => {
        setSelectedRoom(event.target.value);
    };

    const handleUpload = async () => {
        if (!selectedFiles.length || !selectedRoom) {
            alert('Please select files and a room.');
            return;
        }

        try {
            const success = await addGallery(selectedFiles, selectedRoom);
            if (success) {
                fetchGalleries(); // Refresh the gallery after upload
                setSelectedFiles([]);
                setSelectedFileNames([]);
                handleClose(); // Đóng modal sau khi upload thành công
            } else {
                alert('Failed to upload images.');
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
        setSelectedFiles(null);
        setSelectedRoom('');
    };

    const getRoomName = (roomId) => {
        const room = rooms.find(room => room.id === roomId);
        return room ? room.name : '';
    };

    const handleNextPage = () => {
        setPage(page + 1);
    };

    const handlePrevPage = () => {
        setPage(page - 1);
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
                         {selectedFileNames.length > 0 ? selectedFileNames.join(', ') : 'Choose Files'}
                        <input
                            type="file"
                            multiple
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
            <ImageList cols={5} sx={{
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
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Button onClick={handlePrevPage} disabled={page === 1}><NavigateBeforeIcon/></Button>
                <span style={{ margin: '0 10px' }}>{page}</span>
                <Button onClick={handleNextPage} disabled={page * pageSize >= totalItems}><NavigateNextIcon/></Button>
            </div>
        </div>
    )
}

export default Gallery
