import React, { useEffect, useState, useCallback } from "react";
import { FlatList } from "react-native-web";

import styled from "styled-components";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

// Styled components
const Container = styled.div`
  display: flex;
  background-color: #ffffff;
  height: 100%;
`;

const ThreadTitle = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const ThreadContent = styled.p`
  font-size: 16px;
  color: #666;
`;

const CommentContainer = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
`;

const CommentText = styled.p`
  font-size: 14px;
  color: #333;
`;

const CommentForm = styled.div`
  margin-top: 20px;
  border-top-width: 1px;
  border-top-color: #ccc;
  padding-top: 10px;
`;

const NewCommentInput = styled.input`
  font-size: 14px;
  color: #333;
  padding: 8px;
  border: 1px solid #ccc;
`;

const CommentButton = styled.button`
  margin-top: 10px;
`;

const CommentButtonText = styled.p`
  color: #007bff;
  font-size: 16px;
`;

const BackButton = styled.button`
  margin-top: 20px;
`;

// ThreadDetails Component
const ThreadDetails = () => {
  const { thread } = useLocation().state;
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState("");
  const [rootThread, setRootThread] = useState(thread);
  const [replyingTo, setReplyingTo] = useState(null);

  useEffect(() => {
    if (!thread || !thread.id) {
      navigate("/talk");
    }
    const promise = axios.get(
      process.env.REACT_APP_API_URL + "/api/thread/" + thread.id
    );
    promise.then((response) => {
      setRootThread(response.data.thread);
    });
  }, []);

  const handleAddComment = async () => {
    if (newComment.trim() === "") {
      return;
    }

    const comment = {
      content: newComment,
      rootid: rootThread.id,
      parentid: replyingTo !== null ? replyingTo : -1,
    };
    await axios.post(
      process.env.REACT_APP_API_URL + "/api/comment/thread",
      comment
    );
    const response = await axios.get(
      process.env.REACT_APP_API_URL + "/api/thread/" + thread.id
    );

    setRootThread(response.data.thread);
    setReplyingTo(null);

    setNewComment("");
  };

  const renderItem = ({ item }) => (
    <CommentContainer key={item.id}>
      <CommentText>{item.content}</CommentText>
      {/* Show input for posting replies only when replyingTo matches the comment id */}
      {replyingTo === item.id ? (
        <CommentForm>
          <NewCommentInput
            placeholder="Reply to this comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <CommentButton onClick={handleAddComment}>
            <CommentButtonText>Post Reply</CommentButtonText>
          </CommentButton>
        </CommentForm>
      ) : (
        <button onClick={() => setReplyingTo(item.id)}>
          <p style={{ color: "#007BFF", fontSize: 16 }}>Reply</p>
        </button>
      )}
      {/* Display nested comments (replies) */}
      {item && item.children.map((item) => renderItem({ item }))}
    </CommentContainer>
  );

  return (
    <Container>
      {/* Display thread comments */}
      {rootThread && (
        <FlatList
          data={rootThread.children}
          renderItem={renderItem}
          ListHeaderComponent={
            <>
              <ThreadTitle>{rootThread.title}</ThreadTitle>
              <ThreadContent>{rootThread.content}</ThreadContent>
            </>
          }
          ListFooterComponent={
            <CommentForm>
              <NewCommentInput
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <CommentButton onClick={handleAddComment}>
                <CommentButtonText>Post Comment</CommentButtonText>
              </CommentButton>
            </CommentForm>
          }
        />
      )}
    </Container>
  );
};

export default ThreadDetails;
