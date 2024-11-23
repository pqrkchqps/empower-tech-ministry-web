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
  const [editingTo, setEditingTo] = useState(null);
  const [isDisabledPostReply, setIsDisabledPostReply] = useState(false);
  const [isDisabledDeleteComment, setIsDisabledDeleteComment] = useState(false);
  const [isDisabledEditComment, setIsDisabledEditComment] = useState(false);
  const [isEditAlreadyUpdated, setIsEditAlreadyUpdated] = useState(false);
  const [isEditTitleAlreadyUpdated, setIsEditTitleAlreadyUpdated] =
  useState(false);
  const [editThreadTitle, setEditThreadTitle] = useState(false);

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

  
  function updateRootThread(thread) {
    if (rootThread) {
      rootThread.title = editThreadTitle;
      rootThread.content = editCommentText;
      let newRootThread = JSON.parse(JSON.stringify(rootThread));
      setRootThread(newRootThread);
    }
  }
  
  function updateCommentToRootThread(comment) {
    if (rootThread) {
      if (newComment.parentid == -1) {
        rootThread.children.push(newComment);
      } else {
        let chs = rootThread.children;
        console.log('chs', chs);
        let queue = [...rootThread.children];
        while (queue.length > 0) {
          let currentComment = queue.shift();
          if (currentComment) {
            if (currentComment.id == comment.id) {
              currentComment.content = comment.content;
              break;
            } else {
              currentComment.children.map(comment => {
                queue.push(comment);
              });
            }
          }
        }
      }
      let newRootThread = JSON.parse(JSON.stringify(rootThread));
      setRootThread(newRootThread);
    }
  }

  function updateRootThread(thread) {
    if (rootThread) {
      rootThread.title = editThreadTitle;
      rootThread.content = editCommentText;
      let newRootThread = JSON.parse(JSON.stringify(rootThread));
      setRootThread(newRootThread);
    }
  }

  const handleAddComment = async () => {
    if (!isDisabledPostReply) {
      if (newComment.trim() === "") {
        return;
      }

      const comment = {
        content: newComment,
        rootid: rootThread.id,
        parentid: replyingTo !== null ? replyingTo : -1,
      };

      setIsDisabledPostReply(true);
      await axios.post(
        process.env.REACT_APP_API_URL + "/api/comment/thread",
        comment
      );
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/api/thread/" + thread.id
      );
      setIsDisabledPostReply(false);

      setRootThread(response.data.thread);
      setReplyingTo(null);

      setNewComment("");
    }
  };

  function deleteCommentToRootThread(comment) {
    if (rootThread) {
      if (newComment.parentid == -1) {
        rootThread.children.push(newComment);
      } else {
        let chs = rootThread.children;
        console.log("chs", chs);
        let queue = [...rootThread.children];
        while (queue.length > 0) {
          let currentComment = queue.shift();
          if (currentComment) {
            if (currentComment.id == comment.id) {
              currentComment.content = "deleted";
              break;
            } else {
              currentComment.children.map((comment) => {
                queue.push(comment);
              });
            }
          }
        }
      }
      let newRootThread = JSON.parse(JSON.stringify(rootThread));
      setRootThread(newRootThread);
    }
  }

  const handleCancelReply = async () => {
    if (!isDisabledPostReply) {
      setReplyingTo(null);

      setNewComment("");
    }
  };

  const handleSubmitEditComment = async () => {
    if (!isDisabledEditComment) {
      const comment = {
        content: editCommentText,
        id: editingTo,
      };
      if (comment.content.trim() === "") {
        return;
      }
      setIsDisabledEditComment(true);
      await axios.patch(API_URL + "/api/comment/thread/" + editingTo, comment);
      updateCommentToRootThread(comment);
      setIsDisabledEditComment(false);

      setEditingTo(null);

      setEditCommentText("");

      setIsEditAlreadyUpdated(false);
    }
  };

  const handleCancelEditComment = async () => {
    if (!isDisabledEditComment) {
      setEditingTo(null);

      setEditCommentText("");
      setEditThreadTitle("");

      setIsEditAlreadyUpdated(false);
      setIsEditTitleAlreadyUpdated(false);
    }
  };

  const handleSubmitEditThread = async () => {
    if (!isDisabledEditComment) {
      const thread = {
        title: editThreadTitle,
        content: editCommentText,
        id: rootThread.id,
      };
      if (thread.title.trim() === "") {
        return;
      }
      setIsDisabledEditComment(true);
      await axios.patch(API_URL + "/api/thread/" + rootThread.id, thread);
      updateRootThread(thread);
      setIsDisabledEditComment(false);

      setEditingTo(null);

      setEditCommentText("");
      setEditThreadTitle("");

      setIsEditAlreadyUpdated(false);
      setIsEditTitleAlreadyUpdated(false);
    }
  };

  function setOnceEditCommentText(text) {
    if (!isEditAlreadyUpdated) {
      setEditCommentText(text);
      setIsEditAlreadyUpdated(true);
    }
    return true;
  }

  function setOnceEdiThreadTitle(text) {
    if (!isEditTitleAlreadyUpdated) {
      setEditThreadTitle(text);
      setIsEditTitleAlreadyUpdated(true);
    }
    return true;
  }

  const renderItem = ({ item }) => (
    <CommentContainer key={item.id}>
      <CommentText>
        {editingTo === item.id && setOnceEditCommentText(item.content) ? (
          <CommentForm>
            <NewCommentInput
              placeholder="Edit this comment"
              value={editCommentText}
              onChangeText={(text) => setEditCommentText(text)}
            />
          </CommentForm>
        ) : (
          item.content
        )}
      </CommentText>
      {/* Show input for posting replies only when replyingTo matches the comment id */}
      {replyingTo === item.id ? (
        <CommentForm>
          <NewCommentInput
            placeholder="Reply to this comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <CommentButton
            disabled={isDisabledPostReply}
            onClick={handleAddComment}
          >
            <CommentButtonText>Post Reply</CommentButtonText>
          </CommentButton>
          <CommentButton
            disabled={isDisabledPostReply}
            onPress={handleCancelReply}
          >
            <CommentButtonText>Cancel Reply</CommentButtonText>
          </CommentButton>
          {item.userid.toString() === userId && (
            <>
              {editingTo === item.id ? (
                <>
                  <CommentButton
                    disabled={isDisabledEditComment}
                    onPress={handleSubmitEditComment}
                  >
                    <CommentButtonText>Submit Edit</CommentButtonText>
                  </CommentButton>
                  <CommentButton
                    disabled={isDisabledEditComment}
                    onPress={handleCancelEditComment}
                  >
                    <CommentButtonText>Cancel Edit</CommentButtonText>
                  </CommentButton>
                </>
              ) : (
                <CommentButton onPress={() => setEditingTo(item.id)}>
                  <CommentButtonText>Edit</CommentButtonText>
                </CommentButton>
              )}
            </>
          )}
          {item.userid.toString() === userId && item.content !== "deleted" && (
            <CommentButton
              disabled={isDisabledDeleteComment}
              onPress={() => handleDeleteComment(item)}
            >
              <CommentButtonText>Delete</CommentButtonText>
            </CommentButton>
          )}
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
              <ThreadTitle>{editingTo === -1 &&
            rootThread &&
            setOnceEdiThreadTitle(rootThread.title) ? (
              <CommentForm>
                <NewCommentInput
                  placeholder="Edit this comment"
                  value={editThreadTitle}
                  onChangeText={text => setEditThreadTitle(text)}
                />
              </CommentForm>
            ) : (
              rootThread && rootThread.title
            )}</ThreadTitle>
              <ThreadContent>
            {editingTo === -1 &&
            rootThread &&
            setOnceEditCommentText(rootThread.content) ? (
              <CommentForm>
                <NewCommentInput
                  placeholder="Edit this comment"
                  value={editCommentText}
                  onChangeText={text => setEditCommentText(text)}
                />
              </CommentForm>
            ) : (
              rootThread && rootThread.content
            )}
          </ThreadContent>
          {rootThread && rootThread.userid.toString() === userId && (
            <>
              {editingTo === -1 ? (
                <>
                  <CommentButton
                    disabled={isDisabledEditComment}
                    onPress={handleSubmitEditThread}>
                    <CommentButtonText>Submit Edit</CommentButtonText>
                  </CommentButton>
                  <CommentButton
                    disabled={isDisabledEditComment}
                    onPress={handleCancelEditComment}>
                    <CommentButtonText>Cancel Edit</CommentButtonText>
                  </CommentButton>
                </>
              ) : (
                <CommentButton onPress={() => setEditingTo(-1)}>
                  <CommentButtonText>Edit</CommentButtonText>
                </CommentButton>
              )}
            </>
          )}
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
