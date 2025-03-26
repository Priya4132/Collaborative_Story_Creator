import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../App.css";

const Navbar = () => {
  const MotionText = motion(Text);
  const user = useSelector((state) => state.auth.user) || JSON.parse(localStorage.getItem("user"));

  return (
    <Flex justifyContent={"space-between"} p={3} bg={"whiteAlpha.100"} align="center">
      {/* Animated Title */}
      <MotionText
        fontSize="xl"
        fontWeight="bold"
        color="blue.800"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5 }}
      >
        Collaborative Story Creator
      </MotionText>

      {/* Navigation Links */}
      <Flex gap={4} align="center">
        {user?.uid ? (
          <>
            <Text fontSize="md" fontWeight="medium" color="gray.700">
              {user.email}
            </Text>
            <Link className="links" to="/stories">
              Stories
            </Link>
          </>
        ) : (
          <>
            <Link className="links" to="/">
              Home
            </Link>
            <Link className="links" to="/login">
              Login
            </Link>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Navbar;
