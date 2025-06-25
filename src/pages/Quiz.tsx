import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
// pages/Quiz.tsx
import { motion } from "framer-motion";
import React, { useState } from "react";

import InsectCard from "../components/InsectCard";
import { InsectCardData } from "../types/Insect";

interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
  reward: InsectCardData;
}

const quizQuestions: QuizQuestion[] = [
  {
    question: "Which insect is known for its metamorphosis?",
    options: ["Butterfly", "Ant", "Grasshopper", "Spider"],
    answer: "Butterfly",
    reward: {
      name: "Monarch Butterfly",
      image: "/cards/butterfly.jpg",
      habitat: "Meadows, Gardens",
      behavior: "Migratory, pollinator",
      description:
        "Known for its transformation from caterpillar to butterfly.",
    },
  },
  // Add more questions as needed
];

const Quiz: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showCard, setShowCard] = useState(false);

  const question = quizQuestions[current];

  const handleAnswer = (option: string) => {
    setSelected(option);
    if (option === question.answer) {
      setTimeout(() => setShowCard(true), 500);
    } else {
      setTimeout(() => {
        alert("Incorrect! Try again!");
        setSelected(null);
      }, 500);
    }
  };

  const nextQuestion = () => {
    setShowCard(false);
    setSelected(null);
    setCurrent((prev) => (prev + 1) % quizQuestions.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        background: "linear-gradient(to right, #f0f4c3, #a5d6a7)",
        minHeight: "100vh",
        paddingTop: "4rem",
        paddingBottom: "4rem",
      }}
    >
      <Container maxWidth="sm">
        <Typography
          variant="h4"
          color="success.main"
          align="center"
          gutterBottom
          mt={24}
          mb={6}
        >
          🧠 Insect Quiz
        </Typography>

        {!showCard ? (
          <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>
              {question.question}
            </Typography>
            <Stack spacing={2}>
              {question.options.map((option) => (
                <Button
                  key={option}
                  variant={
                    selected === option
                      ? option === question.answer
                        ? "contained"
                        : "outlined"
                      : "outlined"
                  }
                  color={
                    selected === option
                      ? option === question.answer
                        ? "success"
                        : "error"
                      : "success"
                  }
                  onClick={() => handleAnswer(option)}
                  disabled={selected !== null}
                  sx={{ textTransform: "none" }}
                >
                  {option}
                </Button>
              ))}
            </Stack>
          </Paper>
        ) : (
          <Box textAlign="center" mt={4}>
            <Typography variant="h6" color="success.main" gutterBottom>
              ✅ Correct! You earned:
            </Typography>
            <Box my={2}>
              <InsectCard insect={question.reward} />
            </Box>
            <Button
              variant="contained"
              color="success"
              onClick={nextQuestion}
              sx={{ mt: 2 }}
            >
              Next Question
            </Button>
          </Box>
        )}
      </Container>
    </motion.div>
  );
};

export default Quiz;
