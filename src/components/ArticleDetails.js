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

const ArticleTitle = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const ArticleContent = styled.p`
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

// ArticleDetails Component
const ArticleDetails = () => {
  const { article } = useLocation().state;
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState("");
  const [newReply, setNewReply] = useState("");
  const [rootArticle, setRootArticle] = useState(article);
  const [replyingTo, setReplyingTo] = useState(null);

  useEffect(() => {
    if (!article || !article.id) {
      navigate("/talk");
    }
    const promise = axios.get(
      process.env.REACT_APP_API_URL + "/api/article/" + article.id
    );
    promise.then((response) => {
      setRootArticle(response.data.article);
    });
  }, []);

  const handleAddReply = async () => {
    if (newReply.trim() === "") {
      return;
    }

    const comment = {
      content: newReply,
      rootid: rootArticle.id,
      parentid: replyingTo,
    };

    await axios.post(
      process.env.REACT_APP_API_URL + "/api/comment/article",
      comment
    );

    const response = await axios.get(
      process.env.REACT_APP_API_URL + "/api/article/" + article.id
    );

    setRootArticle(response.data.article);
    setReplyingTo(null);

    setNewReply("");
  };

  const handleAddComment = async () => {
    if (newComment.trim() === "") {
      return;
    }

    const comment = {
      content: newComment,
      rootid: rootArticle.id,
      parentid: -1,
    };
    await axios.post(
      process.env.REACT_APP_API_URL + "/api/comment/article",
      comment
    );
    const response = await axios.get(
      process.env.REACT_APP_API_URL + "/api/article/" + article.id
    );

    setRootArticle(response.data.article);
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
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
          />
          <CommentButton onClick={handleAddReply}>
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
      {/* Display article comments */}
      {rootArticle && (
        <FlatList
          data={rootArticle.children}
          renderItem={renderItem}
          ListHeaderComponent={
            <>
              <ArticleTitle>{rootArticle.title}</ArticleTitle>
              <ArticleContent>{rootArticle.content}</ArticleContent>
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

export default ArticleDetails;
