import { Grid } from "@mui/material";
import React from "react";
import ReactLoading from "react-loading";
const Loading = ({ type, color }) => {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}
        >
            <ReactLoading
                type={type}
                color={color}
                height={"20%"}
                width={"20%"}
            />
        </Grid>
    );
};

export default Loading;
