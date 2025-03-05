// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import { useNavigate } from "react-router-dom";
// import { Box, Button, Input, Text, VStack } from "@chakra-ui/react";
// import { addContribution, createStory, fetchStories } from "@/redux/actions/storyActions";

// const Story = () => {
// //   const [title, setTitle] = useState("");
// //   const [initialSentence, setInitialSentence] = useState("");
// //   const [contribution, setContribution] = useState("");
// //   const [selectedStory, setSelectedStory] = useState(null);
// //   const user = useSelector((state) => state.auth.user);
// //   const stories = useSelector((state) => state.stories.stories);
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     if (!user || !user.uid) {
// //         alert("You must be logged in to create a story.");
// //         return;
// //       }
    
// //     if (!title.trim() || !initialSentence.trim()) {
// //       alert("Please fill in both fields.");
// //       return;
// //     }
// //     if (initialSentence.trim().split(" ").length > 20) {
// //       alert("Initial sentence must be 20 words or less.");
// //       return;
// //     }
// //     dispatch(createStory(title, initialSentence, user.uid));
// //     setTitle("");
// //     setInitialSentence("");
// //     navigate("/stories"); // Redirect to stories page
// //   };

// //   const handleContribution = () => {
// //     if (!selectedStory || contribution.trim().split(" ").length > 20) {
// //       alert("Each contribution must be 20 words or less.");
// //       return;
// //     }
// //     dispatch(addContribution(selectedStory.id, contribution, user.uid));
// //     setContribution("");
// //   };

// //   return (
// //     <VStack spacing={4} align="stretch" maxW="500px" mx="auto" mt={10} p={5} borderWidth="1px" borderRadius="md">
// //       <Text fontSize="2xl" fontWeight="bold">Create a New Story</Text>
// //       <Input
// //         placeholder="Story Title"
// //         value={title}
// //         onChange={(e) => setTitle(e.target.value)}
// //       />
// //       <Input
// //         placeholder="Initial Sentence (max 20 words)"
// //         value={initialSentence}
// //         onChange={(e) => setInitialSentence(e.target.value)}
// //       />
// //       <Text fontSize="sm" color="gray.500">Each story can have a maximum of 10 contributions.</Text>
// //       <Button colorScheme="blue" onClick={handleSubmit} isDisabled={!title.trim() || !initialSentence.trim()}>
// //         Start Story
// //       </Button>
      
// //       <Text fontSize="2xl" fontWeight="bold">Ongoing Stories</Text>
// //       {stories.map((story) => (
// //         <Box key={story.id} p={4} borderWidth="1px" borderRadius="md">
// //           <Text fontWeight="bold">{story.title}</Text>
// //           {story.contributions.map((entry, index) => (
// //             <Text key={index}>{entry.text} - <i>{entry.author}</i></Text>
// //           ))}
// //           {story.contributions.length < 10 && (
// //             <Button mt={2} onClick={() => setSelectedStory(story)}>Contribute</Button>
// //           )}
// //         </Box>
// //       ))}
      
// //       {selectedStory && (
// //         <Box p={4} borderWidth="1px" borderRadius="md">
// //           <Text fontWeight="bold">Add to "{selectedStory.title}"</Text>
// //           <Input 
// //             placeholder="Write your sentence (max 20 words)" 
// //             value={contribution} 
// //             onChange={(e) => setContribution(e.target.value)}
// //           />
// //           <Button mt={2} onClick={handleContribution} isDisabled={!contribution.trim()}>
// //             Submit Contribution
// //           </Button>
// //         </Box>
// //       )}
// //     </VStack>
// //   );
// // };
// const [title, setTitle] = useState("");
// const [initialSentence, setInitialSentence] = useState("");
// const user = useSelector((state) => state.auth.user);
// const stories = useSelector((state) => state.stories.list);
// const dispatch = useDispatch();
// const navigate = useNavigate();

// useEffect(() => {
//   dispatch(fetchStories());
// }, [dispatch]);

// const handleSubmit = (e) => {
//   e.preventDefault();
//   if (!user || !user.uid) {
//     alert("You must be logged in to create a story.");
//     return;
//   }
//   if (!title.trim() || !initialSentence.trim()) {
//     alert("Please fill in both fields.");
//     return;
//   }
//   if (initialSentence.trim().split(" ").length > 20) {
//     alert("Initial sentence must be 20 words or less.");
//     return;
//   }
//   dispatch(createStory(title, initialSentence, user.uid));
//   setTitle("");
//   setInitialSentence("");
//   navigate("/stories"); // Redirect to stories page
// };

// return (
//   <VStack spacing={4} align="stretch" maxW="500px" mx="auto" mt={10} p={5} borderWidth="1px" borderRadius="md">
//     <Text fontSize="2xl" fontWeight="bold">Create a New Story</Text>
//     <Input
//       placeholder="Story Title"
//       value={title}
//       onChange={(e) => setTitle(e.target.value)}
//     />
//     <Input
//       placeholder="Initial Sentence (max 20 words)"
//       value={initialSentence}
//       onChange={(e) => setInitialSentence(e.target.value)}
//     />
//     <Text fontSize="sm" color="gray.500">Each story can have a maximum of 10 contributions.</Text>
//     <Button colorScheme="blue" onClick={handleSubmit} isDisabled={!title.trim() || !initialSentence.trim()}>
//       Start Story
//     </Button>

//     {/* Ongoing Stories */}
//     <Text fontSize="2xl" fontWeight="bold" mt={6}>Ongoing Stories</Text>
   
//     {/* {stories.filter(story => !story.completed).map(story => (
//       <Box key={story.id} p={4} borderWidth="1px" borderRadius="md">
//         <Text fontWeight="bold">{story.title}</Text>
//         {story.contributions.map((entry, index) => (
//           <Text key={index}>{entry.text} - <i>{entry.authorName || 'Unknown'}</i></Text>
//         ))}
//         {story.contributions.length < 10 && (
//           <Button mt={2} onClick={() => navigate(`/story/${story.id}`)}>Contribute</Button>
//         )}
//       </Box>
//     ))} */}

//     {/* Completed Stories
//     <Text fontSize="2xl" fontWeight="bold" mt={6}>Completed Stories</Text>
//     {stories.filter(story => story.completed).map(story => (
//       <Box key={story.id} p={4} borderWidth="1px" borderRadius="md" bg="gray.100">
//         <Text fontWeight="bold">{story.title}</Text>
//         {story.contributions.map((entry, index) => (
//           <Text key={index}>{entry.text} - <i>{entry.authorName || 'Unknown'}</i></Text>
//         ))}
//       </Box>
//     ))} */}
//   </VStack>
// );
// };

// export default Story;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStory, fetchStories } from "@/redux/actions/storyActions";
import { useNavigate } from "react-router-dom";
import { Box, Button, Input, Text, VStack } from "@chakra-ui/react";

const Story = () => {
  const [title, setTitle] = useState("");
  const [initialSentence, setInitialSentence] = useState("");
  const user = useSelector((state) => state.auth.user);
  const stories = useSelector((state) => state.stories.stories);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchStories());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user || !user.uid) {
      alert("You must be logged in to create a story.");
      return;
    }
    if (!title.trim() || !initialSentence.trim()) {
      alert("Please fill in both fields.");
      return;
    }
    if (initialSentence.trim().split(" ").length > 20) {
      alert("Initial sentence must be 20 words or less.");
      return;
    }

    // Pass user ID and name for correct attribution
    dispatch(createStory(title, initialSentence, user.uid, user.email|| "Anonymous"));
    setTitle("");
    setInitialSentence("");
    navigate("/stories"); // Redirect to stories page
  };

  return (
    <VStack spacing={4} align="stretch" maxW="500px" mx="auto" mt={10} p={5} borderWidth="1px" borderRadius="md">
      <Text fontSize="2xl" fontWeight="bold">Create a New Story</Text>
      <Input
        placeholder="Story Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        placeholder="Initial Sentence (max 20 words)"
        value={initialSentence}
        onChange={(e) => setInitialSentence(e.target.value)}
      />
      <Text fontSize="sm" color="gray.500">Each story can have a maximum of 10 contributions.</Text>
      <Button colorScheme="blue" onClick={handleSubmit} isDisabled={!title.trim() || !initialSentence.trim()}>
        Start Story
      </Button>

      {/* Ongoing Stories */}
      <Text fontSize="2xl" fontWeight="bold" mt={6}>Ongoing Stories</Text>
      {stories.filter(story => !story.completed).map(story => (
        <Box key={story.id} p={4} borderWidth="1px" borderRadius="md">
          <Text fontWeight="bold">{story.title}</Text>
          {story.contributions.map((entry, index) => (
            <Text key={index}>{entry.text} - <i>{entry.authorName || "Unknown"}</i></Text>
          ))}
          {story.contributions.length < 10 && (
            <Button mt={2} onClick={() => navigate(`/story/${story.id}`)}>Contribute</Button>
          )}
        </Box>
      ))}

      {/* Completed Stories */}
      <Text fontSize="2xl" fontWeight="bold" mt={6}>Completed Stories</Text>
      {stories.filter(story => story.completed).map(story => (
        <Box key={story.id} p={4} borderWidth="1px" borderRadius="md" bg="gray.100">
          <Text fontWeight="bold">{story.title}</Text>
          {story.contributions.map((entry, index) => (
            <Text key={index}>{entry.text} - <i>{entry.authorName || "Unknown"}</i></Text>
          ))}
        </Box>
      ))}
    </VStack>
  );
};

export default Story;

