import {
  Alert,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

import { useAuth } from "../contexts/AuthContext";
import { InsectCardData } from "../types/Insect";
import { db } from "../utils/firebase";

const CardPull: React.FC = () => {
  const { currentUser } = useAuth();
  const [randomCard, setRandomCard] = useState<InsectCardData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userPoints, setUserPoints] = useState<number>(0);
  useEffect(() => {
    const fetchRandomCard = async () => {
      if (currentUser) {
        setLoading(true);
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            setUserPoints(userDocSnap.data().points || 0);
          }

          const cardsRef = collection(db, "cards");
          const q = query(cardsRef);
          const querySnapshot = await getDocs(q);

          const cards: InsectCardData[] = [];
          querySnapshot.forEach((doc) => {
            const card = doc.data() as InsectCardData;
            card.id = doc.id;
            cards.push(card);
          });

          const randomIndex = Math.floor(Math.random() * cards.length);
          setRandomCard(cards[randomIndex]);

          setLoading(false);
        } catch (err) {
          console.error("Error fetching random card:", err);
          setError("Failed to fetch card. Please try again.");
          setLoading(false);
        }
      }
    };

    fetchRandomCard();
  }, [currentUser]);

  const handlePullCard = async () => {
    if (userPoints <= 0) {
      setError("You don't have enough points to pull a card.");
      return;
    }

    const userDocRef = doc(db, "users", currentUser!.uid);
    await updateDoc(userDocRef, {
      points: userPoints - 1,
    });

    setRandomCard(null);
    setError(null);
    window.location.reload(); // or trigger re-fetch manually
  };

  const handlePullAnotherCard = () => {
    setRandomCard(null);
    setError(null);
    window.location.reload(); // or trigger re-fetch manually
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        background: "linear-gradient(to right, #f0f4c3, #a5d6a7)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 1rem",
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: "center" }}>
        <Typography variant="h4" color="success.main" gutterBottom>
          🎴 Card Pull
        </Typography>

        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Your Points: <strong>{userPoints}</strong>
        </Typography>

        {loading ? (
          <CircularProgress color="success" />
        ) : error ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        ) : randomCard ? (
          <Card
            sx={{ maxWidth: 400, mx: "auto", borderRadius: 3, boxShadow: 4 }}
          >
            <CardMedia
              component="img"
              height="200"
              image={randomCard.image}
              alt={randomCard.name}
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {randomCard.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {randomCard.description}
              </Typography>
              <Button
                variant="contained"
                color="success"
                sx={{ mt: 3 }}
                onClick={handlePullAnotherCard}
              >
                Pull Another Card
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Typography variant="body1" sx={{ mb: 3 }}>
            Pull a random insect card!
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 4 }}
          onClick={handlePullCard}
        >
          Pull Card (1 Point)
        </Button>
      </Container>
    </motion.div>
  );
};

export default CardPull;
