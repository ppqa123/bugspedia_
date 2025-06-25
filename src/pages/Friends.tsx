import {
  Box,
  Card,
  CardContent,
  LinearProgress,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

const mockFriends = [
  { name: "Alex", progress: 80 },
  { name: "Jamie", progress: 56 },
  { name: "Taylor", progress: 100 },
];

const Friends: React.FC = () => {
  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        background: "linear-gradient(to right, #f0f4c3, #a5d6a7)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" color="primary" gutterBottom>
        🤝 Friends' Progress
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        Compare your encyclopedia completion with your friends!
      </Typography>

      <Box
        sx={{
          width: "100%",
          maxWidth: 600,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {mockFriends.map((friend) => (
          <Card
            key={friend.name}
            variant="outlined"
            sx={{ borderRadius: 2, boxShadow: 3 }}
          >
            <CardContent>
              <Typography variant="h6" color="textPrimary">
                {friend.name}
              </Typography>
              <Box sx={{ width: "100%", marginTop: 2 }}>
                <LinearProgress
                  variant="determinate"
                  value={friend.progress}
                  sx={{ height: 10, borderRadius: 5 }}
                  color={friend.progress === 100 ? "success" : "primary"}
                />
              </Box>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ marginTop: 1 }}
              >
                {friend.progress}% Complete
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </motion.div>
  );
};

export default Friends;
