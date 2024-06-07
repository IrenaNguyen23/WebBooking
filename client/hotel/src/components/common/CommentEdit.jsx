import React, { useEffect, useState } from 'react';
import { Button, Grid, Rating, TextField } from '@mui/material';
import { editComment } from '../utils/ApiFunctions';

const CommentEdit = ({ comment, fetchComment,onCommentUpdateSuccess,onCancelEdit }) => {
    const [editCommentData, setEditCommentData] = useState({
        image: comment.image,
        content: comment.content,
        rating: comment.rating,
    });

    const [imagePreview, setImagePreview] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const commentId = comment.id;


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditCommentData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleRatingChange = (event, newValue) => {
        setEditCommentData(prevState => ({ ...prevState, rating: newValue }));
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setEditCommentData(prevState => ({ ...prevState, image: selectedImage }));
        setImagePreview(URL.createObjectURL(selectedImage));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await editComment(commentId, editCommentData);
            if (response.status === 200) {
                setSuccessMessage("Comment updated successfully");
                fetchComment();
                onCommentUpdateSuccess(); 
            } else {
                setErrorMessage("Error updating comment");
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
        setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        }, 3000);
    };
    console.log(editCommentData)
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
                        value={editCommentData.content}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Rating
                        name="rating"
                        value={editCommentData.rating}
                        onChange={handleRatingChange}
                        precision={0.5}
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
                            alt="Preview"
                            style={{ maxWidth: "100%", maxHeight: "200px", marginTop: "10px" }}
                        />
                    )}
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" type="submit">
                        Update Comment
                    </Button>
                    <Button onClick={onCancelEdit}>Cancel</Button>
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

export default CommentEdit;


