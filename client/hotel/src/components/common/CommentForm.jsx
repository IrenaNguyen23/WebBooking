import React, { useEffect, useState } from 'react';
import { Button, Grid, Rating, TextField } from '@mui/material';
import { addComment } from '../utils/ApiFunctions';

const CommentForm = ({userId,roomId, fetchComment}) => {
    const [newComment, setNewComment] = useState({
        image: null,
        content: "",
        rating: 1,
        roomId : roomId,
        userId : userId
    })

    useEffect(() => {
        setNewComment(prevState => ({
            ...prevState,
            roomId: roomId,
            userId: userId
        }));
    }, [roomId, userId]);
    const [imagePreview, setImagePreview] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewComment(prevState => ({ ...prevState, [name]: value }));
    };

    const handleRatingChange = (event, newValue) => {
        setNewComment(prevState => ({ ...prevState, rating: newValue }));
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setNewComment(prevState => ({ ...prevState, image: selectedImage }));
        setImagePreview(URL.createObjectURL(selectedImage));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { image, content, rating, roomId, userId } = newComment;
            const success = await addComment(image, content, rating, roomId, userId);
            if (success !== undefined) {
                setSuccessMessage("Comment added successfully");
                setNewComment({
                    image: null,
                    content: "",
                    rating: 0,
                    roomId: roomId,
                    userId: userId
                });
                setImagePreview("");
                setErrorMessage("");
                fetchComment();
            } else {
                setErrorMessage("Error adding comment");
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
        setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        }, 3000);
    };
    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        label="Comment"
                        fullWidth
                        multiline
                        rows={3}
                        name="content"
                        value={newComment.content}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Rating
                        name="rating"
                        value={newComment.rating}
                        onChange={handleRatingChange}
                        precision={0.5} // Allows selecting rating with 0.5 step
                    />
                </Grid>
                <Grid item xs={6}>
                    <input
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                    />
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Preview Room Photo"
                            style={{ maxWidth: "100%", maxHeight: "200px", marginTop: "10px" }}
                        />
                    )}
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" type="submit">
                        Add Comment
                    </Button>
                </Grid>
                {successMessage && (
                    <Grid item xs={12}>
                        <p style={{ color: 'green' }}>{successMessage}</p>
                    </Grid>
                )}
                {errorMessage && (
                    <Grid item xs={12}>
                        <p style={{ color: 'red' }}>{errorMessage}</p>
                    </Grid>
                )}
            </Grid>
        </form>
    );
};

export default CommentForm;
