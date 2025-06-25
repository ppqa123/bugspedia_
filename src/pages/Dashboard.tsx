import { ButtonBase, Container, Grid, Paper, Typography } from "@mui/material";
import { motion } from "framer-motion";
// pages/Dashboard.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background: "linear-gradient(to right, #f0f4c3, #a5d6a7)",
        minHeight: "100vh",
        paddingTop: "4rem",
        paddingBottom: "4rem",
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h3"
          align="center"
          color="success.main"
          gutterBottom
          mt={24}
        >
          Welcome to BugsPedia 🪲
        </Typography>

        <Typography variant="subtitle1" align="center" gutterBottom>
          {user ? `Logged in as ${user.email}` : "You are not logged in."}
        </Typography>

        <Typography align="center" color="text.secondary" paragraph>
          Explore the insect world by taking quizzes, collecting cards, and
          completing your digital encyclopedia.
        </Typography>

        <Grid container spacing={4} justifyContent="center" mt={16}>
          <Grid item={true} xs={12} md={4}>
            <CardLink title="Take a Quiz" link="/quiz" />
          </Grid>
          <Grid item xs={12} md={4}>
            <CardLink title="Random Card Pull" link="/card-pull" />
          </Grid>
          <Grid item xs={12} md={4}>
            <CardLink title="View Encyclopedia" link="/encyclopedia" />
          </Grid>
        </Grid>
      </Container>
    </motion.div>
  );
};

const CardLink: React.FC<{ title: string; link: string }> = ({
  title,
  link,
}) => {
  const navigate = useNavigate();

  return (
    <ButtonBase
      onClick={() => navigate(link)}
      sx={{ width: "100%", height: "100%" }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 3,
          borderRadius: 3,
          width: "100%",
          height: "100%",
          backgroundColor: "#e8f5e9",
          textAlign: "center",
          transition: "0.3s",
          "&:hover": {
            backgroundColor: "#c8e6c9",
            boxShadow: 6,
          },
        }}
      >
        <Typography variant="h6" color="success.main">
          {title}
        </Typography>
      </Paper>
    </ButtonBase>
  );
};

export default Dashboard;
