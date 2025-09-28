"use client";
import { useState, useEffect } from "react";

import CategoryForm from "@/app/v2/components/forms/CategoryForm";
import Link from "next/link";

import { DataGrid, GridToolbar , GridRowsProp, GridColDef } from "@mui/x-data-grid";

import Modal from "@mui/material/Modal";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";

import IconButton from "@mui/material/IconButton";
import AddBoxIcon from "@mui/icons-material/AddBox";

export default function Home() {
  const [category, setCategory] = useState([]);
  const columns = [
    { field: "name", headerName: "Category Name", width: 150 },
    { field: "order", headerName: "Order", width: 100 }
  ];

  const APIBASE = process.env.NEXT_PUBLIC_API_BASE;
  console.log(`${APIBASE}/category`);
  async function fetchCategory() {
  const data = await fetch(`${APIBASE}/category`);
    const c = await data.json();
    const c2 = c.map((category) => {
      category.id = category._id;
      return category;
    });
    setCategory(c2);
  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetchCategory();
  }, []);

  function handleCategoryFormSubmit(data) {
    if (editMode) {
      // data.id = data._id
      fetch(`${APIBASE}/category`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(() => {
        reset({ name: '', order: '' })
        fetchCategory()
      });
      return
    }
  fetch(`${APIBASE}/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      reset({ name: '', order: '' })
      fetchCategory()
    });
  }

  return (
    <main>
      <div className="mx-4">
        <span>Category ({category.length})</span>
        <IconButton aria-label="new-category" color="secondary" onClick={handleOpen}>
          <AddBoxIcon />
        </IconButton>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <CategoryForm onSubmit={handleCategoryFormSubmit} />
        </Modal>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            slots={{ toolbar: GridToolbar }}
            rows={category}
            columns={columns}
            pageSize={5}
            autoHeight
          />
        </div>
      </div>
    </main>
  );
}
