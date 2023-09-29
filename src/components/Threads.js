import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Styled components
const Container = styled.div`
  flex: 1;
  background-color: #ffffff;
  padding: 20px;
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const ThreadItem = styled.div`
  margin-bottom: 10px;
`;

const ThreadTitle = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #555;
`;

const ThreadContent = styled.p`
  color: #666;
`;

const NewThreadForm = styled.div`
  margin-top: 20px;
  border-top-width: 1px;
  border-top-color: #ccc;
  padding-top: 10px;
`;

const NewThreadTitle = styled.input`
  font-size: 18px;
  color: #555;
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
`;

const NewThreadContent = styled.input`
  color: #666;
  padding: 10px;
  border: 1px solid #ccc;
  height: 100px;
`;

// Threads Component
const Threads = () => {
  const navigate = useNavigate();
  const [threads, setThreads] = useState([]);
  const [newThreadTitle, setNewThreadTitle] = useState("");
  const [newThreadContent, setNewThreadContent] = useState("");

  useEffect(() => {
    const promise = axios.get(process.env.REACT_APP_API_URL + "/api/thread");
    promise.then((response) => {
      setThreads(response.data.threads);
    });
  }, []);

  const handleAddThread = async () => {
    if (newThreadTitle.trim() === "" || newThreadContent.trim() === "") {
      return;
    }

    const newThread = {
      title: newThreadTitle,
      content: newThreadContent,
    };

    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/api/thread",
      newThread
    );

    setThreads([...threads, response.data.thread]);
    setNewThreadTitle("");
    setNewThreadContent("");
  };

  return (
    <Container>
      <Title>Threads</Title>

      {/* Display list of threads */}
      {threads.map((thread, index) => (
        <div
          key={index}
          onClick={() => navigate("details", { state: { thread } })}
        >
          <ThreadItem>
            <ThreadTitle>{thread.title}</ThreadTitle>
            <ThreadContent>{thread.content}</ThreadContent>
          </ThreadItem>
        </div>
      ))}

      {/* Form to create a new thread */}
      <NewThreadForm>
        <NewThreadTitle
          placeholder="Thread Title"
          value={newThreadTitle}
          onChange={(e) => setNewThreadTitle(e.target.value)}
        />
        <NewThreadContent
          placeholder="Thread Content"
          value={newThreadContent}
          onChange={(e) => setNewThreadContent(e.target.value)}
        />
        <div onClick={handleAddThread}>
          <p style={{ color: "#007BFF", fontSize: 18, textAlign: "center" }}>
            Create Thread
          </p>
        </div>
      </NewThreadForm>
    </Container>
  );
};

export default Threads;
