import { Alert, Box, CircularProgress, Grid, Typography } from "@mui/material";
// pages/Encyclopedia.tsx
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

import InsectCard from "../components/InsectCard";
import { InsectCardData } from "../types/Insect";
import { db } from "../utils/firebase";

const Encyclopedia: React.FC = () => {
  const [insects, setInsects] = useState<InsectCardData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInsects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "userCards"));
        const cards: InsectCardData[] = [];
        querySnapshot.forEach((doc) => {
          cards.push({ id: doc.id, ...doc.data() } as InsectCardData);
        });
        setInsects(cards);
      } catch (err) {
        setError("Failed to fetch insect cards. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchInsects();
  }, []);

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        background: "linear-gradient(to right, #f0f4c3, #a5d6a7)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "3rem",
      }}
    >
      <Box sx={{ textAlign: "center", maxWidth: "1200px", width: "100%" }}>
        <Typography variant="h4" color="success.main" gutterBottom>
          📚 Your Insect Encyclopedia
        </Typography>

        {loading ? (
          <CircularProgress color="success" />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : insects.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            No cards collected yet.
          </Typography>
        ) : (
          <Grid container spacing={3} justifyContent="center">
            {insects.map((insect) => (
              <Grid item key={insect.id} xs={12} sm={6} md={4}>
                <InsectCard insect={insect} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </motion.div>
  );
};

export default Encyclopedia;
