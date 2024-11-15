import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";

const Base_url = process.env.REACT_APP_BACKEND_URL;

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user._id) {
      console.log("User is not logged in.");
      return;
    }

    console.log("Sending Data:", { title, content, authorId: String(user._id) });

    let obj = { title, content, authorId: String(user._id) };

    try {
      const res = await axios.post(`${Base_url}/create/post`, obj);
      console.log("Response:", res);

      setIsModalOpen(false);
      if (res.status === 201) {
        navigate("/dashboard");
        toast.success("Post created successfully!");
      }
    } catch (error) {
      console.error("Error creating post:", error.response || error.message);
      toast.error("Failed to create post.");
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <Button onClick={openModal} variant="contained" color="primary">
        Create Post
      </Button>

      <Dialog open={isModalOpen} onClose={closeModal} maxWidth="sm" fullWidth>
        <DialogTitle>Create a New Blog Post</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              fullWidth
              required
              multiline
              rows={4}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Create Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreatePost;
